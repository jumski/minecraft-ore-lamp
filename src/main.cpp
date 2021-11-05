#include <Arduino.h>
#include <FastLED.h>

#define NUM_LEDS 11
#define LED_TYPE WS2812B
#define DATA_PIN 6
#define FADE_AMOUNT 10

uint8_t minBrightness = 0;
uint8_t maxBrightness = 255;
uint8_t brightness = maxBrightness;
uint8_t fadeAmount = 1;

CRGB leds[NUM_LEDS];
CRGB selectedColor;

// nice colors: CRGB::LawnGreen, CRGB::Teal
CRGB colorRedstone = CRGB(255, 0, 0);
CRGB colorEmerald = CRGB(0, 255, 0);
CRGB colorLapisLazuli = CRGB(0, 0, 255);
CRGB colorGold = CRGB(255, 100, 0);
CRGB colorDiamond = CRGB(100, 245, 228);
CRGB availableColors[5] = { colorRedstone, colorEmerald, colorLapisLazuli, colorGold, colorDiamond };

void setup() {
  Serial.begin(9600);
  // selectedColor = colorRedstone;
  // selectedColor = CHSV(random8(), 255, 255);
  selectedColor = availableColors[random(5)];

  FastLED.addLeds<LED_TYPE, DATA_PIN, GRB>(leds, NUM_LEDS);
  FastLED.setMaxPowerInVoltsAndMilliamps(5, 500);
  FastLED.clear();
  FastLED.show();
}


void loop() {
  for (size_t i = 0; i < NUM_LEDS; i++)
  {
    leds[i] = selectedColor;
    leds[i].fadeLightBy(255 - brightness);
  }
  FastLED.show();

  if (brightness + fadeAmount <= minBrightness || brightness + fadeAmount >= maxBrightness) {
    fadeAmount = -fadeAmount;
  }
  brightness = brightness + fadeAmount;

  delay(5);

  String stringAry[5] = {"A", "B", "C", "D", "E"};
  long randomNumber = random(5);
  String selectedString = stringAry[randomNumber];

  Serial.println(selectedColor);
  // Serial.print(randomNumber); Serial.print(" "); Serial.println(selectedString);
  // Serial.print("long = "); Serial.print(randomNumber); Serial.print(", casted = "); Serial.println((uint8_t) randomNumber);
}