js_code = """
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
});
"""

with open("/Users/afi/Downloads/Dr.Bhavani-main/main.js", "a", encoding="utf-8") as f:
    f.write(js_code)
print("main.js updated with Swiper and Tilt initialization.")
