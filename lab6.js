function f(x) {
  return x * x * x - 3 * x * x + 9 * x + 2; // The function f(x) = x^3 - 3x^2 + 9x + 2
}

function chordMethod(f, x0, x1, tol, maxIterations) {
  let n = 0;
  let x2;

  do {
    let fx0 = f(x0);
    let fx1 = f(x1);

    if (fx1 - fx0 === 0) {
      throw new Error("Division by zero in the chord method iteration formula.");
    }

    x2 = x1 - fx1 * ((x1 - x0) / (fx1 - fx0)); // Chord method formula

    if (Math.abs(x2 - x1) < tol) { // Check convergence
      return { root: x2, iterations: n + 1 };
    }

    // Update x0 and x1 for next iteration
    x0 = x1;
    x1 = x2;
    n++;
  } while (n < maxIterations);

  return { root: x2, iterations: n }; // If loop finishes without convergence
}

// Example usage:
const x0 = -2; // Initial guess
const x1 = 0; // Second initial guess
const tol = 0.001; // Tolerance for convergence
const maxIterations = 100; // Maximum number of iterations

try {
  const result = chordMethod(f, x0, x1, tol, maxIterations);
  console.log(`Root found: ${result.root}, after ${result.iterations} iterations.`);
} catch (error) {
  console.error(error);
}
