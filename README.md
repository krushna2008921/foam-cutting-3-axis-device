# FOAM CUTTING 3-AXIS DEVICE
### Makerspace Innovation Lab | Department of Mechanical Engineering | Sanjivani University

> **"Precision Engineering. Smart Automation. Creative Manufacturing."**

---

## 📌 Project Overview
This repository hosts the official engineering website, interactive 3D WebGL simulator, firmware, and technical documentation for the **Foam Cutting 3-Axis Device**, developed at the **Department of Mechanical Engineering, Sanjivani University**.

The device is a low-cost, CNC-based three-axis hot-wire foam cutting machine capable of slicing foam, thermocol, Expanded Polystyrene (EPS), and Extruded Polystyrene (XPS) materials using a digitally synchronized heated resistance wire mechanism.

### Key Objectives
1. **Develop an affordable CNC foam cutter** using accessible, high-reliability components.
2. **Automate cutting movements** through 3-axis Cartesian digital control (X, Y, Z).
3. **Improve cutting accuracy** by eliminating human hand tremors and freehand variance.
4. **Reduce manual effort** and operator fatigue during complex model carving.
5. **Minimize material wastage** through smooth thermal kerf vaporization.
6. **Create repeatable shapes** for architectural, aerospace, and packaging prototyping.

---

## 👥 Project Team & Mentorship

### Project Group Members
- **Krushna Jamdar** – Project Group Member (Department of Mechanical Engineering)
- **Samiksha Kale** – Project Group Member (Department of Mechanical Engineering)
- **Sanket Gujar** – Project Group Member (Department of Mechanical Engineering)

### Faculty Guidance & Mentors
- **Dr. Kiran Wakchaure** – Director – Projects, Sanjivani University
- **Dr. Prathibha Sinha** – Faculty Mentor, Sanjivani University
- **Dr. Vasudeo Singh Singar** – Faculty Mentor, Sanjivani University
- **Dr. K. C. Bhosale** – Head of Department (HOD), Department of Mechanical Engineering, Sanjivani University

---

## ⚙️ Technical Specifications

| Parameter | Specification |
| :--- | :--- |
| **Kinematic Architecture** | 3-Axis Cartesian (X: Gantry Crossbeam, Y: Workbed, Z: Dual Column Lead Screws) |
| **Microcontroller** | Arduino Nano (ATmega328P, 16 MHz Clock) |
| **Actuation** | 3x 28BYJ-48 5V Stepper Motors (Internal 64:1 reduction gearbox) |
| **Motor Drivers** | ULN2003A 7-Channel Darlington Array Driver Boards with Indicator LEDs |
| **Cutting Mechanism** | Spring-tensioned Ni-Chrome (80/20) Heated Resistance Wire |
| **Thermal Range** | 200°C – 240°C (Regulated via PWM Gate Control) |
| **Workpiece Materials** | EPS Foam, XPS Foam, Thermocol, Polyurethane Foam |

---

## 📁 Project Folder Structure

```text
foam-cutting-3-axis-device/
├── index.html                      # Main semantic HTML5 single-page application
├── style.css                       # Dark glassmorphic engineering design stylesheet
├── script.js                       # Interactive logic, 3D Three.js WebGL simulator, Lightbox
├── README.md                       # Comprehensive project documentation
└── assets/
    ├── images/
    │   ├── hero-machine.jpg        # Photorealistic 3D render of the machine assembly
    │   ├── cad-model.jpg           # SolidWorks isometric CAD model render
    │   ├── foam-cutting-action.jpg # Macro photograph of hot-wire thermal cutting action
    │   ├── electronics-setup.jpg   # Engineering workstation with Arduino & drivers
    │   ├── arduino-nano.svg        # Vector component diagram of Arduino Nano
    │   ├── stepper-motor-28byj.svg # Vector component diagram of 28BYJ-48 stepper
    │   ├── uln2003-driver.svg      # Vector component diagram of ULN2003 driver
    │   ├── cnc-frame.svg           # Vector diagram of 3-axis kinematics & coordinate vectors
    │   ├── hot-wire-assembly.svg   # Vector diagram of wire tensioning & thermal kerf
    │   ├── circuit-schematic.svg   # Vector schematic of complete system wiring
    │   ├── app-architectural.svg   # Architectural scale model application
    │   ├── app-packaging.svg       # Custom protective packaging insert application
    │   ├── app-aerodynamics.svg    # NACA aerodynamic airfoil wing application
    │   ├── avatar-krushna.svg      # Profile card avatar placeholder
    │   ├── avatar-samiksha.svg     # Profile card avatar placeholder
    │   ├── avatar-sanket.svg       # Profile card avatar placeholder
    │   ├── faculty-kiran.svg       # Faculty card avatar placeholder
    │   ├── faculty-prathibha.svg   # Faculty card avatar placeholder
    │   ├── faculty-vasudeo.svg     # Faculty card avatar placeholder
    │   └── faculty-bhosale.svg     # Faculty card avatar placeholder
    ├── cad/
    │   ├── cad-assembly-isometric.jpg # High-resolution CAD assembly render
    │   └── cad-exploded-view.svg      # Exploded CAD assembly breakdown diagram
    ├── icons/
    │   └── sanjivani-logo.svg      # Sanjivani University Makerspace vector emblem
    └── documents/
        ├── arduino_foam_cutter_firmware.ino # Ready-to-flash Arduino Nano firmware
        └── project-specifications.json      # Structured technical data sheet
```

---

## 🚀 Running the Project Locally

The website is engineered with pure standard web technologies (HTML5, CSS3, modern ES6+ JavaScript, and Three.js). No complex build tool or package manager installation is required.

### Option 1: Direct File Opening
Double-click `index.html` in your file explorer to open it directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

### Option 2: Local HTTP Server (Python / PowerShell / Node)
```powershell
# Using Python
python -m http.server 8000

# Using Node (npx)
npx serve .
```
Then navigate to: `http://localhost:8000`

---

## 🌐 Publishing to GitHub Pages

1. Initialize Git in the project directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Foam Cutting 3-Axis Device website"
   ```
2. Create a public repository named `foam-cutting-3-axis-device` on GitHub:
   ```bash
   gh repo create foam-cutting-3-axis-device --public --source=. --remote=origin --push
   ```
3. Enable GitHub Pages:
   - Navigate to **Settings** > **Pages** in the GitHub repository.
   - Set **Source** to `Deploy from a branch` and select `main` / `/ (root)`.
   - Your live website will be published at:
     `https://<YOUR-GITHUB-USERNAME>.github.io/foam-cutting-3-axis-device/`

---

## ⚖️ Academic Attribution
Designed, developed, and documented for the **Makerspace Project Initiative**, Department of Mechanical Engineering, **Sanjivani University**.
All rights reserved © 2026.
