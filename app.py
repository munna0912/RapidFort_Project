from flask import Flask, request, jsonify, send_from_directory, render_template
from flask_cors import CORS
import os
import magic

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload directory exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Function to get file type
def get_file_type(file_path):
    magic_mime = magic.Magic()
    return magic_mime.from_file(file_path)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    uploaded_file = request.files['file']
    if uploaded_file.filename == '':
        return jsonify({'error': 'No selected file'})

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], uploaded_file.filename)
    uploaded_file.save(file_path)
    
    return jsonify({'message': 'File uploaded successfully'})

@app.route('/files/<filename>', methods=['GET'])
def get_file_details(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if not os.path.exists(file_path):
        return jsonify({'error': 'File not found'})
    
    file_type = get_file_type(file_path)
    return jsonify({'file_type': file_type})

@app.route('/files/<filename>', methods=['PUT'])
def update_file(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if not os.path.exists(file_path):
        return jsonify({'error': 'File not found'})

    # You can implement the update logic here, such as replacing the file contents

    return jsonify({'message': 'File updated successfully'})

@app.route('/files/<filename>', methods=['DELETE'])
def delete_file(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if not os.path.exists(file_path):
        return jsonify({'error': 'File not found'})

    os.remove(file_path)
    return jsonify({'message': 'File deleted successfully'})

@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if not os.path.exists(file_path):
        return jsonify({'error': 'File not found'})

    return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)

@app.route('/files', methods=['GET'])
def get_all_files():
    files = [filename for filename in os.listdir(app.config['UPLOAD_FOLDER']) if os.path.isfile(os.path.join(app.config['UPLOAD_FOLDER'], filename))]
    return jsonify({'files': files})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
