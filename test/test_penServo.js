const Config = require('../config.json');
var controller = require('../src/modules/controller')(); // Our Controllers
(async () => {
  console.log('--- Checking Pen Servo Test ---')
  await sleep(5000);
  controller.penServo.servoWrite(Config.pen.openVal) // Open Servo
  console.log('Force Opening Servo, Check Result:', controller.penServo.getServoPulseWidth() === Config.pen.openVal) // Check Result
  await sleep(5000);
  controller.penServo.servoWrite(Config.pen.closeVal) // Close Servo
  console.log('Force Closing Servo, Check Result:', controller.penServo.getServoPulseWidth() === Config.pen.closeVal) // Check Result
})()


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}