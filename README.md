# Lab 9 — Weatherly

Nhập thành phố hoặc chọn gợi ý để xem nhiệt độ, độ ẩm và gió. Cần Internet. Dữ liệu hiện tại được cung cấp bởi Open-Meteo.

## Chạy độc lập

Mở chính thư mục Lab9 trong VS Code hoặc terminal. Mã nguồn, cấu hình và thư viện đều nằm trong thư mục này; không cần dự án ở thư mục cha.

~~~sh
npm ci
npm start
~~~

Bộ thư viện đã cài sẵn trong node_modules. Chỉ cần npm start để chạy ngay trên máy hiện tại. Sau khi sao chép hoặc tải lại mã nguồn, dùng npm ci để cài đúng lockfile.

- Web: npm run web.
- Android: npm run android, hoặc quét QR bằng Expo Go hỗ trợ SDK 58.
- iOS: dùng Expo Go tương thích; iOS Simulator cần macOS.
- Nếu điện thoại không kết nối được, kiểm tra mạng giữa điện thoại và máy tính.
- Khi chạy nhiều lab cùng lúc, đổi cổng: npm start -- --port 8089.

## Môi trường và tương thích

- Expo SDK 58.0.25, React 19.3.0, React Native 0.88.1.
- Node 24 LTS; phiên bản chọn trong .nvmrc là 24.14.1. Các nhánh Node được hỗ trợ khai báo trong package.json.
- Android 7+, iOS 16.4+, trình duyệt hiện đại. Có hỗ trợ bố cục máy tính bảng và xoay màn hình.
- JDK 21 đã có trên máy này. .java-version chỉ khai báo phiên bản cho build Android, không cài Java hay sửa JAVA_HOME.
- Expo Go và web không cần JDK. Build Android cục bộ cần Android Studio/SDK phù hợp; build iOS cục bộ cần macOS và Xcode 26.4+.
- Giữ cấu hình native mặc định do Expo sinh. Không cần tạo thư mục android/ios để chạy Expo Go.

## Kiểm tra

~~~sh
npm run lint
npm run typecheck
npm run check:dependencies
npm run doctor
npm test
npm run build:web
~~~

Xuất mã cho cả Android, iOS và web: npx expo export --platform all.
Các log kiểm tra và ảnh xem trước trên máy hiện tại nằm trong .validation/ (được bỏ qua bởi Git).
Xuất mã JavaScript không thay thế kiểm thử bản build trên thiết bị thật.

## Lưu ý

Không dùng npm run reset-project nếu muốn giữ nội dung bài thực hành.
Các thành phần giao diện nằm riêng trong src/components và không import từ lab khác.
Không có npm workspace, node_modules chung hoặc package.json ở thư mục tổng.

[Tài liệu Expo SDK 58 và giới hạn hệ điều hành](https://docs.expo.dev/versions/v58.0.0/)

Yêu cầu tìm kiếm cũ bị hủy; thời gian chờ tối đa 15 giây. Kết quả kiểm tra giao diện dùng dữ liệu API giả lập; dữ liệu trong ứng dụng lấy trực tiếp từ [Open-Meteo](https://open-meteo.com/en/docs).


## Kết quả kiểm tra ngày 16/11/2026

- Lint, TypeScript và kiểm tra phiên bản thư viện: đạt.
- Expo Doctor: đạt 20/20.
- Xuất JavaScript Android, iOS và web: đạt.
- Chrome: đạt ở 320×568, 768×1024, 1440×900 và 844×390, gồm sáng/tối, điều hướng và thao tác chính.
- Chưa kiểm thử bản cài native trên thiết bị thật.
- npm audit còn 8 cảnh báo mức vừa qua minimatch trong công cụ Expo/ESLint; không còn cảnh báo mức cao hoặc nghiêm trọng trong báo cáo hiện tại. npm đề xuất hạ Expo về SDK 52 khi dùng --force, vì vậy chưa áp dụng cách đó để giữ SDK 58.
- Chi tiết kiểm tra nằm ở .validation/checks.json; báo cáo phụ thuộc ở .validation/audit.log.
