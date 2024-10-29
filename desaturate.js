const fs = require('fs');
const tinycolor = require('tinycolor2');

// Read the theme file
fs.readFile('theme.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Parse the theme file
  const theme = JSON.parse(data);

  // Desaturate colors
  desaturateColors(theme);

  // Write the updated theme to the file
  fs.writeFile('theme.json', JSON.stringify(theme, null, 2), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Theme updated successfully');
    }
  });
});

// Function to desaturate colors
function desaturateColors(obj) {
  // Loop through all properties in the object
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      // Recursively desaturate colors in nested objects
      desaturateColors(obj[key]);
    } else if (Array.isArray(obj[key])) {
      // Loop through array elements
      obj[key].forEach((element) => {
        desaturateColors(element);
      });
    } else if (typeof obj[key] === 'string' && obj[key].startsWith('#')) {
      // Desaturate color
      const color = tinycolor(obj[key]);
      const desaturatedColor = color.desaturate(1).toHexString();
      obj[key] = desaturatedColor;
    }
  }
}
