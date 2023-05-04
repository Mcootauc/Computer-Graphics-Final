1. What aspects of defining a 3D scene are successfully handled by your library behind the scenes?
- The drawing of the shapes
- The drawing of the scene
- The position of the lights
- The position of the camera
- The rotation of the shapes

2. What aspects are not handled behind the scenes? (i.e., the dev user needs to write code for them)
- The specific color, type, rotation, and position of the shape
- The specific buttons wanted for the scene
    - shape/wireframe
    - lights 
    - view
    - perspective
- The grouping of shapes

3. How much code for using your library is the same at the application level, regardless of the specific scene?


4. What aspects of your design would you keep, if you got a chance to do this library over?
We would keep:
    - createMesh.js
    - shapes.js
    - all of the scene functions
    - all of the matrixes

5. What aspects of your design would you change?
We would change:
    - How we grouped objects
    - How we add character/objects to the scene