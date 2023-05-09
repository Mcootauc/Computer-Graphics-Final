

## Our 3D Library 3

##### https://github.com/lmu-cmsi3710-spring2023/our-own-3d-library-mitch-gage-david-kevin

| Category | Feedback | Points |
| --- | --- | ---: |
| | **4×4 matrix object/library** | |
| • Identity | New matrix defaults to the identity matrix | 2/2 |
| • Multiplication | Matrix multiplication is implemented  | 8/8 |
| • Group matrix | All matrices are implemented | 4/4 |
| • GLSL conversion | Conversion to column-major 1D `Float32Array` is not implemented, however, matrices are returned as a 16 element 1D array.  Please note that it would be better if you created helper functions within the matrix class for common matrix applications. Because you end up calling `new Float32Array()` on an instance of the matrix every single time, it would be prudent to simply return a new instance of a `Float32Array` rather than a simple 1D 16 element array (–1) | 2/3 |
| • Implementation | The matrix library is implemented well enough. | 5/5 |
| | **Matrix test suite** | |
| • Identity test |  Identity matrix default is not explicitly tested (–1) | 0/1 |
| • Identity coverage | Identity matrix default is fully covered by tests | 1/1 |
| • Multiplication test | Matrix multiplication is explicitly tested | 4/4 |
| • Multiplication coverage | Matrix multiplication is almost fully covered by tests. You did not test for an invalid matrix, although you check for it. (–1) | 3/4 |
| • Group matrix test | Scale matrix, orthogonal projection matrix, and perspective projection matrix were tested. Translation and rotation matrices were not tested (–1)  | 1/2 |
| • Group matrix coverage | Matrices tested had full coverage, but untested matrices did not. (–1) | 1/2 |
| • GLSL conversion test | It appears that you had an unfixed merge conflict in this tag, and there was a test for gl conversions, but the code got deleted. We then found  the last iteration of your `matrixConversion` method and when it ran, the test failed. (–1) | 1/2 |
| • GLSL conversion coverage | Your `matrixConversion` method was fully covered | 1/1 |
| • _matrix-credits.md_ | _matrix-credits.md_ clearly lists who did what |  |
| | **Matrix use in 3D objects** | |
| • Instance transformation | An instance transform is not maintained or used (–10) | 0/10 |
| • Parent propagation | Groups do not propagate their transforms (–15) | 0/15 |
| • Implementation | Matrix is not used by 3D objects (–5) | 0/5 |
| | **Matrix use in projection** | |
| • Correct usage | You implemented your projection matrix directly in the `Scene` function and used default values. While this is fine for now, you should remember to give the user a mechanism to change from orthogonal to perspective, and the option to select which specific values to use. Remember projection is typically used to break out of the 2 by 2 square scene, so it should be customizable from the users perspective.  | 10/10 |
| • Implementation | Projection matrices are implemented well. | 5/5 |
| Extra credit (if any) | n/a |  |
| Code maintainability | Your tagged release had an active merge conflict within _matrix.test.js_. Make sure to check your repository both before you commit and before you submit an assignment. This could have been avoided by doing one last look through with your team to see if there were any inconsistencies in your repository (–2) | -2 |
| Code readability | Code is readable. No major readability issues. |  |
| Version control | Decent commit count with sufficiently descriptive messages |  |
| Punctuality | Last commit of tag: 03/29/23 11:52 PM<br /><br /> **Graded commit:** https://github.com/lmu-cmsi3710-spring2023/our-own-3d-library-mitch-gage-david-kevin/commit/8a8293b8a47a5ac3c89ea90bb4e831a260b905af |  |
| | **Total** | **46/84** |
