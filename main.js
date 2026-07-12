document.addEventListener('DOMContentLoaded', () => {
  // Mobile Hamburger Toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    // Close mobile menu on clicking any link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }

  // Hero Slider logic (only if slider elements exist)
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator');
  if (slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;


  // Dynamic Hero Slide Text Data (10 Slides mapping to the relevant restorations)
  const heroTextData = [
    {
      subtitle: "Precision Examination",
      title: "Every Detail Matters, Every Tooth Counts",
      desc: "Our experts use advanced dental mirrors and precision probes to deliver comprehensive examinations with unmatched clinical accuracy."
    },
    {
      subtitle: "Pediatric Dentistry",
      title: "Friendly Care for Your Little Ones",
      desc: "Creating happy, fear-free dental experiences for children with our specialized pediatric team and kid-friendly clinical environment."
    },
    {
      subtitle: "Digital Technology",
      title: "High-Tech 3D Digital Scanning",
      desc: "Using state-of-the-art CBCT and intraoral scanners to create precise digital models for diagnosis and treatment planning."
    },
    {
      subtitle: "Master Craftsmanship",
      title: "Dental Lab Precision Crown Crafting",
      desc: "Our lab technicians hand-layer every ceramic crown under magnification, ensuring perfect color match and anatomical accuracy."
    },
    {
      subtitle: "Surgical Excellence",
      title: "Expert Implant Surgical Team",
      desc: "A fully certified surgical team performing implant placements in a sterile, medically equipped operating environment."
    },
    {
      subtitle: "Orthodontic Innovation",
      title: "Clear Aligner Consultation",
      desc: "Offering Oro-Align invisible clear aligner solutions with digital smile simulations and personalized treatment staging."
    },
    {
      subtitle: "Premium Facility",
      title: "Welcoming Modern Waiting Area",
      desc: "Our premium reception space is designed to put you at ease — calm, clean, contemporary, and fully air-conditioned."
    },
    {
      subtitle: "Medical-Grade Hygiene",
      title: "Sterile Instrument Processing",
      desc: "Maintaining the highest sterilization standards with autoclave-processed instruments and single-use consumables for every patient."
    },
    {
      subtitle: "Teamwork & Care",
      title: "Dedicated Chairside Nurse Support",
      desc: "Our trained dental nurses assist with precision and compassion, ensuring seamless clinical flow and patient comfort throughout."
    },
    {
      subtitle: "Aesthetic Outcomes",
      title: "Confident Smiles After Every Visit",
      desc: "Leaving our patients not just treated, but truly transformed — with brighter, healthier, and more confident smiles."
    }
  ];

  let isFirstLoad = true;

  function updateHeroText(index) {
    const subtitleEl = document.querySelector('.hero-subtitle');
    const titleEl = document.querySelector('.hero-title');
    const descEl = document.querySelector('.hero-desc');
    
    if (subtitleEl && titleEl && descEl && heroTextData[index]) {
      if (typeof gsap !== 'undefined') {
        gsap.timeline()
          .to([subtitleEl, titleEl, descEl], { opacity: 0, y: -10, duration: 0.2, stagger: 0.04, onComplete: () => {
            subtitleEl.textContent = heroTextData[index].subtitle;
            titleEl.innerHTML = heroTextData[index].title;
            descEl.textContent = heroTextData[index].desc;
          }})
          .to([subtitleEl, titleEl, descEl], { opacity: 1, y: 0, duration: 0.3, stagger: 0.04, ease: 'power2.out' });
      } else {
        subtitleEl.textContent = heroTextData[index].subtitle;
        titleEl.innerHTML = heroTextData[index].title;
        descEl.textContent = heroTextData[index].desc;
      }
    }
  }

  function showSlide(index) {
    if (isFirstLoad) {
      const subtitleEl = document.querySelector('.hero-subtitle');
      const titleEl = document.querySelector('.hero-title');
      const descEl = document.querySelector('.hero-desc');
      if (subtitleEl && titleEl && descEl && heroTextData[index]) {
        subtitleEl.textContent = heroTextData[index].subtitle;
        titleEl.innerHTML = heroTextData[index].title;
        descEl.textContent = heroTextData[index].desc;
      }
      isFirstLoad = false;
    } else {
      updateHeroText(index);
    }
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));
    
    slides[index].classList.add('active');
    if (indicators[index]) {
      indicators[index].classList.add('active');
    }

      // Update active-num in bottom bar
      const activeNumEl = document.querySelector('.active-num');
      if (activeNumEl) {
        activeNumEl.textContent = String(index + 1).padStart(2, '0');
      }

      currentSlide = index;
    }

    function nextSlide() {
      let nextIndex = (currentSlide + 1) % totalSlides;
      showSlide(nextIndex);
    }

    function startSlideShow() {
      slideInterval = setInterval(nextSlide, 6000);
    }

    function resetSlideShow() {
      clearInterval(slideInterval);
      startSlideShow();
    }

    // Prev/Next Button Click Handlers
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
        resetSlideShow();
      });
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let nextIndex = (currentSlide + 1) % totalSlides;
        showSlide(nextIndex);
        resetSlideShow();
      });
    }

    // Set initial active states
    showSlide(0);
    startSlideShow();

    // Click indicators
    indicators.forEach((indicator, idx) => {
      if (idx < totalSlides) {
        indicator.addEventListener('click', () => {
          showSlide(idx);
          resetSlideShow();
        });
      } else {
        indicator.style.display = 'none'; // Hide extra indicators
      }
    });
  }

  // Testimonials Auto Slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialIndicators = document.querySelectorAll('.testimonial-indicator');
  if (testimonialSlides.length > 0) {
    let currentTestimonial = 0;
    const totalTestimonials = testimonialSlides.length;
    let testimonialInterval;

    function showTestimonial(index) {
      testimonialSlides.forEach(slide => slide.classList.remove('active'));
      testimonialIndicators.forEach(ind => ind.classList.remove('active'));

      testimonialSlides[index].classList.add('active');
      if (testimonialIndicators[index]) {
        testimonialIndicators[index].classList.add('active');
      }
      currentTestimonial = index;
    }

    function nextTestimonial() {
      let nextIndex = (currentTestimonial + 1) % totalTestimonials;
      showTestimonial(nextIndex);
    }

    function startTestimonials() {
      testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    function resetTestimonials() {
      clearInterval(testimonialInterval);
      startTestimonials();
    }

    showTestimonial(0);
    startTestimonials();

    testimonialIndicators.forEach((ind, idx) => {
      ind.addEventListener('click', () => {
        showTestimonial(idx);
        resetTestimonials();
      });
    });
  }

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all open items
      document.querySelectorAll('.faq-item').forEach(faqItem => {
        faqItem.classList.remove('active');
      });

      // If clicked item was not active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Services Filter (on services.html)
  const serviceFilterButtons = document.querySelectorAll('.service-filter-btn');
  const serviceItems = document.querySelectorAll('.service-grid-card');
  if (serviceFilterButtons.length > 0) {
    serviceFilterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button style
        serviceFilterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        // Filter service cards
        serviceItems.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || category === cardCategory) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Gallery Filter (on gallery.html)
  const galleryFilterButtons = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-grid-item');
  if (galleryFilterButtons.length > 0) {
    galleryFilterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        galleryFilterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          if (category === 'all' || category === itemCategory) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Booking Form Submission Handler (appointment.html)
  const bookingForm = document.getElementById('bookingForm');
  const successContainer = document.getElementById('successContainer');
  const successName = document.getElementById('successName');

  if (bookingForm && successContainer) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('fullName');
      if (nameInput) {
        successName.textContent = nameInput.value;
      }
      
      bookingForm.style.display = 'none';
      successContainer.style.display = 'flex';
      successContainer.scrollIntoView({ behavior: 'smooth' });
    });

    const resetBookingBtn = document.getElementById('resetBookingBtn');
    if (resetBookingBtn) {
      resetBookingBtn.addEventListener('click', () => {
        bookingForm.reset();
        successContainer.style.display = 'none';
        bookingForm.style.display = 'block';
      });
    }
  }

  // Contact Form Submission Handler (contact.html)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your message has been sent successfully. The Oro-Hold Dental Lab team will contact you shortly.');
      contactForm.reset();
    });
  }

  // Credentials Skill Bar Animations on viewport enter
  const skillBars = document.querySelectorAll('.skill-bar-inner');
  if (skillBars.length > 0) {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = '0%'; // Reset for animation
        gsap.to(bar, {
          scrollTrigger: {
            trigger: bar,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
          width: percent + '%',
          duration: 1.5,
          ease: 'power3.out'
        });
      });
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const targetPercent = bar.getAttribute('data-percent');
            bar.style.width = targetPercent + '%';
            observer.unobserve(bar);
          }
        });
      }, { threshold: 0.1 });

      skillBars.forEach(bar => {
        observer.observe(bar);
      });
    }
  }

  // ==========================================================================
  // DENTAL AI WORKSPACE & PORTAL INTERACTIVE CONTROLS
  // ==========================================================================

  // 1. Theme Theme Toggler (Dark / Light Mode)
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    // Check local storage or system preference
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.body.classList.add('dark-theme');
      updateThemeToggleIcon(true);
    }

    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-theme');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeToggleIcon(isDark);
    });
  }

  function updateThemeToggleIcon(isDark) {
    if (!themeToggle) return;
    if (isDark) {
      themeToggle.innerHTML = `
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      `;
    } else {
      themeToggle.innerHTML = `
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
      `;
    }
  }

  // 2. Accessibility Controls
  const a11yIndicator = document.getElementById('a11yIndicator');
  const a11yMenu = document.getElementById('a11yMenu');
  const a11yContrast = document.getElementById('a11yContrast');
  const a11yText = document.getElementById('a11yText');

  if (a11yIndicator && a11yMenu) {
    a11yIndicator.addEventListener('click', () => {
      a11yMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!a11yMenu.contains(e.target) && e.target !== a11yIndicator) {
        a11yMenu.classList.remove('active');
      }
    });
  }

  if (a11yContrast) {
    a11yContrast.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.body.style.filter = 'contrast(1.3) saturate(1.1)';
      } else {
        document.body.style.filter = 'none';
      }
    });
  }

  if (a11yText) {
    a11yText.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.documentElement.style.fontSize = '120%';
      } else {
        document.documentElement.style.fontSize = '100%';
      }
    });
  }

  // 3. Before & After Split Image Slider Dragging
  const slider = document.getElementById('beforeAfterSlider');
  const handle = document.getElementById('sliderHandle');
  const imgAfter = document.getElementById('imgAfter');

  if (slider && handle && imgAfter) {
    let isDragging = false;

    function moveSlider(clientX) {
      const rect = slider.getBoundingClientRect();
      let position = ((clientX - rect.left) / rect.width) * 100;

      // Keep within bounds
      if (position < 0) position = 0;
      if (position > 100) position = 100;

      handle.style.left = `${position}%`;
      imgAfter.style.clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;
    }

    handle.addEventListener('mousedown', () => {
      isDragging = true;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      moveSlider(e.clientX);
    });

    // Touch Support
    handle.addEventListener('touchstart', () => {
      isDragging = true;
    });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches[0]) {
        moveSlider(e.touches[0].clientX);
      }
    });
  }

  // 4. AI Hub tab navigation logic
  const aiTabBtns = document.querySelectorAll('.ai-tab-btn');
  const aiPanels = document.querySelectorAll('.ai-panel');

  if (aiTabBtns.length > 0) {
    aiTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        aiTabBtns.forEach(b => b.classList.remove('active'));
        aiPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        const activePanel = document.getElementById(tabId);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      });
    });
  }

  // 5. AI Chatbot Speech Synthesis & Recognition
  const voiceBtn = document.getElementById('voiceBtn');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');
  const chatMessages = document.getElementById('chatMessages');
  const chatLang = document.getElementById('chatLanguage');

  // WhatsApp Suggestion Chips Click Event
  const whatsappChips = document.querySelectorAll('.whatsapp-chip');
  if (whatsappChips.length > 0) {
    whatsappChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const question = chip.getAttribute('data-question');
        if (question === "Connect with Lab Technician") {
          window.open('https://wa.me/917550134175', '_blank');
          
          processUserChatMessage("Requesting live tech connect...");
          setTimeout(() => {
            const botMsgDiv = document.createElement('div');
            botMsgDiv.className = 'chat-message bot';
            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            botMsgDiv.innerHTML = `Redirecting you to our technical manager (+91 7550134175) on WhatsApp...<div class="chat-meta">${timeStr}</div>`;
            chatMessages.appendChild(botMsgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
          }, 600);
        } else {
          processUserChatMessage(question);
        }
      });
    });
  }

  // Multi-Language Response Bot Repository for Dental Lab
  const botDatabase = {
    en: {
      welcome: "Hello! I am your Oro-Hold Dental Lab AI Assistant. How can I help you today?",
      turnaround: "Standard zirconia restorations take 3 working days. Custom implant abutments or full-arch bars require 5 working days. Express shipping is available.",
      stl: "We accept all open scanner STL files, PLY, and OBJ digital impressions. Upload directly inside your Dentist Portal dashboard.",
      zirconia: "We offer premium zirconia brands including: 3D Pro Multilayer (1050 MPa strength, 57% translucency) and high-strength solid monolithic zirconia.",
      ship: "We arrange free local courier pickup for physical alginate or silicone impressions in Bengaluru. Use the 'Request Pickup' form on the Dentist Dashboard.",
      pain: "For any post-delivery discomfort, high bites, or pain, please contact your prescribing dentist immediately. We can adjust crowns or aligners if they request a scan modification.",
      timing: "Dr B's Oro-Hold Dental Lab operates Monday through Saturday, 9:00 AM to 7:00 PM. We are closed on Sundays and holidays.",
      location: "Our primary facility is located at: 1st Floor, SR Complex, Siddhaiah Puranik Rd, Basaveshwar Nagar, Bengaluru, Karnataka 560079.",
      insurance: "As a B2B dental laboratory, we bill dental clinics directly. Please check with your dentist regarding their clinic's patient insurance or EMI plans.",
      cost: "Pricing depends on the restoration material (e.g. monolithic zirconia, layer ceramic, cobalt-chromium, titanium). Dentists can request our full lab price list by contacting support.",
      default: "Thank you for contacting Dr B's Oro-Hold Lab Support. For custom orders, please upload scans via the Dentist Portal or connect directly to a technician on WhatsApp (+91 7550134175)."
    },
    hi: {
      welcome: "नमस्ते! मैं डॉ. बी के ओरो-होल्ड डेंटल लैब का एआई असिस्टेंट हूँ। आज मैं आपकी क्या सहायता कर सकता हूँ?",
      turnaround: "मानक ज़िरकोनिया बहाली में 3 कार्य दिवस लगते हैं। कस्टम इम्प्लांट एबूटमेंट या फुल-आर्क बार में 5 कार्य दिवस लगते हैं। एक्सप्रेस शिपिंग उपलब्ध है।",
      stl: "हम सभी ओपन स्कैनर एसटीएल (STL), पीएलवाई (PLY), और ओबीजे (OBJ) डिजिटल इंप्रेशन स्वीकार करते हैं। सीधे अपने डेंटिस्ट पोर्टल डैशबोर्ड के अंदर अपलोड करें।",
      zirconia: "हम 3D प्रो मल्टीलेयर (1050 MPa ताकत, 57% पारदर्शिता) और उच्च शक्ति वाले ठोस मोनोलिथिक ज़िरकोनिया सहित प्रीमियम ज़िरкоनिया ब्रांड पेश करते हैं।",
      ship: "हम बेंगलुरु में भौतिक एल्गिनेट या सिलिकॉन इंप्रेशन के लिए मुफ्त स्थानीय कूरियर पिकअप की व्यवस्था करते हैं। डेंटिस्ट डैशबोर्ड पर 'रिक्वेस्ट पिकअप' फॉर्म का उपयोग करें।",
      pain: "किसी भी तरह की असुविधा, दर्द या फिटिंग की समस्या होने पर कृपया तुरंत अपने डेंटिस्ट से संपर्क करें। यदि वे बदलाव का अनुरोध करते हैं, तो हम इसे ठीक कर सकते हैं।",
      timing: "डॉ. बी का ओरो-होल्ड लैब सोमवार से शनिवार सुबह 9:00 बजे से शाम 7:00 बजे तक चालू रहता है। रविवार और राष्ट्रीय छुट्टियों पर लैब बंद रहता है।",
      location: "हमारा मुख्य कार्यालय यहां स्थित है: पहली मंजिल, एसआर कॉम्प्लेक्स, सिद्धैया पुराणिक रोड, बसवेश्वर नगर, बेंगलुरु, कर्नाटक 560079।",
      insurance: "एक बी2बी लैब के रूप में, हम सीधे क्लीनिकों को बिल करते हैं। कृपया ईएमआई या बीमा विकल्पों के लिए अपने डेंटिस्ट से जांच करें।",
      cost: "कीमतें बहाली सामग्री (ज़िरकोनिया, सिरेमिक, टाइटेनियम आदि) पर निर्भर करती हैं। डेंटिस्ट सपोर्ट से संपर्क करके हमारी पूरी मूल्य सूची का अनुरोध कर सकते हैं।",
      default: "डॉ. बी के ओरो-होल्ड लैब सपोर्ट से संपर्क करने के लिए धन्यवाद। कस्टम ऑर्डर के लिए, कृपया डेंटिस्ट पोर्टल के माध्यम से स्कैन अपलोड करें या सीधे व्हाट्सएप (+91 7550134175) पर तकनीशियन से जुड़ें।"
    },
    ta: {
      welcome: "வணக்கம்! நான் டாக்டர் பி-யின் ஓரோ-ஹோல்ட் டென்டல் லேப் ஏஐ உதவியாளர். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?",
      turnaround: "சாதாரண சிர்கோனியா மறுசீரமைப்பிற்கு 3 வேலை நாட்கள் ஆகும். தனிப்பயன் இம்ப்ளான்ட் அபுட்மென்ட்கள் அல்லது முழு-வளைவு பார்களுக்கு 5 வேலை நாட்கள் ஆகும். எக்ஸ்பிரஸ் ஷிப்பிங் கிடைக்கிறது.",
      stl: "அனைத்து ஓபன் ஸ்கேனர் எஸ்டிஎல் (STL), பிஎல்ஒய் (PLY), மற்றும் ஓபிஜே (OBJ) டிஜிட்டல் பதிவுகளை நாங்கள் ஏற்றுக்கொள்கிறோம். உங்கள் பல் மருத்துவர் போர்டல் டாஷ்போர்டில் நேரடியாக பதிவேற்றவும்.",
      zirconia: "நாங்கள் 3டி ப்ரோ மல்டிலேயர் (1050 MPa வலிமை, 57% ஒளிஊடுருவும் தன்மை) மற்றும் அதிக வலிமை கொண்ட திட மோனோலிதிக் சிர்கோனியா உள்ளிட்ட பிரீமியம் சிர்கோனியா பிராண்டுகளை வழங்குகிறோம்.",
      ship: "பெங்களூரில் உள்ள அல்கினேட் அல்லது சிலிகான் பதிவுகளுக்கு இலவச உள்ளூர் கூரியர் பிக்கப்பை நாங்கள் ஏற்பாடு செய்கிறோம். பல் மருத்துவர் டாஷ்போர்டில் உள்ள 'பிக்கப் கோரிக்கை' படிவத்தைப் பயன்படுத்தவும்.",
      pain: "ஏதேனும் அசௌகரியம் அல்லது வலி ஏற்பட்டால் உங்கள் பல் மருத்துவரை அணுகவும். அவர்கள் ஸ்கேன் மாற்றத்தைக் கோரினால் நாங்கள் கிரீடங்களை சரிசெய்யலாம்.",
      timing: "டாக்டர் பி ஓரோ-ஹோல்ட் லேப் திங்கள் முதல் சனி வரை காலை 9:00 மணி முதல் மாலை 7:00 மணி வரை செயல்படுகிறது. ஞாயிறு மற்றும் அரசு விடுமுறை நாட்களில் மூடப்படும்.",
      location: "எங்கள் முக்கிய முகவரி: 1வது தளம், எஸ்ஆர் காம்ப்ளக்ஸ், சித்தையா புரானிக் சாலை, பசவேஸ்வர நகர், பெங்களூரு, கர்நாடகா 560079.",
      insurance: "நாங்கள் பல் மருத்துவ மனைகளுக்கு நேரடியாக கட்டணம் வசூలెழுப்புகிறோம். உங்கள் கிளினிக்கின் காப்பீடு அல்லது இஎம்ஐ திட்டங்களுக்கு உங்கள் பல் மருத்துவரை அணுகவும்.",
      cost: "விலைகள் பயன்படுத்தப்படும் பொருளைப் பொறுத்தது (சிர்கோனியா, டைட்டானியம் போன்றவை). பல் மருத்துவர்கள் எங்களை தொடர்பு கொண்டு லேப் விலை பட்டியலை பெறலாம்.",
      default: "டாக்டர் பி ஓரோ-ஹோல்ட் லேப் ஆதரவைத் தொடர்பு கொண்டதற்கு நன்றி. தனிப்பయን ஆர்டர்களுக்கு, பல் மருத்துவர் போர்டல் மூலம் ஸ்கேன் பதிவேற்றவும் அல்லது வாட்ஸ்அப் (+91 7550134175) மூலம் நேரடியாக தொழில்நுட்ப வல்லுநரைத் தொடர்பு கொள்ளவும்."
    },
    kn: {
      welcome: "ನಮಸ್ಕಾರ! ನಾನು ಡಾ. ಬಿ ಅವರ ಓರೋ-ಹೋಲ್ಡ್ ಡೆಂಟಲ್ ಲ್ಯಾಬ್ ಎಐ ಸಹಾಯಕ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
      turnaround: "ಸಾಮಾನ್ಯ ಜಿರ್ಕೋನಿಯಾ ಪುನಃಸ್ಥಾಪನೆಗೆ 3 ಕೆಲಸದ ದಿನಗಳು ಬೇಕಾಗುತ್ತವೆ. ಕಸ್ಟಮ್ ಇಂಪ್ಲಾಂಟ್ ಅಬುಟ್‌ಮೆಂಟ್ ಅಥವಾ ಫುಲ್-ಆರ್ಚ್ ಬಾರ್‌ಗಳಿಗೆ 5 ಕೆಲಸದ ದಿನಗಳು ಬೇಕಾಗುತ್ತವೆ. ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಶಿಪ್ಪಿಂಗ್ ಲಭ್ಯವಿದೆ.",
      stl: "ನಾವು ಎಲ್ಲಾ ಮುಕ್ತ ಸ್ಕ್ಯಾನರ್ ಎಸ್‌ಟಿಎಲ್ (STL), ಪಿಎಲ್‌ವೈ (PLY), ಮತ್ತು ಒಬಿಜೆ (OBJ) ಡಿಜಿಟಲ್ ಇಂಪ್ರೆಷನ್‌ಗಳನ್ನು ಸ್ವೀಕರಿಸುತ್ತೇವೆ. ನಿಮ್ಮ ಡೆಂಟಿಸ್ಟ್ ಪೋರ್ಟಲ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿ ನೇರವಾಗಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
      zirconia: "ನಾವು 3D ಪ್ರೊ ಮಲ್ಟಿಲೇಯರ್ (1050 MPa ಸಾಮರ್ಥ್ಯ, 57% ಪಾರದರ್ಶಕತೆ) ಮತ್ತು ಹೆಚ್ಚಿನ ಸಾಮರ್ಥ್ಯದ ಘನ ಮೊನೊಲಿಥಿಕ್ ಜಿರ್ಕೋನಿಯಾ ಸೇರಿದಂತೆ ಪ್ರೀಮಿಯಂ ಜಿರ್ಕೋನಿಯಾ ಬ್ರಾಂಡ್‌ಗಳನ್ನು ನೀಡುತ್ತೇವೆ.",
      ship: "ಬೆಂಗಳೂರಿನಲ್ಲಿ ಭೌತಿಕ ಅಲ್ಜಿನೇಟ್ ಅಥವಾ ಸಿಲಿಕೋನ್ ಇಂಪ್ರೆಷನ್‌ಗಳಿಗಾಗಿ ನಾವು ಉಚಿತ ಸ್ಥಳೀಯ ಕೊರಿಯರ್ ಪಿಕಪ್ ಅನ್ನು ವ್ಯವಸ್ಥೆ ಮಾಡುತ್ತೇವೆ. ಡೆಂಟಿಸ್ಟ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿ 'ಪಿಕಪ್ ವಿನಂತಿ' ಫಾರ್ಮ್ ಬಳಸಿ.",
      pain: "ಚಿಕಿತ್ಸೆಯ ನಂತರ ಯಾವುದೇ ನೋವು ಅಥವಾ ಅಸ್ವಸ್ಥತೆ ಇದ್ದರೆ ದಯವಿಟ್ಟು ತಕ್ಷಣ ನಿಮ್ಮ ಡೆಂಟಿಸ್ಟ್ ಅನ್ನು ಸಂಪರ್ಕಿಸಿ. ಅವರು ಕೋರಿದರೆ ನಾವು ಪುನಃಸ್ಥಾಪನೆಗಳನ್ನು ಸರಿಪಡಿಸುತ್ತೇವೆ.",
      timing: "ಡಾ. ಬಿ ಓರೋ-ಹೋಲ್ಡ್ ಲ್ಯಾಬ್ ಸೋಮವಾರದಿಂದ ಶನಿವಾರದವರೆಗೆ ಬೆಳಗ್ಗೆ 9:00 ರಿಂದ ಸಂಜೆ 7:00 ರವರೆಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ. ಭಾನುವಾರ ರಜೆ ಇರುತ್ತದೆ.",
      location: "ನಮ್ಮ ಲ್ಯಾಬ್ ವಿಳಾಸ: 1ನೇ ಮಹಡಿ, ಎಸ್‌ಆರ್ ಕಾಂಪ್ಲೆಕ್ಸ್, ಸಿದ್ದಯ್ಯ ಪುರಾಣಿಕ್ ರಸ್ತೆ, ಬಸವೇಶ್ವರ ನಗರ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ 560079.",
      insurance: "ನಾವು ಕ್ಲಿನಿಕ್‌ಗಳಿಗೆ ನೇರವಾಗಿ ಬಿಲ್ ಮಾಡುತ್ತೇವೆ. ವಿಮೆ ಅಥವಾ ಇಎಂಐ ಸೌಲಭ್ಯಗಳಿಗಾಗಿ ದಯವಿಟ್ಟು ನಿಮ್ಮ ಡೆಂಟಿಸ್ಟ್ ಅವರೊಂದಿಗೆ ಚರ್ಚಿಸಿ.",
      cost: "ಬೆಲೆಗಳು ಬಳಸುವ ಮೆಟೀರಿಯಲ್ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿರುತ್ತದೆ. ಕ್ಲಿನಿಕ್‌ಗಳು ಬೆಲೆ ಪಟ್ಟಿಗಾಗಿ ನೇರವಾಗಿ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಬಹುದು.",
      default: "ಡಾ. ಬಿ ಓರೋ-ಹೋಲ್ಡ್ ಲ್ಯಾಬ್ ಬೆಂಬಲವನ್ನು ಸಂಪರ್ಕಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು. ಕಸ್ಟಮ್ ಆರ್ಡರ್‌ಗಳಿಗಾಗಿ, ದಯವಿಟ್ಟು ಡೆಂಟಿಸ್ಟ್ ಪೋರ್ಟಲ್ ಮೂಲಕ ಸ್ಕ್ಯಾನ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ವಾಟ್ಸಾಪ್ (+91 7550134175) ನಲ್ಲಿ ನೇರವಾಗಿ ತಂತ್ರಜ್ಞರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ."
    },
    te: {
      welcome: "నమస్తే! నేను డాక్టర్ బి ఓరో-హోల్డ్ డెంటల్ ల్యాబ్ AI అసిస్టెంట్‌ని. ఈ రోజు నేను మీకు ఎలా సహాయపడగలను?",
      turnaround: "సాధారణ జిర్కోనియా పునరుద్ధరణకు 3 పని దినాలు పడుతుంది. కస్టమ్ ఇంప్లాంట్ అబుట్‌మెంట్ లేదా ఫుల్-ఆర్చ్ బార్‌లకు 5 పని దినాలు పడుతుంది. ఎక్స్‌ప్రెస్ షిప్పింగ్ అందుబాటులో ఉంది.",
      stl: "మేము అన్ని ఓపెన్ స్కానర్ ఎస్‌టిఎల్ (STL), పిఎల్‌వై (PLY), మరియు ఒబిజె (OBJ) డిజిటల్ ఇంప్రెషన్‌లను అంగీకరిస్తాము. మీ డెంటిస్ట్ పోర్టల్ డ్యాష్‌బోర్డ్‌లో నేరుగా అప్‌లోడ్ చేయండి.",
      zirconia: "మేము 3D ప్రో మల్టీలేయర్ (1050 MPa బలం, 57% పారదర్శకత) మరియు అధిక బలం కలిగిన సాలిడ్ మోనోలిథిక్ జిర్కోనియాతో సహా ప్రీమియం జిర్కోనియా బ్రాండ్‌లను అందిస్తున్నాము.",
      ship: "మేము బెంగళూరులో భౌతిక అల్జీనేట్ లేదా సిలికాన్ ఇంప్రెషన్ల కోసం ఉచిత స్థానిక కొరియర్ పికప్‌ని ఏర్పాటు చేస్తాము. డెంటిస్ట్ డ్యాష్‌బోర్డ్‌లో 'పికప్ రిక్వెస్ట్' ఫారమ్‌ను ఉపయోగించండి.",
      pain: "చికిత్స తర్వాత ఏదైనా నొప్పి లేదా అసౌకర్యం ఉంటే దయచేసి వెంటనే మీ డెంటిస్ట్‌ను సంప్రదించండి. అవసరమైతే మేము అడ్జస్ట్‌మెంట్లు చేస్తాము.",
      timing: "డాక్టర్ బి ఓరో-హోల్డ్ ల్యాబ్ సోమవారం నుండి శనివారం వరకు ఉదయం 9:00 నుండి సాయంత్రం 7:00 వరకు తెరిచి ఉంటుంది. ఆదివారం సెలవు.",
      location: "మా ప్రధాన కార్యాలయం ఇక్కడ ఉంది: 1వ అంతస్తు, SR కాంప్లెక్స్, సిద్దయ్య పురాణిక్ రోడ్, బసవేశ్వర నగర్, బెంగళూరు, కర్ణాటక 560079.",
      insurance: "మేము నేరుగా డెంటల్ క్లినిక్‌లకు బిల్ చేస్తాము. భీమా లేదా ఈఎంఐ (EMI) వివరాల కోసం మీ డెంటిస్ట్‌ను సంప్రదించండి.",
      cost: "ధరలు ఉపయోగించే మెటీరియల్ బట్టి ఉంటాయి. డెంటిస్ట్‌లు పూర్తి ధరల పట్టిక కోసం మా సపోర్ట్‌ను సంప్రదించవచ్చు.",
      default: "డాక్టర్ బి ఓరో-హోల్డ్ ల్యాబ్ సపోర్ట్‌ని సంప్రదించినందుకు ధన్యవాదాలు. కస్టమ్ ఆర్డర్ల కోసం, దయవిಟ್ಟು డెంటిస్ట్ పోర్టల్ ద్వారా స్కాన్‌లను అప్‌లోడ్ చేయండి లేదా నేరుగా వాట్సాప్ (+91 7550134175) లో టెక్నీషియన్‌తో కనెక్ట్ అవ్వండి."
    }
  };

  // Switch Chat Language Welcome Message
  if (chatLang) {
    chatLang.addEventListener('change', (e) => {
      const lang = e.target.value;
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      chatMessages.innerHTML = `
        <div class="chat-message bot">
          ${botDatabase[lang].welcome}
          <div class="chat-meta">${timeStr}</div>
        </div>
      `;
    });
  }

  // Voice Speech Recognition
  if (voiceBtn && chatInput) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      const langLocales = { en: 'en-US', hi: 'hi-IN', ta: 'ta-IN', kn: 'kn-IN', te: 'te-IN' };
      
      recognition.onstart = () => {
        voiceBtn.classList.add('recording');
        voiceBtn.innerHTML = '🎙️';
      };

      recognition.onerror = () => {
        voiceBtn.classList.remove('recording');
        voiceBtn.innerHTML = '🎙️';
      };

      recognition.onend = () => {
        voiceBtn.classList.remove('recording');
        voiceBtn.innerHTML = '🎙️';
      };

      recognition.onresult = (event) => {
        const resultText = event.results[0][0].transcript;
        chatInput.value = resultText;
        processUserChatMessage(resultText);
      };

      voiceBtn.addEventListener('click', () => {
        recognition.lang = langLocales[chatLang.value] || 'en-US';
        recognition.start();
      });
    } else {
      voiceBtn.style.display = 'none';
    }
  }

  // Speak bot response back
  function speakResponse(text, langCode) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langLocales = { en: 'en-US', hi: 'hi-IN', ta: 'ta-IN', kn: 'kn-IN', te: 'te-IN' };
    utterance.lang = langLocales[langCode] || 'en-US';
    window.speechSynthesis.speak(utterance);
  }

  // Text message send triggers
  if (chatSendBtn && chatInput) {
    chatSendBtn.addEventListener('click', () => {
      const txt = chatInput.value.trim();
      if (txt) {
        processUserChatMessage(txt);
      }
    });

    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const txt = chatInput.value.trim();
        if (txt) {
          processUserChatMessage(txt);
        }
      }
    });
  }

  // Unified Bot analysis & response processor
  function processUserChatMessage(msg) {
    if (!chatMessages) return;
    
    // User message render in WhatsApp bubble with blue ticks
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'chat-message user';
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    userMsgDiv.innerHTML = `${msg}<div class="chat-meta">${timeStr} <span style="color:#53bdeb; margin-left:4px;">✔✔</span></div>`;
    chatMessages.appendChild(userMsgDiv);
    chatInput.value = '';
    
    // Bot analysis logic
    const lang = chatLang.value;
    const lowerMsg = msg.toLowerCase();
    let responseText = botDatabase[lang].default;

    if (lowerMsg.includes('turnaround') || lowerMsg.includes('delivery') || lowerMsg.includes('दिनों') || lowerMsg.includes('நாட்கள்') || lowerMsg.includes('ದಿನಗಳು') || lowerMsg.includes('రోజులు')) {
      responseText = botDatabase[lang].turnaround;
    } else if (lowerMsg.includes('stl') || lowerMsg.includes('scan') || lowerMsg.includes('format') || lowerMsg.includes('स्कैन') || lowerMsg.includes('ஸ்கேன்') || lowerMsg.includes('ಸ್ಕ್ಯಾನ್') || lowerMsg.includes('స్కాన్')) {
      responseText = botDatabase[lang].stl;
    } else if (lowerMsg.includes('zirconia') || lowerMsg.includes('material') || lowerMsg.includes('grade') || lowerMsg.includes('crown') || lowerMsg.includes('ज़िरकोनिया') || lowerMsg.includes('சிர்கோனியா') || lowerMsg.includes('ಜಿರ್ಕೋನಿಯಾ') || lowerMsg.includes('జిర్కోనియా')) {
      responseText = botDatabase[lang].zirconia;
    } else if (lowerMsg.includes('ship') || lowerMsg.includes('pickup') || lowerMsg.includes('courier') || lowerMsg.includes('कूरियर') || lowerMsg.includes('கூரியர்') || lowerMsg.includes('ಕೊರಿಯర్') || lowerMsg.includes('కొరియర్')) {
      responseText = botDatabase[lang].ship;
    } else if (lowerMsg.includes('pain') || lowerMsg.includes('hurt') || lowerMsg.includes('discomfort') || lowerMsg.includes('दर्द') || lowerMsg.includes('வலி') || lowerMsg.includes('ನೋವು') || lowerMsg.includes('నొప్పి')) {
      responseText = botDatabase[lang].pain;
    } else if (lowerMsg.includes('time') || lowerMsg.includes('hours') || lowerMsg.includes('timing') || lowerMsg.includes('open') || lowerMsg.includes('समय') || lowerMsg.includes('நேரம்') || lowerMsg.includes('ಸಮಯ')) {
      responseText = botDatabase[lang].timing;
    } else if (lowerMsg.includes('location') || lowerMsg.includes('address') || lowerMsg.includes('where') || lowerMsg.includes('पता') || lowerMsg.includes('முகவரி') || lowerMsg.includes('ವಿಳಾಸ') || lowerMsg.includes('చిరునామా')) {
      responseText = botDatabase[lang].location;
    } else if (lowerMsg.includes('insurance') || lowerMsg.includes('emi') || lowerMsg.includes('cashless') || lowerMsg.includes('बीमा') || lowerMsg.includes('காப்பீடு') || lowerMsg.includes('ವಿಮೆ') || lowerMsg.includes('భీమా')) {
      responseText = botDatabase[lang].insurance;
    } else if (lowerMsg.includes('cost') || lowerMsg.includes('price') || lowerMsg.includes('fee') || lowerMsg.includes('दर') || lowerMsg.includes('விலை') || lowerMsg.includes('ಬೆಲೆ') || lowerMsg.includes('ధర')) {
      responseText = botDatabase[lang].cost;
    }

    // Bot message render after short delay
    setTimeout(() => {
      const botMsgDiv = document.createElement('div');
      botMsgDiv.className = 'chat-message bot';
      const botTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      botMsgDiv.innerHTML = `${responseText}<div class="chat-meta">${botTimeStr}</div>`;
      chatMessages.appendChild(botMsgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Speak back
      speakResponse(responseText, lang);
    }, 600);
  }

  // 6. Symptom Checker Checker Logic
  const analyzeSymptomsBtn = document.getElementById('analyzeSymptomsBtn');
  const checkerFlow = document.getElementById('checkerFlow');
  const checkerResult = document.getElementById('checkerResult');
  const resultRiskTitle = document.getElementById('resultRiskTitle');
  const resultDesc = document.getElementById('resultDesc');
  const resultList = document.getElementById('resultList');

  if (analyzeSymptomsBtn && checkerFlow && checkerResult) {
    analyzeSymptomsBtn.addEventListener('click', () => {
      const checkboxes = checkerFlow.querySelectorAll('input[type="checkbox"]');
      let selectedCount = 0;
      let hasSeverePain = document.getElementById('painLevel').value === 'high';
      let hasSwell = document.getElementById('symSwell').checked;

      checkboxes.forEach(c => {
        if (c.checked) selectedCount++;
      });

      checkerFlow.style.display = 'none';
      checkerResult.style.display = 'block';

      // Diagnose risk levels
      if (hasSeverePain || hasSwell) {
        resultRiskTitle.textContent = "Validation Status: Manual Adjustment Needed (High)";
        resultRiskTitle.style.color = "#ff3b30";
        resultDesc.textContent = "Borderline margins and undercuts detected on the digital prep mesh. Manual adjustment advised before sending to the 5-axis milling machine.";
        resultList.innerHTML = `
          <li>Distal undercut detected on Tooth #16</li>
          <li>Marginal thickness below 0.3mm</li>
          <li>Refine prep edge for smooth milling</li>
        `;
      } else if (selectedCount > 1) {
        resultRiskTitle.textContent = "Validation Status: Borderline Check (Medium)";
        resultRiskTitle.style.color = "#ff9500";
        resultDesc.textContent = "Minor margin overlap or insertion path warnings detected. We recommend checking preparation constraints.";
        resultList.innerHTML = `
          <li>Minor path of insertion deviation</li>
          <li>Slight overlap on buccal surface</li>
          <li>CAD override validation required</li>
        `;
      } else {
        resultRiskTitle.textContent = "Validation Status: Ready to Mill (Low)";
        resultRiskTitle.style.color = "#34c759";
        resultDesc.textContent = "No warnings found. Digital scan mesh, margins, path of insertion, and occlussal clearance are fully validated.";
        resultList.innerHTML = `
          <li>Perfect marginal seal margins</li>
          <li>Zero undercut deviations</li>
          <li>Optimal occlusal depth verified</li>
        `;
      }
    });
  }

  // 7. Smile Makeover Selfie Upload Simulation
  const smileUploadZone = document.getElementById('smileUploadZone');
  const smileInput = document.getElementById('smileInput');
  const smilePreviewContainer = document.getElementById('smilePreviewContainer');
  const smileCanvas = document.getElementById('smileCanvas');
  const smileScanLine = document.getElementById('smileScanLine');
  const runSimulationBtn = document.getElementById('runSimulationBtn');
  const resetSmileBtn = document.getElementById('resetSmileBtn');
  const simTypeSelect = document.getElementById('simulationType');

  let smileImageObj = null;

  if (smileUploadZone && smileInput) {
    smileUploadZone.addEventListener('click', () => smileInput.click());

    smileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          smileImageObj = new Image();
          smileImageObj.onload = () => {
            // Setup canvas size
            const ctx = smileCanvas.getContext('2d');
            smileCanvas.width = 500;
            smileCanvas.height = (smileImageObj.height / smileImageObj.width) * 500;
            ctx.drawImage(smileImageObj, 0, 0, smileCanvas.width, smileCanvas.height);

            // Hide zone, show preview & trigger scan animation
            smileUploadZone.style.display = 'none';
            smilePreviewContainer.style.display = 'block';
            smileScanLine.classList.add('animating');

            // Simulate scanning analysis
            setTimeout(() => {
              smileScanLine.classList.remove('animating');
              drawSmileLandmarks(ctx);
            }, 2000);
          };
          smileImageObj.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  function drawSmileLandmarks(ctx) {
    // Draw dummy target box mapping teeth alignment lines
    ctx.strokeStyle = '#34c759';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(250, 180, 70, 0, Math.PI, false); // Mouth curve
    ctx.stroke();

    // Landmark ticks
    ctx.fillStyle = '#34c759';
    ctx.beginPath();
    ctx.arc(180, 180, 6, 0, Math.PI * 2);
    ctx.arc(320, 180, 6, 0, Math.PI * 2);
    ctx.arc(250, 215, 6, 0, Math.PI * 2);
    ctx.fill();

    // Tag text overlay
    ctx.font = 'bold 12px Montserrat';
    ctx.fillStyle = '#34c759';
    ctx.fillText("AI Landmark: Teeth Midline", 20, 30);
  }

  if (runSimulationBtn && smileCanvas) {
    runSimulationBtn.addEventListener('click', () => {
      const ctx = smileCanvas.getContext('2d');
      if (!smileImageObj) return;

      // Redraw base image
      ctx.drawImage(smileImageObj, 0, 0, smileCanvas.width, smileCanvas.height);

      const type = simTypeSelect.value;
      ctx.fillStyle = 'rgba(198, 162, 101, 0.2)';
      
      if (type === 'whitening') {
        // Overlay a glowing bright whitening mask on mouth curve
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(250, 180, 60, 0.2, Math.PI - 0.2);
        ctx.ellipse(250, 190, 50, 15, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = 'bold 12px Montserrat';
        ctx.fillStyle = '#C6A265';
        ctx.fillText("Rendered: +8 shades whiter", 20, 50);
      } else if (type === 'braces') {
        // Draw aligned dental grid vector overlay
        ctx.strokeStyle = '#007aff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(250, 190, 55, 10, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = 'bold 12px Montserrat';
        ctx.fillStyle = '#007aff';
        ctx.fillText("Rendered: Clear Aligner Alignment path", 20, 50);
      } else if (type === 'veneers') {
        // Draw perfect symmetry dental crowns vectors
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.ellipse(250, 190, 58, 14, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#C6A265';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = 'bold 12px Montserrat';
        ctx.fillStyle = '#C6A265';
        ctx.fillText("Rendered: Porcelain Veneer symmetry match", 20, 50);
      }
    });
  }

  if (resetSmileBtn) {
    resetSmileBtn.addEventListener('click', () => {
      smileUploadZone.style.display = 'block';
      smilePreviewContainer.style.display = 'none';
      smileInput.value = '';
      smileImageObj = null;
    });
  }

  // 8. OPG / X-Ray Scan Analyzer
  const scanUploadZone = document.getElementById('scanUploadZone');
  const scanInput = document.getElementById('scanInput');
  const scanPreviewContainer = document.getElementById('scanPreviewContainer');
  const scanCanvas = document.getElementById('scanCanvas');
  const scanScanLine = document.getElementById('scanScanLine');
  const scanAnalysisResult = document.getElementById('scanAnalysisResult');
  const resetScanBtn = document.getElementById('resetScanBtn');

  let scanImageObj = null;

  if (scanUploadZone && scanInput) {
    scanUploadZone.addEventListener('click', () => scanInput.click());

    scanInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          scanImageObj = new Image();
          scanImageObj.onload = () => {
            const ctx = scanCanvas.getContext('2d');
            scanCanvas.width = 600;
            scanCanvas.height = (scanImageObj.height / scanImageObj.width) * 600;
            ctx.drawImage(scanImageObj, 0, 0, scanCanvas.width, scanCanvas.height);

            scanUploadZone.style.display = 'none';
            scanPreviewContainer.style.display = 'block';
            scanScanLine.classList.add('animating');

            // Simulate X-Ray Scanning
            setTimeout(() => {
              scanScanLine.classList.remove('animating');
              drawScanFindings(ctx);
              scanAnalysisResult.style.display = 'block';
            }, 2000);
          };
          scanImageObj.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  function drawScanFindings(ctx) {
    // Draw bounding boxes around simulated tooth cavities
    ctx.strokeStyle = '#ff3b30';
    ctx.lineWidth = 3;
    ctx.strokeRect(180, 110, 40, 45); // Tooth 46 box
    ctx.fillStyle = 'rgba(255, 59, 48, 0.25)';
    ctx.fillRect(180, 110, 40, 45);

    ctx.strokeStyle = '#ff9500';
    ctx.strokeRect(380, 120, 50, 50); // Wisdom tooth 38 box
    ctx.fillStyle = 'rgba(255, 149, 0, 0.25)';
    ctx.fillRect(380, 120, 50, 50);

    // Bounding Box tags
    ctx.font = 'bold 11px Montserrat';
    ctx.fillStyle = '#ff3b30';
    ctx.fillText("Caries detected (#46)", 150, 100);
    ctx.fillStyle = '#ff9500';
    ctx.fillText("Impacted Wisdom (#38)", 360, 110);
  }

  if (resetScanBtn) {
    resetScanBtn.addEventListener('click', () => {
      scanUploadZone.style.display = 'block';
      scanPreviewContainer.style.display = 'none';
      scanAnalysisResult.style.display = 'none';
      scanInput.value = '';
      scanImageObj = null;
    });
  }

  // 9. Report Explainer NLP Parser
  const reportUploadZone = document.getElementById('reportUploadZone');
  const reportInput = document.getElementById('reportInput');
  const reportLoading = document.getElementById('reportLoading');
  const reportResult = document.getElementById('reportResult');

  if (reportUploadZone && reportInput) {
    reportUploadZone.addEventListener('click', () => reportInput.click());

    reportInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        reportUploadZone.style.display = 'none';
        reportLoading.style.display = 'block';

        // Mock medical report extraction
        setTimeout(() => {
          reportLoading.style.display = 'none';
          reportResult.style.display = 'block';
        }, 1800);
      }
    });
  }

  // 10. Cost Estimator Calculator
  const calculateCostBtn = document.getElementById('calculateCostBtn');
  const costResult = document.getElementById('costResult');
  const tableBaseCost = document.getElementById('tableBaseCost');
  const tableVisits = document.getElementById('tableVisits');
  const tableDuration = document.getElementById('tableDuration');
  const tableInsurance = document.getElementById('tableInsurance');
  const tableEmi = document.getElementById('tableEmi');

  if (calculateCostBtn && costResult) {
    calculateCostBtn.addEventListener('click', () => {
      const treatment = document.getElementById('estimateTreatment').value;
      const complexity = document.getElementById('estimateSeverity').value;

      costResult.style.display = 'block';

      // Price scales
      const baseCosts = {
        cleaning: { mild: [3200, 3800], moderate: [4200, 4800], severe: [5000, 6000] },
        rootcanal: { mild: [4500, 5200], moderate: [5800, 6800], severe: [7500, 9000] },
        implants: { mild: [25000, 29000], moderate: [32000, 42000], severe: [45000, 60000] },
        invisalign: { mild: [12000, 14000], moderate: [16000, 20000], severe: [22000, 28000] },
        whitening: { mild: [1500, 1800], moderate: [2000, 2500], severe: [3000, 4000] }
      };

      const visits = {
        cleaning: "3 Working Days",
        rootcanal: "5 Working Days",
        implants: "7-10 Working Days",
        invisalign: "5 Working Days",
        whitening: "3 Working Days"
      };

      const durations = {
        cleaning: "2 hours CNC milling + 8 hours sintering",
        rootcanal: "3 hours custom implant CAD modeling",
        implants: "3D tooth movement simulation + 3D print cycle",
        invisalign: "Suction fitting print & curing block",
        whitening: "Aesthetic digital design & diagnostic waxup"
      };

      const insurances = {
        cleaning: "5-Year Premium Warranty",
        rootcanal: "Lifetime Warranty on Titanium Base",
        implants: "Staging sequence satisfaction guarantee",
        invisalign: "1-Year Breakage Warranty",
        whitening: "N/A (Diagnostic trial overlay only)"
      };

      const range = baseCosts[treatment][complexity];
      tableBaseCost.textContent = `��${range[0].toLocaleString()} - ��${range[1].toLocaleString()}`;
      tableVisits.textContent = visits[treatment];
      tableDuration.textContent = durations[treatment];
      tableInsurance.textContent = insurances[treatment];
      tableInsurance.style.color = insurances[treatment].includes('Not') ? '#ff3b30' : '#34c759';

      const emiVal = Math.round(range[0] / 12);
      tableEmi.textContent = `��${emiVal.toLocaleString()}/month (No-cost EMI options available)`;
    });
  }

  // 11. Portal Dashboard Switches
  const dbLinks = document.querySelectorAll('.dashboard-menu-link');
  const dbViews = document.querySelectorAll('.dashboard-role-view');

  if (dbLinks.length > 0) {
    dbLinks.forEach(link => {
      link.addEventListener('click', () => {
        dbLinks.forEach(l => l.classList.remove('active'));
        dbViews.forEach(v => v.classList.remove('active'));

        link.classList.add('active');
        const role = link.getAttribute('data-role');
        const viewPanel = document.getElementById(`${role}View`);
        if (viewPanel) {
          viewPanel.classList.add('active');
        }
      });
    });
  }
});


// Global AI Popup Toggle
document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('floatingAiTrigger');
    const popup = document.getElementById('globalAiPopup');
    const closeBtn = document.getElementById('closeAiPopupBtn');
    
    if(trigger && popup) {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            popup.classList.toggle('active');
            
            // Auto-focus input when opened
            if(popup.classList.contains('active')) {
                const chatInput = document.getElementById('chatInput');
                if(chatInput) chatInput.focus();
            }
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                popup.classList.remove('active');
            });
        }
    }
});

/* ==========================================================================
   3D UI EFFECTS & SCROLL REVEAL
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {


  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.section, .service-card, .stat-item, .cert-item');
  revealElements.forEach(el => el.classList.add('reveal'));

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Initialize VanillaTilt if available
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
    });
  }

  // Initialize Swiper carousels if elements exist
  const swiperContainers = document.querySelectorAll('.swiper');
  if (swiperContainers.length > 0 && typeof Swiper !== 'undefined') {
    new Swiper('.swiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      },
      loop: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      }
    });
  }

  // ==========================================================================
  // GSAP PREMIUM UI/UX ANIMATIONS
  // ==========================================================================
  if (typeof gsap !== 'undefined') {
    // Register ScrollTrigger plugin
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // 1. Hero Load Animations
    if (document.querySelector('.hero-subtitle')) {
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl.from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.6 })
            .from('.hero-title', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
            .from('.hero-desc', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
            .from('.btn-book-arrow', { y: 15, opacity: 0, duration: 0.5 }, '-=0.3')
            .from('.hero-floating-tags', { x: 30, opacity: 0, duration: 0.8 }, '-=0.5');
    }

    // 2. Navbar Logo and CTA Load Animation
    if (document.querySelector('.logo-container')) {
      gsap.from('.logo-container', { x: -30, opacity: 0, duration: 0.8, ease: 'power3.out' });
    }
    if (document.querySelector('.nav-links li')) {
      gsap.from('.nav-links li', { y: -15, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' });
    }
    if (document.querySelector('.nav-cta')) {
      gsap.from('.nav-cta', { x: 30, opacity: 0, duration: 0.8, ease: 'power3.out' });
    }

    // 3. Scroll Reveal for Sections & Cards (using ScrollTrigger)
    if (typeof ScrollTrigger !== 'undefined') {
      // Section Headers reveal
      gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      });

      // Card animations removed to guarantee instant visibility on load
    }
  }
});
