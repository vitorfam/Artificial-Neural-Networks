function y_in(input, weights) {
    return (
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

