const fs = require('fs');

const src = "/Users/afi/.gemini/antigravity-ide/brain/f4e00063-a168-492e-aec5-c296dbaec316/indian_dentist_patient_1783859454143.png";
const dest = "/Users/afi/Downloads/Dr.Bhavani-main/public/assets/images/indian_dentist_patient.png";

try {
  const data = fs.readFileSync(src);
  fs.writeFileSync(dest, data);
  console.log("Successfully copied image using read/write sync!");
} catch (err) {
  console.error("Failed to copy image:", err.message);
}
