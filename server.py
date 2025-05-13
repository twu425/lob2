from flask import Flask, render_template, request, send_from_directory
from flask_socketio import SocketIO
import logging
import json
import os

# Set the flask app to serves static files from the serverFiles directory
app = Flask(__name__, static_folder="serverFiles", static_url_path="") 
socketio = SocketIO(app, cors_allowed_origins="*")

# Disable request logging
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)


# Route the index.html file
@app.route('/')
def index():
    return app.send_static_file('index.html')


# Signals

connected_clients = set() 

@socketio.on("client_connect")
def handle_connect(data):
    id = data
    connected_clients.add(id)
    print("Client connected: " + id)

# Private
@socketio.on("game_state")
def handle_game_state(data):
    id = data["id"]
    game_state = data["game_state"]
    print("State received from client " + id)
    print("\t" + game_state)
    print("Sending orders to: " + id)
    socketio.emit("orders", "Orders placeholder")

# def sendOrders():
    

if __name__ == "__main__":
    socketio.run(app, port=8000)
