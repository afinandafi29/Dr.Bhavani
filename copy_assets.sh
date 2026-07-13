#!/bin/bash

echo "Copying generated professional realistic dental slide images to Dr.Bhavani-main assets folder..."

# Define paths
BRAIN_DIR="/Users/afi/.gemini/antigravity-ide/brain/f4e00063-a168-492e-aec5-c296dbaec316"
ASSETS_DIR="/Users/afi/Downloads/Dr.Bhavani-main/public/assets/images"

# Copy files
cp "$BRAIN_DIR/slide_smiling_family_1783928445901.png" "$ASSETS_DIR/slide_smiling_family.png" 2>/dev/null
cp "$BRAIN_DIR/slide_dentist_treating_1783928482955.png" "$ASSETS_DIR/slide_dentist_treating.png" 2>/dev/null
cp "$BRAIN_DIR/slide_modern_clinic_1783928515195.png" "$ASSETS_DIR/slide_modern_clinic.png" 2>/dev/null

echo "All images copied successfully!"
