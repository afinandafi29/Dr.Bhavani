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
      subtitle: "Welcome to Oro-Hold",
      title: "Healthy Smiles for Your Entire Family",
      desc: "Providing warm, gentle, and comprehensive dental care to ensure lifelong healthy smiles for your loved ones."
    },
    {
      subtitle: "Clinical Excellence",
      title: "Expert Care by Professional Dentists",
      desc: "Our experienced clinical team utilizes state-of-the-art procedures to deliver comfortable, pain-free treatments."
    },
    {
      subtitle: "Modern Facilities",
      title: "Step Into Our Premium Dental Clinic",
      desc: "Relax in our comfortable waiting lounge, equipped with next-generation sterilization technology and advanced dental chairs."
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

  // 5. AI Chatbot Logic
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
          window.open('https://wa.me/919108527755', '_blank');
          
          processUserChatMessage("Requesting live tech connect...");
          setTimeout(() => {
            const botMsgDiv = document.createElement('div');
            botMsgDiv.className = 'chat-message bot';
            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            botMsgDiv.innerHTML = `Redirecting you to our technical manager (+91 9108527755) on WhatsApp...<div class="chat-meta">${timeStr}</div>`;
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
      welcome: "Hello! I am your Oro Hold AI Assistant. How can I help you today?",
      default: "Thank you for contacting Oro Hold Lab Support. For custom orders, please upload scans via the Dentist Portal or connect directly to a technician on WhatsApp (+91 9108527755)."
    },
    hi: {
      welcome: "नमस्ते! मैं ओरो-होल्ड का एआई असिस्टेंट हूँ। आज मैं आपकी क्या सहायता कर सकता हूँ?",
      default: "ओरो-होल्ड लैब सपोर्ट से संपर्क करने के लिए धन्यवाद। कस्टम ऑर्डर के लिए, कृपया पोर्टल के माध्यम से स्कैन अपलोड करें।"
    },
    ta: {
      welcome: "வணக்கம்! நான் ஓரோ-ஹோல்ட் ஏஐ உதவியாளர். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?",
      default: "தொடர்பு கொண்டதற்கு நன்றி. ஆர்டர்களுக்கு, போர்டல் மூலம் ஸ்கேன் பதிவேற்றவும்."
    },
    kn: {
      welcome: "ನಮಸ್ಕಾರ! ನಾನು ಓರೋ-ಹೋಲ್ಡ್ ಎಐ ಸಹಾಯಕ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
      default: "ಸಂಪರ್ಕಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು. ಕಸ್ಟಮ್ ಆರ್ಡರ್‌ಗಳಿಗಾಗಿ, ದಯವಿಟ್ಟು ಪೋರ್ಟಲ್ ಮೂಲಕ ಸ್ಕ್ಯಾನ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ."
    },
    te: {
      welcome: "నమస్తే! నేను ఓరో-హోల్డ్ AI అసిస్టెంట్‌ని. ఈ రోజు నేను మీకు ఎలా సహాయపడగలను?",
      default: "సంప్రదించినందుకు ధన్యవాదాలు. ఆర్డర్ల కోసం, దయవిట్టు పోర్టల్ ద్వారా స్కాన్‌లను అప్‌లోడ్ చేయండి."
    }
  };

  // Comprehensive FAQ Database
  const faqDatabase = [
    // Greetings & Small Talk
    { keys: ['hi', 'hii', 'hiii', 'hello', 'helo', 'hey', 'heyy', 'yo', 'hola', 'greetings', 'hey there'], answer: "Hello! 👋 Welcome to Dr B's Oro-Hold Dental Lab. I'm your AI assistant. How can I help you today?" },
    { keys: ['good morning', 'morning'], answer: "Good morning! ☀️ Hope you're having a great day. How may I assist you?" },
    { keys: ['good afternoon', 'afternoon'], answer: "Good afternoon! Welcome to Oro-Hold Dental Lab. How can I help?" },
    { keys: ['good evening', 'evening'], answer: "Good evening! 😊 What can I do for you today?" },
    { keys: ['good night', 'night'], answer: "Good night! If you have any questions before you leave, I'm here to help." },
    { keys: ['how are you', 'how are you doing', 'how is it going', 'hows it going', 'are you okay'], answer: "I'm doing great, thanks for asking! I'm ready to help you with dental laboratory services, orders, digital scans, pricing, or anything related to Oro-Hold." },
    { keys: ['how is your day', 'hows your day'], answer: "Every day is a great day when I get to help our customers! 😊" },
    { keys: ['what is up', 'whats up'], answer: "I'm here and ready to help. What would you like to know?" },
    { keys: ['nice to meet you'], answer: "Nice to meet you too! 😊 Welcome to Oro-Hold Dental Lab." },
    
    // Polite & Fun Messages
    { keys: ['thank you', 'thanks', 'thx', 'tysm', 'appreciate it', 'many thanks', 'thank you so much'], answer: "You're very welcome! Happy to help. 😊" },
    { keys: ['bye', 'goodbye', 'see you', 'cya', 'take care', 'have a nice day'], answer: "Goodbye! We look forward to assisting you again. Have a wonderful day!" },
    { keys: ['awesome', 'cool', 'perfect', 'nice', 'amazing', 'great', 'excellent', 'wonderful', 'okay', 'yes', 'sounds good'], answer: "Fantastic! Let me know if there's anything else I can assist you with. 😊" },
    { keys: ['no'], answer: "No problem! If you change your mind or need assistance later, I'm always here to help." },
    { keys: ['tell me a joke', 'make me laugh'], answer: "Why did the tooth go to school? 🦷 Because it wanted to become a little brighter!" },
    { keys: ['make me smile'], answer: "A healthy smile starts with great dental care—and we're here to help make that happen! 😊" },
    { keys: ['are you smart'], answer: "I like to think so! I can answer questions, guide you through our services, and help you find what you need." },
    { keys: ['can you cook'], answer: "😄 Cooking isn't my specialty! I'm here to help with Oro-Hold Dental Lab services, orders, digital workflows, and support." },
    
    // Identity & Help
    { keys: ['what can you do'], answer: "I can help you: Explain our services, Recommend restorations, Upload digital scans, Track orders, Answer FAQs, Provide pricing information, Connect you with our team, Book a consultation." },
    { keys: ['are you a chatbot', 'are you a real person', 'are you human', 'real person'], answer: "I'm an AI-powered assistant designed to help you quickly find information. If you need a human team member, I can help you get in touch." },
    { keys: ['talk to a person', 'talk to someone', 'contact support', 'customer care'], answer: "Of course. I can help connect you with our support team by phone (+91 9108527755), WhatsApp, or email." },
    { keys: ['help', 'support', 'assist me', 'i need help', 'can you help me', 'guide me'], answer: "I'm here to help! You can ask about: Our services, Uploading scans, Tracking orders, Pricing, Delivery, Payments, Support." },
    
    // Core Business
    { keys: ['digital workflow'], answer: "Our digital workflow supports intraoral scans, CAD/CAM design, and secure file uploads for faster case processing." },
    { keys: ['what is oro-hold', 'what is dr b', 'about you', 'who are you'], answer: "Dr B's Oro-Hold Dental Lab is a professional dental laboratory that manufactures high-quality dental restorations and prosthetics for dentists and dental clinics. We focus on precision, quality, aesthetics, and timely delivery." },
    { keys: ['treat patients directly', 'patient treatment', 'can i visit as a patient', 'treat patients'], answer: "No. We work exclusively with licensed dentists and dental clinics. Patients should visit their dentist for treatment." },
    { keys: ['where is', 'location', 'located', 'where are you'], answer: "We are based in Bengaluru, Karnataka, serving dental clinics across India." },
    { keys: ['working hours', 'opening hours', 'when are you open', 'business hours'], answer: "Monday to Saturday: 9:00 AM – 7:00 PM. Sunday: Closed" },
    { keys: ['how can i contact', 'contact number', 'phone number', 'email id', 'contact support'], answer: "You can contact us by phone (+91 9108527755), WhatsApp, email (oroholddentallab@gmail.com), or through the Contact page on our website." },
    { keys: ['customer support', 'technical support', 'help desk'], answer: "Yes. Our technical team is available during business hours to assist dentists." },
    { keys: ['services do you provide', 'what do you make', 'products', 'what do you manufacture'], answer: "We manufacture: Zirconia Crowns, PFM Crowns, E-Max Crowns, Metal Crowns, Veneers, Inlays & Onlays, Dentures, Cast Partial Dentures, Implant Restorations, Surgical Guides, Orthodontic Appliances, Night Guards, Retainers, Splints, Temporary Crowns, and Smile Design." },
    { keys: ['implant crowns', 'implant supported', 'implants'], answer: "Yes. We fabricate implant-supported crowns and prosthetics compatible with multiple implant systems." },
    { keys: ['dentures', 'flexible dentures', 'complete dentures'], answer: "Yes. We provide complete, partial, flexible, and premium dentures." },
    { keys: ['cad/cam', 'cad cam', 'cadcam'], answer: "Yes. We use advanced CAD/CAM technology for precise and accurate restorations." },
    { keys: ['place an order', 'how to order', 'submit case'], answer: "Dentists can submit cases by: Online Order Form, WhatsApp, Courier, Lab Pickup, or Digital Scan Upload." },
    { keys: ['intraoral scan', 'digital scan', 'upload scan', 'intra oral'], answer: "Yes. We accept digital scans from major intraoral scanners." },
    { keys: ['file formats', 'which format', 'obj', 'ply', 'stl'], answer: "We accept: STL, PLY, OBJ, DCM, and ZIP Files." },
    { keys: ['physical impressions', 'send impressions', 'silicone impression', 'alginate'], answer: "Yes. Physical impressions are accepted through courier or pickup service." },
    { keys: ['pickup service', 'collection service', 'book a pickup', 'request pickup'], answer: "Yes, we provide pickup service in selected service areas." },
    { keys: ['track my order', 'tracking status', 'order status'], answer: "Yes. Every case receives a tracking status." },
    { keys: ['modify my order', 'change order', 'edit case'], answer: "Yes, you can modify your order if production has not yet started." },
    { keys: ['cancel my order', 'stop order'], answer: "Orders can be cancelled before manufacturing begins." },
    { keys: ['fabrication take', 'turnaround time', 'how long', 'delivery time'], answer: "Depending on the restoration: Temporary Crown: 1–2 days, Zirconia Crown: 3–5 days, PFM Crown: 3–5 days, Dentures: 5–7 days, Implant Cases: 5–10 days." },
    { keys: ['express service', 'rush case', 'urgent order', 'express delivery'], answer: "Yes. Rush cases are available depending on workload." },
    { keys: ['materials do you use', 'which material', 'premium material'], answer: "We use premium certified dental-grade materials from trusted manufacturers." },
    { keys: ['materials safe', 'safe to use', 'biocompatible'], answer: "Yes. All materials are dental-grade, safe, and quality tested." },
    { keys: ['quality checks', 'inspection', 'quality control'], answer: "Yes. Every restoration undergoes multiple quality inspections." },
    { keys: ['handcrafted', 'hand finished', 'manual finish'], answer: "Many restorations combine CAD/CAM precision with expert hand finishing." },
    { keys: ['digital dentistry', 'digital workflow'], answer: "Yes. We specialize in fully digital workflows." },
    { keys: ['which scanners', 'supported scanners', 'itero', '3shape', 'medit', 'trios', 'primescan', 'carestream'], answer: "We support 3Shape, Medit, iTero, TRIOS, PrimeScan, Carestream, and all open systems." },
    { keys: ['email scan', 'email files'], answer: "Yes, you can email scan files to us." },
    { keys: ['deliver across india', 'pan india', 'all over india', 'shipping available'], answer: "Yes, we deliver across India using reliable national courier partners." },
    { keys: ['courier services', 'which courier', 'shipping method'], answer: "Reliable national courier partners are used depending on your location." },
    { keys: ['collect my case', 'collect directly', 'pick up directly'], answer: "Yes, you can collect your case directly from our lab." },
    { keys: ['payment methods', 'how to pay', 'payment options', 'upi', 'credit card'], answer: "We accept UPI, Bank Transfer, Credit Card, Debit Card, and other online payment methods." },
    { keys: ['provide invoices', 'get invoice', 'gst details'], answer: "Yes, we provide official invoices with GST details." },
    { keys: ['monthly billing', 'billing cycle', 'monthly payment'], answer: "Yes, monthly billing is available for eligible partner clinics." },
    { keys: ['warranty', 'guarantee', 'warranty details'], answer: "Warranty depends on the product and usage conditions. Please refer to our product catalogue for details." },
    { keys: ['adjustment is required', 'adjustments', 'does not fit', 'crown does not fit'], answer: "We provide support for adjustments whenever applicable. Please contact our support team; we will evaluate the case and provide a suitable solution." },
    { keys: ['recommend the right restoration', 'ai recommend', 'what crown should i choose', 'compare zirconia'], answer: "Our AI assistant can guide dentists based on the provided information, but the final clinical decision remains with the treating dentist." },
    { keys: ['partner with', 'become a partner clinic', 'new dentists'], answer: "Yes. We welcome partnerships with dental clinics across India, including new dentists." },
    { keys: ['lab support', 'technician support', 'discuss complex', 'technical guidance', 'speak to a lab expert'], answer: "Yes. Our technicians assist with case planning, technical guidance, and complex implant or restorative cases." },
    { keys: ['shade consultation', 'request shade guide', 'custom shade'], answer: "Yes, we provide shade consultation for selected cases." },
    { keys: ['custom restoration', 'custom order'], answer: "Yes, you can request custom restorations tailored to specific patient needs." },
    { keys: ['prices', 'price list', 'pricing', 'shipping charges'], answer: "Please contact our support team or download the price list from the dentist portal for detailed pricing and shipping charges." }
  ];

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
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add Typing Indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing-indicator-msg';
    typingDiv.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Bot analysis logic
    const lang = chatLang.value;
    const lowerMsg = msg.toLowerCase();
    
    let responseText = botDatabase[lang] ? botDatabase[lang].default : botDatabase['en'].default;

    // Search in FAQ Database
    let found = false;
    for (let faq of faqDatabase) {
      if (faq.keys.some(key => lowerMsg.includes(key))) {
        responseText = faq.answer;
        found = true;
        break;
      }
    }
    
    // Fallbacks if not found (for some regional keywords retained from old logic)
    if (!found) {
      if (lowerMsg.includes('turnaround') || lowerMsg.includes('delivery') || lowerMsg.includes('दिनों') || lowerMsg.includes('நாட்கள்') || lowerMsg.includes('ದಿನಗಳು') || lowerMsg.includes('రోజులు')) {
        responseText = "Standard zirconia restorations take 3-5 days. Dentures take 5-7 days. Express shipping is available.";
      } else if (lowerMsg.includes('stl') || lowerMsg.includes('scan') || lowerMsg.includes('format') || lowerMsg.includes('स्कैन') || lowerMsg.includes('ஸ்கேன்') || lowerMsg.includes('ಸ್ಕ್ಯಾನ್') || lowerMsg.includes('స్కాన్')) {
        responseText = "We accept all open scanner STL files, PLY, and OBJ digital impressions. Upload directly inside your Dentist Portal dashboard.";
      } else if (lowerMsg.includes('zirconia') || lowerMsg.includes('material') || lowerMsg.includes('grade') || lowerMsg.includes('crown') || lowerMsg.includes('ज़िरकोनिया') || lowerMsg.includes('சிர்கோனியா') || lowerMsg.includes('ಜಿರ್ಕೋನಿಯಾ') || lowerMsg.includes('జిర్కోనియా')) {
        responseText = "We offer premium zirconia brands including 3D Pro Multilayer and high-strength solid monolithic zirconia.";
      } else if (lowerMsg.includes('ship') || lowerMsg.includes('pickup') || lowerMsg.includes('courier') || lowerMsg.includes('कूरियर') || lowerMsg.includes('கூரியர்') || lowerMsg.includes('ಕೊರಿಯర్') || lowerMsg.includes('కొరియర్')) {
        responseText = "We arrange local courier pickup or use national couriers across India.";
      } else if (lowerMsg.includes('pain') || lowerMsg.includes('hurt') || lowerMsg.includes('discomfort') || lowerMsg.includes('दर्द') || lowerMsg.includes('வலி') || lowerMsg.includes('ನೋವು') || lowerMsg.includes('నొప్పి')) {
        responseText = "Please contact your prescribing dentist immediately for any adjustments.";
      } else if (lowerMsg.includes('time') || lowerMsg.includes('hours') || lowerMsg.includes('timing') || lowerMsg.includes('open') || lowerMsg.includes('समय') || lowerMsg.includes('நேரம்') || lowerMsg.includes('ಸಮಯ')) {
        responseText = "We are open Monday to Saturday: 9:00 AM – 7:00 PM. Closed on Sundays.";
      }
    }

    // Bot message render after delay (simulating typing)
    setTimeout(() => {
      // Remove typing indicator
      if (chatMessages.contains(typingDiv)) {
        chatMessages.removeChild(typingDiv);
      }
      
      const botMsgDiv = document.createElement('div');
      botMsgDiv.className = 'chat-message bot';
      const botTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      botMsgDiv.innerHTML = `${responseText}<div class="chat-meta">${botTimeStr}</div>`;
      chatMessages.appendChild(botMsgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1200);
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
