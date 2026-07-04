import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# The new navbar structure to replace the old one
new_nav = """          <div class="nav-pills-wrapper">
            <ul class="nav-links nav-pills">
              <li><a href="index.html" class="nav-link">Home</a></li>
              <li><a href="services.html" class="nav-link">Services</a></li>
              <li><a href="franchise.html" class="nav-link">Partners</a></li>
              <li><a href="about.html" class="nav-link">About</a></li>
              <li><a href="download-center.html" class="nav-link">Resources</a></li>
              <li><a href="contact.html" class="nav-link">Contact</a></li>
            </ul>
          </div>
          <div class="nav-cta">
            <a href="appointment.html" class="btn btn-primary" style="padding: 10px 24px; border-radius: 8px; font-weight: 600; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4); text-transform: none; font-size: 15px;">Book a Call</a>
          </div>"""

# Regex to match the old nav structure
nav_regex = re.compile(r'<div class="nav-pills-wrapper">.*?</div>\s*<div class="nav-cta">.*?</div>', re.DOTALL)

for file_name in html_files:
    with open(file_name, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if nav_regex.search(content):
        new_content = nav_regex.sub(new_nav, content)
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated navbar in {file_name}")
    else:
        print(f"Could not find navbar block in {file_name}")
