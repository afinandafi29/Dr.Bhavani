import re

filename = "/Users/afi/Downloads/Dr.Bhavani-main/gallery.html"
with open(filename, "r", encoding="utf-8") as f:
    content = f.read()

# Extract items
items_html = re.search(r'<div class="gallery-grid">(.*?)</div>\s*</div>\s*</section>', content, re.DOTALL)
if items_html:
    inner = items_html.group(1)
    
    # Modify inner items to be swiper-slide
    inner = inner.replace('gallery-grid-item', 'swiper-slide')
    # Add width and style to gallery-item for swiper
    inner = inner.replace('class="gallery-item swiper-slide"', 'class="gallery-item swiper-slide" style="width: 300px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);"')
    
    # Wrap in swiper container
    swiper_container = f"""
      <div class="swiper" style="padding-top: 20px; padding-bottom: 60px;">
        <div class="swiper-wrapper">
{inner}
        </div>
        <div class="swiper-pagination"></div>
      </div>
"""
    
    new_content = content[:items_html.start()] + swiper_container + content[items_html.end():]
    with open(filename, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Gallery converted to Swiper successfully!")
