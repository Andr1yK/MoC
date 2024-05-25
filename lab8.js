function f(x) {
  return x ** 3 - 3 * x ** 2 + 9 * x + 2;
}

function fPrime(x) {
  return 3 * x ** 2 - 6 * x + 9;
}

function combinedMethod(f, fPrime, x0, x1, tol, maxIterations) {
  let iterations = 0;

  while (iterations < maxIterations) {
    iterations++;

    let fx0 = f(x0);
    let fx1 = f(x1);

    // Secant step to find x2
    let x2 = x1 - fx1 * (x1 - x0) / (fx1 - fx0);

    // Tangent step from x2
    let fx2 = f(x2);
    if (fPrime(x2) === 0) throw new Error('Zero derivative. No solution found.');
    let x3 = x2 - fx2 / fPrime(x2);

    // Check for convergence
    if (Math.abs(x3 - x1) < tol) return { root: x3, iterations };

    // Update x0 and x1 for the next iteration
    x0 = x1;
    x1 = x3;
  }

  throw new Error('Maximum iterations reached without convergence.');
}

// Example usage:
const x0 = -3; // Initial guess
const x1 = 3;  // Second initial guess
const tol = 0.0001; // Tolerance for convergence
const maxIterations = 100; // Maximum number of iterations

try {
  const result = combinedMethod(f, fPrime, x0, x1, tol, maxIterations);
  console.log(`Root found: ${result.root.toFixed(4)}, after ${result.iterations} iterations.`);
} catch (error) {
  console.error(error);
}
