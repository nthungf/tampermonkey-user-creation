import json
import os

# Paths
USERS_JSON = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\raw data\vnpay-20260311\Update_11.03.26_Sheet1_users.json"
OUTPUT_SQL = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\raw data\vnpay-20260311\select_users.sql"

def generate_select_query():
    if not os.path.exists(USERS_JSON):
        print(f"Error: {USERS_JSON} not found")
        return

    with open(USERS_JSON, 'r', encoding='utf-8') as f:
        users = json.load(f)
    
    # Extract unique emails
    emails = sorted(list(set(user.get('email') for user in users if user.get('email'))))
    
    if not emails:
        print("No emails found in JSON.")
        return

    email_list = ", ".join([f"'{e}'" for e in emails])
    query = f"SELECT * FROM user WHERE email IN ({email_list});"

    with open(OUTPUT_SQL, 'w', encoding='utf-8') as f:
        f.write(query)
    
    print(f"Generated select query with {len(emails)} emails in {OUTPUT_SQL}")

if __name__ == "__main__":
    generate_select_query()
