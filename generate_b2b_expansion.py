import os
import re

html_files = [
    "index.html", "services.html", "about.html", "gallery.html", 
    "contact.html", "appointment.html", "treatments.html", "implants.html", 
    "cosmetics.html", "pediatrics.html", "digital-workflows.html", 
    "materials.html", "case-submission.html"
]

new_nav = """        <ul class="nav-links nav-pills">
          <li><a href="index.html" class="nav-link">Home</a></li>
          <li class="dropdown-item">
            <a href="#" class="nav-link">Prosthetics ▾</a>
            <ul class="dropdown-menu">
              <li><a href="services.html">All Services</a></li>
              <li><a href="implants.html">Implants & Abutments</a></li>
              <li><a href="cosmetics.html">Cosmetics & Veneers</a></li>
              <li><a href="pediatrics.html">Pediatric Devices</a></li>
              <li><a href="treatments.html">Treatments List</a></li>
            </ul>
          </li>
          <li class="dropdown-item">
            <a href="#" class="nav-link">Partners ▾</a>
            <ul class="dropdown-menu">
              <li><a href="digital-workflows.html">Digital Workflows</a></li>
              <li><a href="materials.html">Material Specs</a></li>
              <li><a href="pricing.html">Pricing & Rate Card</a></li>
              <li><a href="franchise.html">Partner Network</a></li>
              <li><a href="case-submission.html">Send a Case</a></li>
            </ul>
          </li>
          <li class="dropdown-item">
            <a href="#" class="nav-link">About Lab ▾</a>
            <ul class="dropdown-menu">
              <li><a href="about.html">Our Story</a></li>
              <li><a href="technology.html">Lab Technology</a></li>
              <li><a href="team.html">Master Ceramists</a></li>
              <li><a href="careers.html">Careers</a></li>
            </ul>
          </li>
          <li class="dropdown-item">
            <a href="#" class="nav-link">Resources ▾</a>
            <ul class="dropdown-menu">
              <li><a href="download-center.html">Download Center</a></li>
              <li><a href="faq.html">B2B FAQ</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="gallery.html">Gallery</a></li>
            </ul>
          </li>
          <li><a href="contact.html" class="nav-link">Contact</a></li>
        </ul>"""

for f in html_files:
    if not os.path.exists(f): continue
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
    
    # Replace old nav
    content = re.sub(r'<ul class="nav-links nav-pills">.*?</ul>', new_nav, content, flags=re.DOTALL)
    
    with open(f, "w", encoding="utf-8") as file:
        file.write(content)

# Now generate the 7 new pages using services.html as a template
with open("services.html", "r", encoding="utf-8") as file:
    template = file.read()

header_match = re.search(r'(.*?<!-- Mobile Menu -->.*?</nav>|.*?<!-- Mobile Menu -->.*?</div>)', template, re.DOTALL)
header = header_match.group(1) if header_match else ""

footer_match = re.search(r'(<!-- Footer -->.*)', template, re.DOTALL)
footer = footer_match.group(1) if footer_match else ""

new_pages = {
    "technology.html": {
        "title": "Lab Technology | Dr B's Oro-Hold",
        "content": """
  <section class="section" style="padding-top: 120px;">
    <div class="container spatial-container">
      <h1 style="text-align: center; font-size: 42px; margin-bottom: 20px; font-family: var(--font-heading);">Advanced Lab Technology</h1>
      <p style="text-align: center; font-size: 16px; font-weight: 300; margin-bottom: 50px; opacity: 0.8;">ISO-Certified 5-Axis Milling, 3D Printing, and AI CAD Design.</p>
      <div class="swiper mySwiper" style="padding: 20px 0 60px;">
        <div class="swiper-wrapper">
          <div class="swiper-slide glass-panel" style="width: 320px; border-radius: 20px; padding: 30px;" data-tilt>
            <h3 style="color: var(--gold); font-size: 22px; margin-bottom: 10px;">5-Axis Milling Units</h3>
            <p style="font-size: 14px; opacity: 0.8;">Precision milling for Zirconia, PMMA, and Titanium down to 10-micron accuracy.</p>
          </div>
          <div class="swiper-slide glass-panel" style="width: 320px; border-radius: 20px; padding: 30px;" data-tilt>
            <h3 style="color: var(--gold); font-size: 22px; margin-bottom: 10px;">3D Resin Printers</h3>
            <p style="font-size: 14px; opacity: 0.8;">High-speed printing for surgical guides, digital models, and castable resins.</p>
          </div>
          <div class="swiper-slide glass-panel" style="width: 320px; border-radius: 20px; padding: 30px;" data-tilt>
            <h3 style="color: var(--gold); font-size: 22px; margin-bottom: 10px;">Sintering Furnaces</h3>
            <p style="font-size: 14px; opacity: 0.8;">Programmable high-temperature furnaces ensuring optimal translucency and strength.</p>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </section>
"""},
    "team.html": {
        "title": "Master Ceramists | Dr B's Oro-Hold",
        "content": """
  <section class="section" style="padding-top: 120px; text-align: center;">
    <div class="container spatial-container">
      <h1 style="font-size: 42px; margin-bottom: 20px; font-family: var(--font-heading);">Meet Our Master Ceramists</h1>
      <p style="font-size: 16px; margin-bottom: 50px; opacity: 0.8;">The artists behind your clinic's perfect smiles.</p>
      <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
        <div class="glass-panel" style="padding: 30px; border-radius: 20px; width: 280px;" data-tilt>
          <div style="width: 100px; height: 100px; border-radius: 50%; background: #333; margin: 0 auto 20px;"></div>
          <h3 style="font-size: 20px; color: var(--gold);">Dr. Bhavani</h3>
          <p style="font-size: 14px; opacity: 0.8;">Founder & Chief Ceramist</p>
        </div>
        <div class="glass-panel" style="padding: 30px; border-radius: 20px; width: 280px;" data-tilt>
          <div style="width: 100px; height: 100px; border-radius: 50%; background: #333; margin: 0 auto 20px;"></div>
          <h3 style="font-size: 20px; color: var(--gold);">CAD Design Team</h3>
          <p style="font-size: 14px; opacity: 0.8;">Experts in exocad & 3Shape</p>
        </div>
      </div>
    </div>
  </section>
"""},
    "careers.html": {
        "title": "Careers | Dr B's Oro-Hold",
        "content": """
  <section class="section" style="padding-top: 120px; text-align: center;">
    <div class="container spatial-container">
      <h1 style="font-size: 42px; margin-bottom: 20px; font-family: var(--font-heading);">Join the Lab Team</h1>
      <div class="glass-panel" style="max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 20px;" data-tilt>
        <h3 style="font-size: 22px; color: var(--gold); margin-bottom: 15px;">Open Positions</h3>
        <p style="font-size: 15px; margin-bottom: 20px;">- Senior CAD Designer (exocad)</p>
        <p style="font-size: 15px; margin-bottom: 20px;">- Ceramic Technician</p>
        <p style="font-size: 15px; margin-bottom: 30px;">- CAM Operator</p>
        <a href="mailto:careers@drb.com" class="btn btn-primary">Apply Now</a>
      </div>
    </div>
  </section>
"""},
    "pricing.html": {
        "title": "B2B Pricing | Dr B's Oro-Hold",
        "content": """
  <section class="section" style="padding-top: 120px; text-align: center;">
    <div class="container spatial-container">
      <h1 style="font-size: 42px; margin-bottom: 20px; font-family: var(--font-heading);">B2B Pricing & Rate Card</h1>
      <p style="font-size: 16px; margin-bottom: 50px; opacity: 0.8;">Transparent, competitive pricing for our partner clinics.</p>
      <table style="width: 100%; max-width: 800px; margin: 0 auto; text-align: left; border-collapse: collapse;" class="glass-panel">
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.2);">
          <th style="padding: 20px; color: var(--gold);">Product</th>
          <th style="padding: 20px; color: var(--gold);">Turnaround</th>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
          <td style="padding: 20px;">Monolithic Zirconia Crown</td>
          <td style="padding: 20px;">3 Days</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
          <td style="padding: 20px;">Lithium Disilicate Veneer</td>
          <td style="padding: 20px;">4 Days</td>
        </tr>
        <tr>
          <td style="padding: 20px;">Custom Titanium Abutment</td>
          <td style="padding: 20px;">5 Days</td>
        </tr>
      </table>
      <a href="appointment.html" class="btn btn-primary" style="margin-top: 40px;">Request Full Rate Card</a>
    </div>
  </section>
"""},
    "franchise.html": {
        "title": "Partner Network | Dr B's Oro-Hold",
        "content": """
  <section class="section" style="padding-top: 120px; text-align: center;">
    <div class="container spatial-container">
      <h1 style="font-size: 42px; margin-bottom: 20px; font-family: var(--font-heading);">Corporate Partner Network</h1>
      <p style="font-size: 16px; margin-bottom: 50px; opacity: 0.8;">Scaling digital dentistry for clinic chains across India.</p>
      <div class="glass-panel" style="max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 20px;" data-tilt>
        <p style="font-size: 15px; line-height: 1.6; margin-bottom: 30px;">We offer customized SLAs, bulk discount tiers, and dedicated account managers for multi-location dental clinic chains.</p>
        <a href="contact.html" class="btn btn-primary">Inquire About Corporate Accounts</a>
      </div>
    </div>
  </section>
"""},
    "download-center.html": {
        "title": "Download Center | Dr B's Oro-Hold",
        "content": """
  <section class="section" style="padding-top: 120px; text-align: center;">
    <div class="container spatial-container">
      <h1 style="font-size: 42px; margin-bottom: 20px; font-family: var(--font-heading);">Download Center</h1>
      <p style="font-size: 16px; margin-bottom: 50px; opacity: 0.8;">Forms, Guidelines, and Material Safety Data Sheets.</p>
      <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
        <div class="glass-panel" style="padding: 20px; border-radius: 15px; width: 250px;" data-tilt>
          <h3 style="font-size: 18px; color: var(--gold); margin-bottom: 10px;">Lab Rx Form</h3>
          <button class="btn btn-white" style="font-size: 12px; padding: 8px 16px;">Download PDF</button>
        </div>
        <div class="glass-panel" style="padding: 20px; border-radius: 15px; width: 250px;" data-tilt>
          <h3 style="font-size: 18px; color: var(--gold); margin-bottom: 10px;">Prep Guidelines</h3>
          <button class="btn btn-white" style="font-size: 12px; padding: 8px 16px;">Download PDF</button>
        </div>
        <div class="glass-panel" style="padding: 20px; border-radius: 15px; width: 250px;" data-tilt>
          <h3 style="font-size: 18px; color: var(--gold); margin-bottom: 10px;">Zirconia MSDS</h3>
          <button class="btn btn-white" style="font-size: 12px; padding: 8px 16px;">Download PDF</button>
        </div>
      </div>
    </div>
  </section>
"""},
    "faq.html": {
        "title": "B2B FAQ | Dr B's Oro-Hold",
        "content": """
  <section class="section" style="padding-top: 120px; text-align: center;">
    <div class="container spatial-container">
      <h1 style="font-size: 42px; margin-bottom: 20px; font-family: var(--font-heading);">Frequently Asked Questions</h1>
      <div style="max-width: 700px; margin: 0 auto; text-align: left;">
        <div class="glass-panel" style="padding: 20px; margin-bottom: 20px; border-radius: 15px;" data-tilt data-tilt-glare>
          <h3 style="font-size: 18px; color: var(--gold); margin-bottom: 10px;">What is your standard turnaround time?</h3>
          <p style="font-size: 14px; opacity: 0.8;">Most restorations are shipped within 3 to 4 working days after we receive the scan or impression.</p>
        </div>
        <div class="glass-panel" style="padding: 20px; margin-bottom: 20px; border-radius: 15px;" data-tilt data-tilt-glare>
          <h3 style="font-size: 18px; color: var(--gold); margin-bottom: 10px;">Do you accept digital scans?</h3>
          <p style="font-size: 14px; opacity: 0.8;">Yes, we are fully integrated with Itero, Trios, Medit, and all open STL/PLY scanners.</p>
        </div>
      </div>
    </div>
  </section>
"""},
    "blog.html": {
        "title": "Lab Blog | Dr B's Oro-Hold",
        "content": """
  <section class="section" style="padding-top: 120px; text-align: center;">
    <div class="container spatial-container">
      <h1 style="font-size: 42px; margin-bottom: 20px; font-family: var(--font-heading);">Dental Lab Insights</h1>
      <p style="font-size: 16px; margin-bottom: 50px; opacity: 0.8;">Latest news and techniques in digital dentistry.</p>
      <div class="swiper mySwiper" style="padding: 20px 0 60px;">
        <div class="swiper-wrapper">
          <div class="swiper-slide glass-panel" style="width: 320px; border-radius: 20px; padding: 30px;" data-tilt>
            <h3 style="color: var(--gold); font-size: 20px; margin-bottom: 10px;">Zirconia vs Lithium Disilicate</h3>
            <p style="font-size: 14px; opacity: 0.8;">When to choose which material for anterior restorations.</p>
          </div>
          <div class="swiper-slide glass-panel" style="width: 320px; border-radius: 20px; padding: 30px;" data-tilt>
            <h3 style="color: var(--gold); font-size: 20px; margin-bottom: 10px;">Perfecting the Scan</h3>
            <p style="font-size: 14px; opacity: 0.8;">Tips for capturing accurate margins with your intraoral scanner.</p>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </section>
"""}
}

for filename, data in new_pages.items():
    page_content = header.replace("Premium Restorations & Services | Dr B's Oro-Hold Dental Lab", data["title"])
    page_content += data["content"]
    page_content += footer
    
    with open(f"/Users/afi/Downloads/Dr.Bhavani-main/{filename}", "w", encoding="utf-8") as f:
        f.write(page_content)
    print(f"Created {filename}")

print("Navigation updated and pages generated successfully.")
