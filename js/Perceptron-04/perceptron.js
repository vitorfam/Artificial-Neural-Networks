function y_in(a, b, c) {
    return a + b.map(function (x, index) {
        return x * c[index]
    }).reduce(function (vOld, vNew) {
        return vOld + vNew
    }, 0);
}

var net = y_in(0, [1, 1], [0, 0]);
console.log(net);

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

function weightUptade(weights, alpha, target, inputs) {
    var w = [];
    for (var i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        w = weights.map(function (wi, x) {
            return wi + (alpha * target * input[x]);
        });
    }
    // console.log(w);
    return w;
}

function train(inputs, weights, bias, target, alpha) {
    let yIn = y_in(bias, inputs[0], weights);
    let y = activationFunc(yIn);

    if (y == target[0]) {
        // console.log(weights);
        return weights;
    } else {
        // console.log(weights);
        weights = weightUptade(weights, alpha, target, inputs);
        return train(inputs, weights, bias, target, alpha);
    }
}

var target = [1, -1];
var s = [1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, 1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, 1];
var t = [1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1];
var w = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var inputs = [s, t];
var alpha = 0.3;