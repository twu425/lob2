from flask import Flask, render_template, request, send_from_directory
from flask_socketio import SocketIO
import logging
from bidict import bidict
import json
import os
import torch as torch
import numpy as np
import threading

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





import gymnasium as gym

class battleField(gym.Env):
    def __init__(self):
        self.max_units = 100
        self.unit_parameters = 9
        self.map_size = 500

        self._step_event = threading.Event()
        self._last_observation = None
        self._last_reward = None
        self._last_done = None
        # self._last_info = None


        self.observation_space = gym.spaces.Box(
            low=-np.inf,
            high=np.inf,
            shape=(self.max_units * self.unit_parameters,),
            dtype=np.float32
        )

        self.action_space = gym.spaces.Dict({
            "order_type": gym.spaces.Discrete(7), 
            "move_coordinates": gym.spaces.Box(
                low=0.0,
                high=self.map_size,
                shape=(2, 16), # 2 coordinates, 16 times
                dtype=np.float32
            )
        })



    def reset(self, seed=None, options=None):
        socketio.emit("reset")
        # Optionally wait for a response if needed
        obs = np.zeros((self.max_units * self.unit_parameters,), dtype=np.float32)
        return obs

    def step(self, action):
        orders = make_orders()
        # Send action to client
        socketio.emit("orders", orders)
        # Wait for the client to respond (handler will set the event)
        self._step_event.clear()
        self._step_event.wait()  # This blocks until set() is called

        # Return the values set by the handler
        return self._last_observation, self._last_reward, self._last_done, False

    # This function should be called by your SocketIO handler when the client responds
    def on_client_step_response(self, observation, reward, done):
        self._last_observation = observation
        self._last_reward = reward
        self._last_done = done
        # self._last_info = info
        self._step_event.set()
    
    

def make_orders():
    orders = [orderTypes.get("Move")]
    # {unitnumber : {type:int, id:int, path:[16[2]]}}
    order = {"type": 1, "id": 1, "path": [[200,200]]}
    orders = {1: order}
    return orders


environment = battleField()
@socketio.on("start") 
def start():
    while True:
        environment.step(action=None)



# Private
@socketio.on("game_state")
def handle_game_state(state):
    id = state["id"]
    print("State received from client " + id)

    
    unit_tensor = transform_data(state)
    reward = 0 # temp
    done = False # temp
    environment.on_client_step_response(unit_tensor, reward, done)

    # train(state)

    # print("Sending orders to: " + id)
    # socketio.emit("orders", orders)


# Utility Functions
max_units = 100
unit_parameters = 9



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

    return unit_tensor # TODO: Make this show the entire game state, not just the victory points


if __name__ == "__main__":
    socketio.run(app, port=8000, debug=True)


