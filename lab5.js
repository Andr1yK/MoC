function f(x) {
  return x * x * x - 3 * x * x + 9 * x + 2;  // Function f(x) = x^3 - 3x^2 + 9x + 2
}

function bisectionMethod(f, a, b, tol, maxIterations) {
  if (f(a) * f(b) >= 0) {
    throw new Error('Function has the same signs at the endpoints.');
  }

  let c = a;
  let iterations = 0;

  while ((b - a) / 2 > tol) {
    iterations++;
    c = (a + b) / 2;
    let fc = f(c);

    if (fc === 0 || (b - a) / 2 < tol) {
      break;
    }

    if (f(a) * fc < 0) {
      b = c;
    } else {
      a = c;
    }

    if (iterations >= maxIterations) {
      throw new Error('Maximum iterations reached without convergence.');
    }
  }

  return { root: c, iterations: iterations };
}

// Example usage:
const a = -3; // Left endpoint of the interval
const b = 3;  // Right endpoint of the interval
const tol = 0.0001; // Tolerance
const maxIterations = 100; // Maximum number of iterations

try {
  const result = bisectionMethod(f, a, b, tol, maxIterations);
  console.log(`Root found: ${result.root.toFixed(4)}, after ${result.iterations} iterations.`);
} catch (error) {
  console.error(error);
}
