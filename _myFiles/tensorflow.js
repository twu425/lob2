import { exampleState } from "/_myFiles/demoStates.js";
// import { exampleUnit } from "/_myFiles/demoStates.js";

let mapData;
let units;
let objectives;

let vpDifference = 0;
let playerNumber = 1;

let game; // Object, LP, contains and can modify game state
let clientGame
let initUnits;  


let maxTurn;
let turnNumber;
let terrains;
let heightMap;

/** Update game state with client-side game object */
export function getClientData(clientGameData) {
    clientGame = clientGameData;
    // let state = clientGame.getState(); // Object, DC, shows game state
}

function processState() {
    let state = clientGame.getState(); // Object, DC, shows game state
    // All of these are stored as a map
    heightMap = state.map.heightMap;
    terrains = state.map.terrains;
    units = state.units;
    objectives = state.objectives;
    maxTurn = state.maxTurn;
    turnNumber = state.turnNumber;
}

/** Retrieve the main game object */
export function getGame(gameData) {
    game = gameData;
}




/** Update units */
export function updateUnits(unitData) {
    units = unitData;
    vpDifference = game.vpService.getVictoryPointDifference(playerNumber);
}


export function handleDefeat() {
    game.turnNumber = 1;
    game.setupFromState(exampleState);
}

function resetGame() {
    game.turnNumber = 1;
    game.setupFromState(exampleState);
}




let submitFunction;
let param;
export function getSubmitFunction(submitFunction1, param1) {
    submitFunction = submitFunction1;
    param = param1;
    // console.log(param)
    // submitFunction(param);
}

// Orders
// type: 1-? move, fire, etc.
// id: int unit id
// path: array of up to 16 arrays representing coordinate points
export function generateOrders(unitOrders) {
    
    // param.orders = l
    // return unitOrders;
}

let running = true;

function gameLoop() {
    if (!running) return; // Exit if not running
    let timeStart = Date.now();

    // console.log(running);
    console.log(game.turnNumber);
    if (game.turnNumber == game.maxTurn - 1) {
        resetGame();
    }
    // console.log(game.orderSystem.)

    // clientGame.submitOrders(null, []);
    // game.executeTurn();
    // console.log(game.unitData)

    submitFunction(param);
    console.log(param);


    let timeEnd = Date.now()
    console.log("Time elapsed" + (timeEnd - timeStart))

    // Schedule the next loop
    // Necessary to use this instead of calling directly because it allows the call stack to to clear
    setTimeout(gameLoop, 0);
}

function start() {
    running = true;
    gameLoop();
}

function run() {
    running = false;
}

window.start = start;
window.run = run;




function test1() {
    console.log(game.unitData)
}

function test2() {

    console.log(game.getState())
    // const i = this.createUnits(game.units);
    // this.addUnit(...i);
}
window.test1 = test1;
window.test2 = test2;


// This is similar to the submit function, but doesn't render (probably has less overhead)
// It also doesn't really work, the submit button bundles in some other functions that make it functional it appears
// Perhaps orders can't be stacked until something executes them?
let orderSystem;
export function getOrderSystem(orderSystem1) {
    orderSystem = orderSystem1;
}
export function submitOrders() {
    orderSystem.submitOrders(null, []);
    // orderSystem.executeTurn();
}
window.submitOrders = submitOrders;
// #######################################################
