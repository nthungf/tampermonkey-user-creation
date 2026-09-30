import re

filepath = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\user_creation.user.js"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the polling loop
old_loop = r'for \(let i = 0; i < 5; i\+\+\) \{[\s\S]*?resultRow = allRows\.find\(tr => tr\.textContent && tr\.textContent\.includes\(user\.email\) && tr\.innerText\.includes\(\'@\'\)\);[\s\S]*?wait\(1000\);[\s\S]*?\}'
new_loop = """for (let i = 0; i < 7; i++) {
                       const tbody = document.querySelector('tbody.MuiTableBody-root');
                       if (tbody) {
                           const allRows = Array.from(tbody.querySelectorAll('tr'));
                           resultRow = allRows.find(tr => {
                               const text = (tr.textContent || "").toLowerCase();
                               return text.includes(user.email.toLowerCase()) && tr.querySelector('td');
                           });
                       }
                       if (resultRow) break;
                       await wait(1000);
                  }"""

metadata_pattern = r'const shouldUpdate = localStorage\.getItem\(\'tm_bot_update_existing\'\) === \'true\';\s*const shouldCreate = localStorage\.getItem\(\'tm_bot_create_missing\'\) !== \'false\';'

# Replace the resultRow block
old_if_block = r'if \(resultRow\) \{[\s\S]*?console\.log\("\[BOT\] User found\. Opening edit drawer\.\.\."\);[\s\S]*?const editBtn = [\s\S]*?editBtn\.click\(\);[\s\S]*?wait\(2500\);[\s\S]*?\} else \{'
new_if_block = """if (resultRow) {
                      if (!shouldUpdate) {
                          console.log(`[BOT] User ${user.email} exists. (Update disabled) Skipping.`);
                          return true;
                      }
                      console.log("[BOT] User found. Clicking Edit link...");
                      const editLink = resultRow.querySelector('a[href*="/update"]');
                      const editBtn = editLink || resultRow.querySelector('button'); 

                      if (editLink) {
                          editLink.click();
                      } else if (editBtn) {
                          editBtn.click();
                      } else {
                          resultRow.click();
                      }
                      await wait(2500);
                  } else {"""

content = re.sub(old_loop, new_loop, content)
content = re.sub(old_if_block, new_if_block, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Tampermonkey script updated successfully via regex.")
