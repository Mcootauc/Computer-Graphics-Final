// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

const scaleMatrix = require('./matrix');

let baseMatrix = mat4.fromValues(
    1, 0, 0, 0,  // First column
    0, 1, 0, 0,  // Second column
    0, 0, 1, 0,  // Third column
    0, 0, 0, 1   // Fourth column
);

let matrixAnswer = mat4.fromValues(
    2, 0, 0, 0,  // First column
    0, 3, 0, 0,  // Second column
    0, 0, 4, 0,  // Third column
    0, 0, 0, 1   // Fourth column
);

test('checks scaleMatrix', () => {
  expect(scaleMatrix(baseMatrix, 2, 3, 4)).toBe(matrixAnswer);
});