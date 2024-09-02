#include <SPI.h>
#include <RH_RF95.h>

// Define pins for the LoRa module
#define RFM95_CS 10
#define RFM95_RST 9
#define RFM95_INT 2

// Frequency for LoRa module (e.g., 915 MHz in North America)
#define RF95_FREQ 915.0

// Create instance of the LoRa driver
RH_RF95 rf95(RFM95_CS, RFM95_INT);

void setup() {
  // Initialize the pins
  pinMode(RFM95_RST, OUTPUT);
  digitalWrite(RFM95_RST, HIGH);

  // Start the serial communication
  Serial.begin(9600);
  while (!Serial);

  // Manual reset for the LoRa module
  Serial.println("LoRa Transmitter");
  digitalWrite(RFM95_RST, LOW);
  delay(10);
  digitalWrite(RFM95_RST, HIGH);
  delay(10);

  // Initialize the LoRa module
  if (!rf95.init()) {
    Serial.println("LoRa init failed");
    while (1);
  }
  Serial.println("LoRa init succeeded");

  // Set the frequency for the LoRa module
  if (!rf95.setFrequency(RF95_FREQ)) {
    Serial.println("Set frequency failed");
    while (1);
  }
  Serial.print("Set frequency to ");
  Serial.println(RF95_FREQ);

  // Set the transmission power (optional)
  rf95.setTxPower(23, false);
}

void loop() {
  Serial.println("Sending message...");

  // The message to be sent
  const char *msg = "Hello from LoRa!";

  // Send the message
  rf95.send((uint8_t *)msg, strlen(msg));

  // Wait for the message to be sent
  rf95.waitPacketSent();
  Serial.println("Message sent!");

  // Wait for a while before sending the next message
  delay(2000);
}