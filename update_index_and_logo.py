import os
import re

# 1. Update logo in all HTML files
html_files = [
    'index.html', 'about.html', 'services.html', 'gallery.html', 
    'contact.html', 'appointment.html', 'ai-hub.html', 'dashboard.html'
]

old_logo = '''<span style="font-size: 19px; font-family: var(--font-heading); letter-spacing: 0.05em; color: var(--gold); font-weight: 600;">Oro-Hold</span>
          <span style="font-size: 10px; font-family: var(--font-body); letter-spacing: 0.15em; opacity: 0.8; font-weight: 500; text-transform: uppercase; color: var(--gold-light);">Dental Lab</span>'''

new_logo = '''<span style="font-size: 14px; font-family: var(--font-heading); color: var(--gold); font-weight: 600; line-height: 1;">Dr B's</span>
          <span style="font-size: 19px; font-family: var(--font-heading); letter-spacing: 0.05em; color: var(--gold); font-weight: 600; line-height: 1;">Oro-Hold</span>
          <span style="font-size: 10px; font-family: var(--font-body); letter-spacing: 0.15em; opacity: 0.8; font-weight: 500; text-transform: uppercase; color: var(--gold-light); line-height: 1;">Dental Lab</span>'''

for file in html_files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = content.replace(old_logo, new_logo)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated logo in {file}")

# 2. Remove surgeon image from index.html slider
if os.path.exists('index.html'):
    with open('index.html', 'r', encoding='utf-8') as f:
        index_content = f.read()
    
    # Remove the specific slide containing the surgeon image
    surgeon_slide_pattern = r'<div class="hero-slide active">\s*<div class="hero-overlay"></div>\s*<img src="https://images\.unsplash\.com/photo-1629909613654-28e377c37b09\?q=80&w=1600" alt="Oro-Hold Dental Lab Care Welcome">\s*</div>'
    
    # Make the next slide active if we remove the first one
    index_content = re.sub(surgeon_slide_pattern, '', index_content)
    index_content = index_content.replace('<div class="hero-slide">', '<div class="hero-slide active">', 1)
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(index_content)
    print("Removed surgeon image from index.html")
