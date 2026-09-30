import json

input_path = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\raw data\Update_11.03.26_Sheet1_users.json"
output_path = input_path.replace('.json', '_stripped.json')

def strip_users():
    with open(input_path, 'r', encoding='utf-8') as f:
        users = json.load(f)
    
    stripped = []
    for u in users:
        stripped.append({
            "email": u["email"],
            "department": u["department"],
            "job_title": u["job_title"],
            "branch": u["branch"] # also keeping branch as it's part of the sync
        })
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(stripped, f, ensure_ascii=False, indent=2)
    
    print(f"Stripped {len(stripped)} users to {output_path}")

if __name__ == "__main__":
    strip_users()
