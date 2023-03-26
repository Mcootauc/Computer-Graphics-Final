// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import {scaleMatrix, new4x4Matrix} from "./matrix";

describe('Scale Matrix implementation', () => {
  describe('Scale the given matrix by a given number', () => {
    it('should scale the x y and z by 3', () => {
      const matrixBase = new4x4Matrix();
      let answerMatrix = fromValues(
        3.0, 0.0, 0.0, 0.0,
        0.0, 3.0, 0.0, 0.0,
        0.0, 0.0, 3.0, 0.0,
        0.0, 0.0, 0.0, 3.0
      );
      const scaledMatrix = scaleMatrix(matrixBase, 3, 3, 3);
      expect(scaledMatrix).toHaveValue(answerMatrix);
    })
  })
})


describe('orthoProjection', () => {
  test('should return a 4x4 matrix', () => {
    const matrix = orthoProjection(-1, 1, -1, 1, -1, 1);
    expect(matrix.length).toBe(16);
  });

  test('should project the given coordinates to the normalized device coordinates', () => {
    const matrix = orthoProjection(-1, 1, -1, 1, -1, 1);
    const input = [0.5, 0.5, 0.5, 1];
    const expectedOutput = [0.75, 0.75, -0.5, 1];
    const output = new Float32Array(4);
    mat4.multiply(output, input, matrix);
    expect(output).toEqual(expectedOutput);
  });

  test('should be the identity matrix when left = -right, bottom = -top and near = -far', () => {
    const matrix = orthoProjection(-1, 1, -1, 1, -1, 1);
    const identityMatrix = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);
    expect(matrix).toEqual(identityMatrix);
  });
});
