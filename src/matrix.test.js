import {scaleMatrix, orthoProjection, new4x4Matrix} from "./matrix";
import { mat4 } from 'gl-matrix';


describe('Scale Matrix implementation', () => {
    describe('Scale the given matrix by a given number', () => {
        it('should scale the x y and z by 3', () => {
        const matrixBase = new4x4Matrix();
        const answerMatrix = new Array(16);
        for (let i = 0; i < 16; i++) {
            answerMatrix[i] = 0;
        }
        answerMatrix[0] = 3;
        answerMatrix[5] = 3;
        answerMatrix[10] = 3;
        answerMatrix[15] = 1;
        
        const scaledMatrix = scaleMatrix(matrixBase, 3, 3, 3);
        expect(scaledMatrix).toEqual(answerMatrix);
        })
    })
})

describe('orthoProjection', () => {
    test('should return a 4x4 matrix', () => {
      const matrix = orthoProjection(-1, 1, -1, 1, -1, 1);
      expect(matrix.length).toBe(16);
    });
  
    test('should project the given coordinates to the normalized device coordinates', () => {
      const input = new Float32Array([0, 0, 0, 1]);
      const expectedOutput = new Float32Array([0.75, 0.75, -0.5, 1]);
      const output = new Float32Array(4);
      const matrix = orthoProjection(-1, 1, -1, 1, -1, 1);
    
      mat4.multiply(output, input, matrix);
      for (let i = 0; i < output.length; i++) {
        output[i] = parseFloat(output[i].toFixed(2)); // Round output to 2 decimal places
      }
    
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
  
