import pandas as pd

df = pd.read_csv('full_mapped_data.csv')

with open('combined_updates.sql', 'w') as f:
    # aclicktogo.users queries first
    f.write("-- aclicktogo.users updates\n")
    for _, row in df.iterrows():
        f.write(f"update aclicktogo.users set email = '{row['new_email']}', email_info = '{row['new_email']}' where id = {row['tripi_user_id']};\n")
    
    f.write("\n-- tripi_one.user updates\n")
    # tripi_one.user queries second
    for _, row in df.iterrows():
        f.write(f"update tripi_one.user set email = '{row['new_email']}' where id = {row['id']};\n")

print('Combined SQL update queries saved to combined_updates.sql')
