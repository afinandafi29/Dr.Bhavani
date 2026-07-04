import os

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file_name in html_files:
    with open(file_name, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    if 'Dental Care' in content:
        content = content.replace('Dental Care', 'Dental Lab')
        modified = True
        
    if 'dental care' in content:
        content = content.replace('dental care', 'dental lab')
        modified = True
        
    if 'Dental clinic' in content:
        content = content.replace('Dental clinic', 'Dental lab')
        modified = True

    if 'dental clinic' in content:
        content = content.replace('dental clinic', 'dental lab')
        modified = True

    if modified:
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_name}")

