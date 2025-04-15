// xóa phần chặn chuyển tiếp

// Thêm vào đầu file, ngay sau khai báo const đầu tiên
document.addEventListener('DOMContentLoaded', function() {
    // Ẩn card container
    document.getElementById("cardTrangChu").style.display = "none";
    
    // Hiển thị container chấm công
    document.getElementById("attendance-container").style.display = "block";
    
    // Set active cho menu chấm công
    setActiveSidebar("menuChamCong");
    
    // Khởi tạo events và hiển thị form chấm công
    addAttendanceFunctionEvents();
    showChamCong();
});

// Hiệu ứng click card
const cards = document.querySelectorAll(".card");
cards.forEach(card => {
  card.addEventListener("click", () => {
    // Không alert nếu là card "Quản lý chấm công"
    if (!card.classList.contains("card-orange")) {
      alert(`Bạn đã chọn: ${card.innerText.trim()}`);
    }
  });
});

const chamCongCard = document.querySelector(".card-orange");
const container = document.getElementById("attendance-container");
const content = document.getElementById("attendance-content");

chamCongCard.addEventListener("click", () => {
  document.getElementById("cardTrangChu").style.display = "none";
  container.style.display = "block";
  setActiveSidebar("menuChamCong");
  addAttendanceFunctionEvents(); // <--- thêm dòng này
  showChamCong();
});


const buttons = document.querySelectorAll(".attendance-buttons button");

function setActiveButton(activeId) {
  buttons.forEach(btn => {
    if (btn.id === activeId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

document.getElementById("btnChamCong").addEventListener("click", () => {
  setActiveButton("btnChamCong");
  showChamCong();
});
document.getElementById("btnNghiPhep").addEventListener("click", () => {
  setActiveButton("btnNghiPhep");
  showXinNghiPhep();
});
function showXinNghiPhep() {
  content.innerHTML = `
    <h3 style="margin-bottom: 16px;">📝 Xin nghỉ phép</h3>

    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 24px;">
      <form id="formNghiPhep">
        <div style="display: flex; flex-wrap: wrap; gap: 20px;">
          <div style="flex: 1; min-width: 200px;">
            <label style="font-weight: 600;">Ngày bắt đầu:</label><br/>
            <input type="date" id="ngayBatDau" required style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #ccc;">
          </div>

          <div style="flex: 1; min-width: 200px;">
            <label style="font-weight: 600;">Ngày kết thúc:</label><br/>
            <input type="date" id="ngayKetThuc" required style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #ccc;">
          </div>
        </div>

        <div style="margin-top: 16px;">
          <label style="font-weight: 600;">Lý do nghỉ phép:</label><br/>
          <textarea id="lyDo" rows="3" required style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #ccc;"></textarea>
        </div>

        <div style="margin-top: 16px; text-align: right;">
          <button type="submit" id="btnGuiDon" style="
            padding: 10px 20px;
            background-color: #2196f3;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            transition: background-color 0.3s;
          ">📨 Gửi đơn nghỉ</button>
        </div>
      </form>
    </div>

    <h4 style="margin-bottom: 12px;">📜 Lịch sử nộp đơn xin nghỉ phép</h4>
    <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #2196f3; color: white;">
            <th>Mã NV</th>
            <th>Tên NV</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Lý do</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody id="nghiPhepList"></tbody>
      </table>
    </div>
  `;

  // 👇 Hover cho nút gửi đơn
  const btn = document.getElementById("btnGuiDon");
  btn.addEventListener("mouseover", () => {
    btn.style.backgroundColor = "#4caf50";
  });
  btn.addEventListener("mouseout", () => {
    btn.style.backgroundColor = "#2196f3";
  });

  const form = document.getElementById("formNghiPhep");
  const tbody = document.getElementById("nghiPhepList");
  // Lấy lịch sử từ localStorage
  const lichSu = JSON.parse(localStorage.getItem("lichSuNghiPhep")) || [];

  function renderLichSu() {
    tbody.innerHTML = "";
    lichSu.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.ma}</td>
        <td>${item.ten}</td>
        <td>${item.batDau}</td>
        <td>${item.ketThuc}</td>
        <td>${item.lyDo}</td>
        <td>${item.trangThai}</td>
      `;
      tbody.appendChild(row);
    });
  }
/////////////////////////////////////////////////////////////////
  renderLichSu(); // render khi load

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const bd = document.getElementById("ngayBatDau").value;
    const kt = document.getElementById("ngayKetThuc").value;
    const lyDo = document.getElementById("lyDo").value;

    const don = {
      ma: "NV001",
      ten: "Nguyễn Văn A",
      batDau: bd,
      ketThuc: kt,
      lyDo: lyDo,
      trangThai: "Chờ duyệt"
    };

    lichSu.push(don);
    localStorage.setItem("lichSuNghiPhep", JSON.stringify(lichSu));
    renderLichSu();
    form.reset();
  });
}


let daChamCong = false;
function showChamCong() {
  let gioDen = "";
  let currentRow = null;

  const contentHTML = `
    <div style="text-align: center; margin-bottom: 30px;">
      <button id="nutChamCong" style="
        padding: 20px 50px;
        font-size: 22px;
        font-weight: bold;
        background-color: #2196f3;
        color: white;
        border: none;
        border-radius: 14px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
        box-shadow: 0 4px 14px rgba(33, 150, 243, 0.4);
      ">Chấm công đến</button>
    </div>

    <table border="1" style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th>Ngày</th>
          <th>Giờ đến</th>
          <th>Giờ về</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody id="bangChamCong"></tbody>
    </table>

    <div id="lichSuChamCongBox" style="margin-top: 40px; padding-top: 20px; border-top: 2px dashed #ccc;">
      <h3 style="margin-bottom: 12px;">📅 Lịch sử chấm công</h3>
      <div style="margin-bottom: 16px; display: flex; gap: 12px; flex-wrap: wrap;">
        <label>Từ ngày: <input type="date" id="tuNgayLichSu" /></label>
        <label>Đến ngày: <input type="date" id="denNgayLichSu" /></label>
        <button id="btnApDungLichSu" style="padding: 8px 16px; background: #2196f3; color: white; border: none; border-radius: 6px;">Áp dụng</button>
      </div>

      <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Giờ đến</th>
            <th>Giờ về</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody id="bangLichSuChamCong"></tbody>
      </table>
    </div>
  `;

  content.innerHTML = contentHTML;

  const nutChamCong = document.getElementById("nutChamCong");
  nutChamCong.addEventListener("mouseenter", () => {
    if (!daChamCongDen) {
      nutChamCong.innerText = "Chấm công về";
      nutChamCong.style.backgroundColor = "#f44336";
      nutChamCong.style.boxShadow = "0 4px 14px rgba(244, 67, 54, 0.4)";
    }
  });
  
  nutChamCong.addEventListener("mouseleave", () => {
    if (!daChamCongDen) {
      nutChamCong.innerText = "Chấm công đến";
      nutChamCong.style.backgroundColor = "#2196f3";
      nutChamCong.style.boxShadow = "0 4px 14px rgba(33, 150, 243, 0.4)";
    }
  });
  
  
  const tbody = document.getElementById("bangChamCong");

  const chamCongData = JSON.parse(localStorage.getItem("chamCongData")) || [];
  const chamCongStatus = JSON.parse(localStorage.getItem("chamCongStatus")) || {
    daChamCongDen: false,
    gioDen: null
  };

  const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  chamCongData.forEach(item => {
    if (item.ngay === todayStr) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.ngay}</td>
        <td>${item.gioDen}</td>
        <td class="gioVe">${item.gioVe || "-"}</td>
        <td class="trangThai ${item.classTrangThai || ""}">${item.trangThai}</td>
      `;
      tbody.appendChild(row);
    }
  });
  

  let daChamCongDen = chamCongStatus.daChamCongDen;
  if (daChamCongDen) {
    nutChamCong.innerText = "Chấm công về";
    nutChamCong.style.backgroundColor = "#f44336";
    nutChamCong.style.boxShadow = "0 4px 14px rgba(244, 67, 54, 0.4)";
    gioDen = new Date(chamCongStatus.gioDen);
  }

  nutChamCong.addEventListener("click", () => {
    const now = new Date();
    const gioStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const ngayStr = now.toISOString().split("T")[0]; // YYYY-MM-DD


    if (!daChamCongDen) {
      gioDen = now;
      daChamCongDen = true;

      nutChamCong.innerText = "Chấm công về";
      nutChamCong.style.backgroundColor = "#f44336";
      nutChamCong.style.boxShadow = "0 4px 14px rgba(244, 67, 54, 0.4)";

      currentRow = document.createElement("tr");
      currentRow.innerHTML = `
        <td>${ngayStr}</td>
        <td>${gioStr}</td>
        <td class="gioVe">-</td>
        <td class="trangThai">Đang làm</td>
      `;
      tbody.appendChild(currentRow);

      chamCongData.push({
        ngay: ngayStr,
        gioDen: gioStr,
        gioVe: "",
        trangThai: "Đang làm",
        classTrangThai: ""
      });

      localStorage.setItem("chamCongData", JSON.stringify(chamCongData));
      localStorage.setItem("chamCongStatus", JSON.stringify({
        daChamCongDen: true,
        gioDen: gioDen.toISOString()
      }));

    } else {
      const gioVe = now;
      const gioVeStr = gioVe.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const gioDenHour = gioDen.getHours();
      const gioVeHour = gioVe.getHours();

      let trangThai = "";
      let classTrangThai = "";

      if (gioDenHour >= 8) {
        trangThai = "Chấm công muộn";
        classTrangThai = "trangThai-muon";
      } else if (gioVeHour < 17) {
        trangThai = "Thiếu giờ làm";
        classTrangThai = "trangThai-thieu";
      } else {
        trangThai = "Đã chấm công thành công";
        classTrangThai = "trangThai-thanhcong";
      }

      const veCell = tbody.lastChild.querySelector(".gioVe");
      const trangThaiCell = tbody.lastChild.querySelector(".trangThai");
      veCell.innerText = gioVeStr;
      trangThaiCell.innerText = trangThai;
      trangThaiCell.classList.add(classTrangThai);

      const last = chamCongData[chamCongData.length - 1];
      last.gioVe = gioVeStr;
      last.trangThai = trangThai;
      last.classTrangThai = classTrangThai;

      localStorage.setItem("chamCongData", JSON.stringify(chamCongData));
      localStorage.setItem("chamCongStatus", JSON.stringify({
        daChamCongDen: false,
        gioDen: null
      }));

      daChamCongDen = false;
      nutChamCong.innerText = "Chấm công đến";
      nutChamCong.style.backgroundColor = "#2196f3";
      nutChamCong.style.boxShadow = "0 4px 14px rgba(33, 150, 243, 0.4)";
    }
  });

  // Sự kiện áp dụng lịch sử
  document.getElementById("btnApDungLichSu").addEventListener("click", () => {
    const tuNgay = document.getElementById("tuNgayLichSu").value;
    const denNgay = document.getElementById("denNgayLichSu").value;
    const tbodyLichSu = document.getElementById("bangLichSuChamCong");

    if (!tuNgay || !denNgay) {
      alert("🛑 Vui lòng chọn đầy đủ ngày bắt đầu và kết thúc.");
      return;
    }

    const tu = new Date(tuNgay);
    const den = new Date(denNgay);

    const loc = chamCongData.filter(item => {
      const ngayItem = new Date(item.ngay);
      return ngayItem >= tu && ngayItem <= den;
    });

    tbodyLichSu.innerHTML = "";
    loc.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.ngay}</td>
        <td>${item.gioDen}</td>
        <td>${item.gioVe || "-"}</td>
        <td class="${item.classTrangThai || ""}">${item.trangThai}</td>
      `;
      tbodyLichSu.appendChild(row);
    });
  });
}

const danhSachNhanVien = {
  NV001: { ten: "Nguyễn Văn A", phongBan: "Phòng IT" },
  NV002: { ten: "Trần Thị B", phongBan: "Phòng Kế toán" },
  NV003: { ten: "Lê Văn C", phongBan: "Phòng Nhân sự" }
};
document.getElementById("menuChamCong").addEventListener("click", e => {
  e.preventDefault();
  setActiveSidebar("menuChamCong");
  document.getElementById("cardTrangChu").style.display = "none";
  container.style.display = "block";
  addAttendanceFunctionEvents(); // <--- thêm dòng này
  showChamCong();
});
document.getElementById("menuTrangChu").addEventListener("click", e => {
  e.preventDefault();
  setActiveSidebar("menuTrangChu");
  document.getElementById("cardTrangChu").style.display = "flex";
  container.style.display = "none";
});
document.getElementById("btnTongHopChamCong").addEventListener("click", () => {
  setActiveButton("btnTongHopChamCong");
  showTongHopChamCong();
});
document.getElementById("btnTongHopNghiPhep").addEventListener("click", () => {
  setActiveButton("btnTongHopNghiPhep");
  showTongHopNghiPhep();
});
document.getElementById("btnBaoCao").addEventListener("click", () => {
  setActiveButton("btnBaoCao");
  showBaoCao();
});
document.getElementById("loaiBaoCao").addEventListener("change", (e) => {
  const thongKeBox = document.getElementById("chonLoaiThongKe");
  thongKeBox.style.display = e.target.value === "thongke" ? "block" : "none";
});




function addAttendanceFunctionEvents() {
  const btnChamCong = document.getElementById("btnChamCong");
  const btnNghiPhep = document.getElementById("btnNghiPhep");

  const allButtons = [btnChamCong, btnNghiPhep];

  function setActiveButton(activeId) {
    allButtons.forEach(btn => {
      if (btn) {
        if (btn.id === activeId) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      }
    });
  }

  if (btnChamCong) {
    btnChamCong.addEventListener("click", () => {
      setActiveButton("btnChamCong");
      showChamCong();
    });
  }

  if (btnNghiPhep) {
    btnNghiPhep.addEventListener("click", () => {
      setActiveButton("btnNghiPhep");
      showXinNghiPhep();
    });
  }
}



function showTongHopChamCong() {
  content.innerHTML = `
    <h3 style="margin-bottom: 16px;">Tổng hợp dữ liệu chấm công</h3>

    <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 20px;">
      <select id="locPhong">
        <option value="">-- Lọc phòng ban --</option>
        <option>Phòng Kế toán</option>
        <option>Phòng Nhân sự</option>
        <option>Phòng IT</option>
      </select>

      <select id="locThang">
        <option value="">-- Lọc tháng --</option>
        ${[...Array(12)].map((_, i) => `<option value="${i+1}">Tháng ${i + 1}</option>`).join("")}
      </select>

      <select id="locNam">
        <option value="">-- Lọc năm --</option>
        <option>2024</option>
        <option>2025</option>
      </select>

      <select id="locTrangThai">
        <option value="">-- Lọc trạng thái --</option>
        <option>Đã chấm công thành công</option>
        <option>Chấm công muộn</option>
        <option>Thiếu giờ làm</option>
      </select>

      <button id="btnApDung" style="padding: 8px 16px; background: #2196f3; color: white; border: none; border-radius: 6px;">Áp dụng</button>
      <button id="btnResetLoc" style="padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 6px;">Reset</button>

    </div>

    <table border="1" style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th>Mã NV</th>
          <th>Tên NV</th>
          <th>Phòng ban</th>
          <th>Ngày</th>
          <th>Giờ đến</th>
          <th>Giờ về</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody id="bangTongHopChamCong"></tbody>
    </table>
  `;

  const tbody = document.getElementById("bangTongHopChamCong");

  // Hàm render dữ liệu theo bộ lọc
  function renderBang(data) {
    tbody.innerHTML = "";
    data.forEach((item, index) => {
      const maNV = Object.keys(danhSachNhanVien)[index % 3]; // Lặp lại NV001, NV002, NV003
      const nv = danhSachNhanVien[maNV];
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${maNV}</td>
        <td>${nv.ten}</td>
        <td>${nv.phongBan}</td>
        <td>${item.ngay}</td>
        <td>${item.gioDen}</td>
        <td>${item.gioVe || "-"}</td>
        <td class="${item.classTrangThai || ""}">${item.trangThai}</td>
      `;
      tbody.appendChild(row);
    });
  }

  const duLieu = JSON.parse(localStorage.getItem("chamCongData")) || [];
  renderBang(duLieu);

  document.getElementById("btnApDung").addEventListener("click", () => {
    const phong = document.getElementById("locPhong").value;
    const thang = document.getElementById("locThang").value;
    const nam = document.getElementById("locNam").value;
    const trangThai = document.getElementById("locTrangThai").value;

    const loc = duLieu.filter((item, i) => {
      const maNV = Object.keys(danhSachNhanVien)[i % 3];
      const nv = danhSachNhanVien[maNV];
      const ngay = new Date(item.ngay);
      const thangItem = ngay.getMonth() + 1;
      const namItem = ngay.getFullYear();

      return (!phong || nv.phongBan === phong)
        && (!thang || thangItem == thang)
        && (!nam || namItem == nam)
        && (!trangThai || item.trangThai === trangThai);
    });

    renderBang(loc);
  });
  document.getElementById("btnResetLoc").addEventListener("click", () => {
    document.getElementById("locPhong").value = "";
    document.getElementById("locThang").value = "";
    document.getElementById("locNam").value = "";
    document.getElementById("locTrangThai").value = "";
  
    renderBang(duLieu); // Hiện lại tất cả dữ liệu
  });
  
}
function showTongHopNghiPhep() {
  content.innerHTML = `
    <h3 style="margin-bottom: 16px;">📜 Danh sách đơn xin nghỉ phép</h3>


    <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 20px;">
      <select id="locPhongNP">
        <option value="">-- Lọc phòng ban --</option>
        <option>Phòng Kế toán</option>
        <option>Phòng Nhân sự</option>
        <option>Phòng IT</option>
      </select>

      <select id="locThangNP">
        <option value="">-- Lọc tháng --</option>
        ${[...Array(12)].map((_, i) => `<option value="${i + 1}">Tháng ${i + 1}</option>`).join("")}
      </select>

      <select id="locNamNP">
        <option value="">-- Lọc năm --</option>
        <option>2024</option>
        <option>2025</option>
      </select>

      <select id="locTrangThaiNP">
        <option value="">-- Lọc trạng thái --</option>
        <option>Phê duyệt</option>
        <option>Không phê duyệt</option>
      </select>

      <button id="btnApDungNP" style="padding: 8px 16px; background: #2196f3; color: white; border: none; border-radius: 6px;">Áp dụng</button>
      <button id="btnResetLocNP" style="padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 6px;">Reset</button>
    </div>

    <table border="1" style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th>Mã NV</th>
          <th>Tên NV</th>
          <th>Phòng ban</th>
          <th>Ngày bắt đầu</th>
          <th>Ngày kết thúc</th>
          <th>Lý do</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody id="bangTongHopNghiPhep"></tbody>
    </table>

    <div style="text-align: right; margin-top: 16px;">
      <button id="btnLuuNP" style="padding: 10px 20px; background-color: #4caf50; color: white; border: none; border-radius: 6px;">Lưu</button>
    </div>
  `;

  const tbody = document.getElementById("bangTongHopNghiPhep");

  // Dữ liệu giả lập
  let duLieuNP = [
    {
      ma: "NV001", ten: "Nguyễn Văn A", phong: "Phòng IT",
      tu: "2025-04-10", den: "2025-04-12", lyDo: "Về quê", trangThai: "Phê duyệt"
    },
    {
      ma: "NV002", ten: "Trần Thị B", phong: "Phòng Kế toán",
      tu: "2025-04-11", den: "2025-04-13", lyDo: "Bệnh", trangThai: "Không phê duyệt"
    },
    {
      ma: "NV003", ten: "Lê Văn C", phong: "Phòng Nhân sự",
      tu: "2025-04-05", den: "2025-04-08", lyDo: "Đi du lịch", trangThai: "Phê duyệt"
    }
  ];

  function renderBang(data) {
    tbody.innerHTML = "";
    data.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.ma}</td>
        <td>${item.ten}</td>
        <td>${item.phong}</td>
        <td>${item.tu}</td>
        <td>${item.den}</td>
        <td>${item.lyDo}</td>
        <td>
          <select data-index="${index}">
            <option ${item.trangThai === "Phê duyệt" ? "selected" : ""}>Phê duyệt</option>
            <option ${item.trangThai === "Không phê duyệt" ? "selected" : ""}>Không phê duyệt</option>
          </select>
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  renderBang(duLieuNP);

  document.getElementById("btnApDungNP").addEventListener("click", () => {
    const phong = document.getElementById("locPhongNP").value;
    const thang = document.getElementById("locThangNP").value;
    const nam = document.getElementById("locNamNP").value;
    const trangThai = document.getElementById("locTrangThaiNP").value;

    const loc = duLieuNP.filter(item => {
      const ngayBD = new Date(item.tu);
      const thangItem = ngayBD.getMonth() + 1;
      const namItem = ngayBD.getFullYear();

      return (!phong || item.phong === phong)
        && (!thang || thangItem == thang)
        && (!nam || namItem == nam)
        && (!trangThai || item.trangThai === trangThai);
    });

    renderBang(loc);
  });

  document.getElementById("btnResetLocNP").addEventListener("click", () => {
    document.getElementById("locPhongNP").value = "";
    document.getElementById("locThangNP").value = "";
    document.getElementById("locNamNP").value = "";
    document.getElementById("locTrangThaiNP").value = "";
    renderBang(duLieuNP);
  });

  // 👉 Sự kiện LƯU: cập nhật trạng thái từ các dropdown trong bảng
  document.getElementById("btnLuuNP").addEventListener("click", () => {
    const selects = tbody.querySelectorAll("select");
    selects.forEach(select => {
      const index = select.getAttribute("data-index");
      const newTrangThai = select.value;
      duLieuNP[index].trangThai = newTrangThai;
    });

    alert("✅ Đã lưu trạng thái duyệt thành công!");
  });
}
function showBaoCao() {
  content.innerHTML = `
    <h3 style="margin-bottom: 16px;">Báo cáo tổng hợp</h3>

    <div style="margin-bottom: 16px;">
      <label><strong>Chọn loại báo cáo:</strong></label><br/>
      <select id="loaiBaoCao" style="padding: 8px; margin-top: 6px;">
        <option value="chamcong">Báo cáo chấm công</option>
        <option value="nghiphep">Báo cáo nghỉ phép</option>
        <option value="thongke">Thống kê</option>
      </select>
    </div>

    <div id="chonLoaiThongKe" style="display: none; margin-bottom: 16px;">
      <label><strong>Chọn loại thống kê:</strong></label><br/>
      <select id="loaiThongKe" style="padding: 8px; margin-top: 6px;">
        <option value="chamcong">Thống kê chấm công</option>
        <option value="nghiphep">Thống kê nghỉ phép</option>
      </select>
    </div>

    <div id="chonKieuBieuDo" style="display: none; margin-bottom: 16px;">
      <label><strong>Chọn kiểu biểu đồ:</strong></label><br/>
      <select id="kieuBieuDo" style="padding: 8px; margin-top: 6px;">
        <option value="pie">Biểu đồ tròn (Pie)</option>
        <option value="doughnut">Biểu đồ bánh rỗng (Doughnut)</option>
        <option value="bar">Biểu đồ cột (Bar)</option>
      </select>
    </div>

    <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 20px;">
      <select id="locPhongBC">
        <option value="">-- Lọc phòng ban --</option>
        <option>Phòng Kế toán</option>
        <option>Phòng Nhân sự</option>
        <option>Phòng IT</option>
      </select>

      <select id="locThangBC">
        <option value="">-- Lọc tháng --</option>
        ${[...Array(12)].map((_, i) => `<option value="${i + 1}">Tháng ${i + 1}</option>`).join("")}
      </select>

      <select id="locNamBC">
        <option value="">-- Lọc năm --</option>
        <option>2024</option>
        <option>2025</option>
      </select>

      <button id="btnApDungBC" style="padding: 8px 16px; background: #2196f3; color: white; border: none; border-radius: 6px;">Tạo báo cáo</button>
    </div>

    <div id="baoCaoTableArea"></div>
  `;

  const loaiBaoCaoSelect = document.getElementById("loaiBaoCao");
  loaiBaoCaoSelect.addEventListener("change", (e) => {
    const thongKeBox = document.getElementById("chonLoaiThongKe");
    const bieuDoBox = document.getElementById("chonKieuBieuDo");
    const isThongKe = e.target.value === "thongke";
    thongKeBox.style.display = isThongKe ? "block" : "none";
    bieuDoBox.style.display = isThongKe ? "block" : "none";
  });

  document.getElementById("btnApDungBC").addEventListener("click", () => {
    const loai = document.getElementById("loaiBaoCao").value;
    const phong = document.getElementById("locPhongBC").value;
    const thang = document.getElementById("locThangBC").value;
    const nam = document.getElementById("locNamBC").value;
    const area = document.getElementById("baoCaoTableArea");
    area.innerHTML = "";

    if (loai === "thongke") {
      const loaiTK = document.getElementById("loaiThongKe").value;
      const kieu = document.getElementById("kieuBieuDo").value;
      area.innerHTML = `
        <h4>Biểu đồ thống kê: ${loaiTK === "chamcong" ? "Chấm công" : "Nghỉ phép"}</h4>
        <div style="max-width: 600px; margin: auto;">
          <canvas id="bieuDoThongKe" height="300"></canvas>
        </div>
      `;

      setTimeout(() => {
        veBieuDoThongKe(loaiTK, phong, thang, nam, kieu);
      }, 100);
    }
  });
}

function veBieuDoThongKe(loaiTK, phong, thang, nam, kieu = "pie") {
  const canvas = document.getElementById("bieuDoThongKe");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  if (loaiTK === "chamcong") {
    const duLieu = JSON.parse(localStorage.getItem("chamCongData")) || [];

    const loc = duLieu.filter((item, i) => {
      const maNV = Object.keys(danhSachNhanVien)[i % 3];
      const nv = danhSachNhanVien[maNV];
      const ngay = new Date(item.ngay);
      const thangItem = ngay.getMonth() + 1;
      const namItem = ngay.getFullYear();

      return (!phong || nv.phongBan === phong)
        && (!thang || thangItem == thang)
        && (!nam || namItem == nam);
    });

    let muon = 0, thanhCong = 0, thieu = 0;
    loc.forEach(item => {
      if (item.trangThai.includes("muộn")) muon++;
      else if (item.trangThai.includes("thiếu")) thieu++;
      else if (item.trangThai.includes("thành công")) thanhCong++;
    });

    new Chart(ctx, {
      type: kieu,
      data: {
        labels: ["Muộn", "Thiếu giờ", "Thành công"],
        datasets: [{
          data: [muon, thieu, thanhCong],
          backgroundColor: ["#f44336", "#ff9800", "#4caf50"]
        }]
      }
    });
  }

  if (loaiTK === "nghiphep") {
    const duLieuNP = [
      { ma: "NV001", phong: "Phòng IT", tu: "2025-04-10", trangThai: "Phê duyệt" },
      { ma: "NV002", phong: "Phòng Kế toán", tu: "2025-04-11", trangThai: "Không phê duyệt" },
      { ma: "NV003", phong: "Phòng Nhân sự", tu: "2025-04-05", trangThai: "Phê duyệt" }
    ];

    const loc = duLieuNP.filter(item => {
      const ngayBD = new Date(item.tu);
      const thangItem = ngayBD.getMonth() + 1;
      const namItem = ngayBD.getFullYear();

      return (!phong || item.phong === phong)
        && (!thang || thangItem == thang)
        && (!nam || namItem == nam);
    });

    let pheDuyet = 0, khongDuyet = 0;
    loc.forEach(item => {
      if (item.trangThai === "Phê duyệt") pheDuyet++;
      else khongDuyet++;
    });

    new Chart(ctx, {
      type: kieu,
      data: {
        labels: ["Phê duyệt", "Không phê duyệt"],
        datasets: [{
          data: [pheDuyet, khongDuyet],
          backgroundColor: ["#4caf50", "#f44336"]
        }]
      }
    });
  }
}




