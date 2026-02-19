from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# Home page
@app.route('/')
def index():
    return render_template('index.html')

# Detection page
@app.route('/detection')
def detection():
    return render_template('detection.html')

# # Diseases page
# @app.route('/diseases')
# def diseases():
#     return render_template('diseases.html')

# # Solutions page
# @app.route('/solutions')
# def solutions():
#     return render_template('solutions.html')

# # About page
# @app.route('/about')
# def about():
#     return render_template('about.html')

# Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'prediction': 'No file uploaded'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'prediction': 'No file selected'})
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    prediction = "Healthy Leaf"  # Replace with AI model
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
