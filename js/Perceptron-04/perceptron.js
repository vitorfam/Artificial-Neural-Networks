function y_in(b, inputs, weights) {
    let x = inputs.map(function (x, i) {
        return x * weights[i];
    });
    return b + x.reduce(function (vold, vnew, i) {
        return vold + vnew
    }, 0);
}

function activationFunc(y_in) {
    let theta = 1;
    if (y_in > theta) {
        return 1;
    }
    if (y_in < theta) {
        return -1;
    } else {
        return 0;
    }
}

//Alpha is the learning rate.

function weightUptade(weights, alpha, targets, inputs) {
    return weights.map((wi, i) => wi + alpha * target[i] * inputs[i]);
}

function train(inputs, weights, bias, target, alpha) {
    let yIn = y_in(bias, inputs[0], weights);
    let y = activationFunc(yIn);
    if (y == target[0]) {
        console.log(weights);

        return weights;
    } else {
        console.log(target);

        return train(inputs.slice(1), weights, bias, target.slice(1), alpha);
    }
}

var target = [1, -1];
var x = [1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, 1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, 1];
var t = [1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1];
var inputs = [x, t];