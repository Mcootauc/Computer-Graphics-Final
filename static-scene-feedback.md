

## Our 3D Library 3

##### https://github.com/lmu-cmsi3710-spring2023/our-own-3d-library-mitch-gage-david-kevin

| Category | Feedback | Points |
| --- | --- | ---: |
| Stub web app | Stub web app provides testbed for scene library | 5/5 |
| | **Screen construct/framework** | |
| • Setup | Scene code is structured to handle WebGL setup and connection to `canvas` in a mostly reusable manner.  | 4/4 |
| • Add/remove | `Scene` Doesn't really handle addition and removal. You created an external variable `objectsToDraw` and used react hooks to manage it. (–4) | 0/4 |
| • Rendering | Scene code renders to a canvas in a mostly reusable manner | 4/4 |
| • Implementation | Instead of handling your `objectsToDraw` array inside of the scene class, you have to pass in the entire array over and over again. This makes it harder to change objects from wireframe to solid (and vice versa), add or remove individual objects, and makes it much harder to reuse the scene code. (–1) | 2/3 |
| | **3D object framework** | |
| • Different shapes | There is no overarching framework to accommodate different shapes. All shapes are stored as objects containing the vertices and indices. (–1) | 1/2 |
| • Color | Shape objects do not store color (–2) | 0/2 |
| • Groups/composites | No group/composite construct found (–8) | 0/8 |
| • Implementation | 3D object framework is not implemented (–3) | 0/3 |
| | **Polygon mesh data structure** | |
| • Vertices/triangles | Shape objects store vertices and faces appropriately | 10/10 |
| • Extensibility | Shape objects can be extended to accommodate future values and functions………but not very easily (–1) | 4/5 |
| • Solid vs. wireframe | Shape objects produce wireframe and solid renders in a relatively straightforward manner. | 5/5 |
| • Implementation | Mesh implementation is not really done. It would be best to create a class mesh, or shape, and have each individual shape extend that default class, so that all of your shapes/meshes/objects can have the same default functionality. For example, this way you can toggle between wireframe and solid by changing a single variable, and the class instance would take care of that fairly easily. This way there is less room for error when passing your objects to the scene. (–3) | 2/5 |
| | **Mesh maker library** | |
| • Sphere | Sphere is an icosahedron, with fixed points, but it's fine. I won't dock y'all here. | 20/20 |
| • _shape-credits.md_ | _shape-credits.md_ clearly lists who did what |  |
| • Implementation | Shape framework is implemented consistently, but you should really consider using classes. | 10/10 |
| Extra credit (if any) | n/a |  |
| Code maintainability | No major issues. Almost everything seems to be laid out directly in the `src` folder, which is fine for now. It may be in your best interest to add additional structure via folders.<br><br>Repository compiled with several warnings (–1) | -1 |
| Code readability | Code is readable. No major readability issues. |  |
| Version control | Decent commit count with sufficiently descriptive messages |  |
| Punctuality | Last commit of tag: 03/29/23 11:47 PM<br /><br /> **Graded commit:** https://github.com/lmu-cmsi3710-spring2023/our-own-3d-library-mitch-gage-david-kevin/commit/e56b95a37392fdb5de43034e2126ff1c20b67c24 |  |
| | **Total** | **66/90** |
