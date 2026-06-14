/**
 * ============================================================================
 *                          SCALED-HUMAN SCALING ENGINE
 * ============================================================================
 *
 * One human body, scaled isometrically so that every length is multiplied by the
 * same factor, read as a pure function of height alone. The single driver is the
 * ratio k = H / H0, where H0 is 160 cm, the height of the global average adult
 * woman, and; from k the engine reports what the body becomes in mass, bone, blood,
 * heat, & brain, the height at which each subsystem fails, & the named mutation that
 * buys each failure back. Only one thing here is fictional, the premise that a human
 * can grow isometrically at all, since real bodies grow allometrically with legs &
 * organs running at their own rates, and; every consequence drawn from that premise
 * is real square-cube physics applied honestly, so; to accept the premise is to live
 * with its costs & never to magic them away.
 *
 * ----------------------------------------------------------------------------
 * 1. WHAT IS WHAT AS SO WHY
 * ----------------------------------------------------------------------------
 * Each metric carries a kind, and; the kind decides which exponent the engine
 * trusts. The geometric metrics keep exact isometric geometry as a plain power of k,
 * and; since real animals measure the same way they take no correction: mass, blood
 * volume, lung volume, stroke volume, & heart mass all rise as k^3, surface area as
 * k^2, & every length, the femur, the stride, & the rest, as k^1. The physics
 * metrics, namely hydrostatic pressure as rho g h, Laplace wall tension as pressure
 * times radius over thickness, bone stress, & cardiac load, are kept as exact physics
 * & are deliberately not fitted to allometry, because the real giants that seem to
 * escape them do so only through adaptations this premise forbids, elastic similarity
 * & a change of posture, so; a perfectly proportioned human pays the penalty in full,
 * and; that unpaid penalty is the whole reason the mutation stack below is needed. The
 * rate metrics, the physiology of metabolism & the brain, of heart rate & breathing,
 * of lifespan, gait, & voice, are the place where the naive cube law is wrong, and;
 * for these the engine blends from pure geometry toward measured allometry by the knob
 * LAMBDA: the reconciled exponent is a straight interpolation between the two
 * endpoints weighted by LAMBDA, so that at LAMBDA zero it returns the mythic
 * fetishistic isometric giant of k^3 everything, and; at LAMBDA one it returns
 * the published literature, the default being one & the knob existing only to
 * dial back toward the legend.
 *
 * ----------------------------------------------------------------------------
 * 2. THE THREE MASTER RATIOS
 * ----------------------------------------------------------------------------
 * Every failure in the model is one of three ratios of load made to load handled,
 * each a power of k. The overheat ratio is heat generated over heat dumped, k^3 over
 * k^2, which is k. The structural-stress ratio is weight over bone cross-section,
 * again k. The cardiac-load ratio is pump work over pump strength, k^4 over k^2,
 * which is k^2, the harshest scaling anywhere in the body. The standing temptation is
 * to answer that the organs grow too, so; all is well, and; they do grow, yet;
 * strength & dumping scale as k^2 while load scales as k^3 to k^4, so; the larger
 * organ never catches up, and; thickening a vessel does not save it because the radius
 * thickened with it, and; Laplace wall tension holds at k. These same numbers are
 * shown live beside the metrics, bone stress at k, cardiac work at k^2, & hydrostatic
 * perfusion pressure at k, all kept as exact physics. Thermal load, by contrast, comes
 * out mild once heat is allometric: the comfortable ambient temperature falls from the
 * core 37 by a term scaling as k to the metabolic exponent less two, which at the
 * default blend is k^0.25, so; it reads about 5 at baseline & minus 7 at 560 cm,
 * and; the cold Antarctic siting that the old isometric heat once forced becomes only
 * an optional environmental knob.
 *
 * ----------------------------------------------------------------------------
 * 3. THE METRIC EXPONENTS
 * ----------------------------------------------------------------------------
 * Within the rate bucket the engine departs from the cube law by exactly the published
 * exponent. Metabolic heat, which pure geometry would raise as k^3, instead follows
 * Kleiber's measured law & climbs only as k^2.25, the modern value of White & Seymour
 * 2005. The brain is the single biological exception to body scaling, for its mass does
 * not track the body but tracks neuron count at roughly constant density, so; brain
 * mass, neuron count, & brain power all ride k^0.83 together rather than k^3, anchored
 * on the human to elephant comparison of Herculano-Houzel 2014, and; this is why a 560
 * cm brain settles near 4 kg instead of the k^3 overshoot & why the old k^3 reading that
 * handed a tall maiden some 3.68 trillion neurons is gone at the default blend. Heart
 * rate & breathing rate both fall as k^-0.75, after Savage 2004 & He 2023, while cardiac
 * output, being a stroke volume of k^3 carried at that slower rate, rises as k^2.25.
 * Maximum lifespan lengthens as k^0.75 after Lindstedt & Calder 1981, though only while
 * the Peto cancer package described below is held active. Running speed rises as k^0.5
 * by Froude similarity after Garland 1983, stride frequency falls as k^-0.5 after
 * Heglund 1974, vocal pitch falls as k^-0.75 from the empirical quarter-power law on
 * mass. Vaginal depth is kept isometric at k^1 rather than fitted to the flat clinical
 * figure, because the birth canal must scale with the k-scaled neonate, or; birth
 * becomes impossible, and; the apparently flat measurement was only the narrow range of
 * human heights reading as noise.
 *
 * ----------------------------------------------------------------------------
 * 4. THE FAILURE WALLS & THE MUTATION STACK
 * ----------------------------------------------------------------------------
 * Read as height, each subsystem fails at its own k, and; the named fixes must be
 * applied in order, since no later wall is reached until the earlier one is lifted.
 * Below about 62 cm the brain falls under the primate line & cannot run human cognition
 * at all. The full-intelligence floor once placed near 110 cm was derived from the k^3
 * neuron count & is now under revision, the neuron count being k^0.83, so; it is not to
 * be treated as firm. Going upward, bone fails first near 224 cm as compressive &
 * femoral-neck shear stress rise as k, and; the LRP5 high-density-bone mutation, worth
 * about 2.5 times the strength, lifts that wall. The cardiovascular system then binds as
 * hydrostatic pressure rises as k: from about 320 cm the giraffe gene FGFRL1 & a rete
 * mirabile at the base of the skull are advised, and; by the hard wall near 365 cm they
 * are required outright together with staging hearts & one-way venous valves, because
 * hydrostatic pressure depends only on column height & never on vessel width. A second
 * rete mirabile does not help & in fact hurts, being a restrictor & not a pump, so;
 * stacking restrictors only raises the pressure the heart must make, and; the way to go
 * taller is more pumps. With the full stack active the structural wall returns near 560
 * cm, where even LRP5 calcium shears at the angled human femoral neck on the first step,
 * and; that is the hard ceiling of the human skeletal blueprint, so; the settled livable
 * envelope runs from roughly 110 cm to 560 cm, its floor set by neuron packing & its
 * ceiling by hip-bone shear. Cancer is carried separately as the Peto package: within
 * humans the risk climbs with height, near sixteen percent for every ten centimetres,
 * so; the giant is granted TP53 copies scaling from one toward the roughly twenty of an
 * elephant, near the round of k^2.1, and; with that package present the long lifespan
 * above holds rather than inverting to a short one.
 *
 * ----------------------------------------------------------------------------
 * 5. SOURCES
 * ----------------------------------------------------------------------------
 * The following works stand behind the numbers above.
 *
 *     > Kleiber, M., 1932, Body size & metabolism, the three-quarter-power law
 *     > White, C. R. & Seymour, R. S., 2005, Mammalian basal metabolic rate
 *     > Savage, V. M. & others, 2004, The predominance of quarter-power scaling in biology
 *     > He, J. & others, 2023, the allometry of heart rate & breathing rate
 *     > Lindstedt, S. L. & Calder, W. A., 1981, Body size & longevity
 *     > Garland, T., 1983, the maximal running speed of mammals
 *     > Heglund, N. C., 1974, stride frequency & the scaling of gait
 *     > Alexander, R. McN., the Froude number & dynamic similarity of gait
 *     > Herculano-Houzel, S., 2014, neuronal scaling rules & the energetic cost of the brain
 *     > McMahon, T. A., 1973, elastic similarity & the scaling of bone
 *     > Biewener, A. A., size-invariant peak bone stress through posture & scaling
 *     > the Million Women Study, height & cancer risk, a rise near sixteen percent
 *       per ten centimetres
 *     > Abegglen, L. M. & others, 2015, elephant TP53 copies & Peto's paradox
 *     > AJOG, 2006, vaginal dimensions, the narrow-range datum near 9.5 centimetres
 *     > giraffe arterial pressure near 280 mmHg, the calibration of the hydrostatic wall
 *
 * ============================================================================
 */
(function () {
  "use strict";

  const H0 = 160;
  const TCORE = 37;
  const DT0 = 32;
  const LAMBDA = 1;

  const T = { COG: 62, INTEL: 110, BONE: 224, CARDIOWARN: 320, CARDIO: 365, WALL: 560 };

  const METRICS = [
    { key:'mass',       label:'m',                      baseline:55,   unit:'\\mathrm{kg}',      isoExp:3, alloExp:3,     kind:'geom' },
    { key:'area',       label:'A',                      baseline:1.6,  unit:'\\mathrm{m^2}',     isoExp:2, alloExp:2,     kind:'geom' },
    { key:'blood',      label:'V_{\\text{blood}}',      baseline:4.5,  unit:'\\mathrm{L}',       isoExp:3, alloExp:3,     kind:'geom' },
    { key:'lungVol',    label:'V_{\\text{lung}}',       baseline:6,    unit:'\\mathrm{L}',       isoExp:3, alloExp:3,     kind:'geom' },
    { key:'femur',      label:'\\ell_{\\text{femur}}',  baseline:40,   unit:'\\mathrm{cm}',      isoExp:1, alloExp:1,     kind:'geom' },
    { key:'metabolic',  label:'Q_{\\text{body}}',       baseline:90,   unit:'\\mathrm{W}',       isoExp:3, alloExp:2.25,  kind:'rate' },
    { key:'brainMass',  label:'m_{\\text{brain}}',      baseline:1.4,  unit:'\\mathrm{kg}',      isoExp:3, alloExp:0.83,  kind:'rate' },
    { key:'neurons',    label:'N',                      baseline:86,   unit:'\\text{mrd}',       isoExp:3, alloExp:0.83,  kind:'rate' },
    { key:'brainPower', label:'P_{\\text{brain}}',      baseline:20,   unit:'\\mathrm{W}',       isoExp:3, alloExp:0.83,  kind:'rate' },
    { key:'heartRate',  label:'f_{\\text{heart}}',      baseline:70,   unit:'\\mathrm{bpm}',     isoExp:0, alloExp:-0.75, kind:'rate' },
    { key:'cardiacOut', label:'\\dot V_{\\text{card}}', baseline:5,    unit:'\\mathrm{L/min}',   isoExp:3, alloExp:2.25,  kind:'rate' },
    { key:'heartMass',  label:'m_{\\text{heart}}',      baseline:0.3,  unit:'\\mathrm{kg}',      isoExp:3, alloExp:3,     kind:'geom' },
    { key:'strokeVol',  label:'V_{\\text{stroke}}',     baseline:70,   unit:'\\mathrm{mL}',      isoExp:3, alloExp:3,     kind:'geom' },
    { key:'breathRate', label:'f_{\\text{breath}}',     baseline:14,   unit:'\\mathrm{min^{-1}}',isoExp:0, alloExp:-0.75, kind:'rate' },
    { key:'lifespan',   label:'t_{\\text{life}}',       baseline:80,   unit:'\\mathrm{yr}',      isoExp:0, alloExp:0.75,  kind:'rate' },
    { key:'runSpeed',   label:'v_{\\text{run}}',        baseline:5,    unit:'\\mathrm{m/s}',     isoExp:0.5, alloExp:0.5, kind:'rate' },
    { key:'strideLen',  label:'\\lambda_{\\text{stride}}',baseline:0.8,unit:'\\mathrm{m}',       isoExp:1, alloExp:1,     kind:'geom' },
    { key:'strideFreq', label:'f_{\\text{stride}}',     baseline:2,    unit:'\\mathrm{s^{-1}}',  isoExp:-0.5, alloExp:-0.5,kind:'rate' },
    { key:'voiceF0',    label:'f_0',                    baseline:220,  unit:'\\mathrm{Hz}',      isoExp:-1, alloExp:-0.75, kind:'rate' },
    { key:'vagina',     label:'\\ell_{\\text{vag}}',    baseline:9.5,  unit:'\\mathrm{cm}',      isoExp:1, alloExp:1,      kind:'geom' }
  ];

  function expFor(m) {
    return m.kind === 'rate' ? (1 - LAMBDA) * m.isoExp + LAMBDA * m.alloExp : m.isoExp;
  }

  const f0 = x => Math.round(x).toString();
  const f1 = x => x.toFixed(1);
  const f2 = x => x.toFixed(2);
  function fmtNum(x) {
    const a = Math.abs(x);
    if (a === 0) return '0';
    if (a >= 100) return String(Math.round(x));
    if (a >= 10) return x.toFixed(1);
    if (a >= 1) return x.toFixed(2);
    return x.toFixed(3);
  }
  const expFmt = e => String(parseFloat(e.toFixed(2)));
  function expTerm(e) {
    if (e === 0) return '';
    if (e === 1) return 'k';
    return `k^{${expFmt(e)}}`;
  }

  function compute(h) {
    const k = h / H0;
    const vals = {};
    METRICS.forEach(m => { vals[m.key] = m.baseline * Math.pow(k, expFor(m)); });
    const me = expFor(METRICS.find(m => m.key === 'metabolic'));
    return {
      h, k, vals,
      comfort: TCORE - DT0 * Math.pow(k, me - 2),
      bone: k,
      cardiac: k * k,
      hydro: k,
      tp53: Math.max(1, Math.round(Math.pow(k, 2.1)))
    };
  }

  function rows(h) {
    const c = compute(h);
    const out = [`H = ${f0(h)}\\,\\mathrm{cm}, \\quad k = ${f2(c.k)}`];

    METRICS.forEach(m => {
      const e = expFor(m), term = expTerm(e), v = c.vals[m.key];
      const formula = term ? `${m.baseline}\\,${term} = ` : '';
      if (m.key === 'neurons') {
        out.push(`${m.label} = ${formula}${fmtNum(v)}\\ \\text{mrd}\\ (${f2(v / 1000)}\\ \\text{bil})`);
      } else {
        out.push(`${m.label} = ${formula}${fmtNum(v)}\\,${m.unit}`);
      }
    });

    out.push(`\\sigma_{\\text{bone}} = k = ${f2(c.bone)}\\times`);
    out.push(`W_{\\text{heart}} = k^2 = ${f2(c.cardiac)}\\times`);
    out.push(`P_{\\text{hydro}} = k = ${f2(c.hydro)}\\times`);

    const me = expFor(METRICS.find(m => m.key === 'metabolic'));
    out.push(`T_{\\text{comfort}} = 37 - 32\\,${expTerm(me - 2) || '1'} = ${f0(c.comfort)}\\,\\text{DC}`);
    out.push(`\\text{TP53 copies} = ${c.tp53}`);
    return out;
  }

  function stack(h) {
    const out = [];
    if (h < T.COG)
      out.push({ tex: `\\text{below cognition floor}`, cls: 'bad' });
    else if (h > T.WALL)
      out.push({ tex: `\\text{hip shear}`, cls: 'bad' });
    else
      out.push({ tex: `\\text{viable}`, cls: 'ok' });

    if (h >= T.COG && h < T.INTEL)
      out.push({ tex: `\\text{Under allometric revision}`, cls: 'warn' });
    if (h > T.BONE)
      out.push({ tex: `\\text{LRP5}`, cls: 'warn' });

    if (h > T.CARDIOWARN && h <= T.CARDIO) {
      out.push({ tex: `\\text{FGFRL1 + rete mirabile advised}`, cls: 'warn' });
    } else if (h > T.CARDIO) {
      out.push({ tex: `\\text{FGFRL1}`, cls: 'warn' });
      out.push({ tex: `\\text{rete mirabile}`, cls: 'warn' });
      out.push({ tex: `\\text{staging hearts} P=\\rho g h`, cls: 'warn' });
      out.push({ tex: `\\text{one-way venous valves}`, cls: 'warn' });
    }
    return out;
  }

  window.ScaleModel = { compute, rows, stack, T, LAMBDA };
})();
