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
- CSS thuần với design tokens. Một font duy nhất: Bricolage Grotesque (variable,
  có trục độ rộng, hỗ trợ tiếng Việt), tự lưu trữ qua Fontsource.
- `agent-redact` là dependency: trang dùng bộ pattern thật của gói
  (`agent-redact/patterns`) để chạy ô che secret ngay trên trình duyệt.
  `src/lib/redact.test.ts` đối chiếu kết quả với engine thật của gói.
- Vitest + Testing Library cho nội dung, ô redact, theme, clipboard.
- Không cần Express, database hay server Node thường trực: đây là portfolio tĩnh,
  không có nghiệp vụ backend cần vận hành. Node.js dùng cho dev/build/render.

## Cấu trúc

```text
src/
  components/        Header, Hero, Work, Redactor, Stack, About, Contact,
                     Footer, PixelName (chữ TONYD pixel), Icon
  data/portfolio.ts  Dự án, stack, tỉ lệ ngôn ngữ, credit ảnh
  lib/redact.ts      Vòng lặp che secret cho trình duyệt (port từ agent-redact)
  hooks/             Theme và scroll reveal
  styles/global.css  Màu sắc, typography, layout và responsive
  App.tsx            Ghép các phần của trang
  main.tsx           Client hydration
  entry-server.tsx   Static rendering
public/              Ảnh WebP, favicon, sitemap, redirect projects.html
scripts/             Prerender
design/2026-refresh/  Concept, design spec và biên bản kiểm thử
legacy/              Bản nguyên trạng HTML/CSS/JS trước khi chuyển đổi
```

Các file `style.css`, `scripts.js`, media và concept cũ ở root được giữ lại để bảo
toàn source trước đó. Chúng không được import hoặc đưa vào bản build mới.

## Chỉnh nội dung

Sửa `src/data/portfolio.ts` để thay dự án, stack và liên hệ. Sửa `Hero.tsx`/`About.tsx`
để thay phần giới thiệu. `global.css` giữ toàn bộ token màu và breakpoint. Nội dung
tiếng Anh.

Thiết kế (11/2026): chữ TONYD pixel lấy từ avatar làm "tượng đài" toàn chiều ngang,
avatar thay chữ O; màu nền đỏ thẫm + chữ vàng lấy từ avatar và game Tiến Lên. Không
nhãn eyebrow, không số thứ tự 01/02, không đường kẻ mảnh, không gradient, không bóng.

Chỉ trình bày repo công khai có thật (đối chiếu ngày 25/11/2026). Số lượt tải npm
(2.302 trong 30 ngày đến 24/11/2026) và tỉ lệ ngôn ngữ (Java 44,6%) là ảnh chụp tại
thời điểm đó; cập nhật thủ công trong `Redactor.tsx` và `data/portfolio.ts`.

Ảnh: avatar pixel gốc; ảnh chụp màn hình game Tiến Lên; SVG contribution snake từ
nhánh `output` của repo profile. Hai ảnh từ Wikimedia Commons (phối cảnh khuôn
viên FPT HCM, CC BY-SA 4.0; đường phố TP.HCM ban đêm, CC0) có credit ở footer.
Khung Creator Studio và terminal agent-redact là giao diện vẽ bằng HTML theo
README của repo, không phải ảnh chụp ứng dụng.

## GitHub Pages

Workflow `.github/workflows/deploy.yml` kiểm tra PR, build `dist/`, và deploy khi
push vào `main`. Trong GitHub: **Settings → Pages → Source → GitHub Actions**.
Thay đổi cài đặt và push/deploy cần do chủ repo thực hiện; chưa tự xuất bản.
Các asset dùng đường dẫn tương đối, tương thích `/Portfolio/` và domain gốc.
URL `projects.html` cũ chuyển về `#work`.

Nếu đổi domain, cập nhật canonical/Open Graph/JSON-LD trong `index.html`, cùng
`public/sitemap.xml`, `public/robots.txt` và hai redirect `projects.html`.

## Tính năng và accessibility

Ô redact chạy trực tiếp (không gửi dữ liệu đi đâu), theme sáng/tối lưu ở
localStorage, copy email có fallback, liên kết mailto/social thật. Skip link, focus
ring, mỗi section có heading, reduced-motion tắt mọi chuyển động, không autoplay.
Không gửi email thay người dùng, không thu thập dữ liệu biểu mẫu.
