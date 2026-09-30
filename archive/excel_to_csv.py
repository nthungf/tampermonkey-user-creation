import pandas as pd
import os
import sys

def convert_excel_to_csv(excel_path):
    try:
        # Load the excel file
        # We use openpyxl as engine for xlsx
        xl = pd.ExcelFile(excel_path, engine='openpyxl')
        
        # Print sheet names
        print(f"Sheets found: {xl.sheet_names}")
        
        for sheet_name in xl.sheet_names:
            df = xl.parse(sheet_name)
            csv_path = excel_path.replace('.xlsx', f'_{sheet_name}.csv')
            df.to_csv(csv_path, index=False, encoding='utf-8-sig')
            print(f"Saved sheet '{sheet_name}' to {csv_path}")
            
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    file_path = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\Phân quyền Mytour Booking- Ethical 2026 (2).xlsx"
    if os.path.exists(file_path):
        convert_excel_to_csv(file_path)
    else:
        print(f"File not found: {file_path}")
