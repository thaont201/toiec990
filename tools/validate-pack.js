#!/usr/bin/env node
// Kiểm tra một gói nội dung trước khi đưa vào app.
// Dùng: node tools/validate-pack.js [đường-dẫn-gói.json]   (mặc định content/pack.json)
// Dùng đúng bộ kiểm tra có trong index.html nên kết quả giống hệt khi nhập trong app.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const m = html.match(/\/\*PACK-VALIDATOR-BEGIN\*\/([\s\S]*?)\/\*PACK-VALIDATOR-END\*\//);
if (!m) { console.error('Không tìm thấy bộ kiểm tra trong index.html'); process.exit(2); }
const ctx = vm.createContext({});
vm.runInContext(m[1] + '\nthis.validatePack = validatePack;', ctx);
const file = process.argv[2] || path.join(root, 'content', 'pack.json');
let raw;
try { raw = JSON.parse(fs.readFileSync(file, 'utf8')); }
catch (e) { console.error('Không đọc được ' + file + ': ' + e.message); process.exit(2); }
const {pack, errors} = ctx.validatePack(raw);
const words = Object.keys(pack.words);
const two = words.filter(w => pack.words[w].ex.length >= 2).length;
const unverified = pack.qs.filter(q => !q.ver).length;
console.log(`${file}\n  Từ hợp lệ: ${words.length} (đủ 2 câu ví dụ: ${two})\n  Câu hỏi hợp lệ: ${pack.qs.length} (chưa duyệt: ${unverified})`);
if (errors.length) {
  console.log(`  Lỗi: ${errors.length}`);
  errors.slice(0, 50).forEach(e => console.log('   - ' + e));
  process.exit(1);
}
console.log('  Không có lỗi.');
