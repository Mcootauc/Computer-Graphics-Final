//Matrix Library

//Matrix Generator that automatically outputs an identity matrix
function new4x4Matrix(){
    const m = mat4.create()
    mat4.identity(m)
    return m
}

// 4x4 Matrix multiplier
// need help on how to access the individual rows, cols
function multiply4x4Matrices(m1, m2){
    var result = []
    if(m1.size() != m2.size()){
        console.error();
        return
    }

    for(let i = 0; i < m1.size(); i++){
        for(let j = 0; j < m1[3][3]; j++){
            result[i][j] = 0
            for(let k = 0; k < m2[3][3]; k++){
                result += m1[i][j] * m2[j][k]
            }
        }
    }
    console.log("your result is: ", result)
    return result
}


/* Individual Matrix Implementations
* Gage Messner: Matrix Translations
* Kevin: 
* Mitchell Cootauco: Matrix Scale 
* David: 
* 
* Group: 
*/

// Translates a given matrix by whatever numbers you want. 'a' translates the x-coord, 
// 'b' translates the y-coord, 'c' translates the z-coord.
function translateMatrix(matrix4, a, b, c){
    matrix4[3] += a // last entry in col. 1
    matrix4[7] += b // last entry in col. 2
    matrix4[11] += c // last entry in col. 3
    return matrix4
}

// Scales a given matrix by whatever numbers you want. 'a' scales the x-coord, 
// 'b' scales the y-coord, 'c' scales the z-coord.
function scaleMatrix(matrix4, a, b, c){
    matrix4[3] *= a // last entry in col. 1
    matrix4[7] *= b // last entry in col. 2
    matrix4[11] *= c // last entry in col. 3
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

  function orthoProjection(left, right, bottom, top, near, far)
  {
    const width = right - left;
    const height = top  - bottom;
    const depth = far - near;
    const x3 = -(right + left) / width
    const y3 = -(top + bottom) / height
    const z3 = -(far + near) / depth

    const matrix = new Float32Array([
        2 / width, 0, 0, x3,
        0, 2 / height, 0, y3, 
        0, 0, -2 / depth, z3,
        0, 0, 0, 1
    ])

    return matrix;
  }