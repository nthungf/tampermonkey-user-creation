import json

input_path = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\raw data\Update_11.03.26_Sheet1_users.json"
output_path = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\find_missing_users.sql"

def generate_missing_query():
    with open(input_path, 'r', encoding='utf-8') as f:
        users = json.load(f)
    
    # Use UNION ALL for maximum MySQL compatibility
    selects = [f"SELECT '{u['email']}' AS email" for u in users]
    union_query = "\n    UNION ALL ".join(selects)
    
    sql = f"""
WITH input_emails AS (
    {union_query}
)
SELECT i.email 
FROM input_emails i
LEFT JOIN user u ON i.email = u.email
WHERE u.email IS NULL;
"""
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(sql)
    
    print(f"Generated compatible MySQL 'missing users' query to {output_path}")

if __name__ == "__main__":
    generate_missing_query()
