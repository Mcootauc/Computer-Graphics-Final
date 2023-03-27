import { scaleMatrix, orthoProjection, new4x4Matrix } from './matrix'

describe('Matrix Multiplication', () => {
  it('should return a 4x4 matrix using multiplication', () => {
    const matrix1 = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
    const matrix2 = [2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5]
    const resultMatrix = [14, 28, 42, 56, 14, 28, 42, 56, 14, 28, 42, 56, 14, 28, 42, 56]

    expect(multiply4x4Matrices(matrix1, matrix2)).toEqual(resultMatrix)
  })
})

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
    it('should throw an error for not being a 4x4 matrix', () => {
      const matrixBase = new Array(9)
      for (let i = 0; i < 9; i++) {
        matrixBase[i] = 0
      }
      matrixBase[0] = 1
      matrixBase[4] = 1
      matrixBase[8] = 1

      
      expect(scaleMatrix(matrixBase, 1, 1, 1)).toThrow('Input matrix is not a 4x4 matrix')
    })
  })
})

describe('orthoProjection', () => {
  test('orthoProjection should return a Float32Array with the correct values', () => {
    const left = -1
    const right = 1
    const bottom = -1
    const top = 1
    const near = 1
    const far = 10

    const result = orthoProjection(left, right, bottom, top, near, far)

    const expected = new Float32Array([
      2 / (right - left),
      0,
      0,
      0,
      0,
      2 / (top - bottom),
      0,
      0,
      0,
      0,
      -1 / (far - near),
      0,
      (right + left) / (left - right),
      (top + bottom) / (bottom - top),
      -near / (near - far),
      1
    ])

    expect(result).toBeInstanceOf(Float32Array)
    expect(result).toHaveLength(16)
    expect(result).toEqual(expected)
  })
})
