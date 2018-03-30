function y_in (b, inputs, weights) {
    return b + inputs.reduce(function (vold, vnew, i) {
        return vold + vnew * weights[i]
    }, 0);
}

function activationFunc(y_in){
    let theta = 1;
    if(y_in > theta) {
        return 1;
    }
    if(y_in < theta) {
        return -1;
    } else {
        return 0;
    }
}

//Alpha is the learning rate.

function weightUptade (weights, alpha, targets, inputs) {
    return weights.map((wi, i) =>  wi + alpha*target[i]*inputs[i]);
}

function train(inputs, weights, bias, target, alpha) {
    let yIn = y_in(bias, inputs[0], weights);
    let y = activationFunc(yIn);
    if(y == target[0]) {
        return weights;
    } else {
        return train(inputs.slice(1), weights, bias, target.slice(1), alpha);
    }
}
