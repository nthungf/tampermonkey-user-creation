import pandas as pd
import json

csv_path = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\raw data\Update_11.03.26_Sheet1.csv"

def extract_unique_departments():
    df = pd.read_csv(csv_path)
    
    # Columns: Miền, Mã Phòng ban, Khối, Phòng ban, Người duyệt
    # We want unique combinations of Code and Name
    unique_depts = df.drop_duplicates(subset=['Mã Phòng ban', 'Phòng ban'])
    
    result = []
    for _, row in unique_depts.iterrows():
        result.append({
            "type": "DEPARTMENT",
            "name": str(row['Phòng ban']).strip(),
            "code": str(row['Mã Phòng ban']).strip(),
            "branch": str(row['Khối']).strip(), # Using Khối as the Branch as requested
            "region": str(row['Miền']).strip(), # Moving Miền to region field
            "approver": str(row['Người duyệt']).strip()
        })
    
    # Sort for convenience
    result.sort(key=lambda x: (x['branch'], x['name']))
    
    output_path = csv_path.replace('.csv', '_depts.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    print(f"Extracted {len(result)} unique departments to {output_path}")

if __name__ == "__main__":
    extract_unique_departments()
