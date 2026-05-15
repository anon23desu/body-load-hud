const KEY = 'bodyLoadHudState';

const clamp = (n) => Math.max(0, Math.min(10, Number(n) || 0));
const bar = (n) => '█'.repeat(clamp(n)) + '░'.repeat(10 - clamp(n));

function freshState() {
  return {
    visible: true,
    collapsed: false,
    inject: true,

    profile: {
      age: '22',
      height: '155 cm',
      wombCap: '1.0L Base',
      stomachCap: '1.2L Max',
      colonCap: '1.5L Max',
      tunnelLength: '8.5 cm',
    },

    tags: 'Overfilled / Triple-bloated / Leaking / Overstimulated / Hard to hide',

    source: {
      origin: 'Human',
      trait: 'Thick, warm, lingering',
      texture: 'Dense, smooth',
      potency: 8,
      lingering: 9,
    },

    occupant: {
      type: 'Non-human wombling',
      shape: 'Oval body',
      growth: 'Mid growth',
      position: 'Centered / low',
      vitality: 8,
      spaceTaken: 8,
      freeSpace: 2,
      movement: 5,
    },

    coating: {
      coverage: 10,
      thickness: 9,
      submersion: 9,
      fluidPressure: 10,
      state: 'Fully surrounded and slicked',
    },

    fluidStress: {
      reaction: 'Shifting / pressing back',
      reflex: 'Womb forcing excess out',
      displacement: 10,
      backflowForce: 10,
      safety: 'Protected but overwhelmed',
    },

    outer: {
      look: 'Puffy, wet, spread',
      swelling: 8,
      openness: 7,
      wetness: 9,
      mess: 9,
      leakEase: 9,
    },

    inner: {
      coating: 10,
      mess: 10,
      stretch: 8,
      grip: 3,
      depth: 8,
      backflow: 10,
    },

    inserted: {
      present: 'Yes',
      lengthInside: 8,
      lengthText: '8.0 cm / 8.5 cm',
      girth: 8,
      tip: 'Near womb entrance',
      motion: 'Pressing pressure deeper',
    },

    womb: {
      capacity: '0.3L Max',
      storedText: '0.5L / 0.3L',
      stored: 10,
      pressure: 10,
      overflow: 10,
      leakRisk: 10,
      control: 1,
    },

    stomach: {
      storedText: '1.4L / 1.2L',
      stored: 10,
      fullness: 10,
      weight: 9,
      sloshing: 8,
      downPressure: 8,
      control: 2,
    },

    colon: {
      look: 'Puffy, stretched, messy',
      openness: 7,
      coating: 9,
      stretch: 8,
      seal: 2,
      storedText: '1.3L / 1.5L',
      stored: 9,
      pressure: 10,
      leakRisk: 9,
      control: 2,
    },

    bloat: {
      upper: 'Stuffed, tight',
      lower: 'Round, womb-heavy',
      gut: 10,
      corePressure: 10,
      stress: 10,
      balance: 2,
    },

    reaction: {
      pleasure: 9,
      arousal: 10,
      heat: 9,
      embarrassment: 9,
      composure: 2,
      betrayal: 10,
    },

    signs: {
      face: 'Flushed, dazed',
      eyes: 'Wet, unfocused',
      voice: 'Shaky, breathless',
      breathing: 'Shallow, uneven',
      posture: 'Belly-heavy, unstable',
    },

    movement: {
      walking: 'Difficult / careful',
      standing: 'Unsteady',
      sitting: 'Presses everything deeper',
      bending: 'Risky',
      overall: 'Stuffed, leaking, overwhelmed',
    },

    aftermath: {
      cleanup: 9,
      bloat: 8,
      mess: 9,
      recovery: 'Long',
      aftereffect: 'Sensitive, weak, leaking slowly',
    },
  };
}

function ctx() { return SillyTavern.getContext(); }

function state() {
  const c = ctx();
  c.chatMetadata[KEY] ||= freshState();
  return c.chatMetadata[KEY];
}

async function save() {
  const c = ctx();
  if (c.saveMetadata) await c.saveMetadata();
}

function line(k, v) { return `${k.padEnd(17, ' ')}: ${v}`; }
function meter(k, n, t = '') { return line(k, `${bar(n)} ${t}`.trim()); }

function textHud(s = state()) {
  return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
♡ BODY LOAD STATUS ♡
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Profile]
${line('Age', s.profile.age)}
${line('Height', s.profile.height)}
${line('Womb Cap', s.profile.wombCap)}
${line('Stomach Cap', s.profile.stomachCap)}
${line('Colon Cap', s.profile.colonCap)}
${line('Tunnel Length', s.profile.tunnelLength)}

[Condition Tags]
${line('Tags', s.tags)}

[Source Profile]
${line('Origin', s.source.origin)}
${line('Trait', s.source.trait)}
${line('Texture', s.source.texture)}
${meter('Potency', s.source.potency, 'Strong')}
${meter('Lingering', s.source.lingering, 'Long-lasting')}

[Womb Occupant]
${line('Type', s.occupant.type)}
${line('Shape', s.occupant.shape)}
${line('Growth', s.occupant.growth)}
${line('Position', s.occupant.position)}
${meter('Vitality', s.occupant.vitality, 'Stable')}
${meter('Space Taken', s.occupant.spaceTaken, 'Most of womb')}
${meter('Free Space', s.occupant.freeSpace, 'Very limited')}
${meter('Movement', s.occupant.movement, 'Slow shifting')}

[Occupant Coating]
${meter('Coverage', s.coating.coverage, '100% covered')}
${meter('Thickness', s.coating.thickness, 'Heavy layer')}
${meter('Submersion', s.coating.submersion, 'Almost surrounded')}
${meter('Fluid Pressure', s.coating.fluidPressure, 'Pressed from all sides')}
${line('Surface State', s.coating.state)}

[Fluid Stress]
${line('Reaction', s.fluidStress.reaction)}
${line('Reflex', s.fluidStress.reflex)}
${meter('Displacement', s.fluidStress.displacement, 'Severe')}
${meter('Backflow Force', s.fluidStress.backflowForce, 'Heavy outward surge')}
${line('Safety State', s.fluidStress.safety)}

[Outer Pussy]
${line('Look', s.outer.look)}
${meter('Swelling', s.outer.swelling, 'Very swollen')}
${meter('Openness', s.outer.openness, 'Open')}
${meter('Wetness', s.outer.wetness, 'Soaked')}
${meter('Outer Mess', s.outer.mess, 'Dripping')}
${meter('Leak Ease', s.outer.leakEase, 'Spilling easily')}

[Inner Tunnel]
${meter('Coating', s.inner.coating, 'Flooded')}
${meter('Tunnel Mess', s.inner.mess, 'Overflowing')}
${meter('Stretch', s.inner.stretch, 'Deeply stretched')}
${meter('Grip', s.inner.grip, 'Weak / trembling')}
${meter('Depth', s.inner.depth, 'Near entrance')}
${meter('Backflow', s.inner.backflow, 'Heavy return flow')}

[Inserted Status]
${line('Present', s.inserted.present)}
${meter('Length Inside', s.inserted.lengthInside, s.inserted.lengthText)}
${meter('Girth Stretch', s.inserted.girth, 'Deeply stretched')}
${line('Tip Position', s.inserted.tip)}
${line('Motion Effect', s.inserted.motion)}

[Womb Load]
${line('Semen Capacity', s.womb.capacity)}
${meter('Stored', s.womb.stored, s.womb.storedText)}
${meter('Pressure', s.womb.pressure, 'Crushing')}
${meter('Overflow', s.womb.overflow, 'Active')}
${meter('Leak Risk', s.womb.leakRisk, 'Critical')}
${meter('Control', s.womb.control, 'Almost gone')}

[Stomach Load]
${meter('Stored', s.stomach.stored, s.stomach.storedText)}
${meter('Fullness', s.stomach.fullness, 'Stuffed')}
${meter('Weight', s.stomach.weight, 'Heavy')}
${meter('Sloshing', s.stomach.sloshing, 'Noticeable')}
${meter('Down Pressure', s.stomach.downPressure, 'Pushing lower')}
${meter('Control', s.stomach.control, 'Weak')}

[Anal / Colon]
${line('Anal Look', s.colon.look)}
${meter('Openness', s.colon.openness, 'Open')}
${meter('Coating', s.colon.coating, 'Thickly coated')}
${meter('Stretch', s.colon.stretch, 'Deep')}
${meter('Seal', s.colon.seal, 'Poor')}
${meter('Colon Stored', s.colon.stored, s.colon.storedText)}
${meter('Pressure', s.colon.pressure, 'Intense')}
${meter('Leak Risk', s.colon.leakRisk, 'Very high')}
${meter('Control', s.colon.control, 'Weak')}

[Bloat Reaction]
${line('Upper Belly', s.bloat.upper)}
${line('Lower Belly', s.bloat.lower)}
${meter('Gut Bloat', s.bloat.gut, 'Triple-bloated')}
${meter('Core Pressure', s.bloat.corePressure, 'Too much')}
${meter('Limit Stress', s.bloat.stress, 'About to overflow')}
${meter('Balance', s.bloat.balance, 'Very unsteady')}

[Erotic Reaction]
${meter('Pleasure', s.reaction.pleasure, 'Overwhelming')}
${meter('Arousal', s.reaction.arousal, 'Desperate')}
${meter('Body Heat', s.reaction.heat, 'Overheated')}
${meter('Embarrassment', s.reaction.embarrassment, 'Burning')}
${meter('Composure', s.reaction.composure, 'Breaking')}
${meter('Body Betrayal', s.reaction.betrayal, 'Impossible to hide')}

[Visible Signs]
${line('Face', s.signs.face)}
${line('Eyes', s.signs.eyes)}
${line('Voice', s.signs.voice)}
${line('Breathing', s.signs.breathing)}
${line('Posture', s.signs.posture)}

[Movement Effect]
${line('Walking', s.movement.walking)}
${line('Standing', s.movement.standing)}
${line('Sitting', s.movement.sitting)}
${line('Bending', s.movement.bending)}
${line('Overall', s.movement.overall)}

[Aftermath]
${meter('Cleanup Need', s.aftermath.cleanup, 'Heavy')}
${meter('Lingering Bloat', s.aftermath.bloat, 'Still swollen')}
${meter('Lingering Mess', s.aftermath.mess, 'Very messy')}
${line('Recovery Time', s.aftermath.recovery)}
${line('Aftereffect', s.aftermath.aftereffect)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

function shiftNumbers(obj, d) {
  for (const k of Object.keys(obj)) {
    if (typeof obj[k] === 'number') obj[k] = clamp(obj[k] + d);
    else if (obj[k] && typeof obj[k] === 'object') shiftNumbers(obj[k], d);
  }
}

function updateFromText(t = '') {
  const s = state();
  const x = String(t).toLowerCase();
  const has = (...w) => w.some(v => x.includes(v));

  if (has('clean', 'wash', 'bath', 'rest', 'recover', 'time passes')) {
    shiftNumbers(s, -1);
    s.tags = 'Recovering / Still sensitive / Mess fading';
    return;
  }

  if (has('cum', 'semen', 'fill', 'inside', 'inject', 'womb')) {
    s.womb.stored = clamp(s.womb.stored + 1);
    s.womb.pressure = clamp(s.womb.pressure + 1);
    s.womb.overflow = clamp(s.womb.overflow + 1);
    s.coating.coverage = clamp(s.coating.coverage + 1);
    s.inner.coating = clamp(s.inner.coating + 1);
    s.inner.backflow = clamp(s.inner.backflow + 1);
    s.outer.mess = clamp(s.outer.mess + 1);
  }

  if (has('swallow', 'mouth', 'throat', 'stomach')) {
    s.stomach.stored = clamp(s.stomach.stored + 1);
    s.stomach.fullness = clamp(s.stomach.fullness + 1);
    s.stomach.weight = clamp(s.stomach.weight + 1);
  }

  if (has('anal', 'ass', 'colon')) {
    s.colon.stored = clamp(s.colon.stored + 1);
    s.colon.pressure = clamp(s.colon.pressure + 1);
    s.colon.seal = clamp(s.colon.seal - 1);
  }

  if (has('walk', 'stand', 'sit', 'bend', 'move')) {
    s.outer.leakEase = clamp(s.outer.leakEase + 1);
    s.bloat.balance = clamp(s.bloat.balance - 1);
  }

  s.tags = [
    s.womb.stored >= 8 ? 'Overfilled' : null,
    s.bloat.gut >= 8 ? 'Triple-bloated' : null,
    s.outer.mess >= 7 ? 'Leaking' : null,
    s.reaction.betrayal >= 8 ? 'Hard to hide' : null,
  ].filter(Boolean).join(' / ') || 'Stable';
}

function row(k, v) {
  return `<div class="blh-row"><span>${k}</span><b>${v}</b></div>`;
}
function mrow(k, n, t = '') {
  return row(k, `${bar(n)} ${t}`.trim());
}
function sec(name, rows) {
  return `<section><h4>[${name}]</h4>${rows.join('')}</section>`;
}

function htmlHud(s) {
  return [
    sec('Profile', [
      row('Age', s.profile.age),
      row('Height', s.profile.height),
      row('Womb Cap', s.profile.wombCap),
      row('Stomach Cap', s.profile.stomachCap),
      row('Colon Cap', s.profile.colonCap),
    ]),
    sec('Condition Tags', [row('Tags', s.tags)]),
    sec('Womb Occupant', [
      row('Type', s.occupant.type),
      row('Shape', s.occupant.shape),
      row('Growth', s.occupant.growth),
      mrow('Space Taken', s.occupant.spaceTaken, 'Most of womb'),
      mrow('Free Space', s.occupant.freeSpace, 'Very limited'),
      mrow('Vitality', s.occupant.vitality, 'Stable'),
    ]),
    sec('Occupant Coating', [
      mrow('Coverage', s.coating.coverage, '100% covered'),
      mrow('Thickness', s.coating.thickness, 'Heavy layer'),
      mrow('Submersion', s.coating.submersion, 'Almost surrounded'),
      mrow('Fluid Pressure', s.coating.fluidPressure, 'Pressed'),
    ]),
    sec('Outer / Inner', [
      mrow('Swelling', s.outer.swelling, 'Very swollen'),
      mrow('Openness', s.outer.openness, 'Open'),
      mrow('Outer Mess', s.outer.mess, 'Dripping'),
      mrow('Tunnel Coating', s.inner.coating, 'Flooded'),
      mrow('Backflow', s.inner.backflow, 'Heavy return flow'),
    ]),
    sec('Womb Load', [
      row('Capacity', s.womb.capacity),
      mrow('Stored', s.womb.stored, s.womb.storedText),
      mrow('Pressure', s.womb.pressure, 'Crushing'),
      mrow('Overflow', s.womb.overflow, 'Active'),
      mrow('Leak Risk', s.womb.leakRisk, 'Critical'),
    ]),
    sec('Stomach / Colon', [
      mrow('Stomach', s.stomach.stored, s.stomach.storedText),
      mrow('Fullness', s.stomach.fullness, 'Stuffed'),
      mrow('Colon', s.colon.stored, s.colon.storedText),
      mrow('Colon Pressure', s.colon.pressure, 'Intense'),
    ]),
    sec('Bloat / Reaction', [
      mrow('Gut Bloat', s.bloat.gut, 'Triple-bloated'),
      mrow('Core Pressure', s.bloat.corePressure, 'Too much'),
      mrow('Arousal', s.reaction.arousal, 'Desperate'),
      mrow('Composure', s.reaction.composure, 'Breaking'),
    ]),
    sec('Movement', [
      row('Walking', s.movement.walking),
      row('Sitting', s.movement.sitting),
      row('Overall', s.movement.overall),
    ]),
  ].join('');
}

function render() {
  const s = state();
  let root = document.getElementById('body-load-hud-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'body-load-hud-root';
    document.body.appendChild(root);
  }

  if (!s.visible) {
    root.innerHTML = `<button class="blh-open">HUD</button>`;
    root.querySelector('button').onclick = async () => { state().visible = true; await save(); render(); };
    return;
  }

  root.innerHTML = `
    <div class="blh-panel ${s.collapsed ? 'collapsed' : ''}">
      <div class="blh-head">
        <span>♡ BODY LOAD STATUS ♡</span>
        <div>
          <button id="blh-copy">Copy</button>
          <button id="blh-minus">-</button>
          <button id="blh-plus">+</button>
          <button id="blh-fold">${s.collapsed ? 'Show' : 'Hide'}</button>
          <button id="blh-x">×</button>
        </div>
      </div>
      <div class="blh-body">${htmlHud(s)}</div>
    </div>`;

  document.getElementById('blh-copy').onclick = () => navigator.clipboard.writeText(textHud(state()));
  document.getElementById('blh-minus').onclick = async () => { shiftNumbers(state(), -1); await save(); render(); };
  document.getElementById('blh-plus').onclick = async () => { shiftNumbers(state(), 1); await save(); render(); };
  document.getElementById('blh-fold').onclick = async () => { state().collapsed = !state().collapsed; await save(); render(); };
  document.getElementById('blh-x').onclick = async () => { state().visible = false; await save(); render(); };
}

async function onTurn(data) {
  updateFromText(data?.message || data?.mes || '');
  await save();
  render();
}

globalThis.bodyLoadHudInterceptor = async function(chat, contextSize, abort, type) {
  const s = state();
  if (!s.inject) return;
  chat.splice(Math.max(chat.length - 1, 0), 0, {
    is_user: false,
    name: 'Body Load HUD',
    send_date: Date.now(),
    mes: `[Hidden continuity state. Use this to maintain body-state continuity. Do not explain this note.]\n\n${textHud(s)}`
  });
};

function init() {
  const { eventSource, event_types } = ctx();
  eventSource.on(event_types.APP_READY, render);
  eventSource.on(event_types.CHAT_CHANGED, render);
  eventSource.on(event_types.MESSAGE_SENT, onTurn);
  eventSource.on(event_types.MESSAGE_RECEIVED, onTurn);
  eventSource.on(event_types.MESSAGE_EDITED, onTurn);
  render();
}

init();
