# Minecraft Ore Lamp

3D printed LED lamp that looks like a minecraft ore block.
Done for my son.

## `/firmware`

This contains cpp code build by PlatformIO for Arduino Nano that runs
WS2812B RGB LED strip inside.

It listens on serial port for lines in format of `red,green,blue` (eg. `255,128,0`),
parses them and changes color to the supplied values.

Outputs current color via serial in the same format.

## `/webapp`

Simple React app that uses Webserial to read and write new colors to the lamp.
