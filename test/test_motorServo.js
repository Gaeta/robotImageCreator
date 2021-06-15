const Config = require('../config.json');


(async () => {
  console.log('--- Checking Motor Servo Test ---')
  var controller = await require('../src/modules/controller')(); // Our Controllers
  console.log('Controller Loaded');
  controller.leftMotor.real.in(100)
})();

// let pulseWidth = 1000;
// let increment = 100;

// setInterval(() => {

//   console.log(controller.leftMotor.dir.servoWrite(2500))

//   controller.leftMotor.step.servoWrite(pulseWidth);
//   controller.rightMotor.step.servoWrite(pulseWidth);

//   pulseWidth += increment;
//   if (pulseWidth >= 2000) {
//     increment = -100;
//   } else if (pulseWidth <= 1000) {
//     increment = 100;
//   }
// }, 500);