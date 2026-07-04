import os

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Book Appointment | Dr B's Oro-Hold Dental Care</title>
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

  <section class="section" style="min-height: 100vh; display: flex; align-items: center; background: url('public/assets/images/welcome.jpg') center/cover no-repeat; position: relative; padding-top: 120px;">
    <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.6);"></div>
    
    <div class="container" style="position: relative; z-index: 2; max-width: 600px; margin: 0 auto;">
      <div class="service-card" style="padding: 40px; text-align: center;">
        <h2 style="color: var(--gold); margin-bottom: 20px; font-size: 32px;">Book Your Appointment</h2>
        <p style="color: #fff; margin-bottom: 30px;">Fill out the details below and we will connect you directly via WhatsApp to confirm your slot.</p>
        
        <form id="waForm" style="text-align: left; display: flex; flex-direction: column; gap: 20px;">
          <div>
            <label style="color: #fff; display: block; margin-bottom: 8px;">Full Name</label>
            <input type="text" id="waName" required style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.5); color: #fff;">
          </div>
          <div>
            <label style="color: #fff; display: block; margin-bottom: 8px;">Phone Number</label>
            <input type="tel" id="waPhone" required style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.5); color: #fff;">
          </div>
          <div>
            <label style="color: #fff; display: block; margin-bottom: 8px;">Service Required</label>
            <select id="waService" required style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.5); color: #fff;">
              <option value="General Checkup">General Checkup</option>
              <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
              <option value="Orthodontics">Orthodontics (Aligners/Braces)</option>
              <option value="Implants">Dental Implants</option>
            </select>
          </div>
          <div>
            <label style="color: #fff; display: block; margin-bottom: 8px;">Preferred Date</label>
            <input type="date" id="waDate" required style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.5); color: #fff;">
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; font-size: 16px; padding: 14px;">Book via WhatsApp <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="vertical-align: middle; margin-left: 8px;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></button>
        </form>
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
          <li style="display: flex; align-items: center; gap: 8px;">
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: var(--gold);">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <a href="mailto:info@orohold.com">info@orohold.com</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>&copy; 2026 Dr B's Oro-Hold Dental Care. All rights reserved. | <a href="privacy.html" style="color:var(--gold); text-decoration:none;">Privacy Policy</a> | <a href="terms.html" style="color:var(--gold); text-decoration:none; margin-left:10px;">Terms & Conditions</a></p>
    </div>
  </footer>

  <script>
    document.getElementById('waForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('waName').value;
      const phone = document.getElementById('waPhone').value;
      const service = document.getElementById('waService').value;
      const date = document.getElementById('waDate').value;
      
      const message = `Hello, I would like to book an appointment.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service:* ${service}\n*Preferred Date:* ${date}`;
      const whatsappUrl = `https://wa.me/917550134175?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');
    });
  </script>
</body>
</html>
"""

with open('appointment.html', 'w', encoding='utf-8') as f:
    f.write(html_content)
    
print("Updated appointment.html")
