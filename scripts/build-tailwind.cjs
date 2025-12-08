const fs = require('fs');
const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

(async () => {
  try {
    const input = fs.readFileSync('src/index.css', 'utf8');
    const result = await postcss([tailwind, autoprefixer]).process(input, { from: 'src/index.css' });
    fs.writeFileSync('temp-tailwind-output.css', result.css, 'utf8');
    console.log('Wrote temp-tailwind-output.css');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
