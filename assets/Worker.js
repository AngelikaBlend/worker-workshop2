onmessage = (event) => {
    let factorial = factorialize(event.data.number);
    postMessage({
        messageType: 'Factorialize',
        data: factorial
    });
}

function factorialize(num) {
    let result = num;
    if (num === 0 || num === 1)
        return 1;
    while (num > 1) {
        num--;
        result *= num;
        postMessage({
            messageType: 'Progress',
            data: num
        });
    }
    return result;
}