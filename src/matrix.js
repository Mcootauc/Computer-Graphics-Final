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
function multiply4x4Matrices(m1, m2) {
  let result = []
  if (m1.size() != m2.size()) {
    console.error()
    return
  }

  for (let i = 0; i < m1.size(); i++) {
    for (let j = 0; j < m1[3][3]; j++) {
      result[i][j] = 0
      for (let k = 0; k < m2[3][3]; k++) {
        result += m1[i][j] * m2[j][k]
      }
    }
  }
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
  const width = right - left
  const height = top - bottom
  const depth = far - near
  const x3 = -(right + left) / width
  const y3 = -(top + bottom) / height
  const z3 = -(far + near) / depth

  //prettier-ignore
  const matrix = new Float32Array([
        2 / width, 0, 0, x3,
        0, 2 / height, 0, y3, 
        0, 0, -2 / depth, z3,
        0, 0, 0, 1
    ])

  return matrix
}

function perspectiveProjection(left, right, bottom, top, near, far) {
  const width = right - left
  const height = top - bottom
  const depth = far - near
  const x2 = (right + left) / width
  const y2 = (top + bottom) / height
  const z2 = -(far + near) / depth

  //prettier-ignore
  const matrix = new Float32Array([
        (2 * near) / width, 0, x2, 0,
        0, (2 * near) / height, y2, 0,
        0, 0, z2, (-2 * near * far) / depth,
        0, 0, -1, 0
    ])
  return matrix
}

export { scaleMatrix, new4x4Matrix, translateMatrix, rotationMatrix, orthoProjection, perspectiveProjection }
