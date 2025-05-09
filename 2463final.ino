//megan white
//final project

const int buttonPin = 2; //the input button
const int led1 = 3; //small streak
const int led2 = 4; // medium streak
const int led3 = 5; //large streak
const int buzzer = 6; //buzzer output

int buttonState = 0;
int lastButtonState = 0;
unsigned long lastDebounceTime = 0;
const unsigned long debounceDelay = 50;

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(buzzer, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int reading = digitalRead(buttonPin);

  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  }

  if ((millis()- lastDebounceTime) > debounceDelay) {
    if (reading != buttonState) {
      buttonState = reading;

      if (buttonState == LOW) {
        Serial.println("HIT");
      }
    }
  }
  lastButtonState = reading;

  if (Serial.available()) {
    char command = Serial.read();

    if (command == '1') {
      digitalWrite(led1, HIGH);
      digitalWrite(led2, LOW);
      digitalWrite(led3, LOW);
    } else if (command == '2') {
      digitalWrite(led1, HIGH);
      digitalWrite(led2, HIGH);
      digitalWrite(led3, LOW);
    } else if (command == '3') {
      digitalWrite(led1, HIGH);
      digitalWrite(led2, HIGH);
      digitalWrite(led3, HIGH);
    } else if (command == '0') {
      digitalWrite(led1, LOW);
      digitalWrite(led2, LOW);
      digitalWrite(led3, LOW);
    } else if (command == 'B') {
      tone(buzzer, 1000, 300);
    }
  }
}