import csv

target_job_titles = {
    "Phó giám đốc Trung tâm kiêm Trưởng phòng Quản lý sản phẩm 1": 1658,
    "Phó Giám Đốc Trung tâm kiêm Trưởng phòng Quản trị dự án": 1657,
    "Chuyên viên Quản lý sản phẩm": 1656
}

mapping = {title: [] for title in target_job_titles}

file_path = r'c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\raw data\vnpay-20260311\Update_11.03.26_Sheet1.csv'
output_path = r'c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\raw data\vnpay-20260311\jobtitle_update.sql'

with open(file_path, mode='r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        title = row['Chức danh'].strip()
        if title in target_job_titles:
            mapping[title].append(row['Email'].strip())

with open(output_path, mode='w', encoding='utf-8') as out:
    for title, emails in mapping.items():
        if emails:
            out.write(f"-- Job: {title}\n")
            out.write(f"UPDATE user SET job_title_id = {target_job_titles[title]} WHERE email IN ({', '.join([f"'{e}'" for e in emails])});\n\n")
