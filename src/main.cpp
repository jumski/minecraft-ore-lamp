#include <Arduino.h>
#include <FastLED.h>

#define NUM_LEDS 11
#define LED_TYPE WS2812B
#define DATA_PIN 6
#define FADE_AMOUNT 10

int minBrightness = 100;
int brightness = minBrightness;
int fadeAmount = 2;

CRGB leds[NUM_LEDS];

void setup() {
  Serial.begin(9600);

  FastLED.addLeds<LED_TYPE, DATA_PIN, GRB>(leds, NUM_LEDS);
  FastLED.setMaxPowerInVoltsAndMilliamps(5, 500);
  FastLED.clear();
  FastLED.show();
}

void loop() {
  for (size_t i = 0; i < NUM_LEDS; i++)
  {
    // leds[i] = CRGB::LawnGreen;
    leds[i] = CRGB::Teal;
    leds[i].fadeLightBy(brightness);
  }
  FastLED.show();

  if (brightness + fadeAmount <= minBrightness || brightness + fadeAmount >= 255) {
    fadeAmount = -fadeAmount;
  }
  brightness = brightness + fadeAmount;

  delay(50);

  Serial.println(brightness);
}