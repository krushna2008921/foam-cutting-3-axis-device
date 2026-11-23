/*
 * ====================================================================
 * PROJECT: DESIGN AND DEVELOPMENT OF A FOAM CUTTING 3-AXIS DEVICE
 * SANJIVANI UNIVERSITY - DEPARTMENT OF MECHANICAL ENGINEERING
 * MAKERSPACE INNOVATION LAB
 *
 * PROJECT GROUP MEMBERS:
 * 1. Krushna Jamdar
 * 2. Samiksha Kale
 * 3. Sanket Gujar
 *
 * FACULTY GUIDANCE:
 * - Dr. Kiran Wakchaure (Director - Projects)
 * - Dr. Prathibha Sinha (Faculty Mentor)
 * - Dr. Vasudeo Singh Singar (Faculty Mentor)
 * - Dr. K. C. Bhosale (Head of Department)
 *
 * CONTROLLER: Arduino Nano (ATmega328P)
 * ACTUATORS: 3x 28BYJ-48 Stepper Motors with ULN2003 Drivers
 * CUTTER: Calibrated Heated Resistance Ni-Chrome Wire (PWM Controlled)
 * ====================================================================
 */

// --- PIN DEFINITIONS ---
// X-Axis Stepper (ULN2003 Driver 1)
const int X_IN1 = 2;
const int X_IN2 = 3;
const int X_IN3 = 4;
const int X_IN4 = 5;

// Y-Axis Stepper (ULN2003 Driver 2)
const int Y_IN1 = 6;
const int Y_IN2 = 7;
const int Y_IN3 = 8;
const int Y_IN4 = 9;

// Z-Axis Stepper (ULN2003 Driver 3)
const int Z_IN1 = 10;
const int Z_IN2 = 11;
const int Z_IN3 = 12;
const int Z_IN4 = 13;

// Hot Wire Thermal Control (MOSFET PWM)
const int WIRE_PWM_PIN = A0;

// Status & Activity LED
const int STATUS_LED = A1;

// 8-Step Half-Stepping Sequence for 28BYJ-48
const int STEP_COUNT = 8;
const int stepLookup[8][4] = {
  {1, 0, 0, 0},
  {1, 1, 0, 0},
  {0, 1, 0, 0},
  {0, 1, 1, 0},
  {0, 0, 1, 0},
  {0, 0, 1, 1},
  {0, 0, 0, 1},
  {1, 0, 0, 1}
};

// Machine State
long currentX = 0;
long currentY = 0;
long currentZ = 0;
int currentStepX = 0;
int currentStepY = 0;
int currentStepZ = 0;

int wireTemperaturePWM = 0; // 0 to 255
int stepDelayMicroseconds = 1200; // Calibrated speed for 28BYJ-48

void setup() {
  Serial.begin(115200);

  // Setup X Axis
  pinMode(X_IN1, OUTPUT);
  pinMode(X_IN2, OUTPUT);
  pinMode(X_IN3, OUTPUT);
  pinMode(X_IN4, OUTPUT);

  // Setup Y Axis
  pinMode(Y_IN1, OUTPUT);
  pinMode(Y_IN2, OUTPUT);
  pinMode(Y_IN3, OUTPUT);
  pinMode(Y_IN4, OUTPUT);

  // Setup Z Axis
  pinMode(Z_IN1, OUTPUT);
  pinMode(Z_IN2, OUTPUT);
  pinMode(Z_IN3, OUTPUT);
  pinMode(Z_IN4, OUTPUT);

  // Setup Wire PWM and Status
  pinMode(WIRE_PWM_PIN, OUTPUT);
  analogWrite(WIRE_PWM_PIN, 0);
  pinMode(STATUS_LED, OUTPUT);
  digitalWrite(STATUS_LED, HIGH);

  Serial.println(F("=================================================="));
  Serial.println(F("SANJIVANI UNIVERSITY - FOAM CUTTING 3-AXIS DEVICE"));
  Serial.println(F("FIRMWARE INITIALIZED - READY FOR G-CODE / COMMANDS"));
  Serial.println(F("=================================================="));
}

void stepMotor(int axis, bool clockwise) {
  int* stepIndex;
  int in1, in2, in3, in4;

  if (axis == 0) { // X-Axis
    stepIndex = &currentStepX;
    in1 = X_IN1; in2 = X_IN2; in3 = X_IN3; in4 = X_IN4;
  } else if (axis == 1) { // Y-Axis
    stepIndex = &currentStepY;
    in1 = Y_IN1; in2 = Y_IN2; in3 = Y_IN3; in4 = Y_IN4;
  } else { // Z-Axis
    stepIndex = &currentStepZ;
    in1 = Z_IN1; in2 = Z_IN2; in3 = Z_IN3; in4 = Z_IN4;
  }

  if (clockwise) {
    (*stepIndex)++;
    if (*stepIndex >= STEP_COUNT) *stepIndex = 0;
  } else {
    (*stepIndex)--;
    if (*stepIndex < 0) *stepIndex = STEP_COUNT - 1;
  }

  digitalWrite(in1, stepLookup[*stepIndex][0]);
  digitalWrite(in2, stepLookup[*stepIndex][1]);
  digitalWrite(in3, stepLookup[*stepIndex][2]);
  digitalWrite(in4, stepLookup[*stepIndex][3]);
}

void setWireHeat(int pwmVal) {
  wireTemperaturePWM = constrain(pwmVal, 0, 255);
  analogWrite(WIRE_PWM_PIN, wireTemperaturePWM);
  Serial.print(F("WIRE HEAT SET: "));
  Serial.print(wireTemperaturePWM);
  Serial.println(F(" / 255"));
}

void loop() {
  if (Serial.available() > 0) {
    String cmd = Serial.readStringUntil('\n');
    cmd.trim();
    if (cmd.startsWith("HEAT")) {
      int p = cmd.substring(5).toInt();
      setWireHeat(p);
    } else if (cmd.startsWith("STEP")) {
      // Format: STEP X 100
      char axisChar = cmd.charAt(5);
      int steps = cmd.substring(7).toInt();
      bool dir = (steps > 0);
      steps = abs(steps);
      int axisNum = (axisChar == 'X' ? 0 : (axisChar == 'Y' ? 1 : 2));

      for (int i = 0; i < steps; i++) {
        stepMotor(axisNum, dir);
        delayMicroseconds(stepDelayMicroseconds);
      }
      Serial.println(F("OK"));
    } else if (cmd.equalsIgnoreCase("STATUS")) {
      Serial.print(F("X:")); Serial.print(currentX);
      Serial.print(F(" Y:")); Serial.print(currentY);
      Serial.print(F(" Z:")); Serial.print(currentZ);
      Serial.print(F(" HEAT:")); Serial.println(wireTemperaturePWM);
    }
  }
}
