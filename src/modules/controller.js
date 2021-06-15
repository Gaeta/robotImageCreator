var Gpio = require('pigpio').Gpio;
let Config = require('../../config.json');
// var stepperWiring = require("stepper-wiringpi");

var controller = async () => {


  var internal = {};

  var gmOut = {mode: Gpio.OUTPUT} //  Mode

  internal.penServo = new Gpio(Config.pen.pin, gmOut) // Pen Servo

  // internal.stepperWiring = stepperWiring; // To allow for Variable Defines

  // internal.leftMotor = stepperWiring.setupDigital(Config.motor.steps, Config.leftMotor.step, Config.leftMotor.dir); // Left Motor

  // internal.rightMotor = stepperWiring.setupDigital(Config.motor.steps, Config.rightMotor.step, Config.rightMotor.dir); // Right Motor

  // The Step Movement Functions

  internal._step = function (motorSelect = 'left', count, direction = 'forward', speed = Config.motor.speed, minTimePerStep = Config.minTimePerStep) {
    return new Promise (async (resolve, reject) => {
      const motor = internal[`${motorSelect}Motor`]; // Finds motor were using
      if (!motor) throw new Error('Unknown motor');
      motor.dir.digitalWrite(direction === 'forward' ? 0 : 1);
      
      for(let steps = 0;steps < count; steps++) {
        motor.step.trigger(100,1);
        await new Promise((resolveStep, reject1) => {
          let perStep = minTimePerStep/speed;
          setTimeout(resolveStep,perStep)
        })
      }
      resolve();
    })
  }

  internal.leftMotor = {
    step: new Gpio(Config.leftMotor.step, gmOut),
    dir: new Gpio(Config.leftMotor.dir, gmOut),
    ms: [
      new Gpio(Config.leftMotor.m0, gmOut), // M0
      new Gpio(Config.leftMotor.m1, gmOut), // M1
      new Gpio(Config.leftMotor.m2, gmOut) // M2
    ],
    real: {
      in: function (steps, speed, minTimePerStep) {
        return internal._step('left', steps, 'forward', speed, minTimePerStep) // Moves the step forward
      },
      out: function (steps, speed, minTimePerStep) {
        return internal._step('left', steps, 'reverse', speed, minTimePerStep) // Moves the step backwords
      }
    }
  }

  internal.rightMotor = {
    step: new Gpio(Config.rightMotor.step, gmOut),
    dir: new Gpio(Config.rightMotor.dir, gmOut),
    ms: [
      new Gpio(Config.rightMotor.m0, gmOut), // M0
      new Gpio(Config.rightMotor.m1, gmOut), // M1
      new Gpio(Config.rightMotor.m2, gmOut) // M2
    ],
    real: {
      in: function (steps, speed, minTimePerStep) {
        return internal._step('right', steps, 'forward', speed, minTimePerStep) // Moves the step forward
      },
      out: function (steps, speed, minTimePerStep) {
        return internal._step('right', steps, 'reverse', speed, minTimePerStep) // Moves the step backwords
      }
    }
  }

  /*
    For different step sizes
    false = 0
    true = 1
    Full: (DEFAULT)
      false
      false
      false
    Half:
      true
      false
      false
    Quarter:
      false
      true
      false
    Eighth:
      true
      true
      false
    Sixteenth:
      true
      true
      true
  */

  switch (Config.motor.stepSize.toUpperCase()) {
    case 'FULL':
      internal.stepSize = [0,0,0];
      break;
    case 'HALF':
      internal.stepSize = [1,0,0];
      break;
    case 'QUARTER':
      internal.stepSize = [0,1,0];
      break;
    case 'EIGHTH':
      internal.stepSize = [1,1,0];
      break;
    case 'SIXTEENTH':
      internal.stepSize = [1,1,1];
      break;
    default:
      internal.stepSize = [0,0,0];
      break;
  }

  await new Promise(async (resolve, reject) => {      
    for (i=0; i < internal.leftMotor.ms.length; i++) {
      const motor = internal.leftMotor.ms[i];
      const step = internal.stepSize[i];
      motor.digitalWrite(step);
    }
    return resolve()
  });

  await new Promise(async (resolve, reject) => {      
    for (i=0; i < internal.rightMotor.ms.length; i++) {
      const motor = internal.rightMotor.ms[i];
      const step = internal.stepSize[i];
      motor.digitalWrite(step);
    }
    return resolve()
  })


  // internal.dirPins = [ //  [0] = Left, [1] = Right
  //   new Gpio(Config.leftMotor.dir, gmOut), //  Left Dir
  //   new Gpio(Config.rightMotor.dir, gmOut) //  Right Dir
  // ]

  // internal.stepPins = [ // [0] = Left, [1] = Right
  //   new Gpio(Config.leftMotor.step, gmOut), //  Left Dir
  //   new Gpio(Config.rightMotor.step, gmOut) //  Right Dir
  // ]

  // internal.leftMotorMs = [
  //   new Gpio(Config.leftMotor.m0, gmOut), // M0
  //   new Gpio(Config.leftMotor.m1, gmOut), // M1
  //   new Gpio(Config.leftMotor.m2, gmOut) // M2
  // ]

  // internal.rightMotorMs = [
  //   new Gpio(Config.rightMotor.m0, gmOut), // M0
  //   new Gpio(Config.rightMotor.m1, gmOut), // M1
  //   new Gpio(Config.rightMotor.m2, gmOut) // M2
  // ]

  // internal.leftMotorMs[0].digitalWrite(1);
  // internal.leftMotorMs[1].digitalWrite(1);
  // internal.leftMotorMs[2].digitalWrite(0);


  // internal.rightMotorMs[0].digitalWrite(1)
  // internal.rightMotorMs[1].digitalWrite(1);
  // internal.rightMotorMs[2].digitalWrite(0);

  internal.pen = (direction = 0) => {
    // 0 = closed, 1 = open
    if (direction) internal.penServo.servoWrite(Config.pen.openVal);
    else internal.penServo.servoWrite(Config.pen.closeVal);
    return true;
  }

  // This removes all functions etc that have _ in it so people can't use it and break stuff.
  return Object.keys(internal).filter(keys => !keys.startsWith('_')).reduce((obj, key) => {obj[key] = internal[key];return obj;}, {});
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