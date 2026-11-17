/* Pulse — hand-drawn pet sprites (16×16, dark outline, three-tone shading, in the style of old RuneScape pets).
   Original artwork written as pixel grids; each row is the left half and is mirrored. No images, no library. */
(function () {
  const G = (window.G = window.G || {});
  const OUT = '#1b1410';
  const SPR = {
    pushpup: { pal: { a: '#b9793f', b: '#8a5527', c: '#dca569', w: '#f3e6cf', n: '#2a1a10' }, rows: ['........', '........', '....oooo', '..oooaaa', '.obboaaa', '.obboaea', '.obboaaa', '..oooawn', '....oaww', '...ooaaa', '..oaaaca', '..oaaaca', '..oabaaa', '..oaboaa', '..oooooo', '........'] },
    squatgolem: { pal: { a: '#8f9499', b: '#63686e', c: '#b9bec2', d: '#5f8a3a', y: '#ffd23f' }, rows: ['........', '....oooo', '...occcc', '...oaaaa', '...oayaa', '...oaaaa', '.ooooabb', '.oaaoaaa', '.oaboaad', '.oaboaaa', '.oaboaaa', '.ooooaba', '....oabo', '....oabo', '....oooo', '........'] },
    burpeeimp: { pal: { a: '#b03a48', b: '#7a2230', c: '#d9606a', w: '#e9dcc0', y: '#ffd23f' }, rows: ['........', '.ow.....', '.owo.ooo', '..owoaaa', '...oacaa', '...oayaa', '...oaaaa', 'o..oaawa', 'oo.ooaaa', 'obooaaaa', 'obbbaaca', '.ooobaaa', '...obaaa', '...oaboa', '...ooooo', '........'] },
    planktortoise: { pal: { a: '#4f7d3a', b: '#35592a', c: '#79a85a', d: '#c9b26b' }, rows: ['........', '......oo', '.....odd', '.....ode', '....oodd', '..ooacca', '.oaaccaa', 'oddoaaab', 'oddoabaa', '.ooaaaab', '.oabaaba', '..oabbbb', '.oddoooo', '.oddo...', '..oo....', '........'] },
    crunchcrab: { pal: { a: '#d2552f', b: '#9c3418', c: '#f08a5a', w: '#ffffff' }, rows: ['........', '........', '.oo.....', 'oaco....', 'oaao..o.', '.oao.owo', '..oo.oeo', '..oooooo', '.oaccaaa', 'oaacaaaa', 'oaaaaaab', '.obaabbb', 'o.oooooo', 'ao.oa.oa', 'o..o..o.', '........'] },
    hopbunny: { pal: { a: '#e8e2d6', b: '#b9b09f', c: '#ffffff', p: '#e89aa8', w: '#ffffff' }, rows: ['....oo..', '...oaco.', '...oapo.', '...oapo.', '...oapo.', '...oaaoo', '..oaaaaa', '..oaeaaa', '..oaaaap', '..obaaww', '...ooaaa', '..oaaaca', '..oaaaca', '..obaaaa', '..oooooo', '........'] },
    llama: { pal: { a: '#e6d7b5', b: '#b7a57e', c: '#fff4d8', w: '#f7efe0', n: '#5a4630' }, rows: ['..oo....', '..oao...', '..oaoooo', '..oaaaaa', '...oaaea', '...oaaaa', '...oaawn', '...obaww', '....oaaa', '....oaca', '..oooaca', '.oaaaaca', '.oabaaaa', '.oaboaab', '.oooo.oo', '........'] },
    chimp: { pal: { a: '#5b3d28', b: '#3d2717', c: '#7d5a3e', d: '#d6a777', n: '#2a1a10' }, rows: ['........', '....oooo', '...oaaaa', '.oooadda', '.odoaded', '.oooaddd', '...oaddn', '...oobdd', '..ooaooo', '.oaaaaca', 'oaaoaaca', 'oaooaaaa', 'oao.obaa', 'ooo.oabo', '....oooo', '........'] },
    gecko: { pal: { a: '#57b36b', b: '#357f48', c: '#8fe09a' }, rows: ['........', '.....ooo', '....oaac', '...oeaaa', '....oaaa', 'oo...oaa', 'oaoooaca', '.oaaaaca', '..ooaaca', '...oaaaa', '.oooaaba', 'oaaooaaa', 'oo...oba', '......oa', '......ob', '.......o'] },
    cheetah: { pal: { a: '#e0a93f', b: '#a8762a', c: '#f6d27a', w: '#fff3d6', n: '#3a2610' }, rows: ['........', '..oo....', '.oaaoooo', '.oacaaaa', '.oaaaeaa', '..oanaaa', '..oaaawn', '...oaaww', '...ooaaa', '..oanaca', '..oaaaca', '..oanaan', '..oabaaa', '..oaboaa', '..oooooo', '........'] },
    bear: { pal: { a: '#7a4b2a', b: '#55331b', c: '#a06d43', d: '#d9b98a', n: '#2a1a10' }, rows: ['........', '..oo....', '.oaaoooo', '.oabaaaa', '..oaaaaa', '..oaaeaa', '..oaaadd', '..oaadnn', '...oaadd', '..ooaaaa', '.oaaaaca', '.oaaaaca', '.oabaaaa', '.oaaboaa', '.ooooooo', '........'] },
    owl: { pal: { a: '#8a6a4a', b: '#5e4630', c: '#b89872', d: '#e6d3ad', w: '#fff8e6', y: '#f2a93b' }, rows: ['........', '..o.....', '..oo.ooo', '..oaoaaa', '..oawwwa', '..oawewa', '..oawwwy', '.ooaaaay', '.oabaddd', '.oabdddd', '.oabdbdd', '.oabdddd', '..oabddd', '...ooooo', '....oy.o', '........'] },
    phoenixling: { pal: { a: '#f08a2a', b: '#c2521a', c: '#ffd23f', y: '#ffe9a0' }, rows: ['.......o', '......oc', '.....oca', '....oooo', '...oaaaa', '..oacaaa', '..oaaeaa', '..oaaaay', '.oooaayy', 'obaoaaaa', 'obaoacca', '.ooaacca', '...oaaaa', '....oooo', '.....y..', '....yy..'] }
  };
  const GOLD = { a: '#e8b923', b: '#b07e12', c: '#fff0a0', d: '#ffe066', p: '#ffe066' };
  const cache = {};
  function sprite(id, golden) {
    const key = id + (golden ? '*' : ''); if (cache[key]) return cache[key];
    const s = SPR[id]; if (!s) return null;
    const c = document.createElement('canvas'); c.width = 16; c.height = 16; const x = c.getContext('2d');
    const pal = Object.assign({ o: OUT, e: OUT }, s.pal, golden ? GOLD : null);
    s.rows.forEach((half, y) => { const h = (half + '........').slice(0, 8); const row = h + h.split('').reverse().join('');
      for (let i = 0; i < 16; i++) { const col = pal[row[i]]; if (col) { x.fillStyle = col; x.fillRect(i, y, 1, 1); } } });
    return (cache[key] = c);
  }
  const urls = {};
  function url(id, golden) { const key = id + (golden ? '*' : ''); if (!urls[key]) { const c = sprite(id, golden); urls[key] = c ? c.toDataURL() : ''; } return urls[key]; }
  // an <img> for menus: crisp pixels at any size
  function img(id, golden, size) { const u = url(id, golden); return u ? `<img src="${u}" alt="" width="${size || 48}" height="${size || 48}" style="image-rendering:pixelated;image-rendering:crisp-edges;vertical-align:middle">` : ''; }
  G.petSprite = sprite; G.petImg = img; G.petSpriteIds = () => Object.keys(SPR);
})();
