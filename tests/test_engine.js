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
const spoken = [];
const sandbox = {
  console, Math, Date, JSON, Set, Map, Object, Array, String, Number, RegExp, Promise,
  setTimeout, clearTimeout, setInterval, clearInterval,
  document: {getElementById: getEl, createElement: () => mk('tmp'), addEventListener(){}, body: mk('body'),
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

// --- 1. Chuẩn hóa ---
check('normQ lấy Part từ nhãn, mặc định mức 2, bỏ ảnh không hợp lệ', () => {
  const q = run(`normQ({part:'Part 3', q:'x', o:['a','b'], a:0, image:'../secret.png'})`);
  assert.strictEqual(q.partNo, 3);
  assert.strictEqual(q.level, 2);
  assert.strictEqual(q.image, null);
  assert.strictEqual(run(`normQ({partNo:1, q:'x', o:['a','b'], a:0, image:'images/p1-01.jpg'}).image`), 'images/p1-01.jpg');
  assert.strictEqual(run(`normQ({partNo:1, q:'x', o:['a','b'], a:0, image:'https://evil.example/x.png'}).image`), null);
});
check('normQ giữ đoạn văn nhiều đoạn và làm sạch', () => {
  const q = run(`normQ({partNo:7, q:'x', o:['a','b'], a:0, ctx:[{title:'Email', text:'Hello'}, {text:'Memo'}, null]})`);
  assert.strictEqual(q.ctx.length, 2);
  assert.strictEqual(q.ctx[0].title, 'Email');
  assert.strictEqual(q.ctx[1].title, '');
});
check('nhãn dạng câu Part 2 được suy ra từ nội dung', () => {
  const cases = [
    ['Where is the nearest train station?', 'wh'],
    ['Would you like me to print the report for you?', 'đề nghị'],
    ['The meeting is on Monday, isn\'t it?', 'câu hỏi đuôi'],
    ['Did you finish the report?', 'yes/no'],
    ['I think so.', 'khác'],
  ];
  cases.forEach(([t, want]) => assert.strictEqual(run(`autoType(2, ${JSON.stringify(t)})`), want, t));
});
check('các câu cùng bộ (bài nghe chung) được nhóm và giữ thứ tự trong bộ', () => {
  const qs = run('LISTEN_QS.map(normQ).filter(q => q.partNo === 3)');
  const sets = run(`groupSets(LISTEN_QS.map(normQ).filter(q => q.partNo === 3))`);
  assert.ok(sets.length >= 1 && sets.every(g => g.length >= 1));
  sets.forEach(g => assert.strictEqual(new Set(g.map(q => q.setId)).size, 1, 'một bộ có nhiều mã bộ'));
  const ordered = run(`orderSets(LISTEN_QS.map(normQ).filter(q => q.partNo === 3))`);
  let changes = 0;
  for (let i = 1; i < ordered.length; i++) if (ordered[i].setId !== ordered[i - 1].setId) changes++;
  assert.strictEqual(changes, sets.length - 1, 'các bộ bị tách rời');
});

// --- 2. Chế độ thi thật ---
check('Part 2 thi thật: đáp án chỉ là chữ cái, không in chữ, không có nút nghe lại', () => {
  run('S = clone(DEFAULT); buildVocab(); S.settings.realListen = true;');
  run(`startQuiz('Nghe', LISTEN_QS.map(normQ).filter(q => q.partNo === 2), 'lq', 'listen', false, 0, null, {keepSets:true, strict:true});`);
  const h = app();
  assert.ok(!h.includes('Where is the nearest'), 'bài nghe bị in ra');
  assert.ok(!h.includes('It is two blocks'), 'đáp án bị in ra');
  assert.ok(h.includes('>A<') || h.includes('A</button>'), 'thiếu nhãn A');
  assert.ok(!h.includes('Nghe lại'), 'còn nút nghe lại');
});
check('âm thanh Part 2 thi thật đọc cả các đáp án A, B, C', () => {
  const q = run(`Q.qs[0]`);
  const lines = run(`listenAudioFor(Q.qs[0])`);
  assert.ok(lines.some(l => l.t.startsWith('A. ')), 'thiếu đáp án A trong bài nghe');
  assert.ok(lines.length > run('Q.qs[0].audio.length'));
});
check('chế độ luyện thường vẫn hiện chữ đáp án và có nút nghe lại', () => {
  run(`startQuiz('Nghe', LISTEN_QS.map(normQ).filter(q => q.partNo === 2), 'lq', 'listen', false, 0, null, {keepSets:true, strict:false});`);
  const h = app();
  assert.ok(/A\. [A-Za-z]/.test(h), 'thiếu chữ đáp án');
  assert.ok(h.includes('Nghe lại'));
});
check('bài nghe dùng chung: câu sau không mở lại đoạn và không phát lại', () => {
  run(`S.settings.realListen = true; startQuiz('Nghe', LISTEN_QS.map(normQ).filter(q => q.partNo === 3), 'lq', 'listen', false, 0, null, {keepSets:true, strict:true});`);
  const first = app();
  assert.ok(first.includes('Câu 1/'));
  // lật sang câu thứ 2 trong cùng bộ
  run('Q.played[0] = true; nextQ();');
  const second = app();
  assert.ok(second.includes('Câu 2/'));
  assert.ok(!/<details open/.test(second.split('Câu 2/')[1] || ''), 'câu sau mở đoạn văn');
});

// --- 3. Đoạn văn ---
check('passageHTML: đoạn đơn và nhiều đoạn có tiêu đề', () => {
  const single = run(`passageHTML('Hello there', true)`);
  assert.ok(single.includes('<details open') && single.includes('Hello there'));
  const multi = run(`passageHTML([{title:'Email 1', text:'A'}, {title:'Memo', text:'B'}], false)`);
  assert.ok(multi.includes('Email 1') && multi.includes('Memo') && !/<details open/.test(multi));
});

// --- 4. Thi thử ---
check('thi thử: chọn đáp án không hiện đúng sai, chấm điểm khi nộp', () => {
  run(`S = clone(DEFAULT); buildVocab(); startQuiz('Thi', GRAMMAR, 'quiz', 'mock', true, 15, null, {});`);
  run('pick(Q.qs[0].a);');
  assert.ok(!app().includes('Chính xác!') && !app().includes('Chưa đúng.'), 'hiện đáp án khi đang làm');
  run('nextQ(); pick(0);');
  run('submitQ();');
  const h = app();
  assert.ok(h.includes('Kết quả:'), 'thiếu kết quả');
  assert.strictEqual(run('Q.c'), run('Q.qs.filter((q, i) => Q.sel[i] === q.a).length'));
});
check('thi thử phần đọc cho quay lại, phần nghe thì không', () => {
  run(`startQuiz('Đọc', GRAMMAR, 'quiz', 'x', true, 10, null, {allowBack:true});`);
  run('nextQ();');
  assert.ok(app().includes('Câu trước'), 'thiếu nút quay lại ở phần đọc');
  run('prevQ();');
  assert.strictEqual(run('Q.i'), 0);
  run(`startQuiz('Nghe', LISTEN_QS, 'lq', 'x', true, 10, null, {keepSets:true, strict:true});`);
  run('nextQ();');
  assert.ok(!app().includes('Câu trước'), 'phần nghe không được quay lại');
});
check('thi thử hết giờ: câu chưa làm không ghi lịch lặp, câu đã làm có ghi', () => {
  run(`S = clone(DEFAULT); buildVocab(); startQuiz('Thi', GRAMMAR, 'quiz', 'mock', true, 10, null, {});`);
  run('pick(Q.qs[0].a);');
  const answeredKey = run('Q.qs[0].key');
  const unansweredKey = run('Q.qs[1].key');
  run('Q.i = Q.qs.length; finishQ();');
    assert.ok(run(`S.qstats[${JSON.stringify(answeredKey)}]`) !== undefined, 'câu đã làm chưa được ghi');
  assert.strictEqual(run(`S.qstats[${JSON.stringify(unansweredKey)}]`), undefined, 'câu chưa làm bị ghi nhận');
});

// --- 5. Thi đầy đủ ---
check('kế hoạch thi đầy đủ: không quá số câu chuẩn và cảnh báo khi thiếu', () => {
  run('S = clone(DEFAULT); buildVocab();');
  const plan = run('fullTestPlan()');
  assert.ok(plan.listen.length <= 100 && plan.reading.length <= 100);
  assert.ok(plan.short.length > 0, 'bộ dữ liệu dự phòng phải thiếu câu');
  const parts = plan.listen.map(q => q.partNo);
  for (let i = 1; i < parts.length; i++) assert.ok(parts[i] >= parts[i - 1], 'phần nghe lẫn thứ tự Part');
});
check('thi đầy đủ chạy đủ hai phần rồi ghi kết quả ước lượng', () => {
  run('S = clone(DEFAULT); buildVocab(); startFullTest();');
  assert.strictEqual(run('Q.name'), 'Phần Nghe (Part 1–4)');
  assert.strictEqual(run('Q.strict'), true);
  run('finishQ();');                      // hết phần nghe
  assert.ok(app().includes('xong'), 'thiếu màn hình chuyển phần');
  run('NEXT_STAGE();');
  assert.strictEqual(run('Q.name'), 'Phần Đọc (Part 5–7)');
  assert.strictEqual(run('Q.allowBack'), true);
  run('finishQ(); NEXT_STAGE();');
  assert.ok(app().includes('Kết quả thi thử'), 'thiếu kết quả cuối');
  assert.strictEqual(run('S.mocks.length'), 1);
  assert.ok(run('S.mocks[0].tot') >= 10 && run('S.mocks[0].tot') <= 990);
});
check('điểm ước lượng: 0 đúng là 5, đủ điểm là 495', () => {
  assert.strictEqual(run('scaleScore(0, 100)'), 5);
  assert.strictEqual(run('scaleScore(100, 100)'), 495);
});

// --- 6. Lịch ôn câu sai và phân tích ---
check('ghi kết quả câu: sai thì đến hạn ngay, đúng thì hẹn sau một ngày', () => {
  run('S = clone(DEFAULT); buildVocab();');
  run('recordAnswer(normQ(LISTEN_QS[0]), false);');
  const k = run('qkey(normQ(LISTEN_QS[0]))');
  assert.strictEqual(run(`S.qstats[${JSON.stringify(k)}].wrong`), 1);
  const dueWrong = run(`S.qstats[${JSON.stringify(k)}].due`);
  assert.ok(dueWrong <= Date.now() + 1000);
  run(`recordAnswer(normQ(LISTEN_QS[0]), true)`);
  const e = run(`S.qstats[${JSON.stringify(k)}]`);
  assert.strictEqual(e.box, 1);
  assert.ok(e.due > Date.now() + 0.9 * 86400000);
});
check('ôn câu sai chỉ lấy câu đã sai và đến hạn', () => {
  run('S = clone(DEFAULT); buildVocab();');
  alertsSeen.length = 0;
  run('practiceWrong();');
  assert.ok(alertsSeen.length === 1 && alertsSeen[0].includes('Chưa có câu nào'), 'phải báo chưa có câu');
  const k = run('qkey(normQ(LISTEN_QS[0]))');
  run(`S.qstats[${JSON.stringify(k)}] = {seen:2, wrong:1, streak:0, p:1, box:0, due:0, t:''};`);
  run('practiceWrong();');
  assert.strictEqual(run('Q.name'), 'Ôn câu đã sai');
  assert.ok(run('Q.qs.length') >= 1);
});
check('phân tích: có bảng theo Part và theo dạng câu', () => {
  run('S = clone(DEFAULT); buildVocab();');
  run(`recordAnswer(normQ(LISTEN_QS[0]), false); recordAnswer(normQ(LISTEN_QS[0]), true);`);
  run('analysisView();');
  const h = app();
  assert.ok(h.includes('Theo Part') && h.includes('Theo dạng câu'));
  assert.ok(h.includes('Part 1') || h.includes('Part 2'));
});

// --- 7. Làm sạch dữ liệu ---
check('làm sạch: giữ hộp, hạn, dạng câu, lượt thi và cài đặt thi thật', () => {
  const s = run(`sanitize({qstats:{abc:{seen:2,wrong:1,streak:0,p:2,box:3,due:1.8e12,t:'wh'}}, mocks:[{date:'x', L:10, LT:100, R:20, RT:100, Ls:50, Rs:60, tot:110}], settings:{realListen:false}})`);
  assert.strictEqual(s.qstats.abc.box, 3);
  assert.strictEqual(s.qstats.abc.due, 1.8e12);
  assert.strictEqual(s.qstats.abc.t, 'wh');
  assert.strictEqual(s.mocks[0].tot, 110);
  assert.strictEqual(s.settings.realListen, false);
  const d = run('sanitize({}).settings.realListen');
  assert.strictEqual(d, true);
});

console.log(`\n${passed} kiểm thử engine đạt`);
