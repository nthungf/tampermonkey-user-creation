import re

filepath = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\user_creation.user.js"

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# I want to delete the redundant block between the first user creation else and the next major block
# Based on my view:
# Line 317: } else { (Correct)
# ...
# Line 331: } (Closes correct else)
# Line 332: } else { (DUPLICATE/EXTRA)
# ...
# Line 346: } (Closes duplicate else)
# Line 347: } else { (This is the else for if (searchInput) from line 273)

# Let's just slice it out. Line numbers are 1-indexed.
# Lines 332 (index 331) to 346 (index 345) should be removed.
# But wait, let's verify if I should remove line 332's closing brace.
# Trace:
# if (drawer) { ... } else { // line 251 ... line 268
#    if (!drawer) { // line 268
#       if (searchInput) { // line 273
#          if (resultRow) { // line 300
#          } else { // line 317
#          } // line 331
#       } // This is what line 332's first brace is doing.
#       else { // line 332
#       } // line 346
#    } else { // line 347 (This would be another else for searchInput? No.)

# Actually, if I look at line 347: "} else {"
# This belongs to line 273: "if (searchInput) {"
# So line 347's brace closes the if (searchInput) block.
# This means line 332's block is definitely an extra else block for searchInput.

start_del = 332 - 1
end_del = 346 # inclusive in line numbers, so index 346

new_lines = lines[:start_del] + lines[end_del:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Tampermonkey script cleaned up successfully.")
