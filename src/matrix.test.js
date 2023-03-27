import {scaleMatrix, orthoProjection, new4x4Matrix} from "./matrix";
import { mat4 } from 'gl-matrix';


describe('Scale Matrix implementation', () => {
  describe('Scale the given matrix by a given number', () => {
    it('should scale the x y and z by 3', () => {
      const matrixBase = new4x4Matrix()
      const answerMatrix = new Array(16)
      for (let i = 0; i < 16; i++) {
        answerMatrix[i] = 0
      }
      answerMatrix[0] = 3
      answerMatrix[5] = 3
      answerMatrix[10] = 3
      answerMatrix[15] = 1

      const scaledMatrix = scaleMatrix(matrixBase, 3, 3, 3)
      expect(scaledMatrix).toEqual(answerMatrix)
    })
  })
})

describe('orthoProjection', () => {
  test('orthoProjection should return a Float32Array with the correct values', () => {
    const left = -1;
    const right = 1;
    const bottom = -1;
    const top = 1;
    const near = 1;
    const far = 10;
  
    const result = orthoProjection(left, right, bottom, top, near, far);
  
    const expected = new Float32Array([
      2 / (right - left), 0, 0, 0,
      0, 2 / (top - bottom), 0, 0,
      0, 0, -1 / (far - near), 0,
      (right + left) / (left - right), (top + bottom) / (bottom - top), -near / (near - far), 1
    ]);
  
    expect(result).toBeInstanceOf(Float32Array);
    expect(result).toHaveLength(16);
    expect(result).toEqual(expected);
  });
  
});