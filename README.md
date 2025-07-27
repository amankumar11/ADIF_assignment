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

## Updated Directory structure

### Pages:
- `src/pages/Home.jsx` - Landing page with file upload and instructions
- `src/pages/Results.jsx` - Results page showing Dashboard and 3D View

### Components:
- `src/components/Layout.jsx` - Consistent header and layout wrapper
- Updated `src/components/FileUpload.jsx` - More modular with better error handling

### 3D Components (src/components/3D/):
- `Tooth.jsx` - Individual tooth rendering with geometry and interactions
- `JawArc.jsx` - Tooth arrangement in an arc (upper/lower jaw)
- `JawScene.jsx` - Complete jaw scene with gums and teeth
- `FrontCamera.jsx` - Camera positioning and setup
- `Tooltip.jsx` - Hover tooltip for tooth information
- `Legend.jsx` - Color legend for cavity/healthy teeth

### Updated Main Component:
- `Mock3DView.jsx` - Now much cleaner, focusing only on: State management (tooltip, modal), Event handlers, Canvas setup, Component composition

### Routing:
- `src/App.jsx` - Now uses React Router for navigation between pages

### Updated frontend directory structure

```src/
src/
├── App.jsx
├── App.css
├── index.js / main.jsx
├── components/
│   ├── Layout.jsx
│   ├── Toast.jsx
│   ├── FileUpload.jsx
│   ├── Dashboard.jsx
│   ├── ToothModal.jsx
│   └── 3D/
│       ├── Mock3DView.jsx
│       ├── Tooth.jsx
│       ├── Gums.jsx
│       ├── JawArc.jsx
│       ├── JawScene.jsx
│       ├── FrontCamera.jsx
│       ├── Tooltip.jsx
│       └── Legend.jsx
├── pages/
│   ├── Home.jsx
│   └── Results.jsx
└── 
```

---

## 🚀 Deployment

Deployments are done using GCP. Both frontend and backend are deployed on VM Instances.

### Frontend
- Name: adif-frontend-instance-20250727-134055
- Boot disk source image: debian-12-bookworm-v20250709
- Location: us-east1-d
- Machine type: e2-micro (2 vCPUs, 1 GB Memory)
- Firewall: `http: ON`, `https: ON`

### Backend
- Name: instance-20250727-083643
- Boot disk source image: debian-12-bookworm-v20250709
- Location: us-central1-c
- Machine type: e2-micro (2 vCPUs, 1 GB Memory)
- Firewall: `http: ON`, `https: ON`

### Frontend HTTPS deployment
- Stored `dist/build` file in google cloud bucket, along with the `app.yaml` file.
- Deployed using Google cloud shell
- As it spits out a https URL, was not able to hit the flask http URL served by a VM. To enable it we need to buy a domain and SSL certificate for flask app to be served on https from VM instance.

### Deployed URLs
- Frontend is deployed on - http://34.138.14.65/ 
- Backend is deployed on - http://35.239.120.131/upload
- Frontend HTTPS URL (Won't be able to hit BE API because of `Mixed Content blocking`) - https://secure-pottery-467208-k0.appspot.com/

Note - Both are http and not https, I have also deployed frontend (react app) on https using 

## 📬 Contact
For support or questions, email: ak12378@nyu.edu
