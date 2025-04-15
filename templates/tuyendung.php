<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Hệ thống tuyển dụng</title>
  <link rel="stylesheet" href="../static/tuyendung.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
  <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap" rel="stylesheet" />
</head>
<body>
  <div class="container">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="profile">
        <img src="../static/avatar.jpg" alt="Avatar" class="avatar"/>
        <h3>HR Manager</h3>
        <p>Quản trị viên</p>
      </div>
      <div class="nav-links">
        <a href="#" data-page="dashboard" class="nav-link"><i class="fas fa-home"></i> Trang chính</a>
        <a href="#" data-page="interview"><i class="fas fa-calendar-alt"></i> Tạo lịch phỏng vấn</a>
        <a href="#" data-page="recruitment"><i class="fas fa-plus-circle"></i> Tạo tin tuyển dụng</a>
        <a href="#" data-page="evaluation"><i class="fas fa-star"></i> Đánh giá ứng viên</a>
        <a href="#" data-page="report"><i class="fas fa-chart-line"></i> Báo cáo chất lượng</a>
        <a href="#" data-page="approval"><i class="fas fa-check-circle"></i>Phê duyệt</a>
      </div>

      <!-- thêm nút trở về trang chủ -->
      <div class="sidebar-footer">
        <a href="index.php" class="btn btn-primary w-100 mt-4">
          <i class="fas fa-home"></i> Trở về trang chính
        </a>
      </div>
    </div>

    <!-- Main content -->
    <div class="main-content" id="main-content">
      <!-- Nội dung SPA sẽ hiển thị ở đây -->
    </div>
  </div>

  <script src="../static/tuyendung.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</body>
</html>

