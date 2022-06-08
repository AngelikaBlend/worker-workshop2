let worker;
let calculateButton;
let statusDisplay;

window.onload = function () {
    calculateButton = document.getElementById("calculateButton");
    statusDisplay = document.getElementById("status");
};


function doCalculation() {
    calculateButton.disabled = true;

    const number = document.getElementById('factorial').value;

    worker = new Worker('/assets/Worker.min.js');
    worker.onmessage = receivedWorkerMessage;
    worker.onerror = workerErrorHandler;

    worker.postMessage({ number: number });

    statusDisplay.innerHTML = "Worker started";
}

function receivedWorkerMessage(event) {
    const message = event.data;

    if (message.messageType === "Factorialize") {
        const factorial = message.data;

        const displayFactorial = document.getElementById('primeContainer');
        displayFactorial.innerHTML = factorial;


        statusDisplay.innerHTML = "Worker finished";
        calculateButton.disabled = false;
    } else if (message.messageType === "Progress"){
        const number = message.data;
        statusDisplay.innerHTML = `Calculating number: ${number}`;
    }

}

function cancelCalculation(){
    worker.terminate();
    worker = null;

    
    statusDisplay.innerHTML = "Calculation cancelled.";
    calculateButton.disabled = false;
}
function workerErrorHandler(error) {
    statusDisplay.innerHTML = error.message;
}