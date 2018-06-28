function y_in(bias, input, weights) {
    return (
        bias +
        input
        .map(function (x, index) {
            return x * weights[index];
        })
        .reduce(function (vOld, vNew) {
            return vOld + vNew;
        }, 0)
    );
}

function activationFunc(y_in) {
    let theta = 0.1;
    if (y_in > theta) {
        return 1;
    }
    if (y_in < -theta) {
        return -1;
    } else {
        return 0;
    }
}

function weightUptade(weights, alpha, target, inputs) {
    var w = [];
    w = weights.map(function (wi, index) {
        return wi + alpha * target * inputs[index];
    });
    return w;
}

function biasUpdate(bias, alpha, target) {
    return bias + alpha * target;
}

// Target for AND, uncomment the following line to train for this problem.
// var target = [1, -1, -1, -1];

// Target for OR, uncomment the following line to train for this problem.
// var target = [1, 1, 1, -1];

var target = [-1, 1, 1, 1, 1, 1, 1, 1];

// var inputs = [
//     [1, 1],
//     [1, 0],
//     [0, 1],
//     [0, 0]
// ];

var inputs = [
    [0, 0, 0],
    [0, 0, 1],
    [0, 1, 0],
    [0, 1, 1],
    [1, 0, 0],
    [1, 0, 1],
    [1, 1, 0],
    [1, 1, 1]
];

// Learning rate is set to 1.
var alpha = 0.5;

// Bias is initialized with 0.
var bias = 0;

// Weights are initialized with 0.
// If the input has N element, you must initilize N weights.
var w = [0, 0, 0];

// Weight change counter.
var wChange = 0;

// Training epochs counter.
var epoch = 0;

while (wChange != inputs.length) {
    for (var i = 0; i < inputs.length; i++) {
        console.log('-----------------' + i);
        if (activationFunc(y_in(bias, inputs[i], w)) != target[i]) {
            console.log('Net: ' + y_in(bias, inputs[i], w));
            console.log('Out:' + activationFunc(y_in(bias, inputs[i], w)));
            console.log('Target: ' + target[i]);
            w = weightUptade(w, alpha, target[i], inputs[i]);
            bias = biasUpdate(bias, alpha, target[i]);
            console.log('Pesos: [' + w + ']');
            console.log('Bias: ' + bias);
            wChange = 0;
        } else {
            wChange = wChange + 1;
            console.log('Não atualizou o peso.');
        }
    }
    if (wChange != inputs.length) {
        wChange = 0;
    }
    epoch++;
}

console.log('-------FIM-------');

console.log('Pesos ao final do treinamento: [' + w + ']');
console.log('Bias ao final fo treinamento:  ' + bias);
//console.log(wChange);
console.log('Épocas de treinamento: ' + epoch);

function neuron(inputs, weights, bias) {
    inputs.forEach(pair => {
        console.log('Input Pair: [' + pair + '] - Output: ' + activationFunc(y_in(bias, pair, weights)));
    });
}

console.log('========================================');

neuron(inputs, w, bias);