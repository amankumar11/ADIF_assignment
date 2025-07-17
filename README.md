# Feature prediction dashboard - Dental cavity
Walkthrough video - https://drive.google.com/file/d/1g95MFtaVgtEZC7ilIavZCcuhStD-Xvb9/view?usp=sharing

A web application for visualizing and predicting dental cavities using FDI tooth numbering. Upload a JSON file with tooth data, and view predictions in a 3D human mouth model and a feature dashboard.

---

## 🚀 What does this app do?
- **Predicts and visualizes dental cavities** from uploaded JSON files (using FDI numbers).
- **3D interactive mouth view**: See which teeth have cavities or are healthy, with realistic teeth.
- **Dashboard table**: Tabular view of predicted features with icons and color coding.

---

## 🛠️ Tech Stack Used
- **Frontend**: React, Vite, Three.js (via @react-three/fiber), react-icons, CSS
- **Backend**: Python, Flask, Flask-CORS

---

## 🧑‍💻 How to Clone, Install, and Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/amankumar11/ADIF_assignment.git
   cd ADIF_assignment
   ```

2. **Install frontend dependencies:**
   ```bash
   yarn install
   ```

3. **Install backend dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

4. **Run the backend server:**
   ```bash
   cd backend
   python app.py
   # By default runs on http://127.0.0.1:5000
   ```

5. **Run the frontend app:**
   ```bash
   yarn dev
   # By default runs on http://localhost:5173
   ```

---

## 🖥️ About the Frontend Code
- Located in the `src/` directory.
- Built with React and Vite for fast development and hot reloading.
- 3D mouth visualization uses Three.js via @react-three/fiber.
- Components:
  - `FileUpload.jsx`: Upload your JSON file.
  - `Dashboard.jsx`: Tabular view of predicted features.
  - `Mock3DView.jsx`: Interactive 3D human mouth with teeth.
  - `Toast.jsx`: Toast notifications for user feedback.
- Modern, dark medical-themed UI with accent colors and icons.

---

## 🖧 About the Backend Code
- Located in the `backend/` directory.
- Built with Flask (Python) and Flask-CORS for API endpoints.
- `/upload` endpoint: Accepts a JSON file, parses features, and returns them for frontend visualization.

---

## 📄 Example JSON Input
- features: An array of objects, each representing a tooth.
- name: The FDI Number of the tooth.
- value: 1 if the tooth has a cavity, 0 if the tooth is cavity-free.
```json
{
  "features": [
    { "name": "11", "value": 1 },
    { "name": "13", "value": 0 },
    { "name": "21", "value": 1 },
    { "name": "36", "value": 0 }
  ]
}
```

---

## 📬 Contact
For support or questions, email: ak12378@nyu.edu
