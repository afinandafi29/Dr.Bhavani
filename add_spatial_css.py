import os

css_path = "/Users/afi/Downloads/Dr.Bhavani-main/styles.css"

with open(css_path, "r", encoding="utf-8") as f:
    css_content = f.read()

# Enhance tag-glass
enhanced_tag_glass = """
.tag-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}
.tag-glass:hover {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3), 0 12px 40px rgba(198, 162, 101, 0.4);
  transform: translateY(-2px);
}
"""

css_content = css_content.replace(""".tag-glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
}""", enhanced_tag_glass)


# Enhance hero-floating-card
enhanced_floating_card = """
.hero-floating-card {
  position: absolute;
  left: 60px;
  bottom: 120px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  padding: 16px;
  border-radius: 20px;
  width: 280px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.05), 0 20px 40px rgba(0,0,0,0.4);
  pointer-events: auto;
  transition: all 0.4s ease;
  transform-style: preserve-3d;
}
.hero-floating-card:hover {
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.1), 0 30px 60px rgba(198, 162, 101, 0.2);
}
"""

css_content = css_content.replace(""".hero-floating-card {
  position: absolute;
  left: 60px;
  bottom: 120px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 16px;
  border-radius: 16px;
  width: 280px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  pointer-events: auto;
}""", enhanced_floating_card)

spatial_ui_additions = """
/* Liquid Buttons */
.btn {
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  transform: translateZ(0);
}
.btn::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent);
  transform: translateX(-100%);
  transition: all 0.6s ease;
}
.btn:hover::after {
  transform: translateX(100%);
}
.btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 20px rgba(198, 162, 101, 0.3);
}

/* Spatial UI Utility Classes */
.spatial-container {
  perspective: 1000px;
}
.spatial-element {
  transform-style: preserve-3d;
  transition: transform 0.1s;
}
"""

with open(css_path, "w", encoding="utf-8") as f:
    f.write(css_content + spatial_ui_additions)

print("Spatial UI CSS applied successfully.")
