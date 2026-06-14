/**
 * ============================================================================
 *                            LAYOUT & UI ENGINE
 * ============================================================================
 *
 * This file draws the height-sorted line-up & the KaTeX detail panels, and; every
 * number it shows is taken from ScaleModel in the file assets/model.js, so; no physics
 * lives here, only the staging & the interaction.
 *
 * ----------------------------------------------------------------------------
 * 1. WHAT IS WHAT AS SO WHY
 * ----------------------------------------------------------------------------
 * The state it keeps is small. The sprites array holds every uploaded subject & is
 * kept sorted by real height ascending, while the vis array holds the subset whose
 * images have decoded & natural size is therefore known, and; because the layout
 * keys off vis indices a subject does not enter the line until it has loaded. The scale
 * pxPerCm is chosen live so that the tallest currently shown subject just fills the
 * stage height, and; since the cm ruler down the left is drawn from that same scale the
 * on-screen sizes stay honestly comparable across subjects. The counter shownCount is
 * how many subjects are revealed, counting up from the shortest, and; wallIdx points
 * within vis at the wall, the subject nearest 178 cm, past which the left edge never
 * slides, so that a human-scale reference is always on screen. What remains is scrollX,
 * the current horizontal offset, pinned, the subject whose panel has been pinned open,
 * & the constant GAP as the pixel gap held between neighbours.
 *
 * ----------------------------------------------------------------------------
 * 2. THE LAYOUT RULE
 * ----------------------------------------------------------------------------
 * Heights are fitted to the stage, and; widths are never fitted. When the revealed run
 * grows wider than the usable strip the engine shrinks no one, it drops the subject just
 * after the wall & slides, holding the wall in place, and; when even the contiguous run
 * leftward from the newest subject overflows it walks left from the newest taking each
 * subject that still fits & keeps the wall pinned at the front of whatever tail survives.
 * A subject's drawn pixel height counts the ears & accessories that sit above the true
 * crown, so; a right-click records the real head position as the fraction y measured
 * down from the image top, and; the genuine standing height is the part of the image
 * below that mark, the proportion one minus y of it, and; the drawn height is therefore
 * the real height in pixels divided by one minus y, which sets the feet on the ground
 * even when the hats do not. That mark is sent to sethead.php & kept, so; it survives a
 * reload. A just-revealed subject is placed in the same pass but held hidden, by the
 * deferred index, to be faded in once the others have settled.
 *
 * ----------------------------------------------------------------------------
 * 3. REVEAL & HIDE
 * ----------------------------------------------------------------------------
 * The two navigation buttons move one subject at a time & never overlap their
 * animations. The forward button reveals the next-taller subject, so; the others rescale
 * & slide first, and; only once the row has settled does the new one fade in over a
 * second, while the back button hides the current tallest, which fades out first & only
 * then lets the rest reflow into the gap it left. A single flag, animating, is held for
 * the length of each move, so; the two cannot collide, a freshly placed subject has
 * its height & offset snapped without transition so that it never appears to slide in
 * from a stale position.
 *
 * ----------------------------------------------------------------------------
 * 4. THE DETAIL PANELS
 * ----------------------------------------------------------------------------
 * Hovering a subject raises a transient panel that leaves when the pointer does, while a
 * click pins the panel so that it stays open, and; its text becomes selectable, and;
 * because KaTeX copy-tex is loaded the copied text comes out as raw LaTeX rather than
 * rendered symbols. A panel takes whichever side has room, so; a subject toward the left
 * gets its panel on the right, and; one toward the right gets it on the left, and; a
 * subject near the centre keeps its own place while the information is divided across two
 * panels, one to each side, with the neighbours sliding outward to open the space. The
 * contents are built from the subject's name, then the metric rows from ScaleModel.rows,
 * then a separator, then the status & active interventions from ScaleModel.stack. A click
 * on empty ground, landing on no panel, no subject, & no button, unpins whatever was
 * pinned, and; a resize unpins & relays the line.
 *
 * ----------------------------------------------------------------------------
 * 5. SOURCES
 * ----------------------------------------------------------------------------
 *     > assets/model.js, every rendered value, the k = H / 160 scaling model
 *     > KaTeX 0.16.9 with copy-tex, the math rendering, loaded in index.php
 *
 * ============================================================================
 */
(function () {
  "use strict";

  const GAP = 28;
  const inner   = document.getElementById('inner');
  const people  = document.getElementById('people');
  const ruler   = document.getElementById('ruler');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const form    = document.getElementById('addForm');

  const KO = { throwOnError: false, trust: true, strict: false };

  let sprites = [];
  let vis     = [];
  let pxPerCm = 1;
  let shownCount = 1;
  let wallIdx = 0;
  let scrollX = 0;
  let pinned  = null;

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  function katexEsc(s) {
    return String(s).replace(/\\/g, '').replace(/[\^~]/g, '').replace(/[#$%&_{}]/g, c => '\\' + c);
  }

  function addSprite(data, animate) {
    const el = document.createElement('div');
    el.className = 'sprite';
    const img = document.createElement('img');
    img.src = data.file;
    el.appendChild(img);
    inner.appendChild(el);

    const s = { id: data.id, file: data.file, height: +data.height, name: data.name || '',
                y: +data.y || 0, el, img, loaded: false, animate: !!animate, left: 0, w: 0 };
    el._sprite = s;
    sprites.push(s);

    img.addEventListener('load', () => { s.loaded = true; if (s.animate) shownCount = 1e9; relayout(); });

    el.addEventListener('contextmenu', e => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      s.y = clamp((e.clientY - r.top) / r.height, 0, 0.95);
      relayout();
      const fd = new FormData(); fd.append('id', s.id); fd.append('y', s.y);
      fetch('sethead.php', { method: 'POST', body: fd }).catch(() => {});
    });
    el.addEventListener('mouseenter', () => { if (!pinned) showPanel(s, false); });
    el.addEventListener('mouseleave', () => { if (!pinned) hidePanel(); });
    el.addEventListener('click', e => {
      e.stopPropagation();
      if (pinned === s) { pinned = null; hidePanel(); }
      else { pinned = s; showPanel(s, true); }
    });
    return s;
  }

  const dispH = (s, ppc) => s.height * ppc / (1 - (s.y || 0));
  const spriteW = (s, ppc) => dispH(s, ppc) * (s.img.naturalWidth / s.img.naturalHeight);
  let animating = false;

  function relayout(deferIdx) {
    sprites.sort((a, b) => a.height - b.height);
    vis = sprites.filter(s => s.loaded && s.img.naturalHeight > 0);

    const availH = people.clientHeight, VW = people.clientWidth;
    if (!vis.length) { pxPerCm = availH / 20; drawRuler(availH); prevBtn.disabled = nextBtn.disabled = true;
                       sprites.forEach(s => s.el.classList.remove('shown')); return; }

    wallIdx = 0; let best = Infinity;
    vis.forEach((s, i) => { const d = Math.abs(s.height - 178); if (d < best) { best = d; wallIdx = i; } });

    shownCount = clamp(shownCount, 1, vis.length);
    const endIdx = shownCount - 1;
    const ppc = availH / Math.max(vis[endIdx].height * 1.08, 5);
    pxPerCm = ppc;
    const UW = VW * 0.9;

    let start = endIdx, sum = spriteW(vis[endIdx], ppc);
    for (let j = endIdx - 1; j >= 0; j--) {
      const need = sum + GAP + spriteW(vis[j], ppc);
      if (need <= UW) { sum = need; start = j; } else break;
    }

    let visibleIdx = [];
    if (start <= wallIdx || endIdx < wallIdx) {
      for (let j = start; j <= endIdx; j++) visibleIdx.push(j);
    } else {
      let budget = UW - spriteW(vis[wallIdx], ppc);
      const tail = [];
      for (let j = endIdx; j > wallIdx; j--) {
        const cost = GAP + spriteW(vis[j], ppc);
        if (budget - cost >= 0) { budget -= cost; tail.unshift(j); } else break;
      }
      visibleIdx = [wallIdx, ...tail];
    }
    const visibleSet = new Set(visibleIdx);

    vis.forEach((s, i) => {
      if (!visibleSet.has(i) && s.el.classList.contains('shown')) {
        s.el.classList.remove('shown'); s.el.classList.add('leaving');
      }
    });

    let cursor = 0;
    visibleIdx.forEach(i => {
      const s = vis[i], h = dispH(s, ppc), w = spriteW(s, ppc);
      s.left = cursor; s.w = w;
      s.el.classList.remove('leaving');
      if (i === deferIdx) {
        jump(s.el, h, cursor);
      } else if (s.el.classList.contains('shown')) {
        s.el.style.height = h + 'px';
        s.el.style.left = cursor + 'px';
      } else {
        jump(s.el, h, cursor);
        s.el.classList.add('shown');
      }
      cursor += w + GAP;
    });

    scrollX = 0; inner.style.transform = 'translateX(0)';
    drawRuler(availH);
    prevBtn.disabled = shownCount <= 1;
    nextBtn.disabled = shownCount >= vis.length;
  }

  function jump(el, h, left) {
    el.style.transition = 'none';
    el.style.height = h + 'px';
    el.style.left = left + 'px';
    void el.offsetWidth;
    el.style.transition = '';
  }

  function reveal() {
    if (animating || shownCount >= vis.length) return;
    animating = true;
    const newIdx = shownCount;
    shownCount++;
    relayout(newIdx);
    setTimeout(() => {
      const s = vis[newIdx];
      if (s) s.el.classList.add('shown');
      setTimeout(() => { animating = false; }, 200);
    }, 380);
  }
  function hide() {
    if (animating || shownCount <= 1) return;
    animating = true;
    const s = vis[shownCount - 1];
    s.el.classList.add('leaving');
    s.el.classList.remove('shown');
    setTimeout(() => {
      s.el.classList.remove('leaving');
      shownCount--;
      relayout();
      setTimeout(() => { animating = false; }, 380);
    }, 300);
  }
  prevBtn.addEventListener('click', e => { e.stopPropagation(); hide(); });
  nextBtn.addEventListener('click', e => { e.stopPropagation(); reveal(); });

  function drawRuler(availH) {
    ruler.innerHTML = '';
    if (pxPerCm <= 0) return;
    const topCm = availH / pxPerCm;
    const step = niceStep(topCm / 9);
    for (let c = 0; c <= topCm; c += step) {
      const t = document.createElement('div');
      t.className = 'tick';
      t.style.bottom = (c * pxPerCm) + 'px';
      const lbl = document.createElement('span');
      lbl.textContent = Math.round(c);
      t.appendChild(lbl);
      ruler.appendChild(t);
    }
  }
  function niceStep(raw) {
    const pow = Math.pow(10, Math.floor(Math.log10(raw)));
    const n = raw / pow;
    return (n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10) * pow;
  }

  function buildItems(s) {
    const items = [];
    if (s.name) items.push({ kind: 'row', tex: `\\textbf{${katexEsc(s.name)}}` });
    ScaleModel.rows(s.height).forEach(tex => items.push({ kind: 'row', tex }));
    items.push({ kind: 'sep' });
    ScaleModel.stack(s.height).forEach(r => items.push({ kind: 'row', tex: r.tex, cls: r.cls }));
    return items;
  }
  function renderItems(panel, items) {
    items.forEach(it => {
      if (it.kind === 'sep') { const d = document.createElement('div'); d.className = 'sep'; panel.appendChild(d); return; }
      const r = document.createElement('div');
      r.className = 'row' + (it.cls ? ' ' + it.cls : '');
      r.innerHTML = katex.renderToString(it.tex, KO);
      panel.appendChild(r);
    });
  }

  function hidePanel() {
    inner.querySelectorAll('.panel').forEach(p => p.remove());
    vis.forEach(s => s.el.style.transform = '');
  }

  function showPanel(s, pin) {
    hidePanel();
    if (!s.loaded) return;
    const VW = people.clientWidth;
    const TW = Math.min(360, Math.max(240, VW * 0.42));
    const left = s.left, w = s.w;
    const centerVp = left + w / 2 - scrollX;
    const side = centerVp < VW * 0.34 ? 'right' : centerVp > VW * 0.66 ? 'left' : 'both';
    const idx = vis.indexOf(s);
    const shift = TW + GAP;
    const items = buildItems(s);

    function mkPanel(x, its) {
      const p = document.createElement('div');
      p.className = 'panel' + (pin ? ' pinned' : '');
      renderItems(p, its);
      p.style.left = x + 'px';
      p.style.width = TW + 'px';
      inner.appendChild(p);
      requestAnimationFrame(() => p.classList.add('in'));
    }

    if (side === 'both') {
      const mid = Math.ceil(items.length / 2);
      vis.forEach((o, j) => {
        if (j < idx) o.el.style.transform = `translateX(${-shift}px)`;
        else if (j > idx) o.el.style.transform = `translateX(${shift}px)`;
      });
      mkPanel(left - GAP - TW, items.slice(0, mid));
      mkPanel(left + w + GAP, items.slice(mid));
    } else if (side === 'left') {
      vis.forEach((o, j) => { if (j < idx) o.el.style.transform = `translateX(${-shift}px)`; });
      mkPanel(left - GAP - TW, items);
    } else {
      vis.forEach((o, j) => { if (j > idx) o.el.style.transform = `translateX(${shift}px)`; });
      mkPanel(left + w + GAP, items);
    }
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(form);
    try {
      const res = await fetch('upload.php', { method: 'POST', body: fd });
      const j = await res.json();
      if (!j.ok) { alert(j.error || 'upload failed'); return; }
      addSprite(j.sprite, true);
      form.reset();
    } catch (err) { alert('upload failed'); }
  });

  people.addEventListener('click', e => {
    if (e.target.closest('.panel') || e.target.closest('.sprite') || e.target.closest('.controls')) return;
    if (pinned) { pinned = null; hidePanel(); }
  });

  window.addEventListener('resize', () => { pinned = null; hidePanel(); relayout(); });
  (window.INITIAL_SPRITES || []).forEach(d => addSprite(d, false));
  relayout();
})();
