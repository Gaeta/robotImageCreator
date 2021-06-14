let Config = require('../../config.json');
const ImageParser = require("image-parser");
const sharp = require('sharp');

var imageConverter = async (image /* Requires to be a buffer */) => {
  await new Promise(async (resolve, reject) => {
    await sharp(image).greyscale().toBuffer().then(async data => { // Changes images to grayscale
      image = new ImageParser(data);
      await image.parse(async err => {
        if (err) { return console.error(err); }
        await image.resize(Config.paperSize.height, Config.paperSize.width, (err, data) => { //Width & Height are fliped to fit on paper correctly :D
          if (err) { return console.error(err); }
          image = data
          return resolve(image);
        })
      });
    }).catch( err => { console.error(err) });
  })

  image.pixels = function (filterTransparentPixels = false) {
    if (!image.img) throw new Err("Parse the image first by using the parse method.", "IMAGE_NOT_PARSED");
    let pixels = [];

    let size = {
      height: image.height(), 
      width: image.width()
    };

    for (let y = 0; y < size.height; ++y) {
      for (let x = 0; x < size.width; ++x) {
        pixels.push({rgba: image.getPixel(x, y), cords: {x: x, y: y}});
      }
    }

    if (filterTransparentPixels) return pixels.filter(g => g.rgba.a > 0)
    else return pixels;
  }

  return image
}

module.exports = imageConverter