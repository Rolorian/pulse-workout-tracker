// Pulse — original chiptune soundtrack for the Realm, written for Pulse and rendered on the device with the vendored ZzFXM
// (MIT) + ZzFX (MIT). No audio files, no downloads: each track is a few hundred bytes of notes turned into sound when needed.
(function () {
  // instruments: ZzFX parameter lists, all pitched so that note 12 = A3 (220 Hz)
  const INS = [
    [0.42, 0, 220, 0.01, 0.1, 0.22, 1, 1.6, , , , , , , , , , 0.62, 0.06],  // 0 lead — soft square-ish triangle
    [0.62, 0, 220, 0.01, 0.12, 0.1, 1, 0.5, , , , , , , , , , 0.8, 0.03],   // 1 bass — round triangle
    [0.2, 0, 220, 0.02, 0.18, 0.32, 0, , , , , , , , , , 0.12, 0.45, 0.1],   // 2 arp/pad — sine with a touch of echo
    [0.75, 0, 80, , 0.02, 0.14, , 1.6, -3.5, , , , , , , , , 0.5],          // 3 kick
    [0.3, 0, 900, , 0.012, 0.07, 4, , , , , , , , , , , 0.35],              // 4 hat / snare noise
    [0.4, 0, 220, 0.005, 0.05, 0.3, 2, 0.9, , , , , , , 0.3, , 0.08, 0.5, 0.08] // 5 bright brass for fanfares/boss
  ];
  const NOTE = { C: -9, 'C#': -8, Db: -8, D: -7, 'D#': -6, Eb: -6, E: -5, F: -4, 'F#': -3, Gb: -3, G: -2, 'G#': -1, Ab: -1, A: 0, 'A#': 1, Bb: 1, B: 2 };
  // "E4" → ZzFXM note number (A3 = 12). "." holds / silence, "-" cuts the note.
  function n(t) { if (!t || t === '.') return 0; if (t === '-') return -1; const m = /^([A-G][#b]?)(\d)$/.exec(t); if (!m) return 0; return 12 + NOTE[m[1]] + (Number(m[2]) - 3) * 12; }
  const row = (s) => s.trim().split(/\s+/).map(n);
  const ch = (ins, pan, notes) => [ins, pan, ...notes];
  // a bar = 16 steps. chord: [root, third, fifth] note names (octave included)
  const bass = (root, style) => { const r = n(root); return style === 'drive' ? Array.from({ length: 16 }, (_, i) => (i % 2 ? 0 : i % 4 === 2 ? r + 12 : r)) : style === 'walk' ? [r, 0, 0, 0, r + 7, 0, 0, 0, r + 12, 0, 0, 0, r + 7, 0, r + 5, 0] : [r, 0, 0, 0, 0, 0, 0, 0, r + 7, 0, 0, 0, 0, 0, 0, 0]; };
  const arp = (ch3, every = 2) => { const t = ch3.map(n); const up = [t[0], t[1], t[2], t[1] + 12 > t[2] ? t[0] + 12 : t[1]]; return Array.from({ length: 16 }, (_, i) => (i % every ? 0 : up[(i / every) % 4])); };
  const drums = (kind) => {
    const k = n('A3'), h = n('A3');
    if (kind === 'none') return null;
    const kick = kind === 'drive' ? [k, 0, 0, 0, k, 0, 0, 0, k, 0, 0, 0, k, 0, k, 0] : [k, 0, 0, 0, 0, 0, 0, 0, k, 0, 0, 0, 0, 0, 0, 0];
    const hat = kind === 'drive' ? Array.from({ length: 16 }, (_, i) => (i % 4 === 2 ? h + 7 : i % 2 ? h + 19 : 0)) : Array.from({ length: 16 }, (_, i) => (i % 4 === 2 ? h + 19 : 0));
    return [kick, hat];
  };
  // build a song from bars: each bar { chord, mel, bass, drums }
  function song(bars, bpm, opts = {}) {
    const patterns = bars.map((b) => {
      const p = [ch(0, 0.12, b.mel ? row(b.mel) : new Array(16).fill(0)), ch(1, 0, bass(b.chord[0], b.bass)), ch(2, -0.25, arp(b.chord.map((x) => x.replace(/\d/, (d) => String(Number(d) + 1))), b.arpEvery || 2))];
      const d = drums(b.drums || 'none'); if (d) { p.push(ch(3, 0, d[0])); p.push(ch(4, 0.3, d[1])); }
      if (b.brass) p.push(ch(5, -0.1, row(b.brass)));
      return p;
    });
    // ZzFXM needs every pattern to have the same channel count
    const maxC = Math.max(...patterns.map((p) => p.length));
    patterns.forEach((p) => { while (p.length < maxC) p.push(ch(2, 0, new Array(16).fill(0))); });
    return { ins: opts.ins || INS, patterns, seq: patterns.map((_, i) => i), bpm, loop: opts.loop !== false };
  }
  const C = (a, b, c) => [a, b, c];
  const SONGS = {
    // Pulsehaven — warm and calm, C major
    village: () => song([
      { chord: C('C3', 'E3', 'G3'), mel: 'E4 . . . G4 . . . C5 . . . B4 . A4 .', drums: 'soft' },
      { chord: C('A2', 'C3', 'E3'), mel: 'A4 . . . . . G4 . E4 . . . . . . .', drums: 'soft' },
      { chord: C('F2', 'A2', 'C3'), mel: 'F4 . A4 . C5 . . . D5 . C5 . A4 . . .', drums: 'soft' },
      { chord: C('G2', 'B2', 'D3'), mel: 'G4 . . . . . . . D4 . E4 . F4 . . .', drums: 'soft' },
      { chord: C('C3', 'E3', 'G3'), mel: 'E4 . . . G4 . . . C5 . . . E5 . D5 .', drums: 'soft' },
      { chord: C('E2', 'G#2', 'B2'), mel: 'B4 . . . . . G#4 . E4 . . . . . . .', drums: 'soft' },
      { chord: C('F2', 'A2', 'C3'), mel: 'A4 . . . C5 . . . F5 . E5 . D5 . . .', drums: 'soft' },
      { chord: C('G2', 'B2', 'D3'), mel: 'C5 . . . . . . . . . . . - . . .', drums: 'soft' }
    ], 92),
    // the wilds — adventurous, D dorian, walking bass
    wilds: () => song([
      { chord: C('D3', 'F3', 'A3'), mel: 'D4 . F4 . A4 . . . C5 . A4 . G4 . F4 .', bass: 'walk', drums: 'soft' },
      { chord: C('C3', 'E3', 'G3'), mel: 'E4 . . . G4 . . . E4 . D4 . C4 . . .', bass: 'walk', drums: 'soft' },
      { chord: C('D3', 'F3', 'A3'), mel: 'A4 . B4 . C5 . D5 . . . C5 . A4 . . .', bass: 'walk', drums: 'soft' },
      { chord: C('G2', 'B2', 'D3'), mel: 'B4 . . . A4 . G4 . A4 . . . . . . .', bass: 'walk', drums: 'soft' },
      { chord: C('D3', 'F3', 'A3'), mel: 'D5 . . . A4 . . . F4 . G4 . A4 . . .', bass: 'walk', drums: 'soft' },
      { chord: C('Bb2', 'D3', 'F3'), mel: 'F4 . . . D4 . F4 . Bb4 . . . A4 . G4 .', bass: 'walk', drums: 'soft' },
      { chord: C('C3', 'E3', 'G3'), mel: 'G4 . . . E4 . . . C5 . . . B4 . . .', bass: 'walk', drums: 'soft' },
      { chord: C('A2', 'C#3', 'E3'), mel: 'A4 . . . . . . . C#5 . . . E5 . . .', bass: 'walk', drums: 'soft' }
    ], 108),
    // dungeons — sparse, low and echoing, A minor, no drums
    dungeon: () => song([
      { chord: C('A2', 'C3', 'E3'), mel: 'E4 . . . . . . . . . . . . . . .', arpEvery: 4 },
      { chord: C('F2', 'A2', 'C3'), mel: '. . . . F4 . . . E4 . . . . . . .', arpEvery: 4 },
      { chord: C('D2', 'F2', 'A2'), mel: 'D4 . . . . . . . . . . . A3 . . .', arpEvery: 4 },
      { chord: C('E2', 'G#2', 'B2'), mel: 'B3 . . . . . . . G#3 . . . . . . .', arpEvery: 4 },
      { chord: C('A2', 'C3', 'E3'), mel: '. . . . C5 . . . B4 . . . A4 . . .', arpEvery: 4 },
      { chord: C('Bb2', 'D3', 'F3'), mel: 'Bb4 . . . . . . . . . . . . . . .', arpEvery: 4 },
      { chord: C('E2', 'G#2', 'B2'), mel: '. . . . G#4 . . . . . . . E4 . . .', arpEvery: 4 },
      { chord: C('A2', 'C3', 'E3'), mel: 'A3 . . . . . . . . . . . - . . .', arpEvery: 4 }
    ], 70),
    // battles — driving eighths, E minor
    battle: () => song([
      { chord: C('E2', 'G2', 'B2'), mel: 'E5 . E5 . G5 . E5 . D5 . B4 . D5 . E5 .', bass: 'drive', drums: 'drive' },
      { chord: C('C2', 'E2', 'G2'), mel: 'C5 . . . G4 . C5 . E5 . D5 . C5 . B4 .', bass: 'drive', drums: 'drive' },
      { chord: C('D2', 'F#2', 'A2'), mel: 'D5 . D5 . F#5 . D5 . A4 . F#4 . A4 . D5 .', bass: 'drive', drums: 'drive' },
      { chord: C('B1', 'D#2', 'F#2'), mel: 'B4 . . . D#5 . . . F#5 . . . B5 . . .', bass: 'drive', drums: 'drive' },
      { chord: C('E2', 'G2', 'B2'), mel: 'G5 . F#5 . E5 . B4 . E5 . F#5 . G5 . A5 .', bass: 'drive', drums: 'drive' },
      { chord: C('A1', 'C2', 'E2'), mel: 'A5 . . . G5 . E5 . C5 . . . E5 . . .', bass: 'drive', drums: 'drive' },
      { chord: C('C2', 'E2', 'G2'), mel: 'G5 . . . E5 . C5 . G4 . C5 . E5 . G5 .', bass: 'drive', drums: 'drive' },
      { chord: C('B1', 'D#2', 'F#2'), mel: 'F#5 . . . . . . . D#5 . . . B4 . . .', bass: 'drive', drums: 'drive' }
    ], 138),
    // bosses — heavy, D minor with a chromatic climb
    boss: () => song([
      { chord: C('D2', 'F2', 'A2'), mel: 'D5 . . D5 . . F5 . . E5 . . D5 . C#5 .', bass: 'drive', drums: 'drive', brass: 'D4 . . . . . . . D4 . . . . . . .' },
      { chord: C('Bb1', 'D2', 'F2'), mel: 'Bb4 . . Bb4 . . D5 . . C5 . . Bb4 . A4 .', bass: 'drive', drums: 'drive', brass: 'Bb3 . . . . . . . Bb3 . . . . . . .' },
      { chord: C('G1', 'Bb1', 'D2'), mel: 'G4 . . G4 . . Bb4 . . A4 . . G4 . F4 .', bass: 'drive', drums: 'drive', brass: 'G3 . . . . . . . G3 . . . . . . .' },
      { chord: C('A1', 'C#2', 'E2'), mel: 'A4 . . . C#5 . . . E5 . . . A5 . . .', bass: 'drive', drums: 'drive', brass: 'A3 . . . . . . . A3 . . . C#4 . E4 .' },
      { chord: C('D2', 'F2', 'A2'), mel: 'F5 . E5 . D5 . A4 . D5 . E5 . F5 . G5 .', bass: 'drive', drums: 'drive', brass: 'D4 . . . F4 . . . A4 . . . D5 . . .' },
      { chord: C('Eb2', 'G2', 'Bb2'), mel: 'G5 . . . Eb5 . . . Bb4 . . . G4 . . .', bass: 'drive', drums: 'drive', brass: 'Eb4 . . . . . . . Eb4 . . . . . . .' },
      { chord: C('E2', 'G#2', 'B2'), mel: 'G#5 . . . E5 . . . B4 . . . G#4 . . .', bass: 'drive', drums: 'drive', brass: 'E4 . . . . . . . E4 . . . . . . .' },
      { chord: C('A1', 'C#2', 'E2'), mel: 'A5 . . . . . . . E5 . . . C#5 . . .', bass: 'drive', drums: 'drive', brass: 'A3 . . . C#4 . . . E4 . . . A4 . . .' }
    ], 148),
    // victory — a short fanfare that plays once
    victory: () => song([
      { chord: C('C3', 'E3', 'G3'), mel: 'C5 . C5 . C5 . . . G4 . . . C5 . E5 .', drums: 'soft', brass: 'C4 . C4 . C4 . . . G3 . . . C4 . E4 .' },
      { chord: C('F2', 'A2', 'C3'), mel: 'F5 . . . E5 . . . D5 . . . E5 . . .', drums: 'soft', brass: 'F4 . . . E4 . . . D4 . . . E4 . . .' },
      { chord: C('G2', 'B2', 'D3'), mel: 'G5 . . . . . . . . . . . . . . .', drums: 'soft', brass: 'G4 . . . . . . . . . . . . . . .' },
      { chord: C('C3', 'E3', 'G3'), mel: 'C6 . . . . . . . . . . . - . . .', brass: 'C5 . . . . . . . . . . . - . . .' }
    ], 120, { loop: false })
  };
  // which track each Realm music slot uses (regions share "wilds", bosses share "boss", etc.)
  const SLOT = { village: 'village', wilds: 'wilds', dungeon: 'dungeon', battle: 'battle', elite: 'battle', boss: 'boss', worldboss: 'boss', victory: 'victory', default: 'wilds' };
  const cache = {};
  // Render a track to an AudioBuffer in the given AudioContext (cached). Rendering takes a moment, so it runs once per track.
  function chipBuffer(slot, ctx) {
    const key = /^r\d+$/.test(slot) ? 'wilds' : SLOT[slot] || null;
    if (!key || !window.zzfxM || !window.ZZFX || !ctx) return Promise.resolve(null);
    if (cache[key]) return cache[key];
    cache[key] = new Promise((res) => setTimeout(() => {
      try {
        const prev = ZZFX.sampleRate; ZZFX.sampleRate = 44100;
        const s = SONGS[key](); const [L, R] = zzfxM(s.ins, s.patterns, s.seq, s.bpm);
        ZZFX.sampleRate = prev;
        let peak = 0.0001; for (let i = 0; i < L.length; i++) { const a = Math.abs(L[i] || 0), b = Math.abs(R[i] || 0); if (a > peak) peak = a; if (b > peak) peak = b; }
        const g = Math.min(1.6, 0.85 / peak);
        const buf = ctx.createBuffer(2, L.length, 44100); const l = buf.getChannelData(0), r = buf.getChannelData(1);
        for (let i = 0; i < L.length; i++) { l[i] = (L[i] || 0) * g; r[i] = (R[i] || 0) * g; }
        res(buf);
      } catch (e) { console.warn('chiptune', key, e); res(null); }
    }, 0));
    return cache[key];
  }
  window.PulseChip = { chipBuffer, tracks: Object.keys(SONGS) };
})();
