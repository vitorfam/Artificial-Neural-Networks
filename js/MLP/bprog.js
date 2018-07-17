function bipolar_sigmoid(x) {
    return (2 / (1 + Math.exp(-1 * x))) - 1;
}

function bipolar_sigmoid_d(x) {
    return 0.5 * (1 + bipolar_sigmoid(x)) * (1 - bipolar_sigmoid(x));
}

function dotproduct(m1, m2) {
    return m1.map(function (el, index) {
        return el * m2[index];
    }).reduce(function (acc, val) {
        return acc + val;
    }, 0);
}

// Aplicar a função dotproduct para cada input de cada camada.

// Funções das camadas ocultas: