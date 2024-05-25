function gaussSeidelMethod(A, b, initialGuess, tolerance, maxIterations) {
  const n = b.length;
  let x = initialGuess;
  let iterations = 0;
  let error;

  do {
    let newX = [...x];
    error = 0;
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          sum += A[i][j] * newX[j]; // Use the most recently updated values
        }
      }
      newX[i] = (b[i] - sum) / (1 - A[i][i]); // Solving for the ith variable
      error = Math.max(error, Math.abs(newX[i] - x[i])); // Calculate max error in the iteration
    }
    x = [...newX]; // Update all values at once after each iteration
    iterations++;
  } while (error > tolerance && iterations < maxIterations);

  return { solution: x, iterations };
}

// Coefficients matrix A and vector b
// const A = [
//   [0.32, -0.18, 0.02, 0.21],
//   [0.16, 0.12, -0.14, 0.27],
//   [0.37, 0.27, -0.02, -0.24],
//   [0.12, 0.21, -0.18, 0.25]
// ];
// const b = [1.83, -0.65, 2.23, -1.13];

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

const initialGuess = [...b];
const tolerance = 0.001;
const maxIterations = 100;

Array.prototype.toString = function() {
  return `[${this.join(', ')}]`;
}

const { solution, iterations } = gaussSeidelMethod(A, b, initialGuess, tolerance, maxIterations);
console.log(`Converged in ${iterations} iterations with solution: ${solution.map(x => x.toFixed(4))}`);
