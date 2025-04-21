let mapData;
let units;
let objectives;
let game;
let vpDifference = 0;
let player = 1;

let initUnits;

/** Initialize state */
export function getData(state) {
    // turnCount = turnCount + 1;
    // if (turnCount === 2) {
    //     initState = state;
    //     console.log(initState)
    // }

    mapData = state.map;
    units = state.units;
    objectives = state.objectives;
}
export function getGame(gameData) {
    game = gameData;
    if (initUnits == null) {
        initUnits = game.units;
    }
    
    // console.log(game.vpService.getVictoryPointDifference(1))
}

// function update() {
// }

export function updateUnits(unitData) {
    units = unitData;
    vpDifference = game.vpService.getVictoryPointDifference(player);
    
}
export function handleDefeat() {

}
export function resetGame() {

}


let submitFunction;
let param;
export function getSubmitFunction(submitFunction1, param1) {
    submitFunction = submitFunction1;
    param = param1;
    // console.log(submitFunction)
    submitFunction(param);
}
function turn() {
    submitFunction(param);
}
window.turn = turn;

function start() {
    while (true) {
        turn()
    }
    // console.log(getState)
}
window.start = start;


export function generateOrders(unitOrders) {
    // return unitOrders;

}


let temp;
function test() {
    if (temp == game.units) {
        console.log("AAAAA")
    }
    game.units = temp;
    
}
function test2() {
    // console.log(temp)
    // console.log(game.units)
    temp = new Map(game.units)
    // console.log(temp)

}
window.test2 = test2;
window.test = test;












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