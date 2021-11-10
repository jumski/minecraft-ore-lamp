#include <Arduino.h>
#include <FastLED.h>
#include <EEPROM.h>

#define NUM_LEDS 11
#define LED_TYPE WS2812B
#define DATA_PIN 6
#define INPUT_SIZE 11

char input[INPUT_SIZE + 1];

uint8_t redAddress = 0;
uint8_t greenAddress = 1;
uint8_t blueAddress = 2;

uint8_t red = 0;
uint8_t green = 0;
uint8_t blue = 0;

uint8_t minFade = 0;
uint8_t maxFade = 180;
uint8_t currentFade = maxFade;
int8_t fadeStep = 3;

CRGB leds[NUM_LEDS];
CRGB selectedColor;

// nice colors: CRGB::LawnGreen, CRGB::Teal
// CRGB colorRedstone = CRGB(255, 0, 0);
// CRGB colorEmerald = CRGB(0, 255, 0);
// CRGB colorLapisLazuli = CRGB(0, 0, 255);
// CRGB colorGold = CRGB(255, 100, 0);
// CRGB colorDiamond = CRGB(100, 245, 228);

void setup() {
  Serial.begin(9600);

  FastLED.addLeds<LED_TYPE, DATA_PIN, GRB>(leds, NUM_LEDS);
  FastLED.setMaxPowerInVoltsAndMilliamps(5, 500);
  FastLED.clear();
  FastLED.show();

  EEPROM.get(redAddress, red);
  EEPROM.get(greenAddress, green);
  EEPROM.get(blueAddress, blue);
}


void loop() {
  // read colors
  while(Serial.available()) {
    delay(5);
    String inputRed = Serial.readStringUntil(',');
    String inputGreen = Serial.readStringUntil(',');
    String inputBlue = Serial.readStringUntil('\n');
    red = inputRed.toInt();
    green = inputGreen.toInt();
    blue = inputBlue.toInt();

    EEPROM.update(redAddress, red);
    EEPROM.update(greenAddress, green);
    EEPROM.update(blueAddress, blue);
  }
  selectedColor = CRGB(red, green, blue);

  // calculate fade
  if (currentFade + fadeStep <= minFade || currentFade + fadeStep >= maxFade) {
    fadeStep = -fadeStep;
  }
  currentFade = currentFade + fadeStep;

  // set colors and fade on LEDs
  for (size_t i = 0; i < NUM_LEDS; i++)
  {
    leds[i] = selectedColor;
    leds[i].fadeLightBy(currentFade);
  }
  FastLED.show();

  // output values
  Serial.print(red); Serial.print(',');
  Serial.print(green); Serial.print(',');
  Serial.println(blue);

  delay(15);
}
