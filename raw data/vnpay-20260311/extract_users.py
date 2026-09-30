import pandas as pd
import json
import os

csv_path = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\raw data\Update_11.03.26_Sheet1.csv"

def extract_users():
    if not os.path.exists(csv_path):
        print(f"Error: {csv_path} not found")
        return
        
    df = pd.read_csv(csv_path)
    
    # Mapping columns: 
    # Mã nhân viên -> employee_code
    # Họ và tên -> name
    # Phòng ban -> department
    # Chức danh -> job_title
    # Số điện thoại -> phone
    # Email -> email
    # Người duyệt -> approving_manager
    # Khối -> branch (Chi nhánh)
    
    users = []
    
    for _, row in df.iterrows():
        # Handle cases where some fields might be empty
        email = str(row['Email']).strip() if pd.notna(row['Email']) else ""
        if not email or "@" not in email:
            continue # Skip invalid rows
            
        name = str(row['Họ và tên']).strip() if pd.notna(row['Họ và tên']) else ""
        emp_code = str(row['Mã nhân viên']).strip() if pd.notna(row['Mã nhân viên']) else ""
        dept = str(row['Phòng ban']).strip() if pd.notna(row['Phòng ban']) else ""
        job = str(row['Chức danh']).strip() if pd.notna(row['Chức danh']) else ""
        
        phone = str(row['Số điện thoại']).strip() if pd.notna(row['Số điện thoại']) else "0123456789"
        if phone and not phone.startswith('0'):
            phone = '0' + phone
            
        approver = str(row['Người duyệt']).strip() if pd.notna(row['Người duyệt']) else ""
        branch = str(row['Khối']).strip() if pd.notna(row['Khối']) else ""
        
        users.append({
            "name": name,
            "email": email,
            "password": f"vnp@{emp_code.lower()}" if emp_code else "123456", 
            "phone": phone,
            "employee_code": emp_code,
            "department": dept,
            "job_title": job,
            "role": "Thành viên", # Default role
            "approving_manager": approver,
            "branch": branch
        })
    
    output_path = csv_path.replace('.csv', '_users.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(users, f, ensure_ascii=False, indent=2)
    
    print(f"Extracted {len(users)} users to {output_path}")

if __name__ == "__main__":
    extract_users()
