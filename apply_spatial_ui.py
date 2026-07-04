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

swiper_css = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />\n  <link rel="stylesheet" href="public/css/styles.css">'
tilt_js = '<script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.0/vanilla-tilt.min.js"></script>\n  <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>\n  <script src="main.js"></script>'

def update_file(filename):
    if not os.path.exists(filename):
        return

    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()

    # Inject Swiper CSS
    if 'swiper-bundle.min.css' not in content:
        content = re.sub(r'<link rel="stylesheet" href="public/css/styles\.css">', swiper_css, content)
        content = re.sub(r'<link rel="stylesheet" href="styles\.css">', swiper_css.replace('public/css/styles.css', 'styles.css'), content)

    # Inject JS Libraries
    if 'vanilla-tilt.min.js' not in content:
        content = re.sub(r'<script src="main\.js"></script>', tilt_js, content)

    # Add data-tilt to interesting cards
    content = re.sub(r'class="service-card"', 'class="service-card" data-tilt data-tilt-glare data-tilt-max-glare="0.8" data-tilt-scale="1.05"', content)
    content = re.sub(r'class="feature-card"', 'class="feature-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5"', content)
    content = re.sub(r'class="stat-box"', 'class="stat-box" data-tilt data-tilt-scale="1.1"', content)
    content = re.sub(r'class="treatment-card"', 'class="treatment-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5"', content)
    
    # Enhance specific elements
    content = re.sub(r'class="hero-floating-tags"', 'class="hero-floating-tags" data-tilt data-tilt-scale="1.02"', content)

    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

for f in html_files:
    update_file(f)
