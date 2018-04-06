function y_in(bias, input, weights) {
    return bias + input.map(function (x, index) {
        return x * weights[index]
    }).reduce(function (vOld, vNew) {
        return vOld + vNew
    }, 0);
}

var net = y_in(0, [1, 1], [0, 0]);
// console.log(net);s

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
var y = activationFunc(net);
// console.log(y);

//Alpha is the learning rate.

function weightUptade(weights, alpha, target, inputs) {
    var w = [];
    w = weights.map(function (wi, x) {
        return wi + (alpha * target * inputs[x]);
    });
    return w;
}

function biasUpdate(bias, alpha, target) {
    return bias + alpha * target;
}

var nw = weightUptade([0, 0], 1, 1, [1, 1]);
// console.log(nw);

// var target = [1, -1];
// var s = [1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, 1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, 1];
// var t = [1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1];
// var w = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// var inputs = [s, t];
// var alpha = 1;

var target = [1, -1, -1, -1];
var inputs = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1]
];
var alpha = 0.2;
var bias = 0;
var w = [0, 0];

//Uma rodada de treinamento:
function round(target, inputs, alpha, bias, weights) {
    if (inputs.length == 0) {
        console.log("Fim");
        return {
            "w": weights,
            "bias": bias
        };
    } else {
        var net = y_in(bias, inputs[0], weights);
        var y = activationFunc(net);
        var w = weightUptade(weights, alpha, target[0], inputs[0]);
        var b = biasUpdate(bias, alpha, target[0])
        var out = {
            "y_in": net,
            "y": y,
            "t": target[0],
            "w": w,
            "bias": b
        };
        console.log(out);
        return round(target.slice(1), inputs.slice(1), alpha, b, w);
    }
}

// var net1 = y_in(bias, inputs[0], w);
// var y1 = activationFunc(net1);
// var w1 = weightUptade(w, alpha, target[0], inputs[0]);
// var b1 = biasUpdate(0, alpha, target[0])
// var out1 = {
//     "y_in": net1,
//     "y": y1,
//     "w": w1,
//     "bias": b1
// };
// console.log(out1);

// var net2 = y_in(b1, inputs[1], w1);
// var y2 = activationFunc(net2);
// var w2 = weightUptade(w1, alpha, target[1], inputs[1]);
// var b2 = biasUpdate(b1, alpha, target[1]);
// var out2 = {
//     "y_in": net2,
//     "y": y2,
//     "w": w2,
//     "bias": b2
// };
// console.log(out2);

// var net3 = y_in(b2,t,w2);
// var y3 = activationFunc(net3);
// var w3 = weightUptade(w2,alpha,target[0],inputs[0]);
// var b3 = biasUpdate(b2,alpha,target[0]);
// var out3 = {"y_in" : net3, "y" : y3, "w" : w3, "bias" : b3};
// console.log(out3);

// var net4 = y_in(b3,t,w3);
// var y4 = activationFunc(net4);
// var w4 = weightUptade(w3,alpha,target[1],inputs[1]);
// var b4 = biasUpdate(b3,alpha,target[1]);
// var out4 = {"y_in" : net4, "y" : y4, "w" : w4, "bias" : b4};
// console.log(out4);

// var net5 = y_in(b4,t,w4);
// var y5 = activationFunc(net5);
// var w5 = weightUptade(w4,alpha,target[0],inputs[0]);
// var b5 = biasUpdate(b4,alpha,target[0]);
// var out5 = {"y_in" : net5, "y" : y5, "w" : w5, "bias" : b5};
// console.log(out5);

var r = round(target, inputs, alpha, bias, w);
console.log(r);

var t1 = y_in(r.bias, [-1,-1], r.w);
var t2 = activationFunc(t1);
console.log(t2);
