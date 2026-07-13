import glob

html_files = glob.glob('/Users/afi/Downloads/Dr.Bhavani-main/*.html')

new_links = """          <li><a href="privacy.html">Privacy Policy</a></li>
          <li><a href="terms.html">Terms & Conditions</a></li>
"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # insert new_links right before </ul> in the footer-links
    # Find <div class="footer-links">
    idx1 = content.find('<div class="footer-links">')
    if idx1 != -1:
        # Check if already added to Quick Links
        ul_content = content[idx1:content.find('</ul>', idx1)]
        if 'href="privacy.html"' not in ul_content:
            idx2 = content.find('</ul>', idx1)
            if idx2 != -1:
                new_content = content[:idx2] + new_links + content[idx2:]
                with open(file, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated footer in {file}")
