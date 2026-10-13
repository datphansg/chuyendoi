# Nếp — Truyện chữ

Website đọc truyện tiếng Việt theo dạng bảng tin vuốt dọc, xây dựng bằng Astro và nội dung Markdown. Website được xuất thành HTML tĩnh, không cần cơ sở dữ liệu, đăng nhập hay dịch vụ trả phí bắt buộc.

## Chạy trên Windows

1. Cài Node.js phiên bản LTS từ [nodejs.org](https://nodejs.org/).
2. Mở PowerShell hoặc Terminal tại thư mục dự án.
3. Cài các gói phụ thuộc và chạy máy chủ phát triển:

   ```powershell
   npm install
   npm run dev
   ```

4. Mở địa chỉ được Astro in ra (thường là `http://localhost:4321`).
5. Kiểm tra kiểu và lỗi nội dung bằng `npm run check`; tạo website tĩnh bằng `npm run build`. Kết quả nằm trong `dist\`.

## Thêm truyện mới

1. Tạo file Markdown trong `src\content\stories\`, ví dụ `chiec-den-ben-song.md`.
2. Thêm ảnh bìa vào `public\images\` (SVG/WebP/JPEG đều được), rồi khai báo đường dẫn bắt đầu bằng `/images/`.
3. Thêm frontmatter theo mẫu:

   ```yaml
   ---
   title: "Chiếc đèn bên sông"
   slug: "chiec-den-ben-song"
   cover: "/images/chiec-den-ben-song.webp"
   coverAlt: "Chiếc đèn nhỏ tỏa ánh vàng bên bờ sông lúc chạng vạng"
   description: "Một đoạn giới thiệu ngắn, tối đa 240 ký tự."
   publishedAt: "2026-10-12"
   genres: ["Đời thường", "Chữa lành"]
   author: "Bút danh"
   pinned: true
   ---

   ## Chương 1: Tên chương

   Nội dung chương viết bằng Markdown. Mỗi tiêu đề `##` sẽ được hiển thị
   thành chương trong mục lục và bộ chuyển chương.
   ```

`slug` trong frontmatter phải duy nhất, dùng chữ thường không dấu, số và dấu gạch ngang, đồng thời phải trùng với tên file (không gồm `.md`) để URL luôn nhất quán. Truyện tự được sắp xếp mới nhất trước theo `publishedAt`; khi cuộn gần cuối bảng tin, 18 truyện kế tiếp tự được nối vào trang hiện tại. Nút **Tải thêm truyện** vẫn có thể bấm thủ công nếu muốn. Các URL nội dung `/trang/2/`, `/trang/3/`… vẫn được tạo sẵn để công cụ tìm kiếm thu thập toàn bộ truyện.

`pinned` là tùy chọn; đặt `true` để hiện nhãn “Đã ghim” trên thẻ truyện, hoặc bỏ trường này nếu không ghim.

## Đưa mã nguồn lên GitHub

Tạo repository GitHub, sau đó từ thư mục dự án chạy:

```powershell
git init
git add .
git commit -m "Create Nep story reading site"
git branch -M main
git remote add origin https://github.com/<ten-tai-khoan>/<ten-repository>.git
git push -u origin main
```

Các lần push tiếp theo sẽ kích hoạt build mới sau khi kết nối repository với Cloudflare Pages.

## Triển khai miễn phí lên Cloudflare Pages

1. Trong Cloudflare, chọn **Workers & Pages → Create application → Pages → Connect to Git** và chọn repository.
2. Đặt **Project name** theo tên Cloudflare Pages khả dụng; địa chỉ hiện tại là `https://chuyendoi-3zr.pages.dev`. Đặt **Framework preset** là `Astro`, **Build command** là `npm run build`, **Build output directory** là `dist`. Node.js 22.12 trở lên được khuyến nghị.
3. Trong **Settings → Environment variables**, thêm `SITE_URL` là `https://chuyendoi-3zr.pages.dev`. Dùng cùng giá trị này cho Production và Preview; sitemap, robots.txt và canonical được sinh từ địa chỉ đó.
4. Lưu cấu hình và triển khai. Những lần push GitHub tiếp theo tự động cập nhật website.

Ứng dụng dùng Astro xuất HTML tĩnh nên không cần adapter Cloudflare, Worker, database hay cấu hình billing. Có thể dùng tên miền miễn phí `*.pages.dev` hoặc gắn tên miền riêng.

## Tính năng

- Mỗi truyện có URL tĩnh `/truyen/<slug>/`, HTML đầy đủ, canonical, metadata Open Graph và mô tả SEO riêng.
- Có thể chuyển giữa giao diện sáng/tối; lựa chọn được lưu trên trình duyệt. Nội dung dùng font hệ thống phổ biến, dễ đọc và không cần tải font ngoài.
- Bảng tin có thể điều khiển bằng vuốt/cuộn, phím mũi tên và liên kết HTML; nhớ truyện gần nhất trong phiên.
- Ảnh truyện kế tiếp được tải trước khi cần; ảnh còn lại dùng lazy loading. Ảnh bìa mẫu là SVG tự lưu trong dự án, có phương án dự phòng khi ảnh lỗi.
- Chương được tạo từ các tiêu đề Markdown `##`; mục lục và liên kết chương trước/sau được tạo khi build.
- `/sitemap.xml` và `/robots.txt` được sinh khi build. `_headers` bật một số header bảo mật và cache ảnh.
- Không có quảng cáo tự bật, tài khoản, database hoặc thư viện giao diện ngoài Astro.
