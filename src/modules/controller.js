var Gpio = require('pigpio').Gpio;
let Config = require('../../config.json');

var controller = () => {


  var internal = {}

  var gmOut = {mode: Gpio.OUTPUT} //  Mode

  internal.penServo = new Gpio(Config.pen.pin, gmOut) // Pen Servo

  var dirPins = [ //  [0] = Left, [1] = Right
    new Gpio(Config.leftMotor.dir, gmOut), //  Left Dir
    new Gpio(Config.rightMotor.dir, gmOut) //  Right Dir
  ]

  var stepPins = [ // [0] = Left, [1] = Right
    new Gpio(Config.leftMotor.step, gmOut), //  Left Dir
    new Gpio(Config.rightMotor.step, gmOut) //  Right Dir
  ]

  var leftMotorMs = [
    new Gpio(Config.leftMotor.m0, gmOut), // M0
    new Gpio(Config.leftMotor.m1, gmOut), // M1
    new Gpio(Config.leftMotor.m2, gmOut) // M2
  ]

  var rightMotorMs = [
    new Gpio(Config.rightMotor.m0, gmOut), // M0
    new Gpio(Config.rightMotor.m1, gmOut), // M1
    new Gpio(Config.rightMotor.m2, gmOut) // M2
  ]

  leftMotorMs[0].digitalWrite(1);
  leftMotorMs[1].digitalWrite(1);
  leftMotorMs[2].digitalWrite(0);


  rightMotorMs[0].digitalWrite(1)
  rightMotorMs[1].digitalWrite(1);
  rightMotorMs[2].digitalWrite(0);

  internal.pen = (direction = 0) => {
    // 0 = closed, 1 = open
    if (direction) internal.penServo.servoWrite(Config.pen.openVal);
    else internal.penServo.servoWrite(Config.pen.closeVal);
    return true;
  }

  return internal;
}

module.exports = controller

// let pulseWidth = 1000;
// let increment = 100;

// setInterval(() => {
//   stepPins[0].servoWrite(pulseWidth);
//   stepPins[1].servoWrite(pulseWidth);

//   pulseWidth += increment;
//   if (pulseWidth >= 2000) {
//     increment = -100;
//   } else if (pulseWidth <= 1000) {
//     increment = 100;
//   }
// }, 500);