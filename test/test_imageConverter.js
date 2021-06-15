const Config = require('../config.json');
const fs = require('fs');
const path = require('path');
console.log('--- Checking Image Converter Test ---')
console.log('Loading Image from Test Folder.')
fs.readFile(path.join(__dirname, 'microsoftLogo.png'), async function(err, data) {
  if (err || !data) {
    if (err) 
      console.log('Error:', err)
    else if (!data) 
      console.log('Error: No Data from file!')
    return console.log('--- Image Converter Test Failed ---')
  }
  console.log('Loaded Image from fs:', data);
  var imageConverter = await require('../src/modules/imageConverter')(data); // Image Converter
  console.log('Image Fully Loaded To Image Converter:', imageConverter.source);
  // console.log(imageConverter)
  let testImageName = `test_image_${Date.now()}.png`;
  console.log('Saving Test Image, as:', testImageName);
  await imageConverter.save(path.join(__dirname, 'savedTestImages', testImageName));
  console.log(`Width & Height Of Image: ${imageConverter.width()}x${imageConverter.height()}`);
  console.log('Pixels w/o Transparent Filter:', (imageConverter.pixels().length || 0).toLocaleString("en-US"), 'pixels');
  console.log('Pixels w/ Transparent Filter:', (imageConverter.pixels(true).length || 0).toLocaleString("en-US"), 'pixels');

  pixels = imageConverter.pixels(true);
  console.log(pixels[0], pixels[350])
})

// (async () => {
// })()


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}