function luDecomposition(matrix) {
  const n = matrix.length;
  const L = Array.from({ length: n }, () => new Array(n).fill(0));
  const U = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    // Construct the Upper Triangular Matrix U
    for (let j = i; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < i; k++) {
        sum += (L[i][k] * U[k][j]);
      }
      U[i][j] = matrix[i][j] - sum;
    }

    // Construct the Lower Triangular Matrix L
    for (let j = i; j < n; j++) {
      if (i === j) {
        L[i][i] = 1;
      } else {
        let sum = 0;
        for (let k = 0; k < i; k++) {
          sum += (L[j][k] * U[k][i]);
        }
        L[j][i] = (matrix[j][i] - sum) / U[i][i];
      }
    }
  }

  return { L, U };
}

function forwardSubstitution(L, b) {
  const y = new Array(b.length).fill(0);

  for (let i = 0; i < b.length; i++) {
    let sum = 0;

    for (let j = 0; j < i; j++) {
      sum += L[i][j] * y[j];
    }

    y[i] = (b[i] - sum) / L[i][i];
  }

  return y;
}

function backSubstitution(U, y) {
  const x = new Array(y.length).fill(0);
  for (let i = y.length - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < y.length; j++) {
      sum += U[i][j] * x[j];
    }
    x[i] = (y[i] - sum) / U[i][i];
  }
  return x;
}

function solveLU(matrix, b) {
  const { L, U } = luDecomposition(matrix);

  const y = forwardSubstitution(L, b);

  return backSubstitution(U, y);
}

// Example matrix A and vector b
const A = [
  [2.5, -0.91, -0.32],
  [-0.91, 3.64, -0.48],
  [0.48, -0.98, 2.14]
];
const b = [0.287, 5.418, 5.908];

const solution = solveLU(A, b);
console.log('Solution:', solution);
