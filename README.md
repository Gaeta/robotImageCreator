# Raspberry Pi Image Creator (NodeJS)

Create images with your robot!

## Installation
Run the following commands.

```bash
sudo apt-get update
sudo apt-get install pigpio
npm install --allow-root
```
## Parts Required

## Wiring 

## 3D Prints


## Usage

n/a atm

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Check List
 - [ ] Finish Required Parts and Wiring Diagrams on README.MD
 - [ ] Fully Document Each Line Of Code
 - [X] Pen Motor
   - [X] Opens
   - [ ] Closes
 - [X] Motor
   - [ ] Left Works
   - [ ] Right Works
   - [X] Can controll how much step size can move
   - [ ] Left & Right Move together
     - [ ] On unxpected process stop or shutdown remeber last x and y value
     - [ ] Can go to 0,0 on startup (aka top left of paper)
     - [ ] Can move to given point
 - [X] Image Converter
   - [X] Reads File
   - [X] Changes to Grayscale
   - [X] Changes width & height to fit paper
   - [X] Get Pixels
     - [X] Remove Transparent Pixels
   - [ ] File Formats
     - [x] PNG
     - [ ] JPEG
     - [ ] SVG
     - [ ]  JIF