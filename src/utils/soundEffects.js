// Web Audio API Sound Generator for RADNUZ Showroom
// Lightweight, zero external files, crisp audio feedback

let audioCtx = null;
let isSoundEnabled = true;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const setSoundEnabled = (enabled) => {
  isSoundEnabled = enabled;
};

export const getSoundEnabled = () => isSoundEnabled;

/**
 * Metallic hanger slide sound (sliding along chrome clothing pipe)
 */
export const playHangerSlideSound = () => {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.09);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, ctx.currentTime);
    filter.Q.setValueAtTime(4, ctx.currentTime);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // Audio context may be blocked by autoplay policies
  }
};

/**
 * Metallic hanger hook clink / lift sound
 */
export const playHangerClinkSound = () => {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Harmonic ring of metallic hanger hook
    const now = ctx.currentTime;
    [2400, 3100].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.9, now + 0.08);

      gain.gain.setValueAtTime(0.045 / (idx + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(now + 0.08);
    });
  } catch (e) {
    // Ignore autoplay restriction
  }
};

/**
 * Fabric / tag flip sound
 */
export const playTagFlipSound = () => {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.05);

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(now + 0.06);
  } catch (e) {
    // Ignore
  }
};

/**
 * Studio light switch relay clack sound
 */
export const playLightSwitchSound = () => {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Relay click (sharp click + deep contact thump)
    const oscClick = ctx.createOscillator();
    const gainClick = ctx.createGain();
    oscClick.type = 'square';
    oscClick.frequency.setValueAtTime(1600, now);
    oscClick.frequency.exponentialRampToValueAtTime(300, now + 0.025);
    gainClick.gain.setValueAtTime(0.06, now);
    gainClick.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
    oscClick.connect(gainClick);
    gainClick.connect(ctx.destination);
    oscClick.start(now);
    oscClick.stop(now + 0.025);

    // Deep housing resonance
    const oscThump = ctx.createOscillator();
    const gainThump = ctx.createGain();
    oscThump.type = 'sine';
    oscThump.frequency.setValueAtTime(140, now);
    oscThump.frequency.exponentialRampToValueAtTime(45, now + 0.08);
    gainThump.gain.setValueAtTime(0.05, now);
    gainThump.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    oscThump.connect(gainThump);
    gainThump.connect(ctx.destination);
    oscThump.start(now);
    oscThump.stop(now + 0.08);
  } catch (e) {
    // Ignore
  }
};
