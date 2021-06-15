const controller = require('./modules/controller')(); // Our Controller

const Config = require('../config.json');
const fs = require('fs');
const path = require('path');
let finishedPixels = 0;
console.log('--- Starting Program ---')
console.log('Please make sure your chain legths are correct.')
fs.readFile(path.join(__dirname, `../${Config.image.folder}`, Config.image.file), async function(err, data) {
  if (err || !data) {
    if (err) 
      console.log('Error:', err)
    else if (!data) 
      console.log('Error: No Data from file!')
    return console.log('--- Image Converter Test Failed ---')
  }
  
  var controller = await require('../src/modules/controller')(); // Our Controllers
  console.log('Controller Loaded');
  var imageConverter = await require('../src/modules/imageConverter')(data); // Image Converter
  console.log('Image Loaded:', imageConverter.source);
  console.log('Loading Pixel.')
  let pixels = imageConverter.pixels(true);
  console.log('Loaded Pixel w/ count of:', pixels.length);
  
  let leftChain = Config.chains.left;
  let rightChain = Config.chains.right; 
  for (i = 0; i < pixels.length; i++) {
    const pixel = pixels[i];
    finishedPixels++;
    await controller.penServo.servoWrite(Config.pen.closeVal);
    await sleep(Config.delay * 1000);
    if (pixel.left.radius > leftChain) {
      await controller.leftMotor.real.in(pixel.left.radius - leftChain)
      leftChain = pixel.left.radius
    } else {
      await controller.leftMotor.real.out(leftChain - pixel.left.radius)
      leftChain = pixel.left.radius
    }

    if (pixel.right.radius > rightChain) {
      await controller.leftMotor.real.out(pixel.right.radius - rightChain)
      rightChain = pixel.right.radius
    } else {
      await controller.leftMotor.real.in(rightChain - pixel.right.radius)
      rightChain = pixel.right.radius
    }
    await controller.penServo.servoWrite(Config.pen.openVal);
    await sleep(Config.delay * 1000);
    console.log(`Pixel ${i} finished! ${finishedPixels}/${pixels.length} more.`)
  }
})

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}