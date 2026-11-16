# TOEIC 990

Ứng dụng luyện thi TOEIC chạy trên trình duyệt: từ vựng (1000 từ, chia nhóm, có phiên âm, lặp ngắt quãng, kiểm tra nhóm, tự thêm từ), ngữ pháp Part 5, đọc hiểu Part 6–7, nghe Part 1–4, chép chính tả, thi thử, hướng dẫn chiến lược từng Part và hỏi AI.

## Chạy
Mở trực tiếp `index.html` hoặc xem trên GitHub Pages. Giữ `vocab.js` cùng thư mục với `index.html`.

Tiến độ lưu trong trình duyệt. "Hỏi AI" dùng API key do người dùng tự nhập, key không được lưu trong mã nguồn.

## Ngân hàng câu hỏi (Supabase)
- App đọc câu hỏi từ bảng `questions` trên Supabase bằng khóa publishable (chỉ đọc, bật RLS). Nếu không tải được, app dùng câu hỏi có sẵn trong file.
- Hiện có khoảng 285 câu cho Part 1–7. Đây là câu luyện tập do tác giả tự soạn theo dạng đề TOEIC, không phải đề thi thật.
- Thứ tự luyện: câu chưa làm và câu hay sai được ưu tiên; câu đã đúng liên tiếp 2 lần sẽ xuống cuối. Nút "Ôn câu đã sai" gom các câu còn yếu.

## Bảo mật
- Content Security Policy chỉ cho phép tải script/style từ cùng nguồn và gọi API tới Supabase và api.anthropic.com.
- Mọi nội dung hiển thị đều đi qua hàm `esc`. File nhập vào (JSON) được kiểm tra kiểu dữ liệu và giới hạn 1 MB.
- API key Anthropic chỉ lưu trong localStorage của trình duyệt này và chỉ gửi tới api.anthropic.com. Nên dùng key có giới hạn chi tiêu.
- Hạn chế còn lại: CSP có `'unsafe-inline'` vì giao diện dùng thuộc tính `onclick`. Muốn bỏ hẳn cần chuyển sang gắn sự kiện bằng JavaScript.

## Nội dung
Thêm câu ví dụ, cụm từ, từ dễ nhầm, giọng thật và câu hỏi bằng gói JSON có ghi nguồn. Xem `CONTENT.md`; kiểm tra bằng `node tools/validate-pack.js`.
