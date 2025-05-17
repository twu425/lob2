import torch as torch
import torch.nn as nn # Neural Network
import numpy as np
import torch.optim as optim
from collections import deque
import random




print(torch.cuda.is_available())
class DeepQNetwork(nn.module):
    def __init__(self, learning_rate, input_dimensions, action_dimesions, layer_1_dimensions, layer_2_dimensions):
        super(DeepQNetwork, self).__init__()
        self.input_dimensions = input_dimensions
        self.action_dimensions = action_dimesions 
        self.layer_1_dimensions = layer_1_dimensions
        self.layer_2_dimensions = layer_2_dimensions

        self.layer_1 = nn.Linear(self.input_dimensions, self.layer_1_dimensions)
        self.layer_2 = nn.Linear(self.layer_1_dimensions, self.layer_2_dimensions)
        
        self.optimizer = optim.Adam(self.parameters(), lr = learning_rate)
        self.loss = nn.MSELoss()

        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.to(self.device)

    # How should data flow from one layer to the next?
    def forward(self, state):
        # Pass the state into the first layer
        layer_1_output = nn.ReLU(self.layer_1(state))

        # Get actions as the output of the last layer
        # Don't use an activation function to get the raw output
        actions = self.layer_2(layer_1_output) # action output
        return actions

class Commander:
    # gamma: waiting of future rewards, epsilon: ratio of learned to random actions, 
    def __init__(self, gamma, epsilon, learning_rate, input_dimensions, action_dimensions, max_memory=100000, epsilon_end=0.01, epsilon_descent=5e-4):
        self.gamma = gamma # How much to prioritize future reward
        self.epsilon = epsilon # Ration of learned to random actions
        self.learning_rate = learning_rate
        self.input_dimensions = input_dimensions
        self.action_dimensions = action_dimensions
        # self.actions_space = [for i in range(action_dimensions)]
        self.memory_counter = 0

        
        self.evaluation_network = DeepQNetwork(learning_rate=self.learning_rate, input_dimensions=self.input_dimensions, layer_1_dimensions=256, layer_2_dimensions=256)
        
        self.state_memory = np.zeros((self.max_memory, *input_dimensions), dtype=np.float32)
        self.new_state_memory = np.zeros((self.max_memory, *input_dimensions), dtype=np.float32)
        self.action_memory = np.zeros(self.max_memory, dtype=np.float32)
        self.reward_memory = np.zeros(self.max_memory, dtype=np.float32)
        self.terminal_memory = np.zeros




    def act(self, state):
        """Given a state, choose an epsilon-greedy action"""
        pass

    def cache(self, experience):
        """Add the experience to memory"""
        pass

    def recall(self, state, action, reward, next_state, done):
        """Sample experiences from memory"""
        pass

    def learn(self):
        """Update online action value (Q) function with a batch of experiences"""
        pass

    if __name__ == '__main__':
        train()

# class ReplayBuffer:
#     def __init__(self, max_size):
#         self.buffer = deque(maxlen=max_size)

#     def add(self, experience):
#         self.buffer.append(experience)

#     def sample(self, batch_size):
#         batch = random.sample(self.buffer, min(len(self.buffer), batch_size))
#         states, actions, rewards, next_states, dones = zip(*batch)
#         return (
#             np.array(states),
#             np.array(actions),
#             np.array(rewards, dtype=np.float32),
#             np.array(next_states),
#             np.array(dones, dtype=np.uint8)
#         )

#     def __len__(self):
#         return len(self.buffer)