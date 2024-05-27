function phi(x) {
  // Transforming the equation x = phi(x)
  return x - (x ** 3 - 3 * x ** 2 + 9 * x + 2) / 10;
}

function simpleIteration(phi, initialGuess, tol, maxIterations) {
  let x = initialGuess;
  let iterations = 0;
  let xNew;

  do {
    xNew = phi(x); // Applying the transformation
    if (Math.abs(xNew - x) < tol) {
      return { root: xNew, iterations: iterations + 1 };
    }
    x = xNew;
    iterations++;
  } while (iterations < maxIterations);

  return { root: xNew, iterations };
}

// Example usage:
const initialGuess = 0;
const tol = 0.001;
const maxIterations = 100;

const result = simpleIteration(phi, initialGuess, tol, maxIterations);
console.log(`Root found: ${result.root.toFixed(4)}, after ${result.iterations} iterations.`);
