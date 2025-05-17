import { exampleState } from "/_myFiles/demoStates.js";
/* global io */
const socket = io("http://localhost:8000");


let id = crypto.randomUUID();;
let game; // Object, LP, contains and can modify game state
let clientGame;

socket.on('connect', function () {
    console.log("Connected to server, client id is: " + id);
    socket.emit('client_connect', id);
});

socket.on('reset', resetGame)

function sendGameState() {
    socket.emit("game_state", {
        id: id,
        heightMap: clientGame.map.heightMap,
        terrains: clientGame.map.terrains,
        mapDimensions: [clientGame.map.height, clientGame.map.width],
        // Convert maps to objects, which get converted to dictionaries when received in python
        units: Object.fromEntries(clientGame.units), 
        objectives: Object.fromEntries(clientGame.objectives),
        maxTurn: clientGame.maxTurn,
        turnNumber: clientGame.turnNumber,
        victoryPointsDifference: clientGame.vpService.getVictoryPointDifference(1) // 1 stands for player 1
    })
}

socket.on('sendGameState', sendGameState)

socket.on('orders', function (data) {
    let orders = new Map(Object.entries(data))
    param.orderMaker.orders = orders;
    console.log("Received orders")
    console.log(data)
    gameStep()
    sendGameState()
})


/** Update game state with client-side game object */
export function getClientData(clientGameData) {
    clientGame = clientGameData;
}

/** Retrieve the main game object */
export function getGame(gameData) {
    game = gameData;
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
    console.log(param.orderMaker.orders)
    // orders = param.orderMaker.orders
    // orders is a map {unitnumber : {type:int, id:int, path:[16[2]]}}
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
    // console.log(param);


    let timeEnd = Date.now()
    console.log("Time elapsed" + (timeEnd - timeStart))

    // Schedule the next loop
    // Necessary to use this instead of calling directly because it allows the call stack to to clear
    setTimeout(gameLoop, 0);
}

function gameStep() {
    if (game.turnNumber == game.maxTurn - 1) {
        resetGame();
    }
    submitFunction(param);
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

// function renderPaths() {
//     clientGame.orderMaker.renderPathForUnit(u, y, i))
// }
// window.renderPaths = renderPaths;

function test1() {
    
}

function test2() {
    // clientGame = exampleState;
    sendGameState() 
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
