# Hướng dẫn Xử lý & Tạo Dữ liệu Người dùng Mytour - Đông Á (Tháng 09/2026)
## Guide: Processing & User Creation for Dong A / Mega Lifesciences (Sep 2026 Batch)

Tài liệu này hướng dẫn quy trình chuyển đổi bảng tính Excel phân quyền booking phòng thành file CSV và 3 file JSON cấu hình phục vụ cho bot Tampermonkey (`user_creation.user.js`) và quy trình cập nhật hạn mức ngân sách qua SQL.

---

## 1. Cấu trúc Thư mục & Các File Đầu ra

Đường dẫn thư mục: `tampermonkey-user-creation/raw data/dong-a-20260904/`

| Tên File | Mô tả |
|---|---|
| `Phân quyền Mytour Booking- Ethical Sep'2026.xlsx` | File Excel gốc chứa sheet dữ liệu mới `Update Mytour 03.09.2026`. |
| `Update Mytour 03.09.2026.csv` | File trích xuất dữ liệu thô dạng CSV (UTF-8 with BOM). |
| `users_ready_for_bot.json` | Danh sách 7 nhân viên mới (New Comer) để tạo tài khoản trong hệ thống Mytour. |
| `individual_approval_flows.json` | Cấu hình quy trình phê duyệt cá nhân (2 bước: Bước 1 là người duyệt số 1, Bước 2 luôn là Admin Office). |
| `target_emails.json` | Nhóm email theo hạn mức Class C (`750`, `650`, `550`) để tạo SQL cấp hạn mức. |
| `process_sep2026.py` | Script Python tự động trích xuất CSV và sinh ra 3 file JSON trên. |

---

## 2. Quy tắc Nghiệp vụ & Logic Chuyển đổi

Trong sheet **`Update Mytour 03.09.2026`**, có **4 bảng** phân quyền độc lập:
1. `ETHICAL- OFFICE`
2. `ETHICAL- KAM HCMC`
3. `ETHICAL- NORTHERN ASMs`
4. `ETHICAL- SALES TEAM-NORTH 1`

### A. Phân định Người duyệt (Approver) vs Nhân viên mới (New Comer)
* **Số thứ tự `Ref = 1` (Người duyệt)**: Là cấp quản lý / người phê duyệt trực tiếp cho toàn bộ nhân viên phía dưới trong cùng bảng.
  * **QUAN TRỌNG**: Các tài khoản này **đã tồn tại** trên hệ thống (hoặc đã được tạo từ các đợt trước). **KHÔNG** đưa người số 1 vào `users_ready_for_bot.json` để tránh lỗi trùng lặp khi bot chạy.
* **Số thứ tự `Ref > 1` (New Comer)**: Là nhân viên mới cần tạo tài khoản trên hệ thống.

### B. Mối quan hệ Quản lý & Phê duyệt
| Bảng | Người duyệt số 1 (Approver) | Email Người duyệt | Nhân viên mới cần tạo tài khoản (Ref > 1) |
|---|---|---|---|
| **ETHICAL- OFFICE** | Vinod Maruti Patil | `vinod@megawecare.com` | Lê Duy Quý (`ET0495`) |
| **ETHICAL- KAM HCMC** | Hà Thanh Loan | `loan@megawecare.com` | Trần Văn Đạt (`ET0494`), Nguyễn Văn Bé (`ET0493`), Lê Hữu Dũng (`ET0491`), Trần Minh Tâm (`ET0490`) |
| **ETHICAL- NORTHERN ASMs** | Hà Thanh Loan | `loan@megawecare.com` | Hoàng Xuân Quang (`ET0492`) |
| **ETHICAL- SALES TEAM-NORTH 1** | Nguyễn Đình Hoàng | `MegaASM1@hdvnpharma.com` | Mai Lê Duẩn (`ET0487`) |

### C. Quy chuẩn trường dữ liệu cho `users_ready_for_bot.json`
* **`password`**: `Mwc@<StaffID>` (ví dụ: `ET0495` ➔ `Mwc@ET0495`).
* **`phone`**: Mặc định `"0123456789"` (hoặc số điện thoại thực tế nếu có).
* **`department`**: Xác định theo cột `LC With`:
  * Chứa `MAXXCARE` ➔ `Ethical | Maxxcare`
  * Chứa `HD` ➔ `Ethical | HD` (tất cả 7 nhân viên mới đợt này đều thuộc `HD`).
* **`job_title`**: Lấy theo cột `Position`.
  * *Lưu ý*: Chuẩn hóa lỗi chính tả trong Excel từ `Key Account Excutive` thành `Key Account Executive` để khớp chính xác với dropdown trên giao diện Mytour.
* **`role`**: Mặc định `"Thành viên"`.
* **`approving_manager`**: Điền đầy đủ họ và tên của người số 1 trong cùng bảng.

### D. Quy chuẩn cho `individual_approval_flows.json`
* Cấu hình quy trình phê duyệt gồm **2 bước** cho toàn bộ nhân viên:
  * **Bước 1 (`step_number: 1`)**: Email công vụ của người duyệt số 1 (`Ref = 1`) trong cùng bảng.
  * **Bước 2 (`step_number: 2`)**: Luôn luôn là Admin Office (`adminoffice@megawecare.com`).

### E. Quy chuẩn cho `target_emails.json`
* Lấy giá trị ngân sách khách sạn từ cột **`Class C`**, chia cho 1.000 để làm key nhóm:
  * `750,000` ➔ `"750"`: `MegaRSM1@hdvnpharma.com`
  * `650,000` ➔ `"650"`: `MegaKAE17@hdvnpharma.com`, `MegaKAE21@hdvnpharma.com`
  * `550,000` ➔ `"550"`: `MegaKAE22@hdvnpharma.com`, `MegaKAE19@hdvnpharma.com`, `MegaASM3@hdvnpharma.com`, `maileduan1992@gmail.com`

---

## 3. Quy trình Vận hành Chi tiết với Bot Tampermonkey

### Bước 1: Tạo Tài khoản Người dùng (User Creation)
1. Mở trang quản trị công ty trên Mytour: **Thiết lập chung** ➔ **Quản lý người dùng** (`/company/users`).
2. Mở giao diện nổi của Bot Tampermonkey (`user_creation.user.js`).
3. Chọn Tab **CREATE USERS**:
   * Dán toàn bộ nội dung file `users_ready_for_bot.json` vào ô nhập.
   * Nhấn **VALIDATE JSON** để kiểm tra tính hợp lệ của dữ liệu.
   * Nhấn **START AUTOMATION** để bot tự động điền form, chọn phòng ban, chức vụ, người duyệt và lưu tài khoản.

### Bước 2: Cài đặt Quy trình Phê duyệt (Approval Flows Sync)
1. Chuyển sang Tab **SYNC FLOWS** (hoặc trang Cấu hình phê duyệt cá nhân).
2. Dán toàn bộ nội dung file `individual_approval_flows.json`.
3. Nhấn **SAVE SYNC FLOW** để bot tự động áp dụng người duyệt cho từng email tương ứng.

### Bước 3: Cấp Hạn mức Chính sách (Budget Policy)
1. Chuyển sang Tab **BUDGET**.
2. Chọn Company: **Đông Á**.
3. Dán toàn bộ nội dung file `target_emails.json`.
4. Nhấn **GENERATE SQL**:
   * Bot sẽ tự động sinh các câu lệnh SQL `UPDATE` tương ứng với từng hạn mức (`flight_budget`, `hotel_budget`).
5. Sao chép đoạn SQL sinh ra và thực thi trực tiếp trên cơ sở dữ liệu.

---

## 4. Cách Chạy Lại Script Tái tạo Dữ liệu

Nếu cần cập nhật lại dữ liệu từ file Excel, chỉ cần chạy lệnh sau từ terminal:

```bash
cd "/home/hung/Desktop/explore/tampermonkey-user-creation/raw data/dong-a-20260904"
python3 process_sep2026.py
```

Script sẽ tự động đọc sheet `Update Mytour 03.09.2026`, ghi đè lại file CSV và 3 file JSON với dữ liệu mới nhất.
