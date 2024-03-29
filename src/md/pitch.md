**_IN A GALAXY FAR FAR AWAY_**
A singular spaceship circles Planet X-3710. The last chance for humanity rests on the shoulders of the astronauts, who eagerly await the system control to drop them down on their new home. The emptiness of space is filled with the anxiety of the astronauts as they watch Planet X-3710 from their fixed positions. Their problem spirals out of control. Will all of humanity be saved?

**_Autonomous Motion_**
When you load into our scene, our spaceship and moon rotates around Planet X-3710.

**_Use Cases_**

**General**

_Show Shape:_
When set to true, custom shapes appear on the screen.

_Wireframe:_
When set to true, only the lines connecting the vertices appear for all of our shapes.

WireFrame doesn't work on mac for these reasons:
https://discourse.threejs.org/t/vertex-buffer-is-not-big-enough-for-the-draw-call-only-on-mac-computers/43628
https://stackoverflow.com/questions/71846106/webgl-cannot-draw-more-than-44-points-even-if-enough-buffer-space

**Camera**

_Top View:_
When toggled, it lets us view our scene from the top looking down. The camera matrix is set to #((0, 1, 0), (0, 0, 0), (0, 0, -1)).

_Bottom View:_
When toggled, it lets us view our scene from the bottom looking up. The camera matrix is set to #((0, -1, 0), (0, 0, 0), (0, 0, -1)).

_Front View:_
When toggled, it lets us view our scene straight on. The camera matrix is set to #((0, 0, 0), (0, 0, 1), (0, 1, 0)).

_Behind View:_
When toggled, it lets us view our scene from the back. The camera matrix is set to #((0, 0, 1), (0, 0, 0), (0, 1, 0)).

_Orthographic or Perspective Projection:_ When toggled, it lets us view our scene from either an orthographic or perspective projection.

**Lighting**

_Light Up:_
When toggled, it lights our scene from the top. The light matrix is set to #(0.0, 2.0, 0.0)

_Light Down:_
When toggled, it lights our scene from the bottom. The light matrix is set to #(0.0, -2.0, 0.0)

_Light Left:_
When toggled, it lights our scene from the left. The light matrix is set to #(-2.0, 0.0, 0.0)

_Light Right:_
When toggled, it lights our scene from the right. The light matrix is set to #(2.0, 0.0, 0.0)

_Light Forward:_
When toggled, it lights our scene from the front. The light matrix is set to #(0.0, 0.0, -2.0)

_Light Backward:_
When toggled, it lights our scene from the back. The light matrix is set to #(0.0, 0.0, 2.0)
