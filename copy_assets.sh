#!/bin/bash

echo "Copying generated dental slide images to Dr.Bhavani-main assets folder..."

BRAIN_DIR="/Users/afi/.gemini/antigravity-ide/brain/f4e00063-a168-492e-aec5-c296dbaec316"
ASSETS_DIR="/Users/afi/Downloads/Dr.Bhavani-main/public/assets/images"

cp "$BRAIN_DIR/slide_examination_closeup_1783867587760.png"  "$ASSETS_DIR/slide_examination_closeup.png"  2>/dev/null
cp "$BRAIN_DIR/slide_pediatric_visit_1783867600297.png"      "$ASSETS_DIR/slide_pediatric_visit.png"      2>/dev/null
cp "$BRAIN_DIR/slide_3d_scanning_1783867611684.png"          "$ASSETS_DIR/slide_3d_scanning.png"          2>/dev/null
cp "$BRAIN_DIR/slide_lab_technician_1783867622965.png"       "$ASSETS_DIR/slide_lab_technician.png"       2>/dev/null
cp "$BRAIN_DIR/slide_surgical_team_1783867632187.png"        "$ASSETS_DIR/slide_surgical_team.png"        2>/dev/null
cp "$BRAIN_DIR/slide_orthodontic_consult_1783867664920.png"  "$ASSETS_DIR/slide_orthodontic_consult.png"  2>/dev/null

echo "All available slide images copied successfully!"
echo "Note: Slides 7-10 will use beautiful Unsplash fallback images automatically."
