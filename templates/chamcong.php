<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Hệ thống quản lý</title>
  <link rel="stylesheet" href="../static/chamcong.css"/>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script defer src="../static/chamcong.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
  <!-- thêm -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../static/sidebar.css">

</head>
<body>
  <!-- thêm -->
  <div class="d-flex">
    <?php include 'sidebar.php'; ?>

    <div class="main-area">
      <div class="header">
        <h2>Chào mừng trở lại, <span>HR Manager</span>!</h2>
        <p>Hệ thống quản lý nhân sự</p>
    </div>
    <div class="card-container" id="cardTrangChu">

      <div class="card card-blue"><i class="fas fa-bullseye"></i><span>Quản lý mục tiêu</span></div>
      <div class="card card-green"><i class="fas fa-clipboard-check"></i><span>Quản lý đánh giá</span></div>
      <div class="card card-purple"><i class="fas fa-users"></i><span>Quản lý tuyển dụng</span></div>
      <div class="card card-orange"><i class="fas fa-clock"></i><span>Quản lý chấm công</span></div>
      <div class="card card-red"><i class="fas fa-coins"></i><span>Quản lý thuế</span></div>
      <div class="card card-yellow"><i class="fas fa-shield-alt"></i><span>Quản lý bảo hiểm</span></div>
      <div class="card card-grey"><i class="fas fa-user-friends"></i><span>Quản lý nhân sự</span></div>

    </div>
    
    <!--  -->
    <div id="attendance-container" style="display: block;">
      <div class="attendance-buttons">
        <button id="btnChamCong">Chấm công</button>
        <button id="btnNghiPhep">Xin nghỉ phép</button>
        <button id="btnTongHopChamCong">Tổng hợp chấm công</button>
        <button id="btnTongHopNghiPhep">Tổng hợp nghỉ phép</button>
        <button id="btnBaoCao">Báo cáo</button>
      </div>
      <div id="attendance-content"></div>
    </div>
  </div>
</body>
</html>
