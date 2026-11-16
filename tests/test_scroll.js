// Kiểm thử dạng cuộn: mọi câu trên một trang.
// Chạy: REPO=/home/claude/toiec990 node tests/test_scroll.js
const fs = require('fs');
const vm = require('vm');
const assert = require('assert');
const REPO = process.env.REPO || '/home/claude/toiec990';

const els = {};
const mk = id => ({id, style: {}, hidden: false, value: '', innerHTML: '', textContent: '', setAttribute(){}, getAttribute(){ return null; }, querySelectorAll(){ return []; }});
const getEl = id => els[id] || (els[id] = mk(id));
// Giả lập nút đáp án theo từng câu: '#opts3 .opt' trả về 4 nút cố định cho câu 3
const optBtns = {};
const mkBtn = () => { const cls = new Set(); return {disabled: false, textContent: '', cls,
  classList: {add: c => cls.add(c), remove: c => cls.delete(c), toggle: (c, on) => on ? cls.add(c) : cls.delete(c), contains: c => cls.has(c)}}; };
const qsa = sel => { const m = /#opts(\d+)/.exec(sel); const k = m ? m[1] : 'single';
  return optBtns[k] || (optBtns[k] = [0, 1, 2, 3].map(mkBtn)); };
const storage = {};
const alertsSeen = [];
const spoken = [];
const sandbox = {
  console, Math, Date, JSON, Set, Map, Object, Array, String, Number, RegExp, Promise,
  setTimeout, clearTimeout, setInterval, clearInterval,
  document: {getElementById: getEl, querySelectorAll: qsa, createElement: () => mk('tmp'), addEventListener(){}, body: mk('body'),
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

vm.runInContext('DEFAULT.settings.scroll = true', ctx);

const reading = () => run('READING_QS.map(normQ)');
check('mặc định dạng cuộn bật, đọc lại từ dữ liệu cũ vẫn bật', () => {
  assert.strictEqual(run('sanitize({}).settings.scroll'), true);
  assert.strictEqual(run('sanitize({settings:{scroll:false}}).settings.scroll'), false);
});
check('dạng cuộn: mọi câu trên một trang, đoạn văn chỉ in một lần cho mỗi bộ', () => {
  run('S = clone(DEFAULT); buildVocab(); S.settings.scroll = true;');
  run(`startQuiz('Đọc', READING_QS, 'reading', 'reading', false, 0, null, {keepSets:true});`);
  assert.strictEqual(run('Q.scroll'), true);
  const h = app();
  const total = run('Q.qs.length');
  assert.ok(h.includes(`Câu ${total}/${total}`), 'thiếu câu cuối');
  assert.ok(h.includes('Câu 1/' + total));
  const sets = run('groupSets(Q.qs).length');
  assert.strictEqual((h.match(/<details open/g) || []).length, run('groupSets(Q.qs).filter(g => g[0].ctx).length'));
  assert.ok(!h.includes('Câu tiếp theo'));
  assert.ok(h.includes('Xem kết quả') && h.includes('Từng câu'));
});
check('dạng cuộn: trả lời tại chỗ, tính đúng sai, ghi lịch ôn, cập nhật tiến độ', () => {
  run(`S = clone(DEFAULT); buildVocab(); startQuiz('P5', GRAMMAR, 'quiz', 'grammar', false, 0, null, {});`);
  assert.strictEqual(run('Q.scroll'), true);
  const a0 = run('Q.qs[0].a'), key0 = run('Q.qs[0].key || qkey(Q.qs[0])');
  run(`pickAt(0, ${a0});`);
  assert.strictEqual(run('Q.c'), 1);
  assert.ok(getEl('exp0').innerHTML.includes('Chính xác!'));
  assert.ok(getEl('qprog').textContent.includes('Đã làm 1/') && getEl('qprog').textContent.includes('đúng 1'));
  const wrong = (run('Q.qs[1].a') + 1) % 4;
  run(`pickAt(1, ${wrong});`);
  assert.strictEqual(run('Q.wrong.length'), 1);
  assert.ok(getEl('exp1').innerHTML.includes('Chưa đúng.'));
  run(`pickAt(0, ${a0});`);                                 // bấm lại không tính thêm
  assert.strictEqual(run('Q.c'), 1);
  assert.strictEqual(run('Object.keys(S.qstats).length'), 2);
});
check('dạng cuộn: nộp bài chỉ tính các câu đã làm và ghi thống kê', () => {
  run(`S = clone(DEFAULT); buildVocab(); startQuiz('P5', GRAMMAR, 'quiz', 'grammar', false, 0, null, {});`);
  const total = run('Q.qs.length');
  run(`pickAt(0, Q.qs[0].a); pickAt(1, Q.qs[1].a);`);
  run('finishScroll();');                                    // confirm() trả về true
  assert.ok(app().includes('Kết quả: 2/2 (100%)'), app().slice(0, 300));
  assert.strictEqual(run('S.quiz.total'), 2);
  assert.ok(total > 2);
});
check('dạng cuộn: không làm câu nào thì quay về trang trước, không ghi gì', () => {
  run(`S = clone(DEFAULT); buildVocab(); startQuiz('P5', GRAMMAR, 'quiz', 'grammar', false, 0, null, {});`);
  run('finishScroll();');
  assert.strictEqual(run('S.quiz.total'), 0);
  assert.strictEqual(run('S.history.length'), 0);
});
check('chế độ nghe thi thật vẫn từng câu (phát một lần, không quay lại)', () => {
  run(`S.settings.scroll = true; startQuiz('Nghe', LISTEN_QS, 'lq', 'listen', false, 0, null, {keepSets:true, strict:true});`);
  assert.strictEqual(run('Q.scroll'), false);
});
check('bài nghe dạng cuộn: một nút nghe cho mỗi bài nghe chung, không tự phát', () => {
  spoken.length = 0;
  run(`S.settings.scroll = true; startQuiz('Nghe', LISTEN_QS, 'lq', 'listen', false, 0, null, {keepSets:true, strict:false});`);
  assert.strictEqual(run('Q.scroll'), true);
  assert.ok(app().includes('playAt(0)'));
  assert.ok(!app().includes('Nghe lại'));
  assert.strictEqual(spoken.length, 0, 'tự phát khi mở trang');
  const runs = run('groupSets(Q.qs).length');
  const buttons = (app().match(/onclick="playAt\(/g) || []).length;
  assert.strictEqual(buttons, runs, 'số nút nghe phải bằng số bài nghe');
});
check('thi thử dạng cuộn: có đồng hồ, chọn và đổi đáp án không hiện đúng sai, chấm khi nộp', () => {
  Object.keys(optBtns).forEach(k => delete optBtns[k]);
  run(`S = clone(DEFAULT); S.settings.scroll = true; buildVocab(); startQuiz('Thi', GRAMMAR.slice(0, 5), 'quiz', 'mock', true, 10, null, {});`);
  assert.strictEqual(run('Q.scroll'), true);
  assert.ok(app().includes('id="timer"') && app().includes('Nộp bài'));
  assert.ok(!app().includes('Từng câu'), 'không cho đổi chế độ giữa bài thi');
  run('pickAt(0, (Q.qs[0].a + 1) % Q.qs[0].o.length); pickAt(0, Q.qs[0].a); pickAt(1, Q.qs[1].a);');
  assert.strictEqual(run('Q.sel[0]'), run('Q.qs[0].a'), 'không đổi được đáp án');
  assert.ok(!optBtns['0'].some(b => b.cls.has('right') || b.cls.has('wrong')), 'lộ đúng sai khi đang thi');
  assert.ok(optBtns['0'][run('Q.qs[0].a')].cls.has('sel'));
  assert.strictEqual(optBtns['0'].filter(b => b.cls.has('sel')).length, 1);
  assert.ok(getEl('qprog').textContent.includes('2/5'));
  run('submitScroll();');
  assert.ok(app().includes('Kết quả: 2/5'));
});
check('phần Đọc của thi đầy đủ ở dạng cuộn, phần Nghe vẫn từng câu', () => {
  run('S = clone(DEFAULT); buildVocab(); startFullTest();');
  assert.strictEqual(run('Q.scroll'), false);
  run('finishQ(); NEXT_STAGE();');
  assert.strictEqual(run('Q.name'), 'Phần Đọc (Part 5–7)');
  assert.strictEqual(run('Q.scroll'), true);
  run('Q.qs.forEach((q, i) => pickAt(i, q.a)); finishQ(); NEXT_STAGE();');
  assert.ok(app().includes('Kết quả thi thử'));
  assert.strictEqual(run('S.mocks[0].R'), run('S.mocks[0].RT'));
});
check('chuyển qua lại giữa dạng cuộn và từng câu theo cài đặt', () => {
  run(`S = clone(DEFAULT); buildVocab(); S.settings.scroll = true; grammarQuiz();`);
  assert.strictEqual(run('Q.scroll'), true);
  run('toggleScroll();');
  assert.strictEqual(run('S.settings.scroll'), false);
  assert.strictEqual(run('Q.scroll'), false);
  assert.ok(app().includes('Câu 1/') && app().includes('Dạng cuộn'));
  run('toggleScroll();');
  assert.strictEqual(run('Q.scroll'), true);
});
console.log(`\n${passed} kiểm thử dạng cuộn đạt`);
