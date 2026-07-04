import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# The regex to match the WhatsApp link in the AI header
# <a href="https://wa.me/917550134175" target="_blank" title="Contact on WhatsApp" style="color:white; font-size:18px;">...</a>
wa_link_regex = re.compile(r'<a href="https://wa.me/[^"]*" target="_blank" title="Contact on WhatsApp".*?</a>', re.DOTALL)

for file_name in html_files:
    with open(file_name, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if wa_link_regex.search(content):
        # We need to be careful to only remove the one in the AI header, not the floating one.
        # The floating one has class="floating-whatsapp".
        # The one in the header doesn't have a class.
        
        # Let's find all matches
        def replace_func(match):
            m_text = match.group(0)
            if 'class="floating-whatsapp"' in m_text:
                return m_text # keep it
            return '' # remove it
            
        content = wa_link_regex.sub(replace_func, content)
        
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Removed WA link in {file_name}")

