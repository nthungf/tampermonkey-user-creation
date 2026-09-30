import csv
import json
import os
from collections import defaultdict

# Paths
DEPT_CSV = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\raw data\vnpay-20260311\vnpay-departments.csv"
JOB_CSV = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\raw data\vnpay-20260311\vnpay-jobtitles.csv"
USERS_JSON = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\raw data\vnpay-20260311\Update_11.03.26_Sheet1_users.json"
OUTPUT_SQL = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\raw data\vnpay-20260311\mass_update_users.sql"

# Custom Mappings (Aliases)
DEPT_ALIASES = {
    "Phòng Dịch vụ Hệ sinh thái": "Phòng Dịch vụ Hệ sinh thái - Các Phòng ban chức năng",
    "Phòng Thiết kế": "Phòng Thiết kế - Trung tâm Quản lý sản phẩm"
}

def load_csv_mapping(path):
    mapping = {}
    if not os.path.exists(path):
        print(f"Error: {path} not found")
        return mapping
    with open(path, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        for row in reader:
            if not row or len(row) < 3: continue
            id_val = row[0]
            name = row[2].strip()
            mapping[name] = id_val
    return mapping

def generate_sql():
    dept_map = load_csv_mapping(DEPT_CSV)
    job_map = load_csv_mapping(JOB_CSV)
    
    if not os.path.exists(USERS_JSON):
        print(f"Error: {USERS_JSON} not found")
        return

    with open(USERS_JSON, 'r', encoding='utf-8') as f:
        users = json.load(f)
    
    dept_groups = defaultdict(list)
    job_groups = defaultdict(list)
    
    dept_names = {}
    job_names = {}

    for user in users:
        email = user.get('email')
        if not email: continue
        
        d_name = user.get('department', '').strip()
        j_name = user.get('job_title', '').strip()
        
        # Apply alias if exists
        mapped_d_name = DEPT_ALIASES.get(d_name, d_name)
        
        dept_id = dept_map.get(mapped_d_name)
        job_id = job_map.get(j_name)
        
        if dept_id:
            dept_groups[dept_id].append(email)
            dept_names[dept_id] = mapped_d_name
        else:
            # Try original name if alias didn't find anything (safety)
            dept_id_retry = dept_map.get(d_name)
            if dept_id_retry:
                dept_groups[dept_id_retry].append(email)
                dept_names[dept_id_retry] = d_name

        if job_id:
            job_groups[job_id].append(email)
            job_names[job_id] = j_name

    sql_lines = []
    
    sql_lines.append("-- SECTION 1: MASS UPDATE DEPARTMENTS")
    for d_id, emails in sorted(dept_groups.items(), key=lambda x: int(x[0])):
        email_list = ", ".join([f"'{e}'" for e in sorted(list(set(emails)))])
        sql_lines.append(f"UPDATE user SET department_id = {d_id} WHERE email IN ({email_list}); -- Dept: {dept_names[d_id]}")
    
    sql_lines.append("\n-- SECTION 2: MASS UPDATE JOB TITLES")
    for j_id, emails in sorted(job_groups.items(), key=lambda x: int(x[0])):
        email_list = ", ".join([f"'{e}'" for e in sorted(list(set(emails)))])
        sql_lines.append(f"UPDATE user SET job_title_id = {j_id} WHERE email IN ({email_list}); -- Job: {job_names[j_id]}")

    with open(OUTPUT_SQL, 'w', encoding='utf-8') as f:
        f.write('\n'.join(sql_lines))
    
    print(f"Generated separate mass updates with alias support in {OUTPUT_SQL}")

if __name__ == "__main__":
    generate_sql()
