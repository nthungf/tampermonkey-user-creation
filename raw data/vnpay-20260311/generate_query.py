import json
import os

input_path = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\raw data\Update_11.03.26_Sheet1_users.json"
output_path = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\user_query.sql"

def generate_query():
    with open(input_path, 'r', encoding='utf-8') as f:
        users = json.load(f)
    
    emails = [f"'{u['email']}'" for u in users]
    query = f"SELECT * FROM user WHERE email IN ({', '.join(emails)});"
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(query)
    
    print(f"Generated SQL query with {len(emails)} emails to {output_path}")

if __name__ == "__main__":
    generate_query()
