from flask import Flask, render_template, request, jsonify
import nltk
import json
import numpy as np
import pickle
from keras.models import load_model
import random
import os

# Initialize the Flask app
app = Flask(__name__, template_folder='bot/templates', static_folder='bot/static')

# Load the trained model and other necessary files
model = load_model(os.path.join(app.root_path, 'bot/models/chatbot_model11.h5'))
lemmatizer = nltk.stem.WordNetLemmatizer()

with open(os.path.join(app.root_path, 'bot/data/intents1.json')) as json_data:
    intents = json.load(json_data)

with open(os.path.join(app.root_path, 'bot/models/words.pkl'), 'rb') as f:
    words = pickle.load(f)

with open(os.path.join(app.root_path, 'bot/models/classes.pkl'), 'rb') as f:
    classes = pickle.load(f)

# Helper functions
def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def bow(sentence, words, show_details=False):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                bag[i] = 1
    return np.array(bag)

def predict_class(sentence, model):
    p = bow(sentence, words, show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list

def get_response(ints, intents_json):
    tag = ints[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            return random.choice(i['responses'])

# Route for serving the HTML page
@app.route('/')
def home():
    return render_template('index.html')

# Route for chatbot interaction
@app.route('/chat', methods=['POST'])
def chat():
    message = request.json.get('message')
    ints = predict_class(message, model)
    response = get_response(ints, intents)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
