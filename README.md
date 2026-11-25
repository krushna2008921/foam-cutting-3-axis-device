# FOAM CUTTING 2-AXIS DEVICE
### Makerspace Innovation Lab | Department of Mechanical Engineering | Sanjivani University

> **"Precision Engineering. Smart Automation. Creative Manufacturing."**

---

## 📌 Project Overview
This repository hosts the official engineering website, interactive 3D WebGL simulator, firmware, and technical documentation for the **FOAM CUTTING 2-AXIS DEVICE**, developed at the **Department of Mechanical Engineering, Sanjivani University**.

The photographed prototype is a partially assembled, two-axis rack-and-motor device with perpendicular X/Y rack sections, two visible motors and a thin wire support. Wire heating and full machine operation have not been verified.

### Key Objectives
1. **Develop an affordable CNC foam cutter** using accessible, high-reliability components.
2. **Explore two-axis movement** through the perpendicular X and Y rack arrangement.
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
| **Kinematic Architecture** | Two perpendicular racks: X and Y directions; no independently verified Z axis |
| **Microcontroller** | Photographed controller model unverified |
| **Actuation** | Two motors visible; one label reads 28BYJ-48 5VDC |
| **Motor Drivers** | Plug-in modules visible on the CNC shield; exact model unverified |
| **Cutting Mechanism** | Thin wire support visible; wire material and heating unverified |
| **Thermal Range** | Not established from the available photograph |
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
    │   ├── cnc-frame.svg           # Photo-referenced 2-axis kinematics illustration
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
        ├── arduino_foam_cutter_firmware.ino # Existing source; hardware pin assignments unverified
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
   git commit -m "Initial commit: FOAM CUTTING 2-AXIS DEVICE website"
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
