function f(x) {
  return x * x * x - 3 * x * x + 9 * x + 2;  // The function f(x) = x^3 - 3x^2 + 9x + 2
}

function fPrime(x) {
  return 3 * x * x - 6 * x + 9; // The derivative f'(x) = 3x^2 - 6x + 9
}

function newtonMethod(f, fPrime, initialGuess, tol, maxIterations) {
  let x = initialGuess;
  let iterations = 0;
  let xNew;

  do {
    const fx = f(x);
    const dfx = fPrime(x);

    if (dfx === 0) throw new Error('Zero derivative. No solution found.');

    xNew = x - fx / dfx; // Newton's formula

    if (Math.abs(xNew - x) < tol) return { root: xNew, iterations: iterations + 1 };

    x = xNew;
    iterations++;
  } while (iterations < maxIterations);

  return { root: xNew, iterations };
}

// Example usage:
const initialGuess = -2; // Initial guess
const tol = 0.0001; // Tolerance for convergence
const maxIterations = 100; // Maximum number of iterations

try {
  const result = newtonMethod(f, fPrime, initialGuess, tol, maxIterations);
  console.log(`Root found: ${result.root.toFixed(4)}, after ${result.iterations} iterations.`);
} catch (error) {
  console.error(error);
}
