import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# We'll use a regex to capture the entire global-ai-popup div and replace it.
popup_regex = re.compile(r'<!-- Global AI Popup -->\s*<div class="global-ai-popup" id="globalAiPopup">.*?</div>\s*</div>', re.DOTALL)

# But wait, in the previous view_file, the div closes where?
# Let's just find the starting and ending tags manually or with a more robust regex
# It ends with:
#             </div>
#           </div>
#   </div>
# Let's write a script that replaces the specific parts directly to be safer.

for file_name in html_files:
    with open(file_name, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    # 1. Change avatar OH to logo
    if '<div class="ai-avatar">OH</div>' in content:
        content = content.replace('<div class="ai-avatar">OH</div>', '<div class="ai-avatar" style="background: transparent;"><img src="dr logo.png" alt="Logo" style="width: 100%; height: 100%; object-fit: contain;"></div>')
        modified = True

    # 2. Change Dr B's Lab Support to Dr B's AI
    if "Dr B's Lab Support" in content:
        content = content.replace("Dr B's Lab Support", "Dr B's AI")
        modified = True
        
    if "Dr B's Oro-Hold Dental Lab AI Assistant" in content:
        content = content.replace("Dr B's Oro-Hold Dental Lab AI Assistant", "Dr B's AI Assistant")
        modified = True

    # 3. Change SEND button to WhatsApp green
    # old: <button class="btn btn-primary" id="chatSendBtn" style="padding: 10px 20px; font-size:12px; border-radius:20px;">Send</button>
    send_btn_regex = re.compile(r'<button class="btn btn-primary" id="chatSendBtn" style="padding: 10px 20px; font-size:12px; border-radius:20px;">Send</button>')
    if send_btn_regex.search(content):
        content = send_btn_regex.sub(r'<button id="chatSendBtn" style="background-color: #25D366; color: white; padding: 10px 20px; font-size:12px; border-radius:20px; border:none; font-weight:bold; cursor:pointer;">Send</button>', content)
        modified = True
        
    # 4. Remove mic icon
    # <button class="ai-voice-btn" id="voiceBtn" title="Speak to Assistant"></button>
    if '<button class="ai-voice-btn" id="voiceBtn"' in content:
        content = re.sub(r'<button class="ai-voice-btn" id="voiceBtn" title="Speak to Assistant"></button>', '', content)
        modified = True
        
    # 5. Add more prebuilt questions (and remove B2B ones)
    old_chips = r'<div class="whatsapp-suggestion-chips" id="whatsappChips">.*?</div>'
    new_chips = """<div class="whatsapp-suggestion-chips" id="whatsappChips">
              <button class="whatsapp-chip" data-question="What are your opening hours?">Opening Hours</button>
              <button class="whatsapp-chip" data-question="Do you offer invisible aligners?">Invisible Aligners</button>
              <button class="whatsapp-chip" data-question="How much do dental implants cost?">Implant Pricing</button>
              <button class="whatsapp-chip" data-question="I want to book an appointment.">Book Appointment</button>
              <button class="whatsapp-chip" data-question="Do you offer teeth whitening?">Teeth Whitening</button>
              <button class="whatsapp-chip" data-question="Where is the clinic located?">Location</button>
            </div>"""
    content = re.sub(old_chips, new_chips, content, flags=re.DOTALL)
    
    # 6. Add more languages
    old_select = r'<select id="chatLanguage".*?</select>'
    new_select = """<select id="chatLanguage" style="padding:6px 10px; font-size:12px; border-radius:4px; border:1px solid rgba(255,255,255,0.25); background-color:#075e54; color:white; outline:none; cursor:pointer;">
                  <option value="en">English</option>
                  <option value="hi">Hindi (हिंदी)</option>
                  <option value="ta">Tamil (தமிழ்)</option>
                  <option value="kn">Kannada (ಕನ್ನಡ)</option>
                  <option value="te">Telugu (తెలుగు)</option>
                  <option value="ml">Malayalam (മലയാളം)</option>
                  <option value="mr">Marathi (मराठी)</option>
                  <option value="gu">Gujarati (ગુજરાતી)</option>
                </select>"""
    content = re.sub(old_select, new_select, content, flags=re.DOTALL)

    if True: # Always write since we did regex replacements that might not have set modified flag
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated AI popup in {file_name}")

