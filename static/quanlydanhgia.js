document.addEventListener('DOMContentLoaded', () => {
    // === THÊM DÒNG NÀY ===
    document.body.classList.add('sidebar-hidden');
    // ======================

    // --- DOM Element Selection ---
    // (Giữ nguyên phần còn lại của file JS này)
    const mainTabsContainer = document.getElementById('mainTabs');
    const mainTabButtons = mainTabsContainer ? mainTabsContainer.querySelectorAll('.tab-button') : [];
    // ... (phần còn lại của file quanlydanhgia.js giữ nguyên) ...
});
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selection ---
    const mainTabsContainer = document.getElementById('mainTabs');
    const mainTabButtons = mainTabsContainer ? mainTabsContainer.querySelectorAll('.tab-button') : [];
    const mainTabContents = document.querySelectorAll('.tab-content');

    // Tab 1: Danh sách & Thiết lập
    const dsThietLapTabContent = document.getElementById('ds-thiet-lap');
    const danhSachView = document.getElementById('danh-sach-view');
    const thietLapView = document.getElementById('thiet-lap-view');
    const themKyDanhGiaBtn = document.getElementById('them-ky-danh-gia-btn');
    const quayLaiDanhSachBtn = document.getElementById('quay-lai-danh-sach-btn');
    const evaluationTableBody = danhSachView ? danhSachView.querySelector('tbody') : null;

    // Tab 2: Thực hiện Đánh giá
    const evaluationSubTabsContainer = document.getElementById('evaluationSubTabs');
    const evaluationSubTabButtons = evaluationSubTabsContainer ? evaluationSubTabsContainer.querySelectorAll('.sub-tab-button') : [];
    const evaluationSubTabContents = document.querySelectorAll('.sub-tab-content');

    // Tab 2c: Đánh giá NV cấp dưới
    const managerEvalPeriodSelect = document.getElementById('manager-eval-period');
    const subordinateListContainer = document.getElementById('danh-sach-nv-can-danh-gia');
    const subordinateListTableBody = subordinateListContainer ? subordinateListContainer.querySelector('#subordinate-evaluation-table tbody') : null;
    const subordinateListPlaceholder = document.getElementById('danh-sach-nv-placeholder');
    const employeeDetailContainer = document.getElementById('nhan-vien-danh-gia-chi-tiet');
    const backToSubordinateListBtn = document.getElementById('back-to-subordinate-list');
    const detailEmployeeName = document.getElementById('detail-employee-name');
    const selfScoreList = document.getElementById('self-score-list');
    const selfTotalScore = document.getElementById('self-total-score');
    const selfCommentBox = document.getElementById('self-comment-box');
    const selfEvalNodata = document.getElementById('self-eval-nodata');
    const managerScoreSelects = employeeDetailContainer ? employeeDetailContainer.querySelectorAll('.manager-score-select') : [];
    const managerTotalScoreDisplay = document.getElementById('manager-total-score-display');
    const managerCommentTextarea = document.getElementById('manager-comment');
    const saveManagerEvaluationBtn = document.getElementById('save-manager-evaluation-btn');
    const feedbackSection = document.getElementById('feedback-section');
    const employeeFeedbackContent = document.getElementById('employee-feedback-content');
    const managerFeedbackReplyTextarea = document.getElementById('manager-feedback-reply');
    const sendFeedbackReplyBtn = document.getElementById('send-feedback-reply-btn');

    // Tab 3: Báo cáo
    const reportEvalPeriodSelect = document.getElementById('report-eval-period');
    const generateReportBtn = document.getElementById('generate-report-btn');
    const reportResultsArea = document.getElementById('report-results-area');
    const reportPlaceholder = document.getElementById('report-placeholder');
    const reportSummaryTableBody = document.querySelector('#report-summary-table tbody');
    const reportTotalRow = document.getElementById('report-total-row');
    const reportChartCanvas = document.getElementById('report-chart');
    const chartPlaceholder = document.getElementById('chart-placeholder');
    const topPerformersList = document.getElementById('top-performers-list');
    const topPerformersPlaceholder = document.getElementById('top-performers-placeholder');
    let reportChartInstance = null; // Biến để lưu trữ biểu đồ hiện tại

    // Form Elements (Setup Form) - selected inside initializeSetupFormLogic
    let positionSelect, employeeListUL, employeeSearchInput, selectAllEmployeesBtn, evaluationForm, criteriaCheckboxes, criteriaErrorMsg, employeeErrorMsg, employeeListItems = [], formTitle;

    // --- State Variable ---
    let isSetupFormLogicInitialized = false;

    // --- Helper Functions ---

    const switchMainTab = (targetTabId) => {
        mainTabButtons.forEach(button => button.classList.toggle('active', button.dataset.tab === targetTabId));
        mainTabContents.forEach(content => content.classList.toggle('active', content.id === targetTabId));
        if (targetTabId === 'ds-thiet-lap' && thietLapView && !thietLapView.classList.contains('active')) {
             switchDsThietLapView('list');
        } else if (targetTabId === 'thuc-hien-danh-gia') {
             const firstSubTabId = evaluationSubTabButtons[0]?.dataset.subTab;
             if (firstSubTabId) switchEvaluationSubTab(firstSubTabId);
             if (employeeDetailContainer) employeeDetailContainer.style.display = 'none';
             if (subordinateListContainer) subordinateListContainer.style.display = 'none';
             if (subordinateListPlaceholder) subordinateListPlaceholder.style.display = 'block';
             if (managerEvalPeriodSelect) managerEvalPeriodSelect.value = '';
        } else if(targetTabId === 'bao-cao'){
             // Reset report view when switching to report tab
             if(reportResultsArea) reportResultsArea.style.display = 'none';
             if(reportPlaceholder) reportPlaceholder.style.display = 'block';
             if(reportEvalPeriodSelect) reportEvalPeriodSelect.value = '';
        }
        window.scrollTo(0, 0);
    };

    const switchDsThietLapView = (viewToShow) => { /* ... Giữ nguyên ... */ if (viewToShow === 'form') { if (danhSachView) danhSachView.classList.remove('active'); if (thietLapView) thietLapView.classList.add('active'); initializeSetupFormLogic(); } else { if (thietLapView) thietLapView.classList.remove('active'); if (danhSachView) danhSachView.classList.add('active'); } };
    const switchEvaluationSubTab = (targetSubTabId) => { /* ... Giữ nguyên ... */ evaluationSubTabButtons.forEach(button => button.classList.toggle('active', button.dataset.subTab === targetSubTabId)); evaluationSubTabContents.forEach(content => content.classList.toggle('active', content.id === targetSubTabId)); if (employeeDetailContainer) employeeDetailContainer.style.display = 'none'; if (subordinateListContainer) subordinateListContainer.style.display = 'none'; if (subordinateListPlaceholder) subordinateListPlaceholder.style.display = 'block'; if (managerEvalPeriodSelect) managerEvalPeriodSelect.value = ''; };

    // --- Initialization Logic for SETUP FORM (Tab 1 - Giữ nguyên) ---
    const initializeSetupFormLogic = () => { /* ... Giữ nguyên ... */ if (isSetupFormLogicInitialized) return; positionSelect = document.getElementById('vi-tri-ap-dung'); employeeListUL = document.getElementById('employeeListUL'); employeeSearchInput = document.getElementById('employeeSearchInput'); selectAllEmployeesBtn = document.getElementById('selectAllEmployeesBtn'); evaluationForm = document.getElementById('evaluationForm'); criteriaCheckboxes = evaluationForm ? Array.from(evaluationForm.querySelectorAll('input[name="tieu_chi[]"]')) : []; criteriaErrorMsg = document.getElementById('criteria-error'); employeeErrorMsg = document.getElementById('employee-error'); employeeListItems = employeeListUL ? Array.from(employeeListUL.querySelectorAll('li')) : []; formTitle = document.getElementById('form-title'); if (!evaluationForm) return; addSetupFormEventListeners(); isSetupFormLogicInitialized = true; filterAndSearchSetupEmployees(); };
    const removeSetupFormEventListeners = () => { /* ... Giữ nguyên ... */ if (!isSetupFormLogicInitialized) return; if (positionSelect) positionSelect.removeEventListener('change', filterAndSearchSetupEmployees); if (employeeSearchInput) employeeSearchInput.removeEventListener('input', filterAndSearchSetupEmployees); if (selectAllEmployeesBtn) selectAllEmployeesBtn.removeEventListener('click', handleSetupSelectAllClick); if (evaluationForm) { evaluationForm.removeEventListener('submit', handleSetupFormSubmit); evaluationForm.removeEventListener('reset', handleSetupFormReset); } if (employeeListUL) employeeListUL.removeEventListener('change', handleSetupEmployeeCheckboxChange); isSetupFormLogicInitialized = false; };
    const filterAndSearchSetupEmployees = () => { /* ... Giữ nguyên ... */ if (!isSetupFormLogicInitialized || !positionSelect || !employeeSearchInput || !employeeListItems || employeeListItems.length === 0) return; const selectedPositions = Array.from(positionSelect.selectedOptions).map(option => option.value); const searchTerm = employeeSearchInput.value.toLowerCase().trim(); let hasVisibleEmployees = false; employeeListItems.forEach(item => { const itemPosition = item.dataset.position; const label = item.querySelector('label'); const employeeName = label ? label.textContent.toLowerCase() : ''; const positionMatch = selectedPositions.length === 0 || selectedPositions.includes(itemPosition); const searchMatch = searchTerm === '' || employeeName.includes(searchTerm); if (positionMatch && searchMatch) { item.classList.add('visible'); hasVisibleEmployees = true; } else { item.classList.remove('visible'); } }); updateSetupSelectAllButtonState(hasVisibleEmployees); };
    const updateSetupSelectAllButtonState = (hasVisible) => { /* ... Giữ nguyên ... */ if (!isSetupFormLogicInitialized || !selectAllEmployeesBtn) return; const visibleCheckboxes = employeeListItems.filter(item => item.classList.contains('visible')).map(item => item.querySelector('input[type="checkbox"]')); const anyVisible = typeof hasVisible !== 'undefined' ? hasVisible : visibleCheckboxes.length > 0; if (!anyVisible) { selectAllEmployeesBtn.disabled = true; selectAllEmployeesBtn.textContent = 'Chọn tất cả'; return; } selectAllEmployeesBtn.disabled = false; const allVisibleChecked = visibleCheckboxes.every(cb => cb && cb.checked); selectAllEmployeesBtn.textContent = allVisibleChecked ? 'Bỏ chọn tất cả' : 'Chọn tất cả'; };
    const handleSetupSelectAllClick = () => { /* ... Giữ nguyên ... */ if (!isSetupFormLogicInitialized || !selectAllEmployeesBtn || selectAllEmployeesBtn.disabled) return; const visibleCheckboxes = employeeListItems.filter(item => item.classList.contains('visible')).map(item => item.querySelector('input[type="checkbox"]')); const isSelectingAll = selectAllEmployeesBtn.textContent === 'Chọn tất cả'; visibleCheckboxes.forEach(checkbox => { if (checkbox) checkbox.checked = isSelectingAll; }); updateSetupSelectAllButtonState(true); };
    const handleSetupEmployeeCheckboxChange = (event) => { /* ... Giữ nguyên ... */ if (event.target.type === 'checkbox' && event.target.closest('li')?.classList.contains('visible')) { updateSetupSelectAllButtonState(true); } };
    const handleSetupFormSubmit = (event) => { /* ... Giữ nguyên ... */ event.preventDefault(); if (!isSetupFormLogicInitialized) return; let isValid = true; if (criteriaErrorMsg) criteriaErrorMsg.style.display = 'none'; if (employeeErrorMsg) { employeeErrorMsg.style.display = 'none'; employeeErrorMsg.textContent = 'Vui lòng chọn ít nhất một nhân viên để đánh giá.';} const selectedCriteriaCount = criteriaCheckboxes.filter(cb => cb.checked).length; if (selectedCriteriaCount === 0) { if (criteriaErrorMsg) criteriaErrorMsg.style.display = 'block'; isValid = false; } const selectedVisibleEmployeesCount = employeeListItems.filter(item => item.classList.contains('visible') && item.querySelector('input[type="checkbox"]')?.checked).length; if (selectedVisibleEmployeesCount === 0) { const anyVisibleEmployee = employeeListItems.some(item => item.classList.contains('visible')); if (anyVisibleEmployee) { if (employeeErrorMsg) employeeErrorMsg.style.display = 'block'; isValid = false; } else if (positionSelect && Array.from(positionSelect.selectedOptions).length > 0) { if (employeeErrorMsg) { employeeErrorMsg.textContent = 'Không có nhân viên nào phù hợp với vị trí đã chọn.'; employeeErrorMsg.style.display = 'block';} } } if (!isValid) { const firstError = document.querySelector('#thiet-lap-view .error-message[style*="block"]'); if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' }); alert('Vui lòng kiểm tra lại các trường thông tin bắt buộc.'); } else { console.log('Form Thiết lập hợp lệ. Gửi dữ liệu...'); const formData = new FormData(evaluationForm); const selectedEmployees = []; employeeListItems.forEach(item => { const checkbox = item.querySelector('input[type="checkbox"]'); if(item.classList.contains('visible') && checkbox && checkbox.checked){ selectedEmployees.push(checkbox.value); } }); formData.delete('employee[]'); selectedEmployees.forEach(empId => formData.append('employee[]', empId)); for (let [key, value] of formData.entries()) { console.log(`${key}: ${value}`); } alert('Thiết lập đã được lưu thành công!'); switchDsThietLapView('list'); }};
    const handleSetupFormReset = () => { /* ... Giữ nguyên ... */ if (!isSetupFormLogicInitialized) return; if (criteriaErrorMsg) criteriaErrorMsg.style.display = 'none'; if (employeeErrorMsg) employeeErrorMsg.style.display = 'none'; if (formTitle) formTitle.textContent = 'Thiết lập Kì đánh giá mới'; setTimeout(() => { if(positionSelect){ Array.from(positionSelect.options).forEach(option => option.selected = false); } if(employeeSearchInput) employeeSearchInput.value = ''; filterAndSearchSetupEmployees(); }, 0); };
    const addSetupFormEventListeners = () => { /* ... Giữ nguyên ... */ if (positionSelect) positionSelect.addEventListener('change', filterAndSearchSetupEmployees); if (employeeSearchInput) employeeSearchInput.addEventListener('input', filterAndSearchSetupEmployees); if (selectAllEmployeesBtn) selectAllEmployeesBtn.addEventListener('click', handleSetupSelectAllClick); if (evaluationForm) { evaluationForm.addEventListener('submit', handleSetupFormSubmit); evaluationForm.addEventListener('reset', handleSetupFormReset); } if (employeeListUL) employeeListUL.addEventListener('change', handleSetupEmployeeCheckboxChange); };


    // --- Logic for "Đánh giá NV cấp dưới" Tab (Giữ nguyên) ---
    const loadSubordinateList = (periodId) => { /* ... Giữ nguyên ... */ if (!subordinateListTableBody || !subordinateListContainer || !subordinateListPlaceholder) return; console.log(`Tải danh sách NV cho kỳ: ${periodId}`); const subordinatesData = { "eval002": [ { id: "nv005", name: "Hoàng Văn E", position: "Quản lý xưởng", status: "evaluated" }, { id: "nv007", name: "Đinh Công G", position: "Quản lý xưởng", status: "not-evaluated" } ], "eval003": [ { id: "nv001", name: "Nguyễn Văn A", position: "Nhân viên văn phòng", status: "has-feedback" }, { id: "nv003", name: "Lê Văn C", position: "Nhân viên văn phòng", status: "feedback-exceeded" }, { id: "nv004", name: "Phạm Thị D", position: "Trưởng phòng văn phòng", status: "not-evaluated" }, { id: "nv008", name: "Bùi Thị H", position: "Trưởng phòng văn phòng", status: "evaluated" }, ] }; const subordinates = subordinatesData[periodId] || []; subordinateListTableBody.innerHTML = ''; if (subordinates.length > 0) { subordinates.forEach(emp => { const row = document.createElement('tr'); row.dataset.employeeId = emp.id; row.dataset.status = emp.status; let statusText = 'Chưa xác định'; let statusClass = 'status-pending'; let actionButtonHtml = ''; switch (emp.status) { case 'not-evaluated': statusText = 'Chưa đánh giá'; statusClass = 'status-not-evaluated'; actionButtonHtml = `<button class="btn btn-sm btn-evaluate"><i class="fas fa-pen"></i> Đánh giá</button>`; break; case 'evaluated': statusText = 'Đã đánh giá'; statusClass = 'status-evaluated'; actionButtonHtml = `<button class="btn btn-sm btn-view-evaluation"><i class="fas fa-eye"></i> Xem</button>`; break; case 'has-feedback': statusText = 'Có phản hồi'; statusClass = 'status-feedback'; actionButtonHtml = `<button class="btn btn-sm btn-view-feedback"><i class="fas fa-comments"></i> Xem/Phản hồi</button>`; break; case 'feedback-exceeded': statusText = 'Phản hồi > 3 lần'; statusClass = 'status-feedback-exceeded'; actionButtonHtml = `<button class="btn btn-sm btn-view-evaluation"><i class="fas fa-eye"></i> Xem</button>`; break; } row.innerHTML = `<td>${emp.name}</td><td>${emp.position}</td><td><span class="status ${statusClass}">${statusText}</span></td><td>${actionButtonHtml}</td>`; subordinateListTableBody.appendChild(row); }); subordinateListContainer.style.display = 'block'; subordinateListPlaceholder.style.display = 'none'; } else { subordinateListContainer.style.display = 'none'; subordinateListPlaceholder.style.display = 'block'; subordinateListPlaceholder.querySelector('p').textContent = 'Không có nhân viên nào cần đánh giá trong kỳ này.'; } if (employeeDetailContainer) employeeDetailContainer.style.display = 'none'; };
    const showEmployeeDetailView = (employeeId, status) => { /* ... Giữ nguyên ... */ if (!employeeDetailContainer || !subordinateListContainer) return; console.log(`Xem chi tiết NV: ${employeeId}, Status: ${status}`); const employeeDetails = { "nv001": { name: "Nguyễn Văn A", position: "Nhân viên văn phòng", self_scores: { san_pham: 7, nghiep_vu: 8, quan_ly: 6, phan_tich: 7, du_an: 7, van_de: 8, trach_nhiem: 9, thai_do: 8}, self_comment: "Em đã hoàn thành tốt các chỉ tiêu được giao trong kỳ.", manager_scores: {san_pham: 7, nghiep_vu: 7, quan_ly: 7, phan_tich: 8, du_an: 6, van_de: 7, trach_nhiem: 9, thai_do: 9}, manager_comment:"Cần chủ động hơn trong việc học hỏi nghiệp vụ mới.", feedback: "Em không đồng ý với điểm nghiệp vụ vì lý do...", feedback_reply: null }, "nv003": { name: "Lê Văn C", position: "Nhân viên văn phòng", self_scores: null, self_comment: null, manager_scores: {san_pham: 6}, manager_comment:"Đánh giá sơ bộ.", feedback: "Phản hồi lần 1...\nPhản hồi lần 2...\nPhản hồi lần 3...", feedback_reply: "Đã trao đổi trực tiếp." }, "nv005": { name: "Hoàng Văn E", position: "Quản lý xưởng", self_scores: { san_pham: 9, nghiep_vu: 9, quan_ly: 9, phan_tich: 8, du_an: 8, van_de: 9, trach_nhiem: 10, thai_do: 9}, self_comment: "Đạt và vượt chỉ tiêu.", manager_scores: {san_pham: 9, nghiep_vu: 9, quan_ly: 9, phan_tich: 9, du_an: 8, van_de: 9, trach_nhiem: 10, thai_do: 9}, manager_comment:"Làm tốt, phát huy.", feedback: null, feedback_reply: null }, "nv007": { name: "Đinh Công G", position: "Quản lý xưởng", self_scores: { san_pham: 8}, self_comment: "Tự đánh giá...", manager_scores: null, manager_comment: null, feedback: null, feedback_reply: null }, "nv008": { name: "Bùi Thị H", position: "Trưởng phòng văn phòng", self_scores: { san_pham: 8, nghiep_vu: 8, quan_ly: 8, phan_tich: 8, du_an: 8, van_de: 8, trach_nhiem: 8, thai_do: 8 }, self_comment: "Tự đánh giá hoàn thành.", manager_scores: { san_pham: 8, nghiep_vu: 8, quan_ly: 9, phan_tich: 8, du_an: 8, van_de: 8, trach_nhiem: 9, thai_do: 9 }, manager_comment: "Kết quả tốt.", feedback: null, feedback_reply: null } }; const details = employeeDetails[employeeId]; if (!details) { alert("Không tìm thấy thông tin chi tiết cho nhân viên này."); return; } subordinateListContainer.style.display = 'none'; if (subordinateListPlaceholder) subordinateListPlaceholder.style.display = 'none'; employeeDetailContainer.style.display = 'block'; if (detailEmployeeName) detailEmployeeName.textContent = `Đánh giá chi tiết cho: ${details.name} (${details.position})`; if(details.self_scores && selfScoreList && selfCommentBox) { selfScoreList.innerHTML = ''; let totalSelfScore = 0; for(const key in details.self_scores) { const score = details.self_scores[key] || '-'; const label = document.querySelector(`.criterion-item label[for="score-${key}"]`)?.textContent || key; const li = document.createElement('li'); li.innerHTML = `<span>${label}:</span> <strong>${score}</strong>`; selfScoreList.appendChild(li); if(typeof score === 'number') totalSelfScore += score; } if(selfTotalScore) selfTotalScore.textContent = totalSelfScore; selfCommentBox.textContent = details.self_comment || '(Không có nhận xét)'; if(selfEvalNodata) selfEvalNodata.style.display = 'none'; selfScoreList.style.display = 'block'; selfCommentBox.style.display = 'block'; if(selfTotalScore.closest('.total-score')) selfTotalScore.closest('.total-score').style.display = 'flex'; } else { if(selfScoreList) selfScoreList.style.display = 'none'; if(selfCommentBox) selfCommentBox.style.display = 'none'; if(selfTotalScore.closest('.total-score')) selfTotalScore.closest('.total-score').style.display = 'none'; if(selfEvalNodata) selfEvalNodata.style.display = 'block'; } let totalManagerScore = 0; managerScoreSelects.forEach(select => { const key = select.name.match(/\[(.*?)\]/)[1]; if(details.manager_scores && details.manager_scores[key] !== undefined && details.manager_scores[key] !== null) { select.value = details.manager_scores[key]; totalManagerScore += parseInt(details.manager_scores[key], 10) || 0; } else { select.value = ''; } }); if (managerTotalScoreDisplay) managerTotalScoreDisplay.textContent = totalManagerScore; if (managerCommentTextarea) managerCommentTextarea.value = details.manager_comment || ''; if (status === 'has-feedback' || status === 'feedback-exceeded') { if (feedbackSection) feedbackSection.style.display = 'block'; if (employeeFeedbackContent) employeeFeedbackContent.textContent = details.feedback || '(Không có nội dung phản hồi)'; if (managerFeedbackReplyTextarea) { managerFeedbackReplyTextarea.value = details.feedback_reply || ''; managerFeedbackReplyTextarea.disabled = (status === 'feedback-exceeded'); } if (sendFeedbackReplyBtn) { sendFeedbackReplyBtn.disabled = (status === 'feedback-exceeded'); sendFeedbackReplyBtn.textContent = (status === 'feedback-exceeded') ? 'Đã vượt quá giới hạn' : 'Gửi trả lời'; } } else { if (feedbackSection) feedbackSection.style.display = 'none'; } employeeDetailContainer.dataset.currentEmployeeId = employeeId; employeeDetailContainer.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    const calculateManagerTotalScore = () => { /* ... Giữ nguyên ... */ let total = 0; managerScoreSelects.forEach(select => { total += parseInt(select.value, 10) || 0; }); if (managerTotalScoreDisplay) managerTotalScoreDisplay.textContent = total; };

     // --- Logic for "Báo cáo" Tab ---

     /**
      * (Mô phỏng) Lấy dữ liệu báo cáo cho kỳ được chọn.
      * @param {string} periodId
      * @returns {object|null} Dữ liệu báo cáo hoặc null nếu lỗi/không có.
      */
     const generateReportData = (periodId) => {
         console.log(`Tạo dữ liệu báo cáo cho kỳ: ${periodId}`);
         // --- Dữ liệu mẫu ---
         const reportData = {
             "eval001": { // Cuối năm 2023
                 summary: [
                     { department: 'Xưởng', high: 8, medium: 15, low: 2, total: 25 },
                     { department: 'Văn phòng', high: 12, medium: 8, low: 1, total: 21 },
                     // Thêm các phòng ban khác
                 ],
                 topPerformers: [
                     { rank: 1, name: 'Hoàng Văn E', department: 'Xưởng', score: 92 },
                     { rank: 2, name: 'Nguyễn Thị X', department: 'Văn phòng', score: 91 },
                     { rank: 3, name: 'Trần Văn Y', department: 'Văn phòng', score: 90 },
                     { rank: 4, name: 'Lê Thị Z', department: 'Xưởng', score: 88 },
                     { rank: 5, name: 'Phạm Văn T', department: 'Xưởng', score: 87 },
                     { rank: 6, name: 'Vũ Công Q', department: 'Văn phòng', score: 85 },
                     { rank: 7, name: 'Đinh Thị P', department: 'Xưởng', score: 84 },
                     { rank: 8, name: 'Bùi Văn O', department: 'Văn phòng', score: 82 },
                     { rank: 9, name: 'Mai Thị N', department: 'Xưởng', score: 81 },
                     { rank: 10, name: 'Hà Văn M', department: 'Văn phòng', score: 80 },
                 ]
             },
             "eval004": { // Quý 4/2024
                  summary: [
                     { department: 'Văn phòng', high: 15, medium: 5, low: 0, total: 20 },
                     { department: 'Kinh doanh', high: 10, medium: 12, low: 3, total: 25 },
                     { department: 'Marketing', high: 5, medium: 3, low: 1, total: 9 },
                 ],
                 topPerformers: [
                      { rank: 1, name: 'Bùi Thị H', department: 'Văn phòng', score: 98 },
                      { rank: 2, name: 'Phạm Thị D', department: 'Văn phòng', score: 96 },
                      { rank: 3, name: 'Nhân Viên KD 1', department: 'Kinh doanh', score: 95 },
                      { rank: 4, name: 'Nhân Viên MKT 1', department: 'Marketing', score: 94 },
                      { rank: 5, name: 'Nhân Viên KD 2', department: 'Kinh doanh', score: 93 },
                      { rank: 6, name: 'Nguyễn Văn A', department: 'Văn phòng', score: 92 },
                      { rank: 7, name: 'Nhân Viên KD 3', department: 'Kinh doanh', score: 91 },
                      { rank: 8, name: 'Lê Văn C', department: 'Văn phòng', score: 90 },
                      { rank: 9, name: 'Nhân Viên KD 4', department: 'Kinh doanh', score: 89 },
                      { rank: 10, name: 'Nhân Viên MKT 2', department: 'Marketing', score: 88 },
                 ]
             }
             // Thêm dữ liệu cho các kỳ khác
         };
         return reportData[periodId] || null; // Trả về dữ liệu hoặc null nếu không có
     };

     /** Hiển thị dữ liệu báo cáo lên giao diện */
     const displayReport = (data) => {
         if (!data || !reportSummaryTableBody || !reportTotalRow || !topPerformersList || !reportResultsArea || !reportPlaceholder) return;

         // --- 1. Cập nhật Bảng Thống kê ---
         reportSummaryTableBody.innerHTML = ''; // Xóa dữ liệu cũ
         let totalHigh = 0, totalMedium = 0, totalLow = 0, grandTotal = 0;

         data.summary.forEach(dept => {
             const row = document.createElement('tr');
             row.innerHTML = `
                 <td>${dept.department}</td>
                 <td>${dept.high}</td>
                 <td>${dept.medium}</td>
                 <td>${dept.low}</td>
                 <td>${dept.total}</td>
             `;
             reportSummaryTableBody.appendChild(row);
             // Cộng dồn vào tổng công ty
             totalHigh += dept.high;
             totalMedium += dept.medium;
             totalLow += dept.low;
             grandTotal += dept.total;
         });

         // Cập nhật dòng tổng cộng (tfoot)
         reportTotalRow.querySelector('[data-column="high"]').textContent = totalHigh;
         reportTotalRow.querySelector('[data-column="medium"]').textContent = totalMedium;
         reportTotalRow.querySelector('[data-column="low"]').textContent = totalLow;
         reportTotalRow.querySelector('[data-column="total"]').textContent = grandTotal;

         // --- 2. Vẽ Biểu đồ (Chart.js) ---
         if(reportChartCanvas && chartPlaceholder){
             const ctx = reportChartCanvas.getContext('2d');
             const labels = data.summary.map(dept => dept.department); // Tên phòng ban
             const highData = data.summary.map(dept => dept.high);
             const mediumData = data.summary.map(dept => dept.medium);
             const lowData = data.summary.map(dept => dept.low);

             // Hủy biểu đồ cũ nếu tồn tại
             if(reportChartInstance){
                 reportChartInstance.destroy();
             }

             if(labels.length > 0) {
                 reportChartInstance = new Chart(ctx, {
                     type: 'bar', // Loại biểu đồ cột
                     data: {
                         labels: labels,
                         datasets: [
                             {
                                 label: '> 80 điểm',
                                 data: highData,
                                 backgroundColor: '#4caf50', // Xanh lá
                                 borderColor: '#388e3c',
                                 borderWidth: 1
                             },
                             {
                                 label: '50 - 80 điểm',
                                 data: mediumData,
                                 backgroundColor: '#ffc107', // Vàng
                                 borderColor: '#ffa000',
                                 borderWidth: 1
                             },
                              {
                                 label: '< 50 điểm',
                                 data: lowData,
                                 backgroundColor: '#f44336', // Đỏ
                                 borderColor: '#d32f2f',
                                 borderWidth: 1
                             }
                         ]
                     },
                     options: {
                         responsive: true,
                         maintainAspectRatio: false, // Cho phép biểu đồ co giãn
                         plugins: {
                            title: { display: true, text: 'Biểu đồ phân loại kết quả theo phòng ban' },
                            tooltip: { mode: 'index', intersect: false },
                         },
                         scales: {
                             x: { stacked: true }, // Chồng các cột lên nhau
                             y: { stacked: true, beginAtZero: true, title: { display: true, text: 'Số lượng nhân viên' } }
                         }
                     }
                 });
                 reportChartCanvas.style.display = 'block';
                 chartPlaceholder.style.display = 'none';
             } else {
                  reportChartCanvas.style.display = 'none';
                  chartPlaceholder.style.display = 'block';
             }
         }


         // --- 3. Cập nhật Danh sách Top Nhân viên ---
          topPerformersList.innerHTML = ''; // Xóa danh sách cũ
          if(data.topPerformers && data.topPerformers.length > 0){
                data.topPerformers.forEach(emp => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span class="rank">${emp.rank}.</span>
                        <span class="name">${emp.name}</span>
                        <span class="department">(${emp.department})</span>
                        <span class="score">${emp.score} điểm</span>
                    `;
                    topPerformersList.appendChild(li);
                });
              topPerformersList.style.display = 'block';
              if(topPerformersPlaceholder) topPerformersPlaceholder.style.display = 'none';
          } else {
               topPerformersList.style.display = 'none';
               if(topPerformersPlaceholder) topPerformersPlaceholder.style.display = 'block';
          }


         // Hiển thị khu vực kết quả, ẩn placeholder
         reportResultsArea.style.display = 'block';
         reportPlaceholder.style.display = 'none';
     };

    // --- Event Listener Setup ---
    if (mainTabsContainer) { /* ... listener main tabs ... */ mainTabsContainer.addEventListener('click', (event) => { const tabButton = event.target.closest('.tab-button'); if (tabButton && !tabButton.classList.contains('active')) { switchMainTab(tabButton.dataset.tab); } }); }
    if (evaluationSubTabsContainer) { /* ... listener sub tabs ... */ evaluationSubTabsContainer.addEventListener('click', (event) => { const subTabButton = event.target.closest('.sub-tab-button'); if (subTabButton && !subTabButton.classList.contains('active')) { switchEvaluationSubTab(subTabButton.dataset.subTab); } }); }
    if (themKyDanhGiaBtn) { /* ... listener nút Thêm mới ... */ themKyDanhGiaBtn.addEventListener('click', () => { if (evaluationForm) evaluationForm.reset(); switchDsThietLapView('form'); }); }
    if (quayLaiDanhSachBtn) { /* ... listener nút Quay lại DS (form thiết lập) ... */ quayLaiDanhSachBtn.addEventListener('click', () => switchDsThietLapView('list')); }
    if (evaluationTableBody) { /* ... listener Sửa/Xóa (danh sách kỳ đánh giá) ... */ evaluationTableBody.addEventListener('click', (event) => { /* ... Giữ nguyên logic ... */ const target = event.target; const editButton = target.closest('.btn-action.edit'); const deleteButton = target.closest('.btn-action.delete'); const viewButton = target.closest('.btn-action.view'); if (editButton) { const evaluationId = editButton.closest('tr')?.dataset.evaluationId; console.log('Edit evaluation:', evaluationId); if (evaluationForm) evaluationForm.reset(); switchDsThietLapView('form'); if (!isSetupFormLogicInitialized) initializeSetupFormLogic(); if (formTitle) formTitle.textContent = `Chỉnh sửa Kì đánh giá (ID: ${evaluationId || 'N/A'})`; alert(`Chức năng sửa cho ID ${evaluationId} đang được phát triển!`); } else if (deleteButton) { const evaluationId = deleteButton.closest('tr')?.dataset.evaluationId; console.log('Delete evaluation:', evaluationId); if (confirm(`Bạn có chắc chắn muốn xóa kì đánh giá (ID: ${evaluationId || 'N/A'})?`)) { alert(`Chức năng xóa cho ID ${evaluationId} đang được phát triển!`); } } else if (viewButton) { const evaluationId = viewButton.closest('tr')?.dataset.evaluationId; alert(`Xem chi tiết kỳ ${evaluationId}`); } }); }
    if (managerEvalPeriodSelect) { /* ... listener chọn kỳ ĐG NV cấp dưới ... */ managerEvalPeriodSelect.addEventListener('change', (event) => { const selectedPeriodId = event.target.value; if (selectedPeriodId) { loadSubordinateList(selectedPeriodId); } else { if (subordinateListContainer) subordinateListContainer.style.display = 'none'; if (subordinateListPlaceholder) { subordinateListPlaceholder.style.display = 'block'; subordinateListPlaceholder.querySelector('p').textContent = 'Vui lòng chọn kỳ đánh giá để xem danh sách nhân viên.'; } if (employeeDetailContainer) employeeDetailContainer.style.display = 'none'; } }); }
    if (subordinateListTableBody) { /* ... listener click nút trong DS NV cấp dưới ... */ subordinateListTableBody.addEventListener('click', (event) => { const actionButton = event.target.closest('.btn-evaluate, .btn-view-evaluation, .btn-view-feedback'); if (actionButton) { const row = actionButton.closest('tr'); const employeeId = row?.dataset.employeeId; const status = row?.dataset.status; if (employeeId && status) { showEmployeeDetailView(employeeId, status); } } }); }
    if (backToSubordinateListBtn) { /* ... listener nút Quay lại DS NV ... */ backToSubordinateListBtn.addEventListener('click', () => { if (employeeDetailContainer) employeeDetailContainer.style.display = 'none'; if (subordinateListContainer) subordinateListContainer.style.display = 'block'; if (subordinateListContainer) subordinateListContainer.scrollIntoView({ behavior: 'smooth', block: 'start' }); }); }
    if(managerScoreSelects.length > 0){ /* ... listener tính tổng điểm Manager ... */ managerScoreSelects.forEach(select => { select.addEventListener('change', calculateManagerTotalScore); }); }
    if(saveManagerEvaluationBtn){ /* ... listener lưu đánh giá Manager ... */ saveManagerEvaluationBtn.addEventListener('click', () => { const currentEmployeeId = employeeDetailContainer?.dataset.currentEmployeeId; if(!currentEmployeeId){ alert("Lỗi: Không xác định được nhân viên đang đánh giá."); return; } const scores = {}; managerScoreSelects.forEach(select => { const key = select.name.match(/\[(.*?)\]/)[1]; if(select.value) scores[key] = parseInt(select.value, 10); }); const comment = managerCommentTextarea ? managerCommentTextarea.value : ''; const totalScore = managerTotalScoreDisplay ? parseInt(managerTotalScoreDisplay.textContent, 10) : 0; console.log(`Lưu đánh giá cho NV: ${currentEmployeeId}`); console.log("Điểm:", scores); console.log("Nhận xét:", comment); console.log("Tổng điểm:", totalScore); alert("Đã lưu đánh giá của quản lý!"); const rowInList = subordinateListTableBody?.querySelector(`tr[data-employee-id="${currentEmployeeId}"]`); if(rowInList){ rowInList.dataset.status = 'evaluated'; const statusCell = rowInList.querySelector('td:nth-child(3) .status'); const actionCell = rowInList.querySelector('td:nth-child(4)'); if(statusCell) { statusCell.className = 'status status-evaluated'; statusCell.textContent = 'Đã đánh giá'; } if(actionCell) actionCell.innerHTML = `<button class="btn btn-sm btn-view-evaluation"><i class="fas fa-eye"></i> Xem</button>`; } backToSubordinateListBtn.click(); }); }
    if(sendFeedbackReplyBtn){ /* ... listener gửi phản hồi ... */ sendFeedbackReplyBtn.addEventListener('click', () => { const currentEmployeeId = employeeDetailContainer?.dataset.currentEmployeeId; const replyText = managerFeedbackReplyTextarea ? managerFeedbackReplyTextarea.value.trim() : ''; if(!currentEmployeeId || !replyText){ alert("Vui lòng nhập nội dung trả lời."); return; } console.log(`Gửi trả lời phản hồi cho NV: ${currentEmployeeId}`); console.log("Nội dung:", replyText); alert("Đã gửi trả lời phản hồi!"); managerFeedbackReplyTextarea.disabled = true; sendFeedbackReplyBtn.disabled = true; }); }

    // -- Listener for Report Tab --
    if (generateReportBtn && reportEvalPeriodSelect) {
        generateReportBtn.addEventListener('click', () => {
            const selectedPeriodId = reportEvalPeriodSelect.value;
            if (!selectedPeriodId) {
                alert("Vui lòng chọn kỳ đánh giá để tạo báo cáo.");
                return;
            }
            const data = generateReportData(selectedPeriodId); // Lấy dữ liệu (mô phỏng)
            if (data) {
                displayReport(data); // Hiển thị báo cáo
            } else {
                alert("Không có dữ liệu báo cáo cho kỳ đánh giá này.");
                if(reportResultsArea) reportResultsArea.style.display = 'none';
                if(reportPlaceholder) reportPlaceholder.style.display = 'block';
                reportPlaceholder.querySelector('p').textContent = `Không tìm thấy dữ liệu báo cáo cho kỳ ${reportEvalPeriodSelect.options[reportEvalPeriodSelect.selectedIndex].text}.`;
            }
        });
    }

    // --- Initial Setup ---
    const firstMainTabId = mainTabButtons[0]?.dataset.tab;
    if (firstMainTabId) switchMainTab(firstMainTabId);
    else if(danhSachView) danhSachView.classList.add('active'); // Fallback
});