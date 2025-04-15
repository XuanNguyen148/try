<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Hệ thống quản lý thuế TNCN</title>
  <link rel="stylesheet" href="../static/thue.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
</head>
<body>
  <div class="container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="avatar">
        <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="avatar" />
      </div>
      <div class="user-info">
        <h2>Nguyễn Văn A</h2>
        <p>Mã NV: NV123456</p>
        <p>Chức vụ: Nhân viên nhân sự</p>
      </div>
      <nav class="nav-links">
        <a href="#" data-page="home"><i class="fas fa-home"></i> Trang chủ</a>
        <a href="#" data-page="form"><i class="fas fa-file-alt"></i> Nhập thông tin thuế</a>
        <a href="#" data-page="declare" class="active"><i class="fas fa-calculator"></i> Tạo tờ khai</a>
        <a href="#" data-page="xacnhan"><i class="fas fa-check-circle"></i> Xác nhận đã nộp</a>
        <a href="#" data-page="tracuu"><i class="fas fa-search"></i> Tra cứu thuế</a>
      </nav>
    </aside>
    
    <!-- thêm nút trở về trang chủ -->
    <div class="sidebar-footer">
      <a href="index.php" class="btn btn-primary w-100 mt-4">
        <i class="fas fa-home"></i> Trở về trang chính
      </a>
    </div>

    <!-- Main content -->
    <main class="main-content" id="main-content">
      <div class="wrapper">
        <h1>Chọn nhân viên để tạo tờ khai thuế</h1>
        <input type="text" id="searchEmployee" placeholder="Tìm kiếm nhân viên...">
        <ul id="employeeList"></ul>
      </div>
    </main>
  </div>
  <script src="../static/thue.js"></script>
</body>
</html>
