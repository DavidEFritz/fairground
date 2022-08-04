Fairground offers modules that allow you to automatically create bodies for the Cannon physics library from 3D-models. It is intended to reduce the workflow by removing the tedious trial and error of placing Cannon bodies for compound bodies and lets you import whole 3D-scenes of primitive shapes like cubes, spheres and cylinders whith their corresponding body for Cannon.


## Getting Started

You can install the repository by:

```bash
npm install
# or
yarn install
```

And run the dev server by:

```bash
npm run dev
# or
yarn dev
```

## Requirements

As of now, only glTF- and FBX-Files are supported.
Any 3D-Model you want to use, needs its origin to be set to the center of mass. Otherwise the Cannon body will be offset from the 3D-Model. In Blender select the Model, right-click it, select 'Set Origin' -> 'Origin to Center of Mass (Volume)'.
The cylinder and box shape will only work, if the 3D-Model has been oriented in a way, that all faces where at a square angle to all axes when it was created. Furthermore, if any rotation was ever applied to a 3D-Object it will not work.
If the Cannon body is oriented in a wrong way you can fix this by opening the 3D-Model in an editing software, orient it correctly and apply the rotation. You can rotate an object in the editing software later on, but don't apply it.

## Usage

Import the components with the appropriate path.

```bash
import Cube from 'components/objects/simpleCollisionMesh/Cube'
import Sphere from 'components/objects/simpleCollisionMesh/Sphere'
import Cylinder from 'components/objects/simpleCollisionMesh/Cylinder'
```

### Box shape

```bash
const data = Cube('url of the 3D-file')
```
You receive an object containing an array that holds an object for each 3D-Model that was in the provided file. The objects contain following data:
args: These are the arguments you can pass to create a Cannon body, aka the length of the sides of the box.
mesh: These hold all data of the 3D-Object.
position: This is the position of said 3D-Object.
rotation: This is the rotation of said 3D-Object.
type: Only used for compound shapes, as it tells what type of shape it is (box, sphere, cylinder).

### Sphere shape

```bash
const data = Sphere('url of the 3D-file')
```
You receive the same object as in box shape with the difference that the arguments consist of the radius of the sphere.

### Cylinder shape

```bash
const data = Cylinder('url of the 3D-file')
```
You receive the same object as in box shape with the difference that the arguments consist of the radius at the top and bottom of the cylinder as well as the height and the amount of segments.

### Compound shape

The compound shape requires some pre-work. You need to remodel the 3D-Object as close as possible with simple shapes consisting of cubes, spheres and cylinders. Remember that Cannon cylinder body can create various shapes depending on how many segments it will have. E.g. you can also create a pyramid out of it, since it basically is a cylinder with a very samll top radius and 4 segments along the height. Afterwards rename the created shapes eiter as 'Physics.Cylinder', 'Physics.Cube' or 'Physics.Sphere' accordingly. Since groups don't get exported in a glTF-File this only works for an individual 3D-Object, so you can not use it to create a whole scene. If you have multiple 3D-Object in your scene that would require a compound shape you need to export them individually.

```bash
const data = Compound('url of the 3D-file')
```

You receive an object containing an object of the data of the 3D-Object and an object holding an array for the arguments you can pass to Cannon to create a compound shape.
If the compound shapes behave strange this means, that the center of mass is not correct. This would need to be done manually since Cannon does not do it.
Links to said issue: 
[Link1](https://github.com/schteppe/cannon.js/issues/230#issuecomment-141810570)
[Link2](https://github.com/schteppe/cannon.js/issues/232)
[Link3](https://github.com/pmndrs/use-cannon/issues/29#issuecomment-602400659)

I have not yet found a way to get this to work with [use-cannon](https://github.com/pmndrs/use-cannon). So if you work with use-cannon aka react/cannon these will be best used as objects with 0 mass for the moment.