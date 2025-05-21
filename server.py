from flask import Flask
from flask_socketio import SocketIO
import logging
from bidict import bidict
import torch as torch
import numpy as np
from environment import battleField

# Set the flask app to serves static files from the serverFiles directory
app = Flask(__name__, static_folder="serverFiles", static_url_path="") 
socketio = SocketIO(app, cors_allowed_origins="*")

# Disable request logging
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

orderTypes = bidict({
    1 : "Move",
    2 : "Seek",
    3 : "Shoot",
    4 : "FireAndAdvance",
    5 : "PlaceEntity",
    6 : "Fallback",
    7 : "Skirmish"
})

# Route the index.html file
@app.route('/')
def index():
    return app.send_static_file('index.html')


# Signals
connected_clients = set() 

# Register client
# TODO: Add handling for multiple clients
@socketio.on("client_connect")
def handle_connect(id):
    connected_clients.add(id)
    print("Client connected: " + id)    

# Start game loop
environment = battleField(socketio)
@socketio.on("start") 
def start():
    while True:
        environment.step(action=None)

# Receive game state
@socketio.on("game_state")
def handle_game_state(state):
    id = state["id"]
    print("State received from client " + id)

    unit_tensor = transform_data(state)
    reward = 0 # temp
    done = False # temp
    environment.on_client_step_response(unit_tensor, reward, done)

# TOCO: Move transform data function into battleField class to avoid duplicated parameters
max_units = 100
unit_parameters = 9

# Turn state data into a tensor
# TODO: add non-unit data as well
def transform_data(state):
    id = state["id"]
    heightMap = state["heightMap"] # 2D array
    terrains = state["terrains"] # 2D array
    mapDimensions = state["mapDimensions"] # [height, width]
    units = state["units"] # {key : unitObject}
    objectives = state["objectives"] # {key : }
    maxTurn = state["maxTurn"]
    turnNumber = state["turnNumber"]
    victoryPointsDifference = state["victoryPointsDifference"]

    #units = units["1"]
    # map_tensor = torch.zeros()

    unit_tensor = torch.zeros(max_units, unit_parameters)
    
    index = 0
    for unit in units.values():        
        unitData = []
        unitData.append(unit["id"])
        unitData.append(unit["position"]["x"])
        unitData.append(unit["position"]["y"])
        unitData.append(unit["rotation"])
        unitData.append(unit["player"]) # maybe also get team?
        unitData.append(unit["hp"])
        unitData.append(unit["org"])
        unitData.append(unit["status"])
        unitData.append(unit["accumulatedMovement"]) 

        unit_tensor[index] = torch.tensor(unitData)
        index += 1

    return unit_tensor 


if __name__ == "__main__":
    socketio.run(app, port=8000, debug=True)


