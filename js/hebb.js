var bias = 1;
var inputs = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1]
];
var target = [1, -1, -1, -1];
var weights = [2, 2];

function newBias(bias, target) {
    if (target == 1) {
        return bias + 1;
    } else {
        return bias - 1;
    }
}

function biasUpdate(bias, targets) {
    if (targets.length == 0) {
        return bias;
        console.log(bias);
    } else {
        let nBias = bias + targets[0];
        console.log(nBias);
        biasUpdate(nBias, targets.slice(1));
    }
}

function newWeight(wOld, input, target) {
    return wOld + (input * target);
}

function weightsUpdate(input, targets, weights) {
    if (input.length == 0) {
        return weights;

    } else {
        let weightNew = new Array();
        let inputPair = input[0];
        let t = targets[0];
        for (i = 0; i < weights.length; i++) {
            weightNew[i] = newWeight(weights[i], inputPair[i], t);
        }
        console.log(weightNew);


        weightsUpdate(input.slice(1), targets.slice(1), weightNew);
    }
}

//The neuron:
function net(inputs, weights, bias) {
    let x = inputs.reduce(function (input, weight, i) {
        return input + weight * weights[i]
    }, 0);
    return bias + x;
}

function f_net(net) {
    if (net >= 0) {
        return 1
    } else {
        return -1
    }
}

for (var n = 0; n < inputs.length; n++) {
    console.log(f_net(-1 + inputs[n].reduce(function (r, a, i) {
        return r + a * weights[i]
    }, 0)));
}