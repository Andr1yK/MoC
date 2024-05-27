const { cos, sin } = Math;

function phiX(y) {
  return 0.7 - cos(y - 1);
}

function phiY(x) {
  return (2 - sin(x)) / 2;
}

function simpleIteration(phiX, phiY, initialGuess, tol, maxIterations) {
  let [x, y] = initialGuess;
  let iterations = 0;
  let xNew, yNew;

  do {
    xNew = phiX(y);
    yNew = phiY(x);

    if (Math.abs(xNew - x) < tol && Math.abs(yNew - y) < tol) {
      return { root: [xNew, yNew], iterations: iterations + 1 };
    }

    x = xNew;
    y = yNew;
    iterations++;
  } while (iterations < maxIterations);

  return { root: [xNew, yNew], iterations };
}

// Example usage:
const initialGuess = [0.5, 0.5];
const tol = 0.001;
const maxIterations = 100;

const result = simpleIteration(phiX, phiY, initialGuess, tol, maxIterations);
console.log(`Root found: x = ${result.root[0].toFixed(4)}, y = ${result.root[1].toFixed(4)}, after ${result.iterations} iterations.`);
