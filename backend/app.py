from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import json

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    # Simulate processing time
    time.sleep(3)
    # Read and parse the uploaded JSON file
    try:
        file_content = file.read()
        data = json.loads(file_content)
        features = data.get('features', [])
        return jsonify({'features': features})
    except Exception as e:
        return jsonify({'error': f'Invalid JSON file: {str(e)}'}), 400

if __name__ == '__main__':
    app.run(debug=True) 