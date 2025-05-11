import { exampleState } from "/_myFiles/demoStates.js";
// import * as tf from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs';
// import { exampleUnit } from "/_myFiles/demoStates.js";

let mapData;
// let units;
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





// const socket = io("http://localhost:8000");
// socket.on("action", (action) => {
//     executeAction(action);  // Implement action in the game
// });

// function sendGameState(state) {
//     socket.emit("game_state", state);
// }





/** Update game state with client-side game object */
export function getClientData(clientGameData) {
    clientGame = clientGameData;
    // let state = clientGame.getState(); // Object, DC, shows game state
}

function processState() {
    // console.log(tf)
    // let state = clientGame.units; // Object, DC, shows game state
    // All of these are stored as a map
    heightMap = clientGame.getState().map.heightMap; // 88*72 array
    terrains = clientGame.getState().map.terrains;
    
    let unitsData = new Array(100);
    unitsData.fill(new Array(10).fill(0))
    // console.log(clientGame.units);
    for (const [key, unit] of clientGame.units) {
        let unitData = [unit.gold, unit.manpower, unit.team, unit.hp, unit.org,  unit.status,
            unit.position.x, unit.position.y, unit.rotation, unit.accumulatedMovement]; // ignore effects for now
        // console.log(unitData);
        unitsData[unit.id] = unitData;
    }
    // unitsData = unitsData.map(x => (x === undefined ? 0 : x)); // fill empty array positions with zeroes
    
    

    const unitsTensor = tf.tensor2d(unitsData).flatten();        // Shape: [1000] (100 * 10)
    const heightMapTensor = tf.tensor2d(heightMap).flatten();    // Shape: [6336] (88 * 72)
    const terrainsTensor = tf.tensor2d(terrains).flatten();      // Shape: [6336] (88 * 72)

    // Concatenate along the first axis (1D)
    const inputTensor = tf.concat([unitsTensor, heightMapTensor, terrainsTensor]);

    console.log(inputTensor);  // Should print [13672]
    inputTensor.print();


    // effects
    // hp
    // position
    // org
    // id
    // player and team
    // category (likely cav, inf, and arty)
    // template (how to determine unit type? we could use gold and manpower cost I guess)
    // effects (likely slowdown and whatnot)
    // accumulated movement (likely charge damage)
    // rotation
    // velocity 
    // status  1  = standing, 2 = routing, 3 = recovering
    

    objectives = clientGame.objectives;
    maxTurn = clientGame.maxTurn;
    turnNumber = clientGame.turnNumber;
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
    processState();
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
