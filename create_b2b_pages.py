import re

template_file = "/Users/afi/Downloads/Dr.Bhavani-main/services.html"
with open(template_file, "r", encoding="utf-8") as f:
    template = f.read()

# Extract header
header_match = re.search(r'(.*?<!-- Mobile Menu -->.*?</nav>|.*?<!-- Mobile Menu -->.*?</div>)', template, re.DOTALL)
header = header_match.group(1) if header_match else ""

# Extract footer
footer_match = re.search(r'(<!-- Footer -->.*)', template, re.DOTALL)
footer = footer_match.group(1) if footer_match else ""

pages = {
    "digital-workflows.html": {
        "title": "Digital Workflows | Dr B's Oro-Hold Dental Lab",
        "content": """
  <section class="section" style="padding-top: 120px; text-align: center;">
    <div class="container spatial-container">
      <h1 style="font-size: 42px; margin-bottom: 20px; font-family: var(--font-heading);">Seamless Digital Workflows</h1>
      <p style="font-size: 16px; font-weight: 300; color: rgba(255,255,255,0.7); max-width: 700px; margin: 0 auto 50px;">From intraoral scans to precision 5-axis milling. We integrate directly with Trios, Itero, and Medit scanners.</p>
      
      <div style="display: flex; gap: 30px; justify-content: center; flex-wrap: wrap;">
        <div class="service-card spatial-element glass-panel" style="width: 280px; padding: 30px; border-radius: 20px; text-align: left;" data-tilt data-tilt-glare data-tilt-max-glare="0.5">
          <div style="font-size: 40px; margin-bottom: 20px; color: var(--gold);">01</div>
          <h3 style="font-size: 20px; margin-bottom: 10px;">Intraoral Scan</h3>
          <p style="font-size: 14px; opacity: 0.8;">Send us your STL/PLY files directly through your scanner's portal or our secure Dropbox.</p>
        </div>
        <div class="service-card spatial-element glass-panel" style="width: 280px; padding: 30px; border-radius: 20px; text-align: left;" data-tilt data-tilt-glare data-tilt-max-glare="0.5">
          <div style="font-size: 40px; margin-bottom: 20px; color: var(--gold);">02</div>
          <h3 style="font-size: 20px; margin-bottom: 10px;">CAD Design</h3>
          <p style="font-size: 14px; opacity: 0.8;">Our expert technicians design the restoration in exocad, focusing on emergence profiles and occlusion.</p>
        </div>
        <div class="service-card spatial-element glass-panel" style="width: 280px; padding: 30px; border-radius: 20px; text-align: left;" data-tilt data-tilt-glare data-tilt-max-glare="0.5">
          <div style="font-size: 40px; margin-bottom: 20px; color: var(--gold);">03</div>
          <h3 style="font-size: 20px; margin-bottom: 10px;">5-Axis Milling</h3>
          <p style="font-size: 14px; opacity: 0.8;">Precision milling ensures passive fit margins down to 10 microns using premium materials.</p>
        </div>
        <div class="service-card spatial-element glass-panel" style="width: 280px; padding: 30px; border-radius: 20px; text-align: left;" data-tilt data-tilt-glare data-tilt-max-glare="0.5">
          <div style="font-size: 40px; margin-bottom: 20px; color: var(--gold);">04</div>
          <h3 style="font-size: 20px; margin-bottom: 10px;">Delivery</h3>
          <p style="font-size: 14px; opacity: 0.8;">Rigorous QC checks before shipping the restoration back to your clinic in just 3 days.</p>
        </div>
      </div>
    </div>
  </section>
"""
    },
    "materials.html": {
        "title": "Material Specifications | Dr B's Oro-Hold Dental Lab",
        "content": """
  <section class="section" style="padding-top: 120px;">
    <div class="container spatial-container">
      <div style="text-align: center; margin-bottom: 50px;">
        <h1 style="font-size: 42px; margin-bottom: 15px; font-family: var(--font-heading);">Premium Restorative Materials</h1>
        <p style="font-size: 16px; font-weight: 300; color: rgba(255,255,255,0.7); max-width: 600px; margin: 0 auto;">We mill using only FDA-approved, biocompatible blocks from trusted global manufacturers.</p>
      </div>

      <div class="swiper mySwiper" style="padding: 20px 0 60px;">
        <div class="swiper-wrapper">
          <div class="swiper-slide glass-panel" style="width: 350px; border-radius: 20px; padding: 30px;" data-tilt data-tilt-scale="1.05">
            <h3 style="color: var(--gold); font-size: 22px; margin-bottom: 10px;">Monolithic Zirconia</h3>
            <p style="font-size: 14px; opacity: 0.8; margin-bottom: 15px;">High translucent multilayer zirconia ideal for anterior aesthetics and posterior strength.</p>
            <ul style="font-size: 13px; opacity: 0.9; line-height: 1.8; list-style: none; padding: 0;">
              <li>✓ Flexural Strength: 1200 MPa</li>
              <li>✓ Translucency: 49%</li>
              <li>✓ Indications: Crowns, Bridges, Implants</li>
            </ul>
          </div>
          <div class="swiper-slide glass-panel" style="width: 350px; border-radius: 20px; padding: 30px;" data-tilt data-tilt-scale="1.05">
            <h3 style="color: var(--gold); font-size: 22px; margin-bottom: 10px;">Lithium Disilicate</h3>
            <p style="font-size: 14px; opacity: 0.8; margin-bottom: 15px;">Glass-ceramic blocks providing lifelike optical properties for highly aesthetic zones.</p>
            <ul style="font-size: 13px; opacity: 0.9; line-height: 1.8; list-style: none; padding: 0;">
              <li>✓ Flexural Strength: 500 MPa</li>
              <li>✓ High opalescence and fluorescence</li>
              <li>✓ Indications: Veneers, Inlays, Onlays</li>
            </ul>
          </div>
          <div class="swiper-slide glass-panel" style="width: 350px; border-radius: 20px; padding: 30px;" data-tilt data-tilt-scale="1.05">
            <h3 style="color: var(--gold); font-size: 22px; margin-bottom: 10px;">Grade 5 Titanium</h3>
            <p style="font-size: 14px; opacity: 0.8; margin-bottom: 15px;">Milled titanium blanks for custom abutments offering extreme biocompatibility.</p>
            <ul style="font-size: 13px; opacity: 0.9; line-height: 1.8; list-style: none; padding: 0;">
              <li>✓ Flexural Strength: 900 MPa</li>
              <li>✓ Hypoallergenic and lightweight</li>
              <li>✓ Indications: Custom Abutments, Bars</li>
            </ul>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </section>
"""
    },
    "case-submission.html": {
        "title": "Send a Case | Dr B's Oro-Hold Dental Lab",
        "content": """
  <section class="section" style="padding-top: 120px;">
    <div class="container spatial-container" style="display: flex; gap: 40px; flex-wrap: wrap; align-items: center;">
      <div style="flex: 1; min-width: 300px;" data-tilt data-tilt-glare>
        <h1 style="font-size: 42px; margin-bottom: 20px; font-family: var(--font-heading);">Send Us Your Next Case</h1>
        <p style="font-size: 16px; font-weight: 300; line-height: 1.6; margin-bottom: 30px; color: rgba(255,255,255,0.8);">
          Whether you use a digital intraoral scanner or traditional PVS impressions, sending a case to Dr B's Oro-Hold is fast and secure.
        </p>
        <div class="tag-row" style="margin-bottom: 40px;">
          <span class="tag-glass tag-pill">Itero Connected</span>
          <span class="tag-glass tag-pill">Trios Ready</span>
          <span class="tag-glass tag-pill">Medit Link</span>
        </div>
        <a href="appointment.html" class="btn btn-primary" style="padding: 15px 30px; border-radius: 30px; font-size: 15px;">Download Lab Script</a>
      </div>
      <div style="flex: 1; min-width: 300px;" class="glass-panel" data-tilt data-tilt-scale="1.02">
        <div style="padding: 40px; border-radius: 20px;">
          <h3 style="font-size: 24px; margin-bottom: 20px; color: var(--gold);">Physical Impressions</h3>
          <p style="font-size: 14px; margin-bottom: 20px; opacity: 0.8; line-height: 1.5;">We arrange courier pickups across India. Pack your stone models or silicone impressions securely.</p>
          <ul style="list-style: none; padding: 0; margin-bottom: 30px; font-size: 14px; opacity: 0.9; line-height: 2;">
            <li>✓ Disinfect impressions before packing</li>
            <li>✓ Include a printed lab script</li>
            <li>✓ Note shade instructions clearly</li>
          </ul>
          <a href="contact.html" class="btn btn-white" style="padding: 12px 24px; border-radius: 20px; text-decoration: none; color: black; font-weight: 600;">Schedule a Pickup</a>
        </div>
      </div>
    </div>
  </section>
"""
    }
}

for filename, data in pages.items():
    page_content = header.replace("Premium Restorations & Services | Dr B's Oro-Hold Dental Lab", data["title"])
    page_content += data["content"]
    page_content += footer
    
    # Ensure correct Swiper CSS/JS injections
    if "swiper-bundle" not in page_content:
        page_content = page_content.replace('<link rel="stylesheet" href="styles.css?v=11">', '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />\n  <link rel="stylesheet" href="styles.css?v=11">')
        page_content = page_content.replace('<script src="main.js?v=11"></script>', '<script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.0/vanilla-tilt.min.js"></script>\n  <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>\n  <script src="main.js?v=11"></script>')

    out_path = f"/Users/afi/Downloads/Dr.Bhavani-main/{filename}"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(page_content)
    print(f"Created {filename}")
