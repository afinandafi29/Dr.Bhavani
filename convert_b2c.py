import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file_name in html_files:
    with open(file_name, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    # Replace titles
    if 'Premium Restorations Partner' in content:
        content = content.replace('Premium Restorations Partner', 'Premium Dental Care')
        modified = True
        
    if 'Dental Lab' in content:
        # Avoid replacing in some specific URLs if there were any, but it's safe for text.
        content = content.replace('Dental Lab', 'Dental Care')
        content = content.replace('dental lab', 'dental clinic')
        content = content.replace('Dental lab', 'Dental clinic')
        modified = True

    # Remove Partners link in nav
    if '<li><a href="franchise.html" class="nav-link">Partners</a></li>' in content:
        content = content.replace('<li><a href="franchise.html" class="nav-link">Partners</a></li>', '')
        modified = True
        
    # Replace "Partner With Us" button in Hero
    if 'Partner With Us' in content:
        content = content.replace('Partner With Us', 'Book Now')
        modified = True
        
    # Replace "partner experience for dental clinics"
    if 'partner experience for dental clinics' in content:
        content = content.replace('partner experience for dental clinics', 'dental care experience for our patients')
        modified = True

    # Testimonial fix (since we changed the testimonial earlier)
    if 'A truly reliable lab partner.' in content:
        content = content.replace('A truly reliable lab partner. The digital workflow integration and fast turnaround times have significantly improved my clinic\'s efficiency.', 'A truly reliable dental clinic. The modern equipment and painless treatments have significantly improved my smile and confidence.')
        content = content.replace('Chief Dental Surgeon', 'Happy Patient')
        content = content.replace('Dr. Sneha Patel', 'Sneha Patel')
        
        content = content.replace('The level of precision and attention to detail at Dr B\'s Oro-Hold Dental Care is exceptional. My patients couldn\'t be happier with their restorations!', 'The level of precision and attention to detail at Dr B\'s Oro-Hold Dental Care is exceptional. I couldn\'t be happier with my new smile!')
        content = content.replace('Prosthodontist', 'Happy Patient')
        content = content.replace('Dr. Rajesh Kumar', 'Rajesh Kumar')
        
        content = content.replace('From the moment we started sending cases here, we knew we were in good hands. The aesthetic results of their Zirconia crowns consistently exceed expectations!', 'From the moment I walked in, I knew I was in good hands. The aesthetic results of my Zirconia crowns consistently exceed expectations!')
        content = content.replace('Cosmetic Dentist', 'Happy Patient')
        content = content.replace('Dr. Amit Sharma', 'Amit Sharma')
        modified = True

    if modified:
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_name}")
