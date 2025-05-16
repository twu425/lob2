from flask import Flask, render_template, request, send_from_directory
from flask_socketio import SocketIO
import logging
from bidict import bidict
import json
import os
import torch as torch
import numpy as np

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

@socketio.on("client_connect")
def handle_connect(id):
    connected_clients.add(id)
    print("Client connected: " + id)

# Private
@socketio.on("game_state")
def handle_game_state(data):
    id = data["id"]
    print("State received from client " + id)

    orders = make_orders(data)
    tranform_data(data)

    print("Sending orders to: " + id)
    socketio.emit("orders", orders)


# Utility Functions

def tranform_data(data):
    id = data["id"]
    heightMap = data["heightMap"] # 2D array
    terrains = data["terrains"] # 2D array
    mapDimensions = data["mapDimensions"] # [height, width]
    units = data["units"] # {key : unitObject}
    objectives = data["objectives"] # {key : }
    maxTurn = data["maxTurn"]
    turnNumber = data["turnNumber"]

    unitData = []
    units = units["1"]
    torch.zeros(20)
    for unit in units:
        unitData.append(unit["id"])
        unitData.append(unit["position"]["x"])
        unitData.append(unit["position"]["y"])
        unitData.append(unit["position"]["rotation"])
        unitData.append(unit["player"])
        unitData.append(unit["hp"])
        unitData.append(unit["org"])
        unitData.append(unit["status"])
        unitData.append(unit[""])
        # checks
        



    x = torch.tensor(heightMap)
    x = torch.flatten(x)
    print(units["1"])
    
    
    print(x)




def make_orders(data):
    orders = [orderTypes.get("Move")]
    # {unitnumber : {type:int, id:int, path:[16[2]]}}
    order = {"type": 1, "id": 1, "path": [[200,200]]}
    orders = {1: order}
    return orders


if __name__ == "__main__":
    socketio.run(app, port=8000, debug=True)
