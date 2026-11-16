# Quy trình nội dung (thu âm, soạn câu hỏi, kiểm duyệt)

Tài liệu này mô tả cách thêm nội dung vào app mà không cần sửa code. App chỉ nhận nội dung có ghi nguồn.

## Vai trò (cần người cụ thể điền tên)
| Vai trò | Việc | Người phụ trách |
|---|---|---|
| Quản lý nội dung | Chọn nguồn, chia lô, quyết định đưa lên | _điền tên_ |
| Người soạn | Nhập câu ví dụ, cụm từ, câu hỏi vào file gói | _điền tên_ |
| Người duyệt | Đối chiếu ngẫu nhiên với nguồn, ký duyệt | _điền tên (khác người soạn)_ |
| Người thu âm | Thu giọng thật theo quy cách bên dưới | _điền tên_ |

## Quy tắc về nguồn và bản quyền
- Mỗi mục bắt buộc có `src`: tên nguồn, trang hoặc URL, và giấy phép. Ví dụ: `Tatoeba #123456 (CC BY 2.0 FR), tác giả CK`.
- Chỉ dùng nguồn có giấy phép cho phép dùng lại (CC BY, CC0, phạm vi công cộng) hoặc nội dung do chính bạn viết.
- Đề, sách và tài liệu của ETS có bản quyền: dùng để đối chiếu phạm vi từ vựng và dạng bài, không sao chép nguyên văn.
- Câu hỏi tự soạn phải ghi `src` là "Tự soạn" cùng tên người soạn, và vẫn cần người duyệt.

## Các bước cho mỗi lô (đề xuất 50 từ hoặc 20 câu hỏi)
1. Người soạn tạo `content/pack.json` theo mẫu `content/pack.template.json` (xóa dòng `_template`).
2. Chạy `node tools/validate-pack.js content/pack.json` và sửa đến khi không còn lỗi.
3. Mở app, trang **Nội dung**, bấm **Lấy mẫu kiểm tra 10%**; người duyệt đối chiếu từng mục với nguồn ghi kèm.
4. Nếu có mục sai: sửa mục đó và lấy mẫu lại; nếu sai từ 2 mục trở lên trong mẫu, kiểm lại toàn lô.
5. Người duyệt đặt `"verified": true` cho câu hỏi đã duyệt (từ vựng không có cờ này, dựa vào bước 3).
6. Commit file gói. App tải `content/pack.json` khi mở trang; nhập thử cá nhân dùng nút **Nhập gói nội dung**.

Tỷ lệ 10% là mức đề xuất, chưa được xác nhận chính thức. Chỉnh lại nếu cần.

## Quy cách thu âm
- Định dạng mp3 (hoặc ogg/m4a/wav), mono, 44.1 kHz, không nhạc nền, tiếng ồn thấp.
- Từ vựng: một file một từ, đặt tên `audio/words/<từ>.mp3`, đọc từ một lần ở tốc độ tự nhiên.
- Câu hỏi nghe: một file một bài nghe, `audio/q/<mã>.mp3`, chứa toàn bộ lời thoại. Part 2 phải gồm cả câu hỏi và ba đáp án A, B, C.
- Ghi người đọc và giọng (Mỹ/Anh/Úc/Canada) trong `src` để đa dạng giọng như đề thật.
- Ảnh cho Part 1: `images/<mã>.jpg`, dùng ảnh có giấy phép cho phép dùng lại hoặc tự chụp.

## Định dạng gói
Xem `content/pack.template.json`. Tóm tắt:
- `words[]`: `w`, `ex[]` (tối đa 3 câu: `t`, `src`), `col[]` (`t`, `m`, `src`), `conf[]` (`w`, `note`, `src`), `audio`.
- `qs[]`: `part` 1–7, `q`, `o` (3–4 đáp án), `a` (chỉ số đáp án đúng), `e` (giải thích), `src`, `verified`; thêm `ts` (lời thoại) hoặc `audioFile` cho Part 1–4, `ctx` cho Part 6–7, tùy chọn `image`, `qtype`, `level` (1–3), `setId` (các câu cùng bộ dùng chung mã).

## Trước khi đưa lên Supabase
Cần chạy file `supabase/migrations/20261116000000_question_metadata.sql` (chưa áp dụng) rồi cập nhật câu truy vấn trong `loadQuestions()`.
