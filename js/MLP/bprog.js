function bipolar_sigmoid(x) {
    return (2 / (1 + Math.exp(-1 * x))) - 1;
}

function bipolar_sigmoid_d(x) {
    return 0.5 * (1 + bipolar_sigmoid(x)) * (1 - bipolar_sigmoid(x));
}

// Funções das camadas ocultas:
