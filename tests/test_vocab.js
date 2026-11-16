// Kiểm thử logic từ vựng bằng DOM giả lập. Chạy: node test_vocab.js
const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const REPO = process.env.REPO || '/home/claude/thaont201/toiec990';
const vocabSrc = fs.readFileSync(REPO + '/vocab.js', 'utf8');
const html = fs.readFileSync(REPO + '/index.html', 'utf8');
const appSrc = html.match(/<script>([\s\S]*?)<\/script>/)[1];

// --- DOM giả lập ---
const elements = {};
const mkEl = id => ({id, style: {}, hidden: false, value: '', innerHTML: '', textContent: '',
  setAttribute(){}, getAttribute(){ return null; }, querySelectorAll(){ return []; }});
const getEl = id => elements[id] || (elements[id] = mkEl(id));
const listeners = {};
const storage = {};
const alerts = [];
const spoken = [];

const sandbox = {
  console, Math, Date, JSON, Set, Map, Object, Array, String, Number, RegExp, Promise,
  setTimeout, clearTimeout, setInterval, clearInterval,
  document: {
    getElementById: getEl,
    createElement: () => mkEl('tmp'),
    addEventListener: (t, fn) => { listeners[t] = fn; },
    body: mkEl('body'),
    documentElement: mkEl('html'),
    createTreeWalker: () => ({nextNode: () => false}),
  },
  localStorage: {
    getItem: k => (k in storage ? storage[k] : null),
    setItem: (k, v) => { storage[k] = String(v); },
    removeItem: k => { delete storage[k]; },
  },
  MutationObserver: class { observe(){} disconnect(){} takeRecords(){ return []; } },
  NodeFilter: {SHOW_TEXT: 4},
  alert: m => alerts.push(m),
  confirm: () => true,
  window: null,
  speechSynthesis: {cancel(){}, speak(u){ spoken.push(u.text || u.lang); }, getVoices: () => []},
  SpeechSynthesisUtterance: class { constructor(t){ this.text = t; } },
  URL: {createObjectURL: () => 'blob:x'},
  Blob: class {},
  FileReader: class {},
};
sandbox.window = sandbox;
sandbox.window.scrollTo = () => {};
sandbox.window.speechSynthesis = sandbox.speechSynthesis;
sandbox.window.addEventListener = () => {};
sandbox.localStorage.getItem = sandbox.localStorage.getItem;
const ctx = vm.createContext(sandbox);
// Đưa cửa sổ vào ngữ cảnh: 'speechSynthesis' in window phải đúng
vm.runInContext(vocabSrc, ctx, {filename: 'vocab.js'});
vm.runInContext(appSrc, ctx, {filename: 'app.js'});

const run = code => vm.runInContext(code, ctx);
let passed = 0;
const check = (name, fn) => { try { fn(); passed++; console.log('ok   ' + name); } catch (e) { console.log('FAIL ' + name + '\n     ' + e.message); process.exitCode = 1; } };

// --- 1. Dữ liệu và nhóm ---
check('bộ từ có gần 1000 từ và nhiều nhóm', () => {
  const n = run('VOCAB.length'), g = run('GROUPS.length');
  assert.ok(n >= 990, 'VOCAB.length = ' + n);
  assert.ok(g >= 50, 'GROUPS.length = ' + g);
  console.log('     từ: ' + n + ', nhóm: ' + g);
});
check('mọi nhóm có tối đa 20 từ và từ không trùng', () => {
  const sizes = run('GROUPS.map(g => g.words.length)');
  assert.ok(sizes.every(s => s >= 1 && s <= 20));
  const ws = run('VOCAB.map(v => v.w.toLowerCase())');
  assert.strictEqual(new Set(ws).size, ws.length, 'có từ trùng');
});
check('từ từ vocab.js không còn ví dụ giả, có trường pos', () => {
  const v = run('VOCAB.find(x => x.w === "accomplish")');
  assert.strictEqual(v.ex, '');
  assert.strictEqual(v.pos, 'động từ');
});

// --- 2. Lặp ngắt quãng ---
check('gradeEntry: biết liên tiếp tăng hộp và đẩy hạn ra xa, cap ở hộp 5', () => {
  let e = null, now = 1e12;
  e = run(`gradeEntry(null, 'good', ${now})`); assert.strictEqual(e.box, 1); assert.strictEqual(e.due, now + 1 * 86400000);
  for (let k = 0; k < 10; k++) e = run(`gradeEntry(${JSON.stringify(e)}, 'good', ${now})`);
  assert.strictEqual(e.box, 5); assert.strictEqual(e.due, now + 30 * 86400000);
});
check('gradeEntry: chưa biết đưa về hộp 0, đến hạn ngay, tăng số lần sai', () => {
  const now = 1e12;
  const e = run(`gradeEntry({box:4,due:0,seen:4,wrong:1}, 'again', ${now})`);
  assert.strictEqual(e.box, 0); assert.strictEqual(e.due, now); assert.strictEqual(e.wrong, 2);
});
check('gradeEntry: khó lùi một hộp, rút ngắn khoảng chờ', () => {
  const now = 1e12;
  const e = run(`gradeEntry({box:3,due:0,seen:3,wrong:0}, 'hard', ${now})`);
  assert.strictEqual(e.box, 2); assert.strictEqual(e.due, now + 3 * 86400000);
});
check('isKnown chỉ đúng từ hộp 3 trở lên', () => {
  assert.strictEqual(run('isKnown({box:2})'), false);
  assert.strictEqual(run('isKnown({box:3})'), true);
  assert.strictEqual(run('isKnown(undefined)'), false);
});

// --- 3. Khóa nhóm ---
check('nhóm 1 mở, nhóm 2 khóa, mở khi nhóm 1 đạt 80%', () => {
  run('S = clone(DEFAULT); buildVocab();');
  assert.strictEqual(run('groupLocked(0)'), false);
  assert.strictEqual(run('groupLocked(1)'), true);
  run(`GROUPS[0].words.slice(0, 16).forEach(v => { S.vocab[v.w] = {box: 3, due: 0, seen: 1, wrong: 0}; });`);
  assert.strictEqual(run('groupLocked(1)'), false);
});
check('tắt khóa thì mọi nhóm mở', () => {
  run('S.settings.lock = false;');
  assert.strictEqual(run('groupLocked(5)'), false);
  run('S.settings.lock = true;');
});

// --- 4. Dữ liệu cũ và làm sạch ---
check('dữ liệu cũ dạng known được chuyển sang hộp', () => {
  const s = run(`sanitize({vocab:{a:{known:true,seen:2}, b:{known:false,seen:1}}})`);
  assert.strictEqual(s.vocab.a.box, 3);
  assert.strictEqual(s.vocab.b.box, 0);
});
check('mốc thời gian lớn (ms) không bị cắt', () => {
  const now = 1.8e12;
  const s = run(`sanitize({vocab:{a:{box:2,due:${now},seen:1,wrong:0}}})`);
  assert.strictEqual(s.vocab.a.due, now);
});
check('từ tự thêm không hợp lệ bị bỏ, cài đặt mặc định đúng', () => {
  const s = run(`sanitize({custom:[{w:'ok word', m:'được'}, {w:'bad<script>', m:'x'}, {w:'fine', m:''}]})`);
  assert.strictEqual(s.custom.length, 1);
  assert.strictEqual(s.custom[0].topic, 'Của tôi');
  assert.strictEqual(JSON.stringify(s.settings), JSON.stringify({accent: 'US', lock: true, realListen: true}));
});

// --- 5. Bài kiểm tra nhóm ---
check('makeTQ: 4 đáp án khác nhau, đáp án đúng nằm đúng vị trí', () => {
  run('S = clone(DEFAULT); buildVocab();');
  const kinds = new Set();
  for (let k = 0; k < 400; k++) {
    const q = run(`makeTQ(VOCAB[${k % 1000 % 997}])`);
    assert.strictEqual(q.opts.length, 4, 'số đáp án');
    assert.strictEqual(new Set(q.opts).size, 4, 'đáp án trùng');
    kinds.add(q.kind);
    const correct = q.kind === 'en2vi' ? q.v.m : q.v.w;
    assert.strictEqual(q.opts[q.a], correct, 'đáp án đúng sai vị trí');
    if (q.kind === 'fill') assert.ok(q.prompt.includes('_____'));
  }
  console.log('     các dạng câu gặp: ' + [...kinds].join(', '));
});
check('startVTest, trả lời đúng/sai, kết thúc và ghi kết quả', () => {
  run('S = clone(DEFAULT); buildVocab(); vgroup = 0; vmode = "group";');
  run('startVTest();');
  assert.strictEqual(run('vmode'), 'test');
  let steps = 0;
  while (run('VT.i') < run('VT.words.length')) {
    const ansIdx = run('VT.q.a');
    // trả lời đúng ở câu chẵn, sai ở câu lẻ
    const pick = steps % 2 === 0 ? ansIdx : (ansIdx + 1) % 4;
    run(`pickT(${pick})`);
    run('nextT()');
    steps++;
  }
  assert.ok(steps >= 4);
  const html = run('app.innerHTML');
  assert.ok(html.includes('Kết quả:'), 'thiếu màn hình kết quả');
  const wrong = run('VT.wrong.length'), correct = run('VT.c');
  assert.strictEqual(correct + wrong, steps);
  console.log('     đúng ' + correct + ' / sai ' + wrong);
});

// --- 6. Thêm từ của tôi ---
check('thêm từ: kiểm tra đầu vào, lưu, xuất hiện trong nhóm "Của tôi"', () => {
  run('S = clone(DEFAULT); buildVocab(); vmode = "add"; vocabView();');
  const set = (id, v) => { getEl(id).value = v; };
  set('nw', 'bad<tag>'); set('nm', 'x'); run('addCustom()');
  assert.ok(getEl('nerr').textContent.includes('chữ cái'));
  set('nw', 'kickstarter'); set('nm', ''); run('addCustom()');
  assert.ok(getEl('nerr').textContent.includes('nghĩa'));
  set('nw', 'accomplish'); set('nm', 'x'); run('addCustom()');
  assert.ok(getEl('nerr').textContent.includes('đã có'));
  set('nw', 'kickstarter'); set('nm', 'nguồn vốn khởi nghiệp'); set('ni', ''); set('ne', 'The kickstarter campaign raised funds.');
  run('addCustom()');
  assert.strictEqual(run('S.custom.length'), 1);
  assert.strictEqual(run('GROUPS[vgroup].title.startsWith("Của tôi")'), true);
  assert.strictEqual(run('VOCAB.some(v => v.w === "kickstarter")'), true);
});

// --- 7. Luồng giao diện ---
check('các màn hình từ vựng render không lỗi (nhóm, ôn, thêm, kiểm tra)', () => {
  run('S = clone(DEFAULT); buildVocab(); vmode = "group"; vgroup = 0;');
  run('vocabView();');
  let html = run('app.innerHTML');
  assert.ok(html.includes('flash'), 'thiếu thẻ');
  assert.ok(!/undefined|NaN|null/.test(html.replace(/<option[^>]*>/g, '')), 'có giá trị lỗi trong HTML');
  // ôn từ cần ôn khi chưa có gì
  run('vmode = "review"; vocabView();');
  assert.ok(run('app.innerHTML').includes('Hiện không có từ nào cần ôn.'));
  // chấm điểm thẻ
  run('vmode = "group"; vocabView();');
  getEl('back').hidden = true;
  run('flip();');
  assert.strictEqual(run('document.getElementById("back").hidden'), false);
  const w1 = run('vcur.w');
  run("grade('good')");
  assert.strictEqual(run(`S.vocab[${JSON.stringify(w1)}].box`), 1);
  assert.strictEqual(run('S.daily.n'), 1);
  run("grade('again')");
  run('vocabView();');
  html = run('app.innerHTML');
  assert.ok(html.includes('Hôm nay đã ôn 2 thẻ'));
  // ôn từ sai hiển thị các từ vừa chấm 'chưa biết'
  run('vmode = "review"; vocabView();');
  assert.ok(run('duePool().length') >= 1);
});
check('phím tắt: Space lật thẻ, 1 chấm chưa biết', () => {
  run('S = clone(DEFAULT); buildVocab(); vmode = "group"; vgroup = 0; currentRoute = "vocab"; vocabView();');
  getEl("back").hidden = true;
  const kd = listeners.keydown;
  const prevent = () => {};
  kd({key: ' ', target: {tagName: 'BODY'}, preventDefault: prevent});
  assert.strictEqual(run('document.getElementById("back").hidden'), false);
  const w = run('vcur.w');
  kd({key: '1', target: {tagName: 'BODY'}, preventDefault: prevent});
  assert.strictEqual(run(`S.vocab[${JSON.stringify(w)}].box`), 0);
});
check('kiểm tra phím 1–4 chọn đáp án', () => {
  run('S = clone(DEFAULT); buildVocab(); vgroup = 0; currentRoute = "vocab"; startVTest();');
  listeners.keydown({key: '2', target: {tagName: 'BODY'}, preventDefault(){}});
  assert.strictEqual(run('VT.answered'), true);
});
check('đọc lại dữ liệu từ localStorage giữ nguyên hộp, hạn và từ tự thêm', () => {
  run('S = clone(DEFAULT); buildVocab(); S.custom.push({w:"kickstarter", m:"vốn khởi nghiệp", ipa:"", ex:"", topic:"Của tôi", pos:""}); S.vocab.accomplish = {box:2, due: 1.8e12, seen:1, wrong:0}; save();');
  const raw = storage['toeic850-data'];
  const loaded = run(`sanitize(JSON.parse(${JSON.stringify(raw)}))`);
  assert.strictEqual(loaded.vocab.accomplish.box, 2);
  assert.strictEqual(loaded.custom[0].w, 'kickstarter');
});
check('phát âm: chọn giọng Anh khi đặt accent UK', () => {
  run('S = clone(DEFAULT); buildVocab();');
  run('S.settings.accent = "UK";');
  assert.strictEqual(run('accentLang()'), 'en-GB');
  run('speakText("hello", 0.6)');
  assert.ok(spoken.includes('hello'));
});

// --- 8. Chuỗi học và thanh tiến độ chủ đề ---
const ymd = off => new Date(Date.now() + off * 86400000).toLocaleDateString('sv-SE');
check('chuỗi học tăng khi học liên tiếp, bắt đầu lại khi nghỉ', () => {
  run('S = clone(DEFAULT); buildVocab();');
  run(`S.streak = {last: "${ymd(-1)}", count: 4}; bumpDaily();`);
  assert.strictEqual(run('S.streak.count'), 5);
  run(`S.streak = {last: "2000-01-01", count: 9}; bumpDaily();`);
  assert.strictEqual(run('S.streak.count'), 1);
  run('bumpDaily();');
  assert.strictEqual(run('S.streak.count'), 1, 'học nhiều lần trong ngày không tăng thêm');
});
check('currentStreak chỉ tính khi học hôm nay hoặc hôm qua', () => {
  run(`S.streak = {last: "${ymd(-1)}", count: 3};`);
  assert.strictEqual(run('currentStreak()'), 3);
  run(`S.streak = {last: "${ymd(-2)}", count: 3};`);
  assert.strictEqual(run('currentStreak()'), 0);
});
check('streak được làm sạch khi đọc lại', () => {
  const s = run('sanitize({streak:{last:"2026-11-15", count:"x"}})');
  assert.strictEqual(s.streak.last, '2026-11-15');
  assert.strictEqual(s.streak.count, 0);
});
check('thanh chủ đề: tổng các chủ đề bằng số từ và đếm đúng từ đã thuộc', () => {
  run('S = clone(DEFAULT); buildVocab();');
  const topics = run('[...new Set(VOCAB.map(v => v.topic || "Từ mẫu"))]');
  let total = 0;
  topics.forEach(t => { total += run(`topicStats(${JSON.stringify(t)}).total`); });
  assert.strictEqual(total, run('VOCAB.length'));
  const t0 = run('GROUPS[0].words[0].topic || "Từ mẫu"');
  run(`VOCAB.filter(v => (v.topic || "Từ mẫu") === ${JSON.stringify(t0)}).slice(0, 2).forEach(v => { S.vocab[v.w] = {box: 3, due: 0, seen: 1, wrong: 0}; });`);
  assert.strictEqual(run(`topicStats(${JSON.stringify(t0)}).known`), 2);
});

console.log(`\n${passed} kiểm thử đạt`);
