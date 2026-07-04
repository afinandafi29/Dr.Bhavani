import os
import re

html_file = 'index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Add a link to the end of the .service-card-content for each known product
replacements = [
    (r'(<h3>.*?Zirconia.*?</h3>.*?</ul>)', r'\1\n            <a href="cosmetics.html" class="btn btn-secondary" style="margin-top: 15px; display: inline-block;">Learn More</a>'),
    (r'(<h3>.*?Implant Abutments.*?</h3>.*?</ul>)', r'\1\n            <a href="implants.html" class="btn btn-secondary" style="margin-top: 15px; display: inline-block;">Learn More</a>'),
    (r'(<h3>.*?Clear Aligners.*?</h3>.*?</ul>)', r'\1\n            <a href="orthodontics.html" class="btn btn-secondary" style="margin-top: 15px; display: inline-block;">Learn More</a>'),
    (r'(<h3>.*?Smile Design.*?</h3>.*?</ul>)', r'\1\n            <a href="cosmetics.html" class="btn btn-secondary" style="margin-top: 15px; display: inline-block;">Learn More</a>'),
    (r'(<h3>.*?Digital Dentures.*?</h3>.*?</ul>)', r'\1\n            <a href="removables.html" class="btn btn-secondary" style="margin-top: 15px; display: inline-block;">Learn More</a>'),
    (r'(<h3>.*?Pediatric.*?</h3>.*?</ul>)', r'\1\n            <a href="pediatrics.html" class="btn btn-secondary" style="margin-top: 15px; display: inline-block;">Learn More</a>'),
]

new_content = content
for pattern, replacement in replacements:
    new_content = re.sub(pattern, replacement, new_content, flags=re.DOTALL)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated services.html with Learn More buttons.")
