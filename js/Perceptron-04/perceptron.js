function y_in(bias, input, weights) {
  return (
    bias +
    input
    .map((x, index) => {
      return x * weights[index];
    })
    .reduce((vOld, vNew) => {
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
  w = weights.map((wi, index) => {
    return wi + alpha * target * inputs[index];
  });
  return w;
}

function biasUpdate(bias, alpha, target) {
  return bias + alpha * target;
}

function train(input, bias, weights, target, alpha) {
  let weightChange = 0;
  let trainEpoch = 0;

  while (weightChange != input.length) {
    for (var i = 0; i < input.length; i++) {
      // console.log(`--------------- Input ${i} -------------`);
      let netInput = y_in(bias, input[i], weights);
      let output = activationFunc(netInput);
      if (output != target[i]) {
        // console.log(`Net Input: ${netInput}`);
        // console.log(`Output: ${output}`);
        // console.log(`Target: ${target[i]}`);
        weights = weightUptade(weights, alpha, target[i], input[i]);
        bias = biasUpdate(bias, alpha, target[i]);
        // console.log(`Pesos: [${weights}]`);
        // console.log(`Bias: ${bias}`);
        weightChange = 0;
      } else {
        weightChange = weightChange + 1;
        // console.log('Não houve alterações nos pesos.');
      }
    }
    if (weightChange != input.length) {
      weightChange = 0;
    }
    trainEpoch++;
  }
  return {
    'weights': weights,
    'bias': bias,
    'epochs': trainEpoch
  }
}

function neuron(inputs, weights, bias) {
  inputs.forEach(pair => {
    // console.log('Input Pair: [' + pair + '] - \nOutput: ' + activationFunc(y_in(bias, pair, weights)));
    console.log(`Output: ${activationFunc(y_in(bias, pair, weights))}`);
  });
}

function randomWeights(n) {
  let weights = new Array();
  for (var i = 0; i < n; i++) {
    weights[i] = Math.random();
  }
  return weights;
}

var alpha = 0.4;

var bias = 0;

// Weight change counter.
var wChange = 0;

// Training epochs counter.
var epoch = 0;

// Target for AND, uncomment the following line to train for this problem.
var targetAnd = [1, -1, -1, -1];

// Target for OR, uncomment the following line to train for this problem.
var targetOr = [1, 1, 1, -1];

// var target = [-1, 1, 1, 1, 1, 1, 1, 1];

// var inputs = [
//     [1, 1],
//     [1, 0],
//     [0, 1],
//     [0, 0]
// ];

// Weights are initialized with 0.
// If the input has N element, you must initilize N weights.
// var w = [0, 0, 0];

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

var wChar = [
  0, 0, 0, 0, 0, 0,
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

var wrongA = [
  0, 0, 0, 1, 0, 0, 1,
  0, 0, 0, 1, 0, 0, 0,
  0, 0, 1, 1, 1, 0, 0,
  1, 0, 1, 0, 1, 0, 1,
  0, 0, 1, 0, 1, 0, 0,
  0, 1, 1, 1, 1, 1, 1,
  0, 1, 0, 0, 0, 1, 0,
  1, 1, 0, 1, 0, 1, 0,
  1, 1, 0, 0, 0, 1, 1
];

var wrongB = [
  1, 1, 1, 1, 1, 1, 0,
  1, 0, 0, 0, 0, 0, 1,
  1, 1, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 1, 1,
  1, 1, 0, 0, 0, 0, 0,
  1, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 0
];

var randomWeights = randomWeights(inputsPair[0].length);
var randBias = Math.random();
x = train(font2, randBias, randomWeights, targetChar, 0.09);
console.log(`Epocas: ${x.epochs}`);
y = train(inputsPair, x.bias, x.weights, targetChar, 0.09);
// console.log(y.weights);
console.log(`Epocas: ${y.epochs}`);

// neuron([inputsPair[1]], y.weights, y.bias); // B
for (var i = 0; i < inputsPair.length; i++) {
  neuron([inputsPair[i]], y.weights, y.bias);
}
// neuron([font2[0]], y.weights, y.bias); // A
neuron([wrongB], y.weights, y.bias); // A