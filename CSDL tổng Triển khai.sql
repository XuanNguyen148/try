CREATE DATABASE QLNS;
USE QLNS;
-- Tạo bảng Phòng ban--
CREATE TABLE PhongBan (
    MaPB VARCHAR(10) PRIMARY KEY,
    TenPB VARCHAR(100)
);

-- Tạo bảng Vị trí 
CREATE TABLE ViTri ( 
MaVT VARCHAR(10) PRIMARY KEY, 
TenVT VARCHAR(100) UNIQUE NOT NULL 
);

-- Tạo bảng Nhân viên--
CREATE TABLE NhanVien (
    MaNV VARCHAR(10) PRIMARY KEY,
    TenNV VARCHAR(100) NOT NULL,
    NgaySinh DATE,
    NgayVaoLam DATE,
    ChungChi VARCHAR(30),
    GioiTinh VARCHAR(5),
    CCCD VARCHAR(20) UNIQUE,
    SDT VARCHAR(15),
    DiaChi VARCHAR(255),
    MaPB VARCHAR(10),
    MaVT VARCHAR(10),
    FOREIGN KEY (MaPB) REFERENCES PhongBan(MaPB),
    FOREIGN KEY (MaVT) REFERENCES ViTri (MaVT)
);

-- Tạo bảng Hợp đồng--
CREATE TABLE HopDong (
    MaHD VARCHAR(10) PRIMARY KEY,
    MaNV VARCHAR(10),
    SoHD VARCHAR(50) UNIQUE,
    LoaiHD VARCHAR(50),
    NgayKy DATE,
    NgayHieuLuc DATE,
    NgayHetHan DATE,
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
);

-- Tạo bảng Quyết định--
CREATE TABLE QuyetDinh (
    MaQD VARCHAR(10) PRIMARY KEY,
    LoaiQD VARCHAR(100) NOT NULL,
    MaNV VARCHAR(10),
    NgayHieuLuc DATE NOT NULL,
    NoiDung TEXT,
    SoQD VARCHAR(50) UNIQUE,
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
);

-- Tạo bảng Nghỉ việc--
CREATE TABLE NghiViec (
    MaNVNghi VARCHAR(10) PRIMARY KEY,
    MaNV VARCHAR(10),
    NgayNopDon DATE,
    NgayNghi DATE NOT NULL,
    LyDoNghi TEXT,
    TrangThai VARCHAR(50),
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
);

-- Tạo bảng Khen thưởng--
CREATE TABLE KhenThuong (
    MaKT VARCHAR(10) PRIMARY KEY,
    MaNV VARCHAR(10),
    NgayQD DATE NOT NULL,
    HinhThucKT VARCHAR(100),
    LyDoKT TEXT,
    SoQD VARCHAR(50) UNIQUE,
    MucThuong DECIMAL(15, 2),
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
);

-- Tạo bảng Kỷ luật--
CREATE TABLE KyLuat (
    MaKL VARCHAR(10) PRIMARY KEY,
    MaNV VARCHAR(10),
    NgayViPham DATE NOT NULL,
    HinhThucKL VARCHAR(100),
    LyDoKL TEXT,
    SoBBQD VARCHAR(50) UNIQUE,
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
);
-- Quản lý đánh giá 
CREATE TABLE KiDanhGia (
    MaKiDG CHAR(5) PRIMARY KEY,
    TenKiDG NVARCHAR(30) NOT NULL,
    ViTriDG NVARCHAR(10) NOT NULL,
    HANDG DATE NOT NULL,
    PPDG NVARCHAR(30) NOT NULL,
    TG DATE NOT NULL,
    MANV_TaoKiDG VARCHAR(10), -- Nhân viên nhân sự tạo kì đánh giá
    FOREIGN KEY (MANV_TaoKiDG) REFERENCES NhanVien(MaNV)
);

-- Tạo bảng Phiếu tự đánh giá
CREATE TABLE PhieuTuDanhGia (
    MaPTDG CHAR(5) PRIMARY KEY,
    AMSP INT CHECK (AMSP BETWEEN 1 AND 10),
    AHNV INT CHECK (AHNV BETWEEN 1 AND 10),
    QuanLy INT CHECK (QUANLY BETWEEN 1 AND 10),
    PhanTich INT CHECK (PHANTICH BETWEEN 1 AND 10),
    QLDUAN INT CHECK (QLDUAN BETWEEN 1 AND 10),
    GiaiQuyetVanDe INT CHECK (GIAIQUYETVANDE BETWEEN 1 AND 10),
    TinhThanTN INT CHECK (TINHTHANTN BETWEEN 1 AND 10),
    ThaiDo INT CHECK (THAIDO BETWEEN 1 AND 10),
    MaNV VARCHAR(10) NOT NULL,
    MaKiDG CHAR(5) NOT NULL,
    FOREIGN KEY (MANV) REFERENCES NhanVien(MaNV),
    FOREIGN KEY (MaKiDG) REFERENCES KiDanhGia(MaKYDG),
    CONSTRAINT UK_PTDG_NV_KY UNIQUE (MaNV, MaKYDG) -- Đảm bảo mỗi nhân viên chỉ có 1 phiếu tự đánh giá cho mỗi kì
);

-- Tạo bảng Phiếu quản lý đánh giá
CREATE TABLE PhieuQuanLyDanhGia (
    MAQLDG CHAR(5) PRIMARY KEY,
    AMSP INT CHECK (AMSP BETWEEN 1 AND 10),
    AHNV INT CHECK (AHNV BETWEEN 1 AND 10),
    QuanLy INT CHECK (QUANLY BETWEEN 1 AND 10),
    PhanTich INT CHECK (PHANTICH BETWEEN 1 AND 10),
    QLDUAN INT CHECK (QLDUAN BETWEEN 1 AND 10),
    GiaiQuyetVanDe INT CHECK (GIAIQUYETVANDE BETWEEN 1 AND 10),
    TinhThanTN INT CHECK (TINHTHANTN BETWEEN 1 AND 10),
    ThaiDo INT CHECK (THAIDO BETWEEN 1 AND 10),
    NhanXet NVARCHAR(500),
    TongDiem INT GENERATED ALWAYS AS (AMSP + AHNV + QUANLY + PHANTICH + QLDUAN + GIAIQUYETVANDE + TINHTHANTN + THAIDO) STORED,
    TinhTrang NVARCHAR(30) DEFAULT N'Chờ đánh giá',
    MaNV VARCHAR(10) NOT NULL, -- Nhân viên được đánh giá
    MaPTDG CHAR(5) NOT NULL,
    MaNV_QuanLy VARCHAR(10) NOT NULL, -- Quản lý đánh giá
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV),
    FOREIGN KEY (MaPTDG) REFERENCES PhieuTuDanhGia(MAPTDG),
    FOREIGN KEY (MaNV_QuanLy) REFERENCES NhanVien(MaNV)
);

-- Tạo bảng Phản hồi đánh giá
CREATE TABLE PhanHoiDanhGia (
    MAPH CHAR(5) PRIMARY KEY,
    MAQLDG CHAR(5) NOT NULL,
    PHcuaNV NVARCHAR(500),
    PHcuaQL NVARCHAR(500),
    FOREIGN KEY (MAQLDG) REFERENCES PhieuQuanLyDanhGia(MAQLDG)
);

-- Tạo bảng Báo cáo đánh giá
CREATE TABLE BaoCaoDanhGia (
    MABC CHAR(5) PRIMARY KEY,
    TenBC NVARCHAR(100) NOT NULL,
    NgayLapBC DATE NOT NULL,
    MaKyDG CHAR(5) NOT NULL,
    MaNV_NguoiLap VARCHAR(10) NOT NULL,
    NoiDung NVARCHAR(1000),
    FOREIGN KEY (MAKYDG) REFERENCES KiDanhGia(MAKYDG),
    FOREIGN KEY (MANV_NGUOILAP) REFERENCES NhanVien(MaNV)
);
-- quản lý tuyển dụng 
CREATE TABLE UngVien (
    MaUV VARCHAR(20) PRIMARY KEY,
    TenUngVien NVARCHAR(100) NOT NULL,
    DOB DATE,
    DiaChi NVARCHAR(200),
    TrinhDo NVARCHAR(50)
);

-- Create the tintuyendung (Job postings) table
CREATE TABLE TinTuyenDung (
    MaTin VARCHAR(20) PRIMARY KEY,
    MaPB VARCHAR(10) NOT NULL,
    TieuDe NVARCHAR(200) NOT NULL,
    DotTuyenDung NVARCHAR(50),
    ViTri NVARCHAR(100) NOT NULL,
    SL INT,
    LoaiHinh NVARCHAR(50),
    MucLuong NVARCHAR(100),
    MoTa TEXT,
    YeuCau TEXT,
	FOREIGN KEY (MaPB) REFERENCES PhongBan(MaPB)
);

-- Create the baocao (Reports) table with foreign key to tintuyendung
CREATE TABLE BaoCao (
    MaBC VARCHAR(20) PRIMARY KEY,
    MaTin VARCHAR(20) UNIQUE NOT NULL,
    MaPB VARCHAR (20),
    Thang INT NOT NULL,
    SLKH INT,
    SLTT INT,
    GhiChu TEXT,
    FOREIGN KEY (MaTin) REFERENCES TinTuyenDung(MaTin),
    FOREIGN KEY (MaPB) REFERENCES PhongBan(MaPB)
);

-- Create the lichphongvan (Interview schedules) table with foreign keys
CREATE TABLE LichPhongVan (
    MaLich VARCHAR(20) PRIMARY KEY,
    MaUV VARCHAR(20) NOT NULL,
    MaTin VARCHAR(20) NOT NULL,
    MaPB VARCHAR(10) NOT NULL,
    ViTri NVARCHAR(100) NOT NULL,
    NgayPV DATE NOT NULL,
    GioPV TIME NOT NULL,
    HinhThuc NVARCHAR(50),
    GhiChu TEXT,
    FOREIGN KEY (MaUV) REFERENCES ungvien(MaUV),
    FOREIGN KEY (MaTin) REFERENCES tintuyendung(MaTin),
    FOREIGN KEY (MaPB) REFERENCES PhongBan( MaPB)
);

-- Create the danhgia (Evaluations) table with foreign key to ungvien
CREATE TABLE DanhGia (
    MaDG VARCHAR(20) PRIMARY KEY,
    MaUV VARCHAR(20) UNIQUE NOT NULL,
    ViTri NVARCHAR(100) NOT NULL,
    Diem FLOAT,
    NhanXet TEXT,
    FOREIGN KEY (MaUV) REFERENCES ungvien(MaUV)
);



-- Quản lý chấm công 
-- Tạo bảng CHAMCONG (Attendance)
CREATE TABLE ChamCong (
    MaCC VARCHAR(10) PRIMARY KEY,
    MaNV VARCHAR(10) NOT NULL,
    Ngay DATE NOT NULL,
    GioDen TIME,
    GioVe TIME,
    TRangThai NVARCHAR(50) CHECK (TrangThai IN (N'Đi làm', N'Vắng mặt', N'Đi muộn', N'Về sớm', N'Nghỉ phép')),
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
);

-- Tạo bảng PHANHOICHAMCONG (Attendance Feedback)
CREATE TABLE PhanHoiChamCong (
    MaPHCC VARCHAR(10) PRIMARY KEY,
    MaCC VARCHAR(10) NOT NULL,
    NoiDung NVARCHAR(500),
    BangChung NVARCHAR(255), -- Có thể là đường dẫn đến tệp đính kèm
    FOREIGN KEY (MACC) REFERENCES ChamCong(MACC)
);

-- Tạo bảng DONXINNGHIPHEP (Leave Request)
CREATE TABLE DonXinNghiPhep (
    MaDXNP VARCHAR(10) PRIMARY KEY,
    MaNV VARCHAR(10) NOT NULL,
    LyDo NVARCHAR(500) NOT NULL,
    TGBatDau DATETIME NOT NULL,
    TGKetThuc DATETIME NOT NULL,
    TinhTrang NVARCHAR(50) DEFAULT N'Chờ duyệt' CHECK (TinhTrang IN (N'Chờ duyệt', N'Đã duyệt', N'Từ chối')),
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
);

-- Tạo bảng P_XETDUYETNP (Leave Approval)
CREATE TABLE P_XetDuyetNP (
    MaPXDNP VARCHAR(10) PRIMARY KEY,
    MaDXNP VARCHAR(10) NOT NULL,
    TinhTrang NVARCHAR(50) CHECK (TinhTrang IN (N'Chờ duyệt', N'Đã duyệt', N'Từ chối')),
    TGXetDuyet DATETIME NOT NULL,
    FOREIGN KEY (MaDXNP) REFERENCES DonXinNghiPhep(MaDXNP)
);

-- quản lý thuế 
CREATE TABLE ThongTinThue (
    MaNV CHAR(5) PRIMARY KEY,
    ThuNhapChinh DECIMAL(18,2),
    Thuong DECIMAL(18,2),
    PhuCap DECIMAL(18,2),
    GiamTru DECIMAL(18,2),
    BaoHiem DECIMAL(18,2),
    NhomNhanVien VARCHAR(20),
    CONSTRAINT fk_ThongTinThue_NhanVien FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV),
    CONSTRAINT chk_NhomNhanVien CHECK (
        NhomNhanVien IN ('co_hop_dong', 'khong_hop_dong', 'khong_cu_tru')
    )
);
CREATE TABLE ToKhaiThue (
    MaTK CHAR(5) PRIMARY KEY,
    MaNV CHAR(5),
    KyKeKhai VARCHAR(7),
    TongThuNhap DECIMAL(18,2),
    TongThuePhaiNop DECIMAL(18,2),
    CONSTRAINT fk_ToKhaiThue_NhanVien FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV),
    CONSTRAINT chk_KyKeKhai_Format CHECK (
        KyKeKhai LIKE '[1-2][0-9][0-9][0-9]-[0-1][0-9]'
        AND SUBSTRING(KyKeKhai, 6, 2) BETWEEN '01' AND '12'
    )
);
CREATE TABLE XacNhanThue (
    MaXN CHAR(5) PRIMARY KEY,
    MaNV CHAR(5),
    KyTinhThue VARCHAR(7),
    SoTienNop DECIMAL(18,2),
    NgayNop DATE,
    CONSTRAINT fk_XacNhanThue_NhanVien FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV),
    CONSTRAINT chk_KyTinhThue_Format CHECK (
        KyTinhThue LIKE '[1-2][0-9][0-9][0-9]-[0-1][0-9]'
        AND SUBSTRING(KyTinhThue, 6, 2) BETWEEN '01' AND '12'
    )
);

-- Quản lý mục tiêu 
-- Tạo bảng Mục Tiêu
CREATE TABLE MucTieu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    MaMT VARCHAR(10) NOT NULL UNIQUE,
    TenMC VARCHAR(255) NOT NULL,
    MoTa TEXT,
    NgayBatDau DATE NOT NULL,
    NgayHoanThanh DATE NOT NULL,
    TrangThai ENUM('Đang thực hiện', 'Hoàn thành', 'Tạm dừng') DEFAULT 'Đang thực hiện',
    TienDo INT DEFAULT 0 CHECK (TienDo >= 0 AND TienDo <= 100),
    MaPB VARCHAR(10),
    FOREIGN KEY (MaPB) REFERENCES PhongBan(MaPB)
);
-- quan lý bảo hiểm 


