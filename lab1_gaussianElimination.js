// Example matrix [A|b]
const matrix = [
  [2.5, -0.91, -0.32, 0.287],
  [-0.91, 3.64, -0.48, 5.418],
  [0.48, -0.98, 2.14, 5.908]
];

console.log('Solution:', lab1_gaussianElimination(matrix));

function findPivotRow(matrix, startRow, pivotIndex) {
  let maxRow = startRow;
  let maxEl = Math.abs(matrix[startRow][pivotIndex]);

  for (let i = startRow + 1; i < matrix.length; i++) {
    if (Math.abs(matrix[i][pivotIndex]) > maxEl) {
      maxEl = Math.abs(matrix[i][pivotIndex]);
      maxRow = i;
    }
  }

  return maxRow;
}

function swapRows(matrix, row1, row2, startCol) {
  for (let i = startCol; i < matrix[row1].length; i++) {
    let temp = matrix[row1][i];
    matrix[row1][i] = matrix[row2][i];
    matrix[row2][i] = temp;
  }
}

function reduceRow(matrix, pivotRow, currentRow, pivotIndex) {
  const factor = -matrix[currentRow][pivotIndex] / matrix[pivotRow][pivotIndex];
  for (let i = pivotIndex; i < matrix[pivotRow].length; i++) {
    if (i === pivotIndex) {
      matrix[currentRow][i] = 0;
    } else {
      matrix[currentRow][i] += factor * matrix[pivotRow][i];
    }
  }
}

function backSubstitution(matrix) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;
  const solution = new Array(numRows).fill(0);

  for (let i = numRows - 1; i >= 0; i--) {
    solution[i] = matrix[i][numCols - 1] / matrix[i][i];
    for (let j = i - 1; j >= 0; j--) {
      matrix[j][numCols - 1] -= matrix[j][i] * solution[i];
    }
  }

  return solution;
}

function lab1_gaussianElimination(matrix) {
  const numRows = matrix.length;

  for (let i = 0; i < numRows; i++) {
    let maxRow = findPivotRow(matrix, i, i);

    swapRows(matrix, i, maxRow, i);

    for (let j = i + 1; j < numRows; j++) {
      reduceRow(matrix, i, j, i);
    }
  }

  return backSubstitution(matrix);
}
