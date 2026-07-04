import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# We want to remove the "Partner With Us" button from hero
partner_btn_regex = re.compile(r'<a href="appointment.html" class="btn btn-book-arrow">\s*Partner With Us.*?</a>', re.DOTALL)
# Or any Partner With Us link
partner_link_regex = re.compile(r'<a[^>]*>Partner With Us.*?</a>', re.DOTALL | re.IGNORECASE)

b2b_tag_regex = re.compile(r'<span class="tag">B2B Support</span>', re.IGNORECASE)

for file_name in html_files:
    with open(file_name, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    if 'Partner With Us' in content:
        content = partner_link_regex.sub('', content)
        modified = True
        
    if 'B2B Support' in content:
        content = b2b_tag_regex.sub('', content)
        modified = True
        
    if 'B2B' in content:
        # replace B2B with something else? or just leave it for now, let's remove the specific tags first.
        content = content.replace('<span class="tag">B2B Support</span>', '')
        modified = True

    if modified:
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_name}")

