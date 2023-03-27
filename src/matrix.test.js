import { scaleMatrix, new4x4Matrix, orthoProjection, perspectiveProjection, multiply4x4Matrices } from './matrix'

describe('Matrix Multiplication', () => {
  it('should return a 4x4 matrix using multiplication', () => {
    const matrix1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    const matrix2 = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32]
    const resultMatrix = [180, 404, 628, 852, 200, 456, 712, 968, 220, 508, 796, 1084, 240, 560, 880, 1200]

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
  })
})

describe('orthoProjection', () => {
  test('should return a 4x4 matrix', () => {
    const matrix = orthoProjection(-1, 1, -1, 1, -1, 1)
    expect(matrix.length).toBe(16)
  })

  test('should project the given coordinates to the normalized device coordinates', () => {
    const matrix = orthoProjection(-1, 1, -1, 1, -1, 1)
    const input = [0.5, 0.5, 0.5, 1]
    const expectedOutput = [0.75, 0.75, -0.5, 1]
    const output = new Float32Array(4)
    mat4.multiply(output, input, matrix)
    expect(output).toEqual(expectedOutput)
  })

  test('should be the identity matrix when left = -right, bottom = -top and near = -far', () => {
    const matrix = orthoProjection(-1, 1, -1, 1, -1, 1)
    const identityMatrix = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    expect(matrix).toEqual(identityMatrix)
  })
})

describe('Perspective Matrix Implementation', () => {
  it('perpective test 1', () => {
    const matrix = perspectiveProjection(0.5, 0.5)
  })
  it('perspective test 2', () => {})
})
