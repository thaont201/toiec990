// Kiểm thử engine câu hỏi: chuẩn hóa, chế độ thi thật, đoạn văn, thi thử đầy đủ, lịch ôn, phân tích.
// Chạy: REPO=/home/claude/toiec990 node test_engine.js
const fs = require('fs');
const vm = require('vm');
const assert = require('assert');
const REPO = process.env.REPO || '/home/claude/toiec990';

const els = {};
const mk = id => ({id, style: {}, hidden: false, value: '', innerHTML: '', textContent: '', setAttribute(){}, getAttribute(){ return null; }, querySelectorAll(){ return []; }});
const getEl = id => els[id] || (els[id] = mk(id));
const storage = {};
const alertsSeen = [];
const audioPlayed = [];
const spoken = [];
const sandbox = {
  console, Math, Date, JSON, Set, Map, Object, Array, String, Number, RegExp, Promise,
  setTimeout, clearTimeout, setInterval, clearInterval,
  document: {getElementById: getEl, querySelectorAll: () => [0,1,2,3].map(() => ({classList:{add(){},remove(){}}, textContent:'', disabled:false})), createElement: () => mk('tmp'), addEventListener(){}, body: mk('body'),
             documentElement: mk('html'), createTreeWalker: () => ({nextNode: () => false})},
  localStorage: {getItem: k => (k in storage ? storage[k] : null), setItem: (k, v) => { storage[k] = String(v); }, removeItem: k => { delete storage[k]; }},
  MutationObserver: class { observe(){} disconnect(){} takeRecords(){ return []; } },
  NodeFilter: {SHOW_TEXT: 4},
  alert: m => alertsSeen.push(m),
  confirm: () => true,
  speechSynthesis: {cancel(){}, speak(u){ spoken.push(u.text); }, getVoices: () => []},
  SpeechSynthesisUtterance: class { constructor(t){ this.text = t; } },
  URL: {createObjectURL(){}}, Blob: class {}, FileReader: class {},
  fetch: () => Promise.reject(new Error('offline')),
};
sandbox.Audio = class { constructor(p){ this.p = p; audioPlayed.push(p); } play(){ return Promise.resolve(); } };
sandbox.window = sandbox;
sandbox.window.scrollTo = () => {};
sandbox.window.addEventListener = () => {};
const ctx = vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(REPO + '/vocab.js', 'utf8'), ctx);
const html = fs.readFileSync(REPO + '/index.html', 'utf8');
vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1], ctx);
vm.runInContext('DEFAULT.settings.scroll = false', ctx);   // các test cũ kiểm tra chế độ từng câu
const run = c => vm.runInContext(c, ctx);

let passed = 0;
const check = (name, fn) => {
  try { fn(); passed++; console.log('ok   ' + name); }
  catch (e) { console.log('FAIL ' + name + '\n     ' + e.message); process.exitCode = 1; }
};
const app = () => getEl('app').innerHTML;


const good = () => ({version: 1, name: 'Lô thử', words: [
  {w: 'invoice', ex: [{t: 'Please attach the invoice to your expense report.', src: 'Tự soạn - A'}, {t: 'The invoice was paid within thirty days.', src: 'Tự soạn - A'}],
   col: [{t: 'issue an invoice', m: 'xuất hóa đơn', src: 'Tự soạn - A'}], conf: [{w: 'receipt', note: 'receipt là biên lai sau khi trả tiền', src: 'Tự soạn - A'}], audio: 'audio/words/invoice.mp3'}],
  qs: [{part: 5, q: 'The manager asked staff to ___ reports.', o: ['submit', 'submits', 'submitted', 'submitting'], a: 0, e: 'to + V', src: 'Tự soạn - A', verified: true, qtype: 'ngữ pháp', setId: 'g1'},
       {part: 2, q: '', o: ['At noon.', 'Yes, it is.', 'By taxi.'], a: 0, e: 'When -> thời gian', src: 'Tự soạn - A', ts: 'When does the store open?', audioFile: 'audio/q/p2-01.mp3'}]});
const V = o => run('validatePack(' + JSON.stringify(o) + ')');

check('gói hợp lệ được nhận, từ khóa viết thường', () => {
  const r = V(good());
  assert.strictEqual(r.errors.length, 0, r.errors.join('; '));
  assert.ok(r.pack.words.invoice && r.pack.words.invoice.ex.length === 2);
  assert.strictEqual(r.pack.qs.length, 2);
  assert.strictEqual(r.pack.qs[0].ver, true);
  assert.strictEqual(r.pack.qs[0].setId, 'K-g1');
});
check('thiếu nguồn bị từ chối (ví dụ, cụm từ, dễ nhầm, câu hỏi)', () => {
  const g = good(); delete g.words[0].ex[0].src; delete g.words[0].col[0].src; delete g.words[0].conf[0].src; delete g.qs[0].src;
  const r = V(g);
  assert.strictEqual(r.errors.length, 4, r.errors.join('; '));
  assert.strictEqual(r.pack.words.invoice.ex.length, 1);
  assert.strictEqual(r.pack.qs.length, 1);
});
check('câu ví dụ không chứa từ bị từ chối, biến thể từ vẫn được', () => {
  const g = good(); g.words[0].ex[0].t = 'This sentence has nothing relevant at all.';
  assert.ok(V(g).errors.some(e => e.includes('không chứa từ')));
  const h = good(); h.words = [{w: 'accommodate', ex: [{t: 'The hotel offers accommodation for groups.', src: 's'}]}];
  assert.strictEqual(V(h).errors.length, 0);
});
check('đường dẫn audio, ảnh sai bị từ chối (không cho ../ hoặc URL ngoài)', () => {
  const a = good(); a.words[0].audio = '../x.mp3';
  assert.ok(V(a).errors.some(e => e.includes('audio')));
  const b = good(); b.qs[1].audioFile = 'https://evil.example/a.mp3';
  assert.ok(V(b).errors.some(e => e.includes('audioFile')));
  const c = good(); c.qs[0].image = '../secret.png';
  assert.ok(V(c).errors.some(e => e.includes('image')));
});
check('quy tắc theo Part: nghe cần lời thoại, Part 6-7 cần đoạn văn, đáp án đúng trong phạm vi', () => {
  const g = good(); delete g.qs[1].ts; delete g.qs[1].audioFile;
  assert.ok(V(g).errors.some(e => e.includes('Part 1–4')));
  const h = good(); h.qs[0] = {...h.qs[0], part: 7};
  assert.ok(V(h).errors.some(e => e.includes('Part 6–7')));
  const k = good(); k.qs[0].a = 9;
  assert.ok(V(k).errors.some(e => e.includes('"a"')));
});
check('file mẫu bị từ chối cho đến khi bỏ _template', () => {
  const r = V({...good(), _template: true});
  assert.ok(r.errors.some(e => e.includes('mẫu')));
  assert.strictEqual(Object.keys(r.pack.words).length, 0);
});
check('gói không phải đối tượng hoặc sai version bị báo lỗi', () => {
  assert.ok(V([]).errors.length === 1);
  assert.ok(V({...good(), version: 2}).errors.some(e => e.includes('version')));
});

check('nhập gói: từ được làm giàu, tiến độ giữ nguyên, lưu và đọc lại được', () => {
  run('S = clone(DEFAULT); buildVocab();');
  const before = run('VOCAB.length');
  run(`S.vocab.invoice = {box:3, due:0, seen:2, wrong:0};`);
  const res = V(good());
  run(`S.pack = ${JSON.stringify(res.pack)}; save(); buildVocab();`);
  assert.strictEqual(run('VOCAB.length'), before);
  const v = run(`VOCAB.find(v => v.w === 'invoice')`);
  assert.strictEqual(v.exs.length, 2);
  assert.strictEqual(v.audio, 'audio/words/invoice.mp3');
  assert.strictEqual(run('S.vocab.invoice.box'), 3);
  run('S = load(); buildVocab();');
  assert.ok(run(`S.pack && S.pack.words.invoice && S.pack.qs.length`) === 2, 'gói không đọc lại được sau khi lưu');
  assert.strictEqual(run(`S.pack.qs[0].setId`), 'K-g1');
  assert.ok(run(`VOCAB.find(v => v.w === 'invoice').exs.length`) === 2);
});
check('dữ liệu gói hỏng trong localStorage bị làm sạch, không làm app lỗi', () => {
  const s = run(`sanitize({pack: {words: {invoice: {ex: [{t: 'x', src: ''}], audio: '//evil'}}, qs: [{partNo: 9}, 5, null]}})`);
  assert.strictEqual(s.pack, null);
});
check('thẻ từ hiển thị ví dụ có nguồn, cụm từ, từ dễ nhầm và nút giọng thật', () => {
  run('vmode = "group"; vgroup = GROUPS.findIndex(g => g.words.some(v => v.w === "invoice")); S.settings.lock = false;');
  const h = run(`wordExtraHTML(VOCAB.find(v => v.w === 'invoice'))`);
  assert.ok(h.includes('Tự soạn - A') && h.includes('issue an invoice') && h.includes('receipt') && h.includes('Giọng thật'));
  const plain = run(`wordExtraHTML({w: 'zzz', m: 'x'})`);
  assert.ok(plain.includes('Chưa có câu ví dụ'));
  assert.ok(!plain.includes('Giọng thật'));
});
check('giọng thật phát file; đường dẫn xấu thì dùng giọng máy', () => {
  audioPlayed.length = 0;
  run(`playFile('audio/words/invoice.mp3', () => { globalThis.fell = false; })`);
  assert.deepStrictEqual(audioPlayed, ['audio/words/invoice.mp3']);
  run(`var fellBack = false; playFile('../x.mp3', () => { fellBack = true; })`);
  assert.strictEqual(run('fellBack'), true);
  assert.strictEqual(audioPlayed.length, 1);
});
check('câu hỏi trong gói vào đúng Part, có nguồn hiển thị sau khi trả lời', () => {
  const p5 = run(`poolFor(5).filter(q => q.src)`);
  assert.strictEqual(p5.length, 1);
  assert.strictEqual(p5[0].ver, true);
  run(`startQuiz('t', poolFor(5).filter(q => q.src), 'quiz', 'grammar', false, 0, null, {}); pick(Q.qs[0].a);`);
  assert.ok(getEl('exp').innerHTML.includes('Nguồn: Tự soạn - A'));
  assert.ok(!getEl('exp').innerHTML.includes('chưa duyệt'));
  const p2 = run(`poolFor(2).filter(q => q.src)`);
  assert.strictEqual(p2.length, 1);
  assert.strictEqual(p2[0].audioFile, 'audio/q/p2-01.mp3');
  assert.strictEqual(p2[0].ver, false);
});
check('bài nghe có file thật phát file trước, dự phòng giọng máy', () => {
  run(`startQuiz('n', poolFor(2).filter(q => q.src), 'lq', 'listen', false, 0, null, {keepSets:true});`);
  audioPlayed.length = 0;
  run('playQ();');
  assert.deepStrictEqual(audioPlayed, ['audio/q/p2-01.mp3']);
});
check('trang Nội dung hiển thị độ phủ, bảng theo Part, mẫu kiểm tra và lỗi nhập', () => {
  run('contentView();');
  let h = getEl('app').innerHTML;
  assert.ok(h.includes('Nội dung và nguồn') && h.includes('Part 7') && h.includes('đủ 2 câu: 1'));
  run('sampleCheck();');
  h = getEl('app').innerHTML;
  assert.ok(h.includes('Mẫu kiểm tra ngẫu nhiên') && h.includes('Tự soạn - A'));
  run(`PACK_ERRORS = ['lỗi thử <b>x</b>']; contentView();`);
  assert.ok(getEl('app').innerHTML.includes('lỗi thử &lt;b&gt;x&lt;/b&gt;'), 'lỗi không được thoát ký tự');
});
check('xóa gói giữ tiến độ học; hoạt động với giao diện tiếng Anh', () => {
  run(`S.vocab.invoice = {box:3, due:0, seen:2, wrong:0}; clearPack();`);
  assert.strictEqual(run('S.pack'), null);
  assert.strictEqual(run(`VOCAB.find(v => v.w === 'invoice').exs`), undefined);
  assert.strictEqual(run('S.vocab.invoice.box'), 3);
});
(async () => {
  try {
    run('S = clone(DEFAULT); buildVocab();');
    sandbox.fetch = () => Promise.resolve({ok: true, json: () => Promise.resolve(good())});
    await run('loadPack()');
    assert.ok(run('PACK_FILE && PACK_FILE.words.invoice.ex.length') === 2);
    assert.strictEqual(run(`VOCAB.find(v => v.w === 'invoice').exs.length`), 2);
    assert.strictEqual(run('poolFor(5).filter(q => q.src).length'), 1);
    sandbox.fetch = () => Promise.resolve({ok: false});
    run('PACK_FILE = null; buildVocab();'); await run('loadPack()');
    assert.strictEqual(run('PACK_FILE'), null);
    passed += 1; console.log('ok   gói dùng chung content/pack.json: tải được, thiếu file thì bỏ qua');
  } catch (e) { console.log('FAIL gói dùng chung\n     ' + e.message); process.exitCode = 1; }
  console.log(`\n${passed} kiểm thử nội dung đạt`);
})();
