

console.log("AAAA")

let mapData;
let playerUnits; // Blue, Player 1
let enemyUnits; // Red, Player 2
let playerObjective;
let enemyObjective;
let playerPoints;
let enemyPoints;

// export function printStuff(playerUnits, enemyUnits, mapData) {
//     console.log(playerUnits);
// }

/** Initialize state */
export function getData(state) {
    console.log(state)
}

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
}
window.start = start;