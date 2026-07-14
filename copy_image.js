const fs = require('fs');

const files = [
  {
    src: "/Users/afi/.gemini/antigravity-ide/brain/347e6856-2534-404d-973a-ea0e9a8f6bb8/dental_lab_1_1783951237953.png",
    dest: "./dental_lab_1.png"
  },
  {
    src: "/Users/afi/.gemini/antigravity-ide/brain/347e6856-2534-404d-973a-ea0e9a8f6bb8/dental_lab_2_1783951258455.png",
    dest: "./dental_lab_2.png"
  },
  {
    src: "/Users/afi/.gemini/antigravity-ide/brain/347e6856-2534-404d-973a-ea0e9a8f6bb8/dental_lab_3_1783951280068.png",
    dest: "./dental_lab_3.png"
  }
];

files.forEach(file => {
  try {
    const data = fs.readFileSync(file.src);
    fs.writeFileSync(file.dest, data);
    console.log(`Successfully copied ${file.dest}`);
  } catch (err) {
    console.error(`Failed to copy ${file.dest}:`, err.message);
  }
});
