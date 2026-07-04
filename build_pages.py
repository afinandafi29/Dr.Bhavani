import os

base_template = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | Dr B's Oro-Hold Dental Care</title>
  <link rel="stylesheet" href="styles.css?v=13">
  <link rel="icon" type="image/png" href="dr logo.png">
</head>
<body class="dark-theme">

  <!-- Header / Navbar -->
  <header class="navbar navbar-transparent">
    <div class="container nav-container">
      <a href="index.html" class="logo" style="display: flex; align-items: center; gap: 8px; font-weight: 700; text-decoration: none;">
        <img src="dr logo.png" alt="Logo" style="height: 80px; width: auto; object-fit: contain;">
        <span style="display: flex; flex-direction: column; line-height: 1.1; text-align: left;">
          <span style="font-size: 26px; font-family: var(--font-heading); letter-spacing: 0.05em; color: #ffffff; font-weight: 800; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">Dr B's Oro-Hold</span>
          <span style="font-size: 13px; font-family: var(--font-body); letter-spacing: 0.15em; opacity: 1; font-weight: 700; text-transform: uppercase; color: #ffffff; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">Dental Care</span>
        </span>
      </a>
      <div class="nav-pills-wrapper">
        <ul class="nav-links nav-pills">
          <li><a href="index.html" class="nav-link">Home</a></li>
          <li><a href="services.html" class="nav-link">Services</a></li>
          <li><a href="about.html" class="nav-link">About</a></li>
          <li><a href="gallery.html" class="nav-link">Gallery</a></li>
          <li><a href="contact.html" class="nav-link">Contact</a></li>
        </ul>
      </div>
      <div class="nav-cta">
        <a href="appointment.html" class="btn btn-primary" style="padding: 10px 24px; border-radius: 8px; font-weight: 600; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4); text-transform: none; font-size: 15px;">Book a Call</a>
      </div>
    </div>
  </header>

  <section class="section" style="padding-top: 150px; padding-bottom: 80px;">
    <div class="container">
      <div class="section-header">
        <h1 style="color: var(--gold);">{title}</h1>
        <p>Last updated: July 2026</p>
      </div>
      
      <div class="service-card" style="padding: 40px; background: rgba(25, 25, 30, 0.6); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 20px;">
        <div style="color: #ffffff; line-height: 1.8; font-size: 16px;">
          {content}
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-info">
        <h3>Dr B's Oro-Hold Dental Care</h3>
        <p>Luxury dental care for those who appreciate excellence in dental health and aesthetics.</p>
      </div>
      <div class="footer-links">
        <h4>Quick Links</h4>
        <ul class="footer-links-list">
          <li><a href="services.html">Our Services</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="gallery.html">Smile Gallery</a></li>
          <li><a href="contact.html">Contact Us</a></li>
          <li><a href="appointment.html">Book Appointment</a></li>
        </ul>
      </div>
      <div class="footer-contact">
        <h4>Contact Us</h4>
        <ul class="footer-contact-list">
          <li style="display: flex; align-items: start; gap: 8px;">
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="margin-top: 4px; color: var(--gold);">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>1st Floor, SR Complex, Siddhaiah Puranik Rd, above Beaute & Nutrie, near Priyadarshini Grand Hotel, Basaveshwar Nagar, Bengaluru, Karnataka 560079</span>
          </li>
          <li style="display: flex; align-items: center; gap: 8px;">
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: var(--gold);">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            <a href="tel:+917550134175">+91 7550134175</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>&copy; 2026 Dr B's Oro-Hold Dental Care. All rights reserved. | <a href="privacy.html" style="color:var(--gold); text-decoration:none;">Privacy Policy</a> | <a href="terms.html" style="color:var(--gold); text-decoration:none; margin-left:10px;">Terms & Conditions</a></p>
    </div>
  </footer>

  <script src="main.js?v=13"></script>
</body>
</html>
"""

privacy_content = """
<h2 style="color: var(--gold); margin-top: 20px;">1. Introduction</h2>
<p>At Dr B's Oro-Hold Dental Care, accessible from our clinic, one of our main priorities is the privacy of our patients. This Privacy Policy document contains types of information that is collected and recorded by us and how we use it.</p>

<h2 style="color: var(--gold); margin-top: 20px;">2. Information We Collect</h2>
<p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
<p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>

<h2 style="color: var(--gold); margin-top: 20px;">3. How We Use Your Information</h2>
<p>We use the information we collect in various ways, including to:</p>
<ul>
    <li style="margin-bottom: 10px;">Provide, operate, and maintain our clinic and services</li>
    <li style="margin-bottom: 10px;">Improve, personalize, and expand our patient experience</li>
    <li style="margin-bottom: 10px;">Understand and analyze how you use our website</li>
    <li style="margin-bottom: 10px;">Develop new services, features, and functionality</li>
    <li style="margin-bottom: 10px;">Communicate with you, either directly or through one of our partners, including for customer service</li>
</ul>

<h2 style="color: var(--gold); margin-top: 20px;">4. Patient Confidentiality</h2>
<p>All medical and dental records provided to Dr B's Oro-Hold Dental Care are kept strictly confidential in compliance with relevant healthcare regulations. We do not share your medical history or treatment plans with third parties without your explicit consent.</p>
"""

terms_content = """
<h2 style="color: var(--gold); margin-top: 20px;">1. Terms</h2>
<p>By accessing this Website, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.</p>

<h2 style="color: var(--gold); margin-top: 20px;">2. Use License</h2>
<p>Permission is granted to temporarily download one copy of the materials on Dr B's Oro-Hold Dental Care's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
<ul>
    <li style="margin-bottom: 10px;">modify or copy the materials;</li>
    <li style="margin-bottom: 10px;">use the materials for any commercial purpose or for any public display;</li>
    <li style="margin-bottom: 10px;">attempt to reverse engineer any software contained on Dr B's Oro-Hold Dental Care's Website;</li>
    <li style="margin-bottom: 10px;">remove any copyright or other proprietary notations from the materials; or</li>
    <li style="margin-bottom: 10px;">transferring the materials to another person or "mirror" the materials on any other server.</li>
</ul>

<h2 style="color: var(--gold); margin-top: 20px;">3. Disclaimer</h2>
<p>All the materials on Dr B's Oro-Hold Dental Care's Website are provided "as is". Dr B's Oro-Hold Dental Care makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, Dr B's Oro-Hold Dental Care does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.</p>

<h2 style="color: var(--gold); margin-top: 20px;">4. Appointments and Cancellations</h2>
<p>When booking an appointment, you agree to provide accurate information. Please provide at least 24 hours notice if you need to cancel or reschedule your appointment. Failure to do so may result in a cancellation fee.</p>
"""

with open('privacy.html', 'w', encoding='utf-8') as f:
    f.write(base_template.format(title="Privacy Policy", content=privacy_content))

with open('terms.html', 'w', encoding='utf-8') as f:
    f.write(base_template.format(title="Terms & Conditions", content=terms_content))

print("Created full pages for Privacy and Terms.")
