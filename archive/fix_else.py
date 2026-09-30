import re

filepath = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\user_creation.user.js"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the broken else block at the end of the search section
bad_else = r'\} else \{\s*console\.error\("\[BOT\] Could not find edit button in row\."\);\s*return false;\s*\}'
good_else = """} else {
                      if (!shouldCreate) {
                          console.log(`[BOT] User ${user.email} not found. (Create disabled) Skipping.`);
                          return true;
                      }
                      console.log("[BOT] User not found. Creating new...");
                      const addBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Thêm mới'));
                      if (addBtn) {
                          addBtn.click();
                          await wait(2500);
                      } else {
                          console.error("[BOT] 'Thêm mới' button not found.");
                          return false;
                      }
                  }"""

# Use a specific anchor to avoid over-replacing
content = re.sub(bad_else, good_else, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Tampermonkey script else-block fixed successfully.")
