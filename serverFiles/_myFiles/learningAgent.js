class QLearningAgent {
    constructor(numStates, numActions, alpha, gamma, epsilon) {
        this.numStates = numStates;
        this.numActions = numActions;
        this.alpha = alpha; // Learning rate
        this.gamma = gamma; // Discount factor
        this.epsilon = epsilon; // Exploration rate

        this.qTable = Array.from({ length: numStates }, () =>
            Array(numActions).fill(0)
        );
    }

    chooseAction(state) {
        if (Math.random() < this.epsilon) {
            return Math.floor(Math.random() * this.numActions);
        } else {
            return this.qTable[state].indexOf(Math.max(...this.qTable[state]));
        }
    }

    updateQTable(state, action, reward, nextState) {
        const bestNextAction = this.qTable[nextState].indexOf(Math.max(...this.qTable[nextState]));
        this.qTable[state][action] += this.alpha * (reward + this.gamma * this.qTable[nextState][bestNextAction] - this.qTable[state][action]);
    }
}