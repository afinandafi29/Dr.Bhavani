document.addEventListener('DOMContentLoaded', () => {
  // Mobile Hamburger Toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    // Inject close button dynamically
    if (!mobileMenu.querySelector('.mobile-menu-close')) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'mobile-menu-close';
      closeBtn.innerHTML = '&times;';
      closeBtn.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
      mobileMenu.insertBefore(closeBtn, mobileMenu.firstChild);
    }

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
  const indicators = document.querySelectorAll('.hero-indicators .indicator');
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
      subtitle: "Lab Excellence",
      title: "Expert Care by Professional Dentists",
      desc: "Our experienced dental lab team utilizes state-of-the-art procedures to deliver comfortable, pain-free treatments."
    },
    {
      subtitle: "Modern Facilities",
      title: "Step Into Our Premium dental lab",
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

    // Swipe Touch Support for mobile (Swiper swipe gestures)
    let touchstartX = 0;
    let touchendX = 0;
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('touchstart', (e) => {
        touchstartX = e.changedTouches[0].screenX;
      }, { passive: true });

      heroSection.addEventListener('touchend', (e) => {
        touchendX = e.changedTouches[0].screenX;
        handleSwipeGesture();
      }, { passive: true });
    }

    function handleSwipeGesture() {
      if (touchendX < touchstartX - 50) {
        // Swiped Left -> Next Slide
        let nextIndex = (currentSlide + 1) % totalSlides;
        showSlide(nextIndex);
        resetSlideShow();
      } else if (touchendX > touchstartX + 50) {
        // Swiped Right -> Prev Slide
        let prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
        resetSlideShow();
      }
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
      default: "Thank you for contacting Oro Hold Lab Support. For custom orders, please connect directly to a technician on WhatsApp (+91 9108527755)."
    }
  };

  const faqDatabase = [
    // Greetings & Small Talk
    { keys: ['hi', 'hii', 'hiii', 'hello', 'helo', 'hey', 'heyy', 'yo', 'hola', 'greetings', 'hey there'], answer: "Hello! 👋 Welcome to Dr B's Oro-Hold Dental Lab. I'm your AI assistant. How can I help you today?" },
    { keys: ['good morning', 'morning'], answer: "Good morning! ☀️ Hope you're having a great day. How may I assist you?" },
    { keys: ['good afternoon', 'afternoon'], answer: "Good afternoon! Welcome to Oro-Hold Dental Lab. How can I help?" },
    { keys: ['good evening', 'evening'], answer: "Good evening! 😊 What can I do for you today?" },
    { keys: ['good night', 'night'], answer: "Good night! If you have any questions before you leave, I'm here to help." },
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
    
    // Identity & Help
    { keys: ['are you a chatbot', 'are you a real person', 'are you human', 'real person'], answer: "I'm an AI-powered assistant designed to help you quickly find information. If you need a human team member, I can help you get in touch." },
    
    { keys: ['do you offer teeth whitening', 'teeth whitening', 'whitening'], answer: "Yes! We provide professional teeth whitening trays and custom bleaching solutions. Our lab-grade whitening delivers up to 8 shades brighter results safely." },
    // Core Business
    { keys: ['treat patients directly', 'patient treatment', 'can i visit as a patient', 'treat patients'], answer: "No. We work exclusively with licensed dentists and dental labs. Patients should visit their dentist for treatment." },
    { keys: ['where is', 'location', 'located', 'where are you', 'dental lab located', 'address'], answer: "📍 We are located at:\nORO HOLD DENTAL LAB,\n2nd Floor, SR Complex,\n3rd Stage, Basaveshwar Nagar,\nBengaluru, Karnataka – 560079.\n\nPhone: +91 9108527755" },
    { keys: ['working hours', 'opening hours', 'when are you open', 'business hours', 'what are your opening hours', 'open hours', 'timings'], answer: "🕐 Our Opening Hours:\nMonday – Saturday: 10:00 AM – 8:00 PM\nSunday: Closed\n\nFor urgent queries, call us at +91 9108527755." },
    { keys: ['services do you provide', 'what do you make', 'products', 'what do you manufacture'], answer: "We manufacture: Zirconia Crowns, PFM Crowns, E-Max Crowns, Metal Crowns, Veneers, Inlays & Onlays, Dentures, Cast Partial Dentures, Implant Restorations, Surgical Guides, Orthodontic Appliances, Night Guards, Retainers, Splints, Temporary Crowns, and Smile Design." },
    { keys: ['invisible aligners', 'do you offer invisible aligners', 'clear aligners', 'aligners'], answer: "✅ Yes! We manufacture premium invisible (clear) aligners using high-grade PETG material.\nCustom-fabricated with precision digital workflows for perfect fit.\nContact us at +91 9108527755 for more details." },
    { keys: ['implant pricing', 'implant price', 'how much does implant cost', 'implant cost'], answer: "For implant pricing, please contact us directly:\n📞 +91 9108527755\n📧 oroholddentallab@gmail.com\nWe offer competitive B2B pricing for all dental professionals." },
    { keys: ['book appointment', 'book a call', 'schedule appointment', 'i want to book', 'book'], answer: "📅 To book an appointment:\n📞 Call: +91 9108527755\n📧 Email: oroholddentallab@gmail.com\n\nOur team will confirm your slot within 24 hours!" },
    { keys: ['dentures', 'flexible dentures', 'complete dentures'], answer: "Yes. We provide complete, partial, flexible, and premium dentures." },
    { keys: ['cad/cam', 'cad cam', 'cadcam'], answer: "Yes. We use advanced CAD/CAM technology for precise and accurate restorations." },
    { keys: ['file formats', 'which format', 'obj', 'ply', 'stl'], answer: "We accept: STL, PLY, OBJ, DCM, and ZIP Files." },
    { keys: ['pickup service', 'collection service', 'book a pickup', 'request pickup'], answer: "Yes, we provide pickup service in selected service areas." },
    { keys: ['modify my order', 'change order', 'edit case'], answer: "Yes, you can modify your order if production has not yet started." },
    { keys: ['cancel my order', 'stop order'], answer: "Orders can be cancelled before manufacturing begins." },
    { keys: ['materials do you use', 'which material', 'premium material'], answer: "We use premium certified dental-grade materials from trusted manufacturers." },
    { keys: ['materials safe', 'safe to use', 'biocompatible'], answer: "Yes. All materials are dental-grade, safe, and quality tested." },
    { keys: ['quality checks', 'inspection', 'quality control'], answer: "Yes. Every restoration undergoes multiple quality inspections." },
    { keys: ['handcrafted', 'hand finished', 'manual finish'], answer: "Many restorations combine CAD/CAM precision with expert hand finishing." },
    { keys: ['digital dentistry', 'digital workflow'], answer: "Yes. We specialize in fully digital workflows." },
    { keys: ['email scan', 'email files'], answer: "Yes, you can email scan files to us." },
    { keys: ['collect my case', 'collect directly', 'pick up directly'], answer: "Yes, you can collect your case directly from our lab." },
    { keys: ['provide invoices', 'get invoice', 'gst details'], answer: "Yes, we provide official invoices with GST details." },
    { keys: ['warranty', 'guarantee', 'warranty details'], answer: "Warranty depends on the product and usage conditions. Please refer to our product catalogue for details." },
    { keys: ['recommend the right restoration', 'ai recommend', 'what crown should i choose', 'compare zirconia'], answer: "Our AI assistant can guide dentists based on the provided information, but the final dental lab decision remains with the treating dentist." },
    { keys: ['shade consultation', 'request shade guide', 'custom shade'], answer: "Yes, we provide shade consultation for selected cases." },
    { keys: ['custom restoration', 'custom order'], answer: "Yes, you can request custom restorations tailored to specific patient needs." },
  ];

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
    
    // User message render (no timestamp shown)
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'chat-message user';
    userMsgDiv.innerHTML = `${msg}`;
    chatMessages.appendChild(userMsgDiv);
    if (chatInput) chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add Typing Indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing-indicator-msg';
    typingDiv.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Bot analysis logic
    let responseText = "ok";

    // Bot message render after delay (simulating typing)
    setTimeout(() => {
      // Remove typing indicator
      if (chatMessages.contains(typingDiv)) {
        chatMessages.removeChild(typingDiv);
      }
      
      const botMsgDiv = document.createElement('div');
      botMsgDiv.className = 'chat-message bot';
      // Render newlines as <br> for multi-line answers
      const formattedResponse = responseText.replace(/\n/g, '<br>');
      botMsgDiv.innerHTML = `${formattedResponse}`;
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

  // Inject Mobile Bottom Navigation Bar (app-like layout as in SmileMate)
  if (window.innerWidth <= 768) {
    const bottomNav = document.createElement('div');
    bottomNav.className = 'mobile-bottom-nav';
    bottomNav.innerHTML = `
      <a href="index.html" class="mobile-bottom-item ${window.location.pathname.endsWith('index.html') || window.location.pathname === '/' ? 'active' : ''}">
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
        <span>Home</span>
      </a>
      <a href="appointment.html" class="mobile-bottom-item ${window.location.pathname.endsWith('appointment.html') ? 'active' : ''}">
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <span>Book</span>
      </a>
      <a href="services.html" class="mobile-bottom-item ${window.location.pathname.endsWith('services.html') ? 'active' : ''}">
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
        <span>Services</span>
      </a>
      <a href="login.html" class="mobile-bottom-item ${window.location.pathname.endsWith('login.html') ? 'active' : ''}">
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v1"></path>
        </svg>
        <span>Login</span>
      </a>
    `;
    document.body.appendChild(bottomNav);
    
    // Add extra padding at the bottom of the body to prevent content from being hidden behind the nav bar
    document.body.style.paddingBottom = '80px';
  }
});

