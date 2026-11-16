-- CHƯA ÁP DỤNG. Cần người quản trị dự án xem và chạy thủ công.
-- Thêm siêu dữ liệu cho bảng questions để app lưu bộ câu, dạng câu, ảnh, nguồn và trạng thái duyệt.
-- Chỉ thêm cột, không đổi hay xóa dữ liệu hiện có; câu cũ nhận giá trị mặc định.
alter table public.questions
  add column if not exists set_id   text,
  add column if not exists qtype    text,
  add column if not exists image    text,
  add column if not exists audio_file text,
  add column if not exists src      text,
  add column if not exists verified boolean not null default false;

alter table public.questions
  add constraint questions_image_path  check (image is null or image ~ '^images/[A-Za-z0-9_/-]+\.(png|jpe?g|webp|gif)$'),
  add constraint questions_audio_path  check (audio_file is null or audio_file ~ '^audio/[A-Za-z0-9_/-]+\.(mp3|ogg|m4a|wav)$'),
  add constraint questions_set_id_fmt  check (set_id is null or set_id ~ '^[A-Za-z0-9_-]{1,40}$');

create index if not exists questions_part_set_idx on public.questions (part, set_id);
-- Sau khi chạy: sửa URL trong loadQuestions() của index.html để select thêm
-- set_id,qtype,image,audio_file,src,verified và ánh xạ trong toEngine().
-- Quyền đọc vẫn theo chính sách RLS hiện có (không thay đổi).
