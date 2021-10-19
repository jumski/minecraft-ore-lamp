#include <Arduino.h>
#include <FastLED.h>

#define NUM_LEDS 3
#define LED_TYPE WS2812B
#define DATA_PIN 6

CRGB leds[NUM_LEDS];

void setup() {
  Serial.begin(9600);

  FastLED.addLeds<LED_TYPE, DATA_PIN, GRB>(leds, NUM_LEDS);
  FastLED.setMaxPowerInVoltsAndMilliamps(5, 500);
  FastLED.clear();
  FastLED.show();
}

void loop() {
  leds[0] = CRGB(255, 0, 0);
  leds[1] = CRGB(0, 255, 0);
  leds[2] = CRGB(0, 0, 255);
  FastLED.show();
  
  Serial.print("DATA_PIN = "); Serial.println(DATA_PIN);
}