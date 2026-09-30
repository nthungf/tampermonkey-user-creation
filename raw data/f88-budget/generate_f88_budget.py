#!/usr/bin/env python3
import csv
import json
import os
import re

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
USERS_CSV = os.path.join(BASE_DIR, "users.csv")
JOBS_CSV = os.path.join(BASE_DIR, "job-titles.csv")
OUTPUT_SQL = os.path.join(BASE_DIR, "f88_budget_update.sql")
OUTPUT_JSON = os.path.join(BASE_DIR, "target_emails_f88.json")

# Province Vùng 1 IDs
VUNG_1_IDS = [11, 33, 1, 50, 38, 3] # Hà Nội, HCM, Huế, Đà Nẵng, Cần Thơ, Hải Phòng

# F88 Budget Policies
F88_TIERS = {
    "cap_2": {
        "name": "Cấp 2",
        "hotel_budget": 2160000,
        "province_budget": '[{"provinceId":11,"budget":3780000},{"provinceId":33,"budget":3780000},{"provinceId":1,"budget":3780000},{"provinceId":50,"budget":3780000},{"provinceId":38,"budget":3780000},{"provinceId":3,"budget":3780000}]'
    },
    "cap_3": {
        "name": "Cấp 3",
        "hotel_budget": 1296000,
        "province_budget": '[{"provinceId":11,"budget":1620000},{"provinceId":33,"budget":1620000},{"provinceId":1,"budget":1620000},{"provinceId":50,"budget":1620000},{"provinceId":38,"budget":1620000},{"provinceId":3,"budget":1620000}]'
    },
    "cap_4": {
        "name": "Cấp 4",
        "hotel_budget": 972000,
        "province_budget": '[{"provinceId":11,"budget":1188000},{"provinceId":33,"budget":1188000},{"provinceId":1,"budget":1188000},{"provinceId":50,"budget":1188000},{"provinceId":38,"budget":1188000},{"provinceId":3,"budget":1188000}]'
    },
    "cap_5": {
        "name": "Cấp 5",
        "hotel_budget": 648000,
        "province_budget": '[{"provinceId":11,"budget":756000},{"provinceId":33,"budget":756000},{"provinceId":1,"budget":756000},{"provinceId":50,"budget":756000},{"provinceId":38,"budget":756000},{"provinceId":3,"budget":756000}]'
    }
}

def get_cap(title):
    if not title:
        return None
    title_l = title.strip().lower()
    
    # Cấp 1
    if any(x in title_l for x in ['tổng giám đốc', 'tong giam doc', 'ceo']):
        if 'phó' not in title_l and 'trợ lý' not in title_l:
            return "cap_1"
            
    # Cấp 2
    if any(x in title_l for x in ['phó tổng giám đốc', 'pho tong giam doc', 'giám đốc khối', 'giam doc khoi', 'ban kiểm soát', 'ban kiem soat']):
        if 'trợ lý' not in title_l:
            return "cap_2"
            
    # Cấp 3
    if any(x in title_l for x in ['giám đốc', 'giam doc', 'phó giám đốc', 'pho giam doc', 'kế toán trưởng', 'ke toan truong', 'cố vấn', 'co van']):
        if 'khối' not in title_l and 'phó tổng' not in title_l and 'trợ lý' not in title_l:
            return "cap_3"
            
    # Cấp 4
    if any(x in title_l for x in ['trưởng phòng', 'truong phong', 'phó phòng', 'pho phong', 'chuyên gia', 'chuyen gia', 'giám sát', 'giam sat', 'trưởng nhóm (bậc 5)', 'trợ lý', 'tro ly', 'quản lý vùng', 'quan ly vung']):
        return "cap_4"
        
    # Cấp 5
    if any(x in title_l for x in ['nhân viên', 'nhan vien', 'chuyên viên', 'chuyen vien', 'thư ký', 'thu ky', 'trưởng nhóm', 'truong nhom', 'quản lý khu vực', 'quan ly khu vuc', 'giao dịch', 'giao dich', 'kinh doanh', 'admin']):
        return "cap_5"
        
    return "cap_5" # Default fallback for any remaining roles

def main():
    if not os.path.exists(JOBS_CSV) or not os.path.exists(USERS_CSV):
        print("Required CSV files not found!")
        return

    # Load job titles
    job_map = {}
    with open(JOBS_CSV, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            job_map[row['id']] = row['name']

    # Load users and map them
    grouped_emails = {
        "cap_1": [],
        "cap_2": [],
        "cap_3": [],
        "cap_4": [],
        "cap_5": []
    }
    
    business_emails = []
    economy_emails = []
    all_emails = []

    with open(USERS_CSV, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            email = row['email']
            if not email:
                continue
            email = email.strip()
            job_id = row['job_title_id']
            job_name = job_map.get(job_id, "")
            
            cap = get_cap(job_name)
            if cap:
                grouped_emails[cap].append(email)
                all_emails.append(email)
                
            # Business class allowed?
            job_l = job_name.lower()
            is_business = False
            if any(x in job_l for x in ['tổng giám đốc', 'tong giam doc', 'phó tổng giám đốc', 'pho tong giam doc', 'ceo', 'hđqt', 'hdqt']):
                if 'trợ lý' not in job_l and 'tro ly' not in job_l:
                    is_business = True
            
            if is_business:
                business_emails.append(email)
            else:
                economy_emails.append(email)

    # Save to JSON
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(grouped_emails, f, indent=2, ensure_ascii=False)
    print(f"Grouped emails saved to {OUTPUT_JSON}")

    # Generate SQL
    output = "-- F88 BATCH BUDGET UPDATE SCRIPT\n\n"
    for cap, emails in grouped_emails.items():
        if not emails:
            continue
        
        tier = F88_TIERS.get(cap)
        if not tier:
            continue
            
        emails_sql = ", ".join([f"'{e}'" for e in sorted(list(set(emails)))])
        province_budget_sql = tier["province_budget"].replace("'", "''")
        
        output += f"-- ========================================\n"
        output += f"-- Automated Budget Update for Tier: {tier['name']}\n"
        output += f"-- ========================================\n"
        output += f"-- 1. Update Global Policies\n"
        output += f"UPDATE user_budget_policies ubp JOIN user u ON ubp.user_id = u.id SET ubp.hotel_budget = {tier['hotel_budget']}, ubp.allow_all_ticket_classes = 0, ubp.updated_by = 'system', ubp.updated = CURRENT_TIMESTAMP WHERE u.email IN ({emails_sql});\n\n"
        output += f"-- 2. Insert Missing Global Policies\n"
        output += f"INSERT INTO user_budget_policies (company_id, user_id, flight_budget, hotel_budget, budget_per_month, allow_all_ticket_classes, allow_all_airlines, max_hotel_stars, currency_code, status, created_by, updated_by) SELECT u.company_id, u.id, 0, {tier['hotel_budget']}, -1, 0, 1, 5, 'VND', 0, 'system', 'system' FROM user u WHERE u.email IN ({emails_sql}) AND NOT EXISTS (SELECT 1 FROM user_budget_policies ubp WHERE ubp.user_id = u.id);\n\n"
        output += f"-- 3. Update Regional Overrides\n"
        output += f"UPDATE user_budget_policies_by_regions r JOIN user_budget_policies ubp ON r.policies_id = ubp.id JOIN user u ON ubp.user_id = u.id SET r.budget = {tier['hotel_budget']}, r.province_budget = '{province_budget_sql}' WHERE u.email IN ({emails_sql});\n\n"
        output += f"-- 4. Insert Missing Regional Overrides\n"
        output += f"INSERT INTO user_budget_policies_by_regions (policies_id, budget, country_code, product_type, province_budget, max_hotel_star) SELECT ubp.id, {tier['hotel_budget']}, 'VN', 'hotel', '{province_budget_sql}', 5 FROM user_budget_policies ubp JOIN user u ON ubp.user_id = u.id WHERE u.email IN ({emails_sql}) AND NOT EXISTS (SELECT 1 FROM user_budget_policies_by_regions r WHERE r.policies_id = ubp.id);\n\n"

    # Add Ticket Class settings at the end
    output += f"-- ========================================\n"
    output += f"-- Ticket Class Settings Mapping (By Job Title)\n"
    output += f"-- ========================================\n"
    
    if all_emails:
        all_emails_sql = ", ".join([f"'{e}'" for e in sorted(list(set(all_emails)))])
        output += f"-- 1. Clear existing ticket class settings\n"
        output += f"DELETE tc FROM user_budget_policies_ticket_class_setting tc JOIN user_budget_policies ubp ON tc.user_budget_policies_id = ubp.id JOIN user u ON ubp.user_id = u.id WHERE u.email IN ({all_emails_sql});\n\n"
        
    if economy_emails:
        eco_emails_sql = ", ".join([f"'{e}'" for e in sorted(list(set(economy_emails)))])
        output += f"-- 2. Insert Economy (5) for Economy Class job titles\n"
        output += f"INSERT INTO user_budget_policies_ticket_class_setting (user_budget_policies_id, ticket_class_setting_id) SELECT ubp.id, 5 FROM user_budget_policies ubp JOIN user u ON ubp.user_id = u.id WHERE u.email IN ({eco_emails_sql});\n\n"
        
    if business_emails:
        biz_emails_sql = ", ".join([f"'{e}'" for e in sorted(list(set(business_emails)))])
        output += f"-- 3. Insert Economy (5) and Business (7) for Business Class job titles\n"
        output += f"INSERT INTO user_budget_policies_ticket_class_setting (user_budget_policies_id, ticket_class_setting_id) SELECT ubp.id, 5 FROM user_budget_policies ubp JOIN user u ON ubp.user_id = u.id WHERE u.email IN ({biz_emails_sql});\n"
        output += f"INSERT INTO user_budget_policies_ticket_class_setting (user_budget_policies_id, ticket_class_setting_id) SELECT ubp.id, 7 FROM user_budget_policies ubp JOIN user u ON ubp.user_id = u.id WHERE u.email IN ({biz_emails_sql});\n\n"

    with open(OUTPUT_SQL, 'w', encoding='utf-8') as f:
        f.write(output)
    print(f"SQL update script generated at {OUTPUT_SQL}")

if __name__ == "__main__":
    main()
