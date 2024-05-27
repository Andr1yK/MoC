function f(x) {
  return 1 / Math.sqrt(x * x + 3.2);
}

function trapezoidalRule(a, b, n) {
  const h = (b - a) / n;
  let sum = (f(a) + f(b)) / 2;
  for (let i = 1; i < n; i++) {
    sum += f(a + i * h);
  }
  return sum * h;
}

function leftRiemannSum(a, b, n) {
  const h = (b - a) / n;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += f(a + i * h);
  }
  return sum * h;
}

function rightRiemannSum(a, b, n) {
  const h = (b - a) / n;
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += f(a + i * h);
  }
  return sum * h;
}

function simpsonsRule(a, b, n) {
  if (n % 2 !== 0) {
    throw new Error('Number of intervals must be even.');
  }

  const h = (b - a) / n;
  let sum = f(a) + f(b);

  for (let i = 1; i < n; i += 2) {
    sum += 4 * f(a + i * h);
  }

  for (let i = 2; i < n; i += 2) {
    sum += 2 * f(a + i * h);
  }

  return (h / 3) * sum;
}

// Example usage:
const a = 1.2;
const b = 2.7;
const n = 1000;

const trapezoidalResult = trapezoidalRule(a, b, n);
const leftRiemannResult = leftRiemannSum(a, b, n);
const rightRiemannResult = rightRiemannSum(a, b, n);
const simpsonsResult = simpsonsRule(a, b, n);

console.log(`Trapezoidal Rule: ${trapezoidalResult.toFixed(6)}`);
console.log(`Left Riemann Sum: ${leftRiemannResult.toFixed(6)}`);
console.log(`Right Riemann Sum: ${rightRiemannResult.toFixed(6)}`)
console.log(`Simpson's Rule: ${simpsonsResult.toFixed(6)}`);
