# Flask Backend for Feature Prediction Dashboard

## Setup

1. Create and activate a virtual environment:
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install flask flask-cors
   ```

## Running the Backend

Start the Flask server:
```bash
python app.py
```

The backend will run on `http://127.0.0.1:5000` by default.

## API Endpoint

- `POST /upload`
  - Accepts: file (multipart/form-data)
  - Returns: JSON with random mock features