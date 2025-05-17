import torch as torch
import torch.nn as nn
import numpy as np
import torch.optim as optim
import random
from collections import deque

print(torch.cuda.is_available())

class DeepQNetwork(nn.Module):
    def __init__(self, learning_rate, input_dimensions, action_dimensions, layer_1_dimensions, layer_2_dimensions):
        super(DeepQNetwork, self).__init__()
        self.input_dimensions = input_dimensions
        self.action_dimensions = action_dimensions
        self.layer_1_dimensions = layer_1_dimensions
        self.layer_2_dimensions = layer_2_dimensions

        self.layer_1 = nn.Linear(self.input_dimensions, self.layer_1_dimensions)
        self.layer_2 = nn.Linear(self.layer_1_dimensions, self.layer_2_dimensions)
        self.output_layer = nn.Linear(self.layer_2_dimensions, self.action_dimensions)

        self.optimizer = optim.Adam(self.parameters(), lr=learning_rate)
        self.loss = nn.MSELoss()

        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.to(self.device)

    def forward(self, state):
        x = torch.relu(self.layer_1(state))
        x = torch.relu(self.layer_2(x))
        actions = self.output_layer(x)
        return actions

class ReplayBuffer:
    def __init__(self, max_size):
        self.buffer = deque(maxlen=max_size)

    def add(self, experience):
        self.buffer.append(experience)

    def sample(self, batch_size):
        batch = random.sample(self.buffer, min(len(self.buffer), batch_size))
        states, actions, rewards, next_states, dones = zip(*batch)
        return (
            np.array(states),
            np.array(actions),
            np.array(rewards, dtype=np.float32),
            np.array(next_states),
            np.array(dones, dtype=np.uint8)
        )

    def __len__(self):
        return len(self.buffer)

class Commander:
    def __init__(self, gamma, epsilon, learning_rate, input_dimensions, action_dimensions, max_memory=100000, epsilon_end=0.01, epsilon_descent=5e-4, batch_size=64):
        self.gamma = gamma
        self.epsilon = epsilon
        self.epsilon_min = epsilon_end
        self.epsilon_decay = epsilon_descent
        self.learning_rate = learning_rate
        self.input_dimensions = input_dimensions
        self.action_dimensions = action_dimensions
        self.batch_size = batch_size

        self.memory = ReplayBuffer(max_memory)
        self.q_network = DeepQNetwork(learning_rate, input_dimensions, action_dimensions, 128, 128)
        self.target_network = DeepQNetwork(learning_rate, input_dimensions, action_dimensions, 128, 128)
        self.update_target_network()

    def act(self, state):
        """Given a state, choose an epsilon-greedy action"""
        if np.random.rand() < self.epsilon:
            return np.random.randint(self.action_dimensions)
        state_tensor = torch.tensor(state, dtype=torch.float32).unsqueeze(0).to(self.q_network.device)
        with torch.no_grad():
            q_values = self.q_network(state_tensor)
        return torch.argmax(q_values).item()

    def cache(self, experience):
        """Add the experience to memory"""
        self.memory.add(experience)

    def recall(self):
        """Sample experiences from memory"""
        return self.memory.sample(self.batch_size)

    def learn(self):
        """Update online action value (Q) function with a batch of experiences"""
        if len(self.memory) < self.batch_size:
            return

        states, actions, rewards, next_states, dones = self.recall()
        states = torch.tensor(states, dtype=torch.float32).to(self.q_network.device)
        actions = torch.tensor(actions, dtype=torch.int64).unsqueeze(1).to(self.q_network.device)
        rewards = torch.tensor(rewards, dtype=torch.float32).unsqueeze(1).to(self.q_network.device)
        next_states = torch.tensor(next_states, dtype=torch.float32).to(self.q_network.device)
        dones = torch.tensor(dones, dtype=torch.float32).unsqueeze(1).to(self.q_network.device)

        q_values = self.q_network(states).gather(1, actions)
        with torch.no_grad():
            next_q_values = self.target_network(next_states).max(1)[0].unsqueeze(1)
            target_q_values = rewards + self.gamma * next_q_values * (1 - dones)

        loss = self.q_network.loss(q_values, target_q_values)
        self.q_network.optimizer.zero_grad()
        loss.backward()
        self.q_network.optimizer.step()

        # Epsilon decay
        if self.epsilon > self.epsilon_min:
            self.epsilon -= self.epsilon_decay
            self.epsilon = max(self.epsilon, self.epsilon_min)

    def update_target_network(self):
        self.target_network.load_state_dict(self.q_network.state_dict())



if __name__ == '__main__':
    train()