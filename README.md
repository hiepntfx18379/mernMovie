# Web app  MERN Movie
# Miêu tả:
- Xử lý dữ liệu có được nhờ restful api trong nodejs
- Hiển thị dữ liệu lưu trong cơ sở dữ liệu trên bố cục trình duyệt
- Xây dựng các chức năng:
   + front-end: xác thực form, hiển thị thông báo, đường dẫn trang, hiển thị nội dung, tương tác người dùng
   + back-end: kết nối cơ sở dữ liệu, xử lý luồng logic, tạo-thêm-sửa-xóa-tìm-lọc dữ liệu
   + database: thiết kế cơ sở dữ liệu, tối ưu dữ liệu bằng pattern

# Công nghệ sử dụng: 
- server: sử dụng frameword express, MongoDB
   + Express là framework xây dựng phía máy chủ theo kiến trúc MVC với luồng hoạt động View -> Controller -> Model. Bởi tính linh hoạt dễ dàng cấu hình, express có cộng đồng lớn mạnh, bộ thư viện hỗ trợ đa dạng, có khả năng đồng bộ cao trên nhiều nền tảng, môi trường.
   + MongoDB là cơ sở dữ liệu hướng tài liệu, thích ứng dữ liệu thông dụng dạng JSON có một schema rất linh hoạt gọi là BSON. Dữ liệu lưu trữ phi cấu trúc, không có tính ràng buộc, toàn vẹn nên tính sẵn sàng cao, hiệu suất lớn và dễ dàng mở rộng lưu trữ.
- client: sử dụng thư viện React, Mui
  + React: là thư viện tạo giao diện người dùng, sẽ cập nhật hiệu quả dữ liệu và hiển thị nhanh khi dữ liệu thay đổi. Logic dễ dự đoán, dễ hiểu, và dễ sửa lỗi. Các thành phần có thể kế thừa, kết hợp tạo các khối phức tạp cập nhật trạng thái chính nó sử dụng cho chức năng nhất định. Thành phần logic được viết bằng javascript thay vì templates, vì vậy dễ dàng truyền dữ liệu qua lại.
  + Mui là 1 thư viện thiết kế cho React, mỗi thành phần là 1 React component. Hỗ trợ tích cức tạo giao diện người dùng
  
# Cài đặt:
- Yêu cầu Node >= 14.17, react >= 16.8.0
- Tải dự án: git clone https://github.com/hiepntfx18379/mernMovie.git
- Chạy trong terminal: npm install
- Chạy dự án:
     + Đường dẫn thư mục tới client: npm start
     + Đường dẫn thư mục tới server: npm start
