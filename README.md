# Tony Duong — personal portfolio

Portfolio của **Nguyễn Hải Dương**, định hướng **Java / Spring Boot backend**.
Nội dung đối chiếu với [GitHub TonyDuongg](https://github.com/TonyDuongg).

## Chạy trên máy

Yêu cầu Node.js **22.12+**, khuyến nghị **24 LTS**.

```powershell
cd D:\Project\Portfolio\Portfolio
npm.cmd ci
npm.cmd run dev
```

Mở địa chỉ Vite in trong terminal (mặc định http://127.0.0.1:5173).
Trên macOS/Linux dùng `npm` thay cho `npm.cmd`.
Không mở trực tiếp `index.html` bằng `file://` hay Live Server.

```powershell
npm.cmd run check     # Unit/component tests + TypeScript + production build
npm.cmd run preview   # Kiểm tra bản production tại http://127.0.0.1:4173
```

## Nền tảng

- React + TypeScript (strict), Vite trên Node.js.
- HTML được render sẵn lúc build bằng React DOM Server; trang có nội dung kể cả
  khi JavaScript chưa chạy. React hydrate để bật các tương tác.
- CSS thuần với design tokens, font DM Sans/Instrument Serif/Lora tự lưu trữ.
- Vitest + Testing Library cho lọc dự án, case notes, theme, menu, clipboard.
- Không cần Express, database hay server Node thường trực: đây là portfolio tĩnh,
  không có nghiệp vụ backend cần vận hành. Node.js dùng cho dev/build/render.

## Cấu trúc

```text
src/
  components/        Header, Hero, Projects, About, Contact, Icon
  data/portfolio.ts  Nội dung, liên kết, stack và ghi chú dự án có kiểu dữ liệu
  hooks/             Theme và scroll reveal
  styles/global.css  Màu sắc, typography, layout và responsive
  App.tsx            Ghép các phần của trang
  main.tsx           Client hydration
  entry-server.tsx   Static rendering
public/              Ảnh WebP, favicon, sitemap, redirect projects.html
scripts/             Prerender và pipeline tối ưu ảnh
design/2026-refresh/  Concept, design spec và biên bản kiểm thử
legacy/              Bản nguyên trạng HTML/CSS/JS trước khi chuyển đổi
```

Các file `style.css`, `scripts.js`, media và concept cũ ở root được giữ lại để bảo
toàn source trước đó. Chúng không được import hoặc đưa vào bản build mới.

## Chỉnh nội dung

Sửa `src/data/portfolio.ts` để thay dự án, thông tin liên hệ và toolkit.
Sửa `Hero.tsx`/`About.tsx` để thay phần giới thiệu. `global.css` giữ toàn bộ token
màu và breakpoint. Nội dung mặc định tiếng Anh để đồng nhất portfolio cũ.

Chỉ trình bày ba repo công khai có thật. Java/Spring Boot là định hướng chính;
Docker/AWS/Next.js ghi rõ là đang tìm hiểu, không giả lập kinh nghiệm hay dự án.
Hai ảnh bìa mới là minh họa biên tập, **không phải ảnh chụp sản phẩm**. Avatar pixel
gốc được giữ. Nhạc nền cũ không tự phát và không nằm trong bundle mới.

## GitHub Pages

Workflow `.github/workflows/deploy.yml` kiểm tra PR, build `dist/`, và deploy khi
push vào `main`. Trong GitHub: **Settings → Pages → Source → GitHub Actions**.
Thay đổi cài đặt và push/deploy cần do chủ repo thực hiện; chưa tự xuất bản.
Các asset dùng đường dẫn tương đối, tương thích `/Portfolio/` và domain gốc.
URL `projects.html` cũ chuyển về `#work`.

Nếu đổi domain, cập nhật canonical/Open Graph/JSON-LD trong `index.html`, cùng
`public/sitemap.xml`, `public/robots.txt` và hai redirect `projects.html`.

## Tính năng và accessibility

Lọc dự án, case notes đóng/mở, theme lưu ở localStorage, menu mobile hỗ trợ Escape,
copy email có fallback, liên kết mailto/social thật. Skip link, focus ring,
ngữ nghĩa heading, aria-expanded/pressed, reduced-motion và không autoplay.
Không gửi email thay người dùng, không thu thập dữ liệu biểu mẫu.
