import os
import re

html_files = [
    "index.html",
    "services.html",
    "about.html",
    "gallery.html",
    "contact.html",
    "appointment.html",
    "treatments.html",
    "implants.html",
    "cosmetics.html",
    "pediatrics.html"
]

b2b_dropdown = """          <li class="dropdown-item">
            <a href="#" class="nav-link">Partners ▾</a>
            <ul class="dropdown-menu">
              <li><a href="digital-workflows.html">Digital Workflows</a></li>
              <li><a href="materials.html">Material Specs</a></li>
              <li><a href="case-submission.html">Send a Case</a></li>
            </ul>
          </li>"""

def update_nav(filename):
    if not os.path.exists(filename):
        return

    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()

    # Avoid injecting multiple times
    if 'href="digital-workflows.html"' in content:
        return

    # Inject the new dropdown right after the Prosthetics dropdown
    prosthetics_pattern = r'<li><a href="treatments.html">Treatments List</a></li>\s*</ul>\s*</li>'
    
    match = re.search(prosthetics_pattern, content)
    if match:
        content = content[:match.end()] + "\n" + b2b_dropdown + content[match.end():]
        with open(filename, "w", encoding="utf-8") as f:
            f.write(content)

for f in html_files:
    update_nav(f)
