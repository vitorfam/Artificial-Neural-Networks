function y_in(b, inputs, weights) {
    return
    for (var i = 0; i < inputs.length; i++) {
        b + inputs[i].map(function (x, index) {
            return x * weights[index]
        }).reduce(function (vOld, vNew) {
            return vOld + vNew
        }, 0);
    }
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
    var w = [];
    for (var i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        w = weights.map(function (wi, x) {
            return wi + (alpha * target[i] * input[x]);
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

w = weightUptade(w, 0.5, target, inputs);

// for (var i = 0; i < inputs.length; i++) {
//     console.log(1 + inputs[i].map(function (x, index) {
//         return x * w[index]
//     }).reduce(function (vOld, vNew) {
//         return vOld + vNew
//     }, 0));
// }
console.log(1 + inputs[1].map(function (x, index) {
    return x * w[index]
}).reduce(function (vOld, vNew) {
    return vOld + vNew
}, 0));
// train(inputs, w, 1, target, 0.3);

// var w1 = w.map(function (wi, index) {
//     return wi + alpha * inputs[index];
// });
// console.log(w1);

// var w2 = w.map(function (wi, x) {
//     console.log(x);
//     return wi + (alpha * target[1] * s[x]);
// });

// console.log(w2);