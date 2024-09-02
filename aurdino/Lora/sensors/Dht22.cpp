#include "DHT.h"
#define DHTPIN 2     // Pin where the DHT22 is connected
#define DHTTYPE DHT22   // DHT 22 (AM2302)

// Initialize DHT sensor for normal 16mhz Arduino
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  Serial.println("DHT22 sensor!");

  dht.begin();
}

void loop() {
  // Wait a few seconds between measurements.
  delay(2000);

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float humidity = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float temperature = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float fahrenheit = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  if (isnan(humidity) || isnan(temperature) || isnan(fahrenheit)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Compute heat index in Fahrenheit (the default)
  float heatIndexF = dht.computeHeatIndex(fahrenheit, humidity);
  // Compute heat index in Celsius (isFahrenheit = false)
  float heatIndexC = dht.computeHeatIndex(temperature, humidity, false);

  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.print(" %\t");
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.print(" *C ");
  Serial.print(fahrenheit);
  Serial.print(" *F\t");
  Serial.print("Heat index: ");
  Serial.print(heatIndexC);
  Serial.print(" *C ");
  Serial.print(heatIndexF);
  Serial.println(" *F");
}