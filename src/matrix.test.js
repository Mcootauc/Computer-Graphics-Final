import {
  scaleMatrix,
  orthoProjection,
  new4x4Matrix,
  matrixMultiplier,
  perspectiveProjection,
  matrixConversion
} from './matrix'

describe('Matrix Multiplication', () => {
  it('should return a 4x4 matrix using multiplication', () => {
    const matrix1 = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
    const matrix2 = [2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5]
    const resultMatrix = [14, 28, 42, 56, 14, 28, 42, 56, 14, 28, 42, 56, 14, 28, 42, 56]

    expect(matrixMultiplier(matrix1, matrix2)).toEqual(resultMatrix)
  })
})

describe('Matrix Conversion', () => {
  it('should return a column-major matrix', () => {
    const matrix = [1, 4, 7, 10, 13, 16, 2, 5, 8, 11, 14, 3, 6, 9, 12, 15]
    const resultMatrix = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

    console.log('conversion', matrixConversion(matrix))
    expect(matrixConversion(matrix)).toEqual(resultMatrix)
  })
})

describe('Scale Matrix implementation', () => {
  describe('Scale the given matrix by a given number', () => {
    it('should scale the x y and z by a positive number', () => {
      const matrixBase = new4x4Matrix()
      const answerMatrix = new Array(16)
      for (let i = 0; i < 16; i++) {
        answerMatrix[i] = 0
      }
      answerMatrix[0] = 7
      answerMatrix[5] = 7
      answerMatrix[10] = 7
      answerMatrix[15] = 1

      const scaledMatrix = scaleMatrix(matrixBase, 7, 7, 7)
      expect(scaledMatrix).toEqual(answerMatrix)
    })
    it('should scale the x y and z by a negative number', () => {
      const matrixBase = new4x4Matrix()
      const answerMatrix = new Array(16)
      for (let i = 0; i < 16; i++) {
        answerMatrix[i] = 0
      }
      answerMatrix[0] = -7
      answerMatrix[5] = -7
      answerMatrix[10] = -7
      answerMatrix[15] = 1

      const scaledMatrix = scaleMatrix(matrixBase, -7, -7, -7)
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

      expect(() => scaleMatrix(matrixBase, 1, 1, 1)).toThrowError('Input matrix is not a 4x4 matrix')
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

describe('Perspective Projection', () => {
  it('should make an accurate perspective projection matrix', () => {
    const matrix = perspectiveProjection(1, 2, 3, 4, 1, 2)
    const result = [0, 0, 0, 0, 0, -2.5, 0, 0, 3, 7, -3, -1, 0, 0, -4, 0]

    expect(matrix).toEqual(result)
  })
  it('should calculate matrix multiplication', () => {
    const matrix1 = perspectiveProjection(1, 2, 3, 4, 1, 2)
    const matrix2 = perspectiveProjection(0.5, -0.5, 3, 5, 2, 1)
    const result = [0, 0, 0, 0, 0, 5.5, 0, 0, 9, 11, -5, -3, 12, 28, -12, -4]

    expect(matrixMultiplier(matrix1, matrix2)).toEqual(result)
  })
})
