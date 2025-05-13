from flask import Flask, render_template, send_from_directory
from flask_socketio import SocketIO
import json
import os

# Set the flask app to serves static files from the serverFiles directory
app = Flask(__name__, static_folder="serverFiles", static_url_path="") 
socketio = SocketIO(app, cors_allowed_origins="*")

# Route the index.html file
@app.route('/')
def index():
    return app.send_static_file('index.html')



@socketio.on("game_state")
def handle_game_state(data):
    print("got that state")
    print(data)
    # state = json.loads(data)
    # action = rl_algorithm(state)  # Implement your RL logic
    # socketio.emit("action", json.dumps(action))

# def rl_algorithm(state):
#     # Placeholder RL logic
#     return {"move": "up"}  

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=8000)
