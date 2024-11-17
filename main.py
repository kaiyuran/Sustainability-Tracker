from flask import Flask, request, jsonify
import os
from google.cloud import aiplatform

app = Flask(__name__)

# **CRITICAL:**  Set your Google Cloud credentials (environment variable is safest)
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "AIzaSyBB_rXvurVbE25P9yoswDxpF0k05UNalOo"  # Replace with your credentials file path

# Initialize the AI Platform client (you'll need to get the right project and location)
aiplatform.init(project="YOUR_GOOGLE_CLOUD_PROJECT_ID", location="YOUR_GOOGLE_CLOUD_REGION") #Replace YOUR_GOOGLE_CLOUD_PROJECT_ID and YOUR_GOOGLE_CLOUD_REGION with your actual values.

#Get your model from the aiplatform API, this may require creating a model if you don't have one already.  This step is crucial and must be adapted based on your Google Cloud project's configuration.
model = aiplatform.Model(model_name="YOUR_DEPLOYED_MODEL_NAME") # Replace with your deployed model name



@app.route('/generate', methods=['POST'])
def generate_text():
    data = request.get_json()
    prompt = data.get('prompt')
    if not prompt:
        return jsonify({'success': False, 'error': 'Missing prompt'}), 400

    try:
        response = model.predict(instances=[{'content': prompt}]) #This is crucial and must be adapted based on the aiplatform documentation and your model's requirements.
        #Extract the relevant information from the response. This will vary drastically based on how you set up the model and the structure of its response.
        generated_text = response.predictions[0]['content']  # Adapt this based on your model's response structure!

        return jsonify({'success': True, 'text': generated_text})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) #host='0.0.0.0' makes it accessible from other machines.  For production, set debug=False.