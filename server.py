from flask import Flask, render_template, send_from_directory
from flask_socketio import SocketIO
import json
import os

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/') 
def index(): 
     print('hello') 
     return render_template('index.html')

@app.route('/<path:filename>')
def serve_file(filename):
    # static_dir = os.path.join(os.getcwd(), '/')  # folder name
    static_dir = os.getcwd() + "\serverFiles"   # Use the current directory as the static directory
    print(static_dir)
    return send_from_directory(static_dir, filename)



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
