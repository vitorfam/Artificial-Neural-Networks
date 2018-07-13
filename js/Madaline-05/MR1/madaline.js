var arr1 = [1, 1];
var arr2 = [
  [2, 3, 1],
  [2, 2, 1]
  // ,
  // [1, 3, 1],
  // [1, 2, 1],
  // [1, 0, 1]
];
var bias = [0, 0, 0];
var res = [];

for (j = 0; j < bias.length; j++) {
  res.push(
    arr1
      .map(function(x, i) {
        return x * arr2[i][j];
      })
      .reduce((accum, curr) => accum + curr)
  );
}
//Input for each hidden unit:
function z_in(b, inputs, weights) {
  var res = [];
  for (j = 0; j < b.length; j++) {
    res.push(
      b[j] +
        inputs
          .map(function(x, i) {
            return x * weights[i][j];
          })
          .reduce((accum, curr) => accum + curr)
    );
  }
  return res;
}

var zin = z_in(bias, arr1, arr2);
console.log(zin);

//Output for each hidden unit:
function activationFunc(z_in) {
  if (z_in >= 0) {
    return 1;
  } else {
    return -1;
  }
}

//Output for the output layer:

var out = zin.map(activationFunc);
console.log(out);
