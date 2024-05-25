function jacobiMethod(A, b, initialGuess, tolerance, maxIterations) {
  const n = b.length;
  let x = initialGuess;
  let newX = new Array(n).fill(0);
  let iterations = 0;
  let error = Infinity;

  while (error > tolerance && iterations < maxIterations) {
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          sum += A[i][j] * x[j];
        }
      }
      newX[i] = (b[i] - sum) / (1 - A[i][i]);
    }

    // Calculate the error as the maximum difference from old x to new x
    error = x.reduce((max, value, idx) => Math.max(max, Math.abs(value - newX[idx])), 0);
    x = [...newX]; // Update x to the new values
    iterations++;
  }

  return { solution: x, iterations };
}

// Matrix A coefficients and vector b
const A = [
  [-0.32,  0.18, -0.02, -0.21],
  [-0.16, -0.12,  0.14, -0.27],
  [-0.37, -0.27,  0.02, 0.24],
  [-0.12, -0.21,  0.18, -0.25]
];
const b = [1.83, -0.65, 2.23, -1.13];

// https://www.mathros.net.ua/nablyzhenyj-rozvjazok-systemy-linijnyh-rivnjan-metodom-prostoi-iteracii.html
// const A = [
//   [0, 0.5, 0.3, -0.4],
//   [0.4, 0, -0.3, 0],
//   [0.5, -0.7, 0, 0],
//   [0, -0.6, 0, 0]
// ];
// const b = [2, 1.3, -0.9, -0.2];
//
const initialGuess = [...b];// [2, 1.3, -0.9, -0.2];
const tolerance = 0.001;
const maxIterations = 100;

Array.prototype.toString = function() {
  return `[${this.join(', ')}]`;
}

const { solution, iterations } = jacobiMethod(A, b, initialGuess, tolerance, maxIterations);
console.log(`Converged in ${iterations} iterations with solution: ${solution.map(x => x.toFixed(4))}`);

// 2.0369,3.3259,-2.4552,2.7444
