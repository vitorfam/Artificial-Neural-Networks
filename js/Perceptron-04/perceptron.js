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
    let theta = 0.2;
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

function neuron(inputs, weights, bias) {
    inputs.forEach(pair => {
        console.log('Input Pair: [' + pair + '] - \nOutput: ' + activationFunc(y_in(bias, pair, weights)));
    });
}

// Target for AND, uncomment the following line to train for this problem.
// var target = [1, -1, -1, -1];

// Target for OR, uncomment the following line to train for this problem.
// var target = [1, 1, 1, -1];

// var target = [-1, 1, 1, 1, 1, 1, 1, 1];

// var inputs = [
//     [1, 1],
//     [1, 0],
//     [0, 1],
//     [0, 0]
// ];

// var inputs = [
//     [0, 0, 0],
//     [0, 0, 1],
//     [0, 1, 0],
//     [0, 1, 1],
//     [1, 0, 0],
//     [1, 0, 1],
//     [1, 1, 0],
//     [1, 1, 1]
// ];

// Learning rate is set to 1.
var alpha = 0.4;

// Bias is initialized with 0.
var bias = 0;

// Weights are initialized with 0.
// If the input has N element, you must initilize N weights.
// var w = [0, 0, 0];

// Weight change counter.
var wChange = 0;

// Training epochs counter.
var epoch = 0;

// while (wChange != inputs.length) {
//     for (var i = 0; i < inputs.length; i++) {
//         console.log('-----------------' + i);
//         if (activationFunc(y_in(bias, inputs[i], w)) != target[i]) {
//             console.log('Net: ' + y_in(bias, inputs[i], w));
//             console.log('Out:' + activationFunc(y_in(bias, inputs[i], w)));
//             console.log('Target: ' + target[i]);
//             w = weightUptade(w, alpha, target[i], inputs[i]);
//             bias = biasUpdate(bias, alpha, target[i]);
//             console.log('Pesos: [' + w + ']');
//             console.log('Bias: ' + bias);
//             wChange = 0;
//         } else {
//             wChange = wChange + 1;
//             console.log('Não atualizou o peso.');
//         }
//     }
//     if (wChange != inputs.length) {
//         wChange = 0;
//     }
//     epoch++;
// }

// console.log('-------FIM-------');

// console.log('Pesos ao final do treinamento: [' + w + ']');
// console.log('Bias ao final fo treinamento:  ' + bias);
// //console.log(wChange);
// console.log('Épocas de treinamento: ' + epoch);


// console.log('========================================');

// neuron(inputs, w, bias);


var inputsPair = [
    [
        0, 0, 1, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0,
        0, 0, 1, 0, 1, 0, 0,
        0, 0, 1, 0, 1, 0, 0,
        0, 1, 1, 1, 1, 1, 0,
        0, 1, 0, 0, 0, 1, 0,
        0, 1, 0, 0, 0, 1, 0,
        1, 1, 1, 0, 1, 1, 1
    ],
    [
        1, 1, 1, 1, 1, 1, 0,
        0, 1, 0, 0, 0, 0, 1,
        0, 1, 0, 0, 0, 0, 1,
        0, 1, 0, 0, 0, 0, 1,
        0, 1, 1, 1, 1, 1, 0,
        0, 1, 0, 0, 0, 0, 1,
        0, 1, 0, 0, 0, 0, 1,
        0, 1, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 0
    ]
];

var font2 = [
    [
        0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0,
        0, 0, 1, 0, 1, 0, 0,
        0, 0, 1, 0, 1, 0, 0,
        0, 1, 0, 0, 0, 1, 0,
        0, 1, 1, 1, 1, 1, 0,
        0, 1, 0, 0, 0, 1, 0,
        0, 1, 0, 0, 0, 1, 0
    ],
    [
        1, 1, 1, 1, 1, 1, 0,
        1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 0,
        1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 0
    ]
];

var targetChar = [1, -1];

var wChar = [0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0
];

while (wChange != font2.length) {
    for (var i = 0; i < font2.length; i++) {
        console.log('-----------------' + i);
        if (activationFunc(y_in(bias, font2[i], wChar)) != targetChar[i]) {

            console.log('Net: ' + y_in(bias, font2[i], wChar));
            console.log('Out:' + activationFunc(y_in(bias, font2[i], wChar)));
            console.log('Target: ' + targetChar[i]);

            wChar = weightUptade(wChar, alpha, targetChar[i], font2[i]);
            bias = biasUpdate(bias, alpha, targetChar[i]);

            console.log('Pesos: [' + wChar + ']');
            console.log('Bias: ' + bias);

            wChange = 0;
        } else {
            wChange = wChange + 1;
            console.log('Não atualizou o peso.');
        }
    }
    if (wChange != font2.length) {
        wChange = 0;
    }
    epoch++;
}

console.log('-------FIM-------');

console.log('Pesos ao final do treinamento: [' + wChar + ']');
console.log('Bias ao final fo treinamento:  ' + bias);
console.log('Épocas de treinamento: ' + epoch);

console.log('\n\nTreinamento para a segunda fonte');


while (wChange != inputsPair.length) {
    for (var i = 0; i < inputsPair.length; i++) {
        console.log('-----------------' + i);
        if (activationFunc(y_in(bias, inputsPair[i], wChar)) != targetChar[i]) {

            console.log('Net: ' + y_in(bias, inputsPair[i], wChar));
            console.log('Out:' + activationFunc(y_in(bias, inputsPair[i], wChar)));
            console.log('Target: ' + target[i]);

            wChar = weightUptade(wChar, alpha, targetChar[i], inputsPair[i]);
            bias = biasUpdate(bias, alpha, targetChar[i]);

            console.log('Pesos: [' + wChar + ']');
            console.log('Bias: ' + bias);

            wChange = 0;
        } else {
            wChange = wChange + 1;
            console.log('Não atualizou o peso.');
        }
    }
    if (wChange != inputsPair.length) {
        wChange = 0;
    }
    epoch++;
}

console.log('-------FIM-------');

console.log('Pesos ao final do treinamento: [' + wChar + ']');
console.log('Bias ao final fo treinamento:  ' + bias);
console.log('Épocas de treinamento: ' + epoch);

neuron([inputsPair[0]], wChar, bias);
neuron([font2[1]], wChar, bias);