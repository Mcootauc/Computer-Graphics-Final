//Matrix Library
//Matrix Generator that automatically outputs an identity matrix
function new4x4Matrix() {
  const matrix = new Array(16)
  for (let i = 0; i < 16; i++) {
    matrix[i] = 0
  }

  // Set some values in the matrix
  matrix[0] = 1
  matrix[5] = 1
  matrix[10] = 1
  matrix[15] = 1

  return matrix
}

// 4x4 Matrix multiplier
// need help on how to access the individual rows, cols
function matrixMultiplier(matrix1, matrix2) {
  let result = []
  if (matrix1.length != matrix2.length) {
    console.error('invalid')
    return
  }

  result[0] = matrix1[0] * matrix2[0] + matrix1[4] * matrix2[1] + matrix1[8] * matrix2[2] + matrix1[12] * matrix2[3]
  result[1] = matrix1[1] * matrix2[0] + matrix1[5] * matrix2[1] + matrix1[9] * matrix2[2] + matrix1[13] * matrix2[3]
  result[2] = matrix1[2] * matrix2[0] + matrix1[6] * matrix2[1] + matrix1[10] * matrix2[2] + matrix1[14] * matrix2[3]
  result[3] = matrix1[3] * matrix2[0] + matrix1[7] * matrix2[1] + matrix1[11] * matrix2[2] + matrix1[15] * matrix2[3]

  result[4] = matrix1[0] * matrix2[4] + matrix1[4] * matrix2[5] + matrix1[8] * matrix2[6] + matrix1[12] * matrix2[7]
  result[5] = matrix1[1] * matrix2[4] + matrix1[5] * matrix2[5] + matrix1[9] * matrix2[6] + matrix1[13] * matrix2[7]
  result[6] = matrix1[2] * matrix2[4] + matrix1[6] * matrix2[5] + matrix1[10] * matrix2[6] + matrix1[14] * matrix2[7]
  result[7] = matrix1[3] * matrix2[4] + matrix1[7] * matrix2[5] + matrix1[11] * matrix2[6] + matrix1[15] * matrix2[7]

  result[8] = matrix1[0] * matrix2[8] + matrix1[4] * matrix2[9] + matrix1[8] * matrix2[10] + matrix1[12] * matrix2[11]
  result[9] = matrix1[1] * matrix2[8] + matrix1[5] * matrix2[9] + matrix1[9] * matrix2[10] + matrix1[13] * matrix2[11]
  result[10] = matrix1[2] * matrix2[8] + matrix1[6] * matrix2[9] + matrix1[10] * matrix2[10] + matrix1[14] * matrix2[11]
  result[11] = matrix1[3] * matrix2[8] + matrix1[7] * matrix2[9] + matrix1[11] * matrix2[10] + matrix1[15] * matrix2[11]

  result[12] =
    matrix1[0] * matrix2[12] + matrix1[4] * matrix2[13] + matrix1[8] * matrix2[14] + matrix1[12] * matrix2[15]
  result[13] =
    matrix1[1] * matrix2[12] + matrix1[5] * matrix2[13] + matrix1[9] * matrix2[14] + matrix1[13] * matrix2[15]
  result[14] =
    matrix1[2] * matrix2[12] + matrix1[6] * matrix2[13] + matrix1[10] * matrix2[14] + matrix1[14] * matrix2[15]
  result[15] =
    matrix1[3] * matrix2[12] + matrix1[7] * matrix2[13] + matrix1[11] * matrix2[14] + matrix1[15] * matrix2[15]

  console.log('your result is: ', result)
  return result
}

// Translates a given matrix by whatever numbers you want. 'a' translates the x-coord,
// 'b' translates the y-coord, 'c' translates the z-coord.
function translateMatrix(matrix4, a, b, c) {
  matrix4[3] += a // last entry in col. 1
  matrix4[7] += b // last entry in col. 2
  matrix4[11] += c // last entry in col. 3
  return matrix4
}

// Scales a given matrix by whatever numbers you want. 'a' scales the x-coord,
// 'b' scales the y-coord, 'c' scales the z-coord.
function scaleMatrix(matrix4, a, b, c) {
  if (matrix4.length !== 16) {
    throw new Error('Input matrix is not a 4x4 matrix')
  }
  matrix4[0] *= a // row[1]col[1]
  matrix4[5] *= b // row[2]col[2]
  matrix4[10] *= c // row[3]col[3]
  return matrix4
}

// Rotation Matrix from class
// CAN be refactored for our use
const rotationMatrix = (angle, x, y, z) => {
  // In production code, this function should be associated
  // with a matrix object with associated functions.
  const axisLength = Math.sqrt(x * x + y * y + z * z)
  const s = Math.sin((angle * Math.PI) / 180.0)
  const c = Math.cos((angle * Math.PI) / 180.0)
  const oneMinusC = 1.0 - c

  // Normalize the axis vector of rotation.
  x /= axisLength
  y /= axisLength
  z /= axisLength

  // Now we can calculate the other terms.
  // "2" for "squared."
  const x2 = x * x
  const y2 = y * y
  const z2 = z * z
  const xy = x * y
  const yz = y * z
  const xz = x * z
  const xs = x * s
  const ys = y * s
  const zs = z * s

  // GL expects its matrices in column major order.
  return [
    x2 * oneMinusC + c,
    xy * oneMinusC + zs,
    xz * oneMinusC - ys,
    0.0,

    xy * oneMinusC - zs,
    y2 * oneMinusC + c,
    yz * oneMinusC + xs,
    0.0,

    xz * oneMinusC + ys,
    yz * oneMinusC - xs,
    z2 * oneMinusC + c,
    0.0,

    0.0,
    0.0,
    0.0,
    1.0
  ]
}

function orthoProjection(left, right, bottom, top, near, far) {
  const result = new Float32Array(16)

  result[0] = 2 / (right - left)
  result[5] = 2 / (top - bottom)
  result[10] = -1 / (far - near)
  result[12] = (right + left) / (left - right)
  result[13] = (top + bottom) / (bottom - top)
  result[14] = -near / (near - far)
  result[15] = 1

  return result
}

function perspectiveProjection(left, right, bottom, top, near, far) {
  const matrix = new Float32Array([
    (2 * near) / right - left,
    0,
    0,
    0,

    0,
    (2 * near) / top - bottom,
    0,
    0,

    (right + left) / (right - left),
    (top + bottom) / (top - bottom),
    -(far + near) / (far - near),
    -1,

    0,
    0,
    (-2 * near * far) / (far - near),
    0
  ])
  return matrix
}

export {
  scaleMatrix,
  matrixMultiplier,
  new4x4Matrix,
  translateMatrix,
  rotationMatrix,
  orthoProjection,
  perspectiveProjection
}
