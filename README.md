# Raspberry Pi Image Creator (NodeJS)

Create images with your robot!

## Installation
Run the following commands.

```bash
sudo apt-get update
sudo apt-get install pigpio
npm install --allow-root
```

## Usage

n/a atm

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Check List
 - [X] Pen Motor
   - [X] Opens
   - [X] Closes
 - [X] Motor
   - [ ] Left Works
   - [ ] Right Works
   - [ ] Left & Right Move together
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