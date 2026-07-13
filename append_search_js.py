search_js = """
// 7. Global Search & AI Suggestion Logic
document.addEventListener('DOMContentLoaded', () => {
  const globalSearchBtn = document.getElementById('globalSearchBtn');
  const globalSearchOverlay = document.getElementById('globalSearchOverlay');
  const closeSearchBtn = document.getElementById('closeSearchBtn');
  const globalSearchInput = document.getElementById('globalSearchInput');
  const globalSearchResults = document.getElementById('globalSearchResults');
  const globalSearchAiHint = document.getElementById('globalSearchAiHint');
  const aiSuggestionLink = document.getElementById('aiSuggestionLink');

  // Search Database
  const searchDatabase = [
    { title: "Zirconia Crowns", url: "services.html", desc: "High-strength premium zirconia crowns." },
    { title: "Dental Implants", url: "implants.html", desc: "Permanent replacement for missing teeth." },
    { title: "Orthodontics & Aligners", url: "orthodontics.html", desc: "Clear aligners and traditional braces." },
    { title: "Dentures & Removables", url: "removables.html", desc: "Complete and partial dentures." },
    { title: "Cosmetic Dentistry", url: "cosmetics.html", desc: "Veneers and smile design." },
    { title: "Pediatric Dentistry", url: "pediatrics.html", desc: "Specialized care for children." },
    { title: "Emergency Dental Care", url: "emergency.html", desc: "Immediate assistance for dental emergencies." },
    { title: "Pricing & Packages", url: "pricing.html", desc: "Detailed cost information for treatments." },
    { title: "Contact Lab Support", url: "contact.html", desc: "Get in touch with our technical team." },
    { title: "Book Appointment", url: "appointment.html", desc: "Schedule a consultation." },
    { title: "Dentist Portal Login", url: "admin.html", desc: "Access the B2B dashboard." }
  ];

  if (globalSearchBtn && globalSearchOverlay) {
    globalSearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      globalSearchOverlay.classList.add('active');
      setTimeout(() => globalSearchInput.focus(), 100);
      renderSearchResults("");
    });

    closeSearchBtn.addEventListener('click', () => {
      globalSearchOverlay.classList.remove('active');
    });

    globalSearchOverlay.addEventListener('click', (e) => {
      if (e.target === globalSearchOverlay) {
        globalSearchOverlay.classList.remove('active');
      }
    });

    globalSearchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value);
    });

    function renderSearchResults(query) {
      globalSearchResults.innerHTML = '';
      const lowerQuery = query.toLowerCase().trim();
      
      let results = searchDatabase;
      if (lowerQuery) {
        results = searchDatabase.filter(item => 
          item.title.toLowerCase().includes(lowerQuery) || 
          item.desc.toLowerCase().includes(lowerQuery)
        );
      }

      if (results.length === 0) {
        globalSearchResults.innerHTML = '<div style="padding: 20px; color: rgba(255,255,255,0.5); text-align: center;">No results found.</div>';
        globalSearchAiHint.style.display = 'none';
      } else {
        results.forEach(res => {
          const a = document.createElement('a');
          a.href = res.url;
          a.className = 'search-result-item';
          a.innerHTML = `
            <span class="search-result-title">${res.title}</span>
            <span class="search-result-desc">${res.desc}</span>
          `;
          globalSearchResults.appendChild(a);
        });

        // AI Hint Logic
        if (lowerQuery.length > 2) {
          const aiRec = results[0];
          globalSearchAiHint.style.display = 'flex';
          aiSuggestionLink.textContent = aiRec.title;
          aiSuggestionLink.href = aiRec.url;
        } else {
          globalSearchAiHint.style.display = 'none';
        }
      }
    }
  }
});
"""

with open('/Users/afi/Downloads/Dr.Bhavani-main/main.js', 'a', encoding='utf-8') as f:
    f.write(search_js)
print("Appended search modal JS.")
