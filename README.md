# Flask Chatbot

A simple chatbot made using Flask, JavaScript, HTML, and CSS. This chatbot is a subproject for the thrift store web app, we designed to enhance user interaction and assist users. The model is trained using custom data preprocessed specifically for this project, reflecting my passion for machine learning and chatbots.

## Project Structure

thriftify-chatbot/
│
├── bot/
│ ├── templates/
│ │ └── index.html
│ ├── static/
│ │ ├── style.css
│ │ ├── script.js
│ │ ├── bot_image.png
│ │ ├── send.png
│ │ └── notification.mp3
│ ├── models/
│ │ ├── chatbot_model1.h5
│ │ ├── words.pkl
│ │ └── classes.pkl
│ └── data/
│ └── intents1.json
│
├── app.py
├── README.md
└── requirements.txt


## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/chatbot_project.git
    cd chatbot_project
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Run the Flask application:
    ```bash
    python app.py
    ```

## Usage

1. Open your web browser and go to `http://127.0.0.1:5000/`.
2. Click on the chatbot button in the bottom right corner to open the chat interface.
3. Type your message and press Enter or click the send button to interact with the chatbot.

## Project Details

### `app.py`
The main Flask application file that initializes the app, loads the trained model, and defines the routes for rendering the HTML page and handling chatbot interactions.

### `index.html`
The HTML template for the chatbot interface.

### `style.css`
The CSS file for styling the chatbot interface.

### `script.js`
The JavaScript file for handling the frontend functionality of the chatbot, including sending messages and displaying responses.

### Model and Data Files
- `chatbot_model1.h5`: The trained chatbot model.
- `words.pkl` and `classes.pkl`: The files containing the words and classes used by the model.
- `intents1.json`: The file containing the intents and responses for the chatbot.

## Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
