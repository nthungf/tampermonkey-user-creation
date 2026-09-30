import json

missing_emails = [
    'tunh1@vnpay.vn',
    'nhungdth1@vnpay.vn',
    'ductl@vnpay.vn',
    'nhannt5@vnpay.vn',
    'yentth@vnpay.vn',
    'nguyetnt3@vnpay.vn',
    'chilq1@vnpay.vn',
    'duonght1@vnpay.vn',
    'huydq2@vnpay.vn',
    'dungntp@vnpay.vn',
    'dinhdc@vnpay.vn'
]

input_path = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\raw data\Update_11.03.26_Sheet1_users.json"
output_path = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\create_missing_users.json"

def filter_missing():
    with open(input_path, 'r', encoding='utf-8') as f:
        users = json.load(f)
    
    missing_data = [u for u in users if u['email'] in missing_emails]
    
    # Sort them in the order provided by user for convenience
    missing_data.sort(key=lambda x: missing_emails.index(x['email']))
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(missing_data, f, ensure_ascii=False, indent=2)
    
    print(f"Filtered {len(missing_data)} users to {output_path}")

if __name__ == "__main__":
    filter_missing()
