import pandas as pd
import json

csv_path = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\raw data\Update_11.03.26_Sheet1.csv"

def extract_unique_job_titles():
    df = pd.read_csv(csv_path)
    
    # Column: Chức danh
    unique_titles = df['Chức danh'].dropna().unique()
    
    result = []
    for title in unique_titles:
        result.append({
            "type": "JOB_TITLE",
            "name": str(title).strip()
        })
    
    # Sort for convenience
    result.sort(key=lambda x: x['name'])
    
    output_path = csv_path.replace('.csv', '_jobtitles.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    print(f"Extracted {len(result)} unique job titles to {output_path}")

if __name__ == "__main__":
    extract_unique_job_titles()
