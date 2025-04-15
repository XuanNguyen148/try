<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quản lý Bảo hiểm Xã hội</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="../static/qlbh.css">
    <link rel="stylesheet" href="../static/sidebar.css">
</head>
<body>
    <!-- Main Content -->
    <div class="d-flex">
        <?php include 'sidebar.php'; ?>
        <!-- Main Content -->
        <div class="main-content p-4">
            <h2 class="mb-4">Quản lý Bảo hiểm Xã hội</h2>

            <ul class="nav nav-tabs mb-4" id="insuranceTabs">
                <li class="nav-item">
                    <a class="nav-link active" data-bs-toggle="tab" href="#query">Tra cứu BHXH</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="tab" href="#update">Cập nhật thông tin</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="tab" href="#register">Khai báo tăng lao động</a>
                </li>
            </ul>

            <div class="tab-content">
                <div class="tab-pane fade show active" id="query">
                    <div class="card">
                        <div class="card-body">
                            <form id="queryForm">
                                <div class="mb-3">
                                    <label class="form-label">Mã số BHXH</label>
                                    <input type="text" class="form-control" id="insuranceId" placeholder="Nhập mã số BHXH">
                                </div>
                                <button type="submit" class="btn btn-primary">Tra cứu</button>
                            </form>
                            <div id="queryResult" class="mt-4"></div>
                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="update">
                    <div class="card">
                        <div class="card-body">
                            <form id="updateForm">
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Mã số BHXH</label>
                                        <input type="text" class="form-control" placeholder="Nhập mã số BHXH" required>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Mức lương đóng BHXH</label>
                                        <input type="number" class="form-control" placeholder="Nhập mức lương" required>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary">Cập nhật</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="register">
                    <div class="card">
                        <div class="card-body">
                            <form id="registerForm">
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Họ và tên</label>
                                        <input type="text" class="form-control" placeholder="Nhập họ và tên" required>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Ngày sinh</label>
                                        <input type="date" class="form-control" required>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">CCCD/CMND</label>
                                        <input type="text" class="form-control" placeholder="Nhập số CCCD/CMND" required>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Ngày bắt đầu tham gia</label>
                                        <input type="date" class="form-control" required>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary">Đăng ký</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../static/qlbh.js"></script>
</body>
</html>