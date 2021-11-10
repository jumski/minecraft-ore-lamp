#include <Arduino.h>
#include <FastLED.h>

#define NUM_LEDS 11
#define LED_TYPE WS2812B
#define DATA_PIN 6
#define FADE_AMOUNT 10

uint8_t minFade = 0;
uint8_t maxFade = 180;
uint8_t currentFade = maxFade;
int8_t fadeStep = 1;

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
    leds[i].fadeLightBy(currentFade);
  }
  FastLED.show();

  if (currentFade + fadeStep <= minFade || currentFade + fadeStep >= maxFade) {
    fadeStep = -fadeStep;
  }
  currentFade = currentFade + fadeStep;

  delay(15);

  String stringAry[5] = {"A", "B", "C", "D", "E"};
  long randomNumber = random(5);
  String selectedString = stringAry[randomNumber];

  Serial.println(currentFade);
}