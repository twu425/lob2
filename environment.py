import gymnasium as gym
import torch as torch
import numpy as np
import threading

class battleField(gym.Env):
    def __init__(self, socketio):
        self.socketio = socketio
        self.max_units = 100
        self.unit_parameters = 9
        self.map_size = 500

        self._step_event = threading.Event()
        self._last_observation = None
        self._last_reward = None
        self._last_done = None

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
        self.socketio.emit("reset")
        # TODO: Wait for response
        obs = np.zeros((self.max_units * self.unit_parameters,), dtype=np.float32)
        return obs

    def step(self, action):
        orders = make_orders()
        # Send action to client
        self.socketio.emit("orders", orders)
        # Wait for the client to respond (handler will set the event)
        self._step_event.clear()
        self._step_event.wait()  # This blocks until set() is called

        # Return the values set by the handler
        return self._last_observation, self._last_reward, self._last_done, False

    def on_client_step_response(self, observation, reward, done):
        self._last_observation = observation
        self._last_reward = reward
        self._last_done = done
        # self._last_info = info
        self._step_event.set()


# Make dummy orders
def make_orders():
    # {unitnumber : {type:int, id:int, path:[16[2]]}}
    order = {"type": 1, "id": 1, "path": [[200,200]]}
    orders = {1: order}
    return orders
