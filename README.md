# ProceduralFractalTreeGen

A short side project, demonstrating the beautiness of procedurally generated images alongside the connection to 'randomness' in our everyday lives.

Demonstration can be found at https://jsusak.github.io/ProceduralFractalTreeGen/

When I first started programming, I would tend to draw crazy shapes using the python _turtle_ module. While not random and somewhat basic, it was an initial insight into the complexity of computer generated images.  
This program takes it further, rendering images of _fractal trees_ on a vanilla HTML5 canvas, ones which recursively branch off into smaller structures, based off the chosen slider values.
Notable features include:

- Ability to generate tree based off slider values or sheer randomness
- Image downloads
- Zoom into the tree at a chosen click point (on by default)
- Semi-Transparent menus which are easily draggable in order to capture the full beauty of your tree in your browser. (Powered with [interact.js](https://interactjs.io/))
- Link to socials :)

Upon loading the demo, you can find a _how to use_ button in the extras menu.

## What values can you change?

Currently, you are able to produce trees by changing the values for:

- **Opacity**: Modifies the transparency of the tree.
- **Tree Width**: Modifies the width of the tree branches.
- **Tree Length**: Controls how high the tree goes. This is the most performance intensive slider - I recommmend making it smaller if you find the generation times to be too long.
- **Tree Angle + Branch Angle**: Controls the way that the tree and its branches are presented. This property is quite random, it can create beautiful patterns or bunch everything up in one place. Try playing around with it!
- **Leaf Size**: Change the size of the leaf. Making it too big may result in you not being able to see the branches.
- **Shadow Intensity**: Controls the 'vividness' of the shadows. A low value means that colours could look a bit dull.
- **Bezier Curve**: Indicates whether the branches should be drawn by means of a bezier curve or a quadratic curve. While these both connect two distinct points, the bezier curve is different in that its path to get to the point is different, resulting in a noticeably **smoother** curve.
- **Branch/Leaf/Shadow Colour**: Change the colour of the branches/leaves/shadows. By default, the leaf and shadow colours are the same but you are able to change them if you want :)

During my coding, I found changing the tree length impacts the generation time in the most adverse way.

TODO:

- Write README.
- Add some sort of animation to the canvas?
- Implement undo/redo (Have made code for it but it seems to be extremely resource intensive)
