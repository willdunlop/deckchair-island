export default Object.freeze({
  screen: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  AMOUNTX: 50,
  AMOUNTY: 50,
  lightColor: 0xffdddd,
  waterColor: 0x233c3e,  //  0x001e0f

  nums: [45, 90, 135, 180, 225, 270, 315, 360],

  //  Shapes
  shapes: [
    {
      name: 'cube1',
      type: 'cube',
      animationDelay: 2000,
      position: { x: -500, y: 200, z: -3000 },
      rotation: {x: 45, y: 45, z: 0 }
    },

    {
      name: 'tetra1',
      type: 'tetrahedron',
      animationDelay: 6500,
      position: { x: 450, y: 150, z: -3000 },
      rotation: {x: 45, y: 45, z: 45 }
    },

    {
      name: 'octa1',
      type: 'octahedron',
      animationDelay: 7500,
      position: { x: -750, y: 600, z: -5000 },
      rotation: {x: 0, y: 0, z: 0 }
    },

    {
      name: 'billboard1',
      type: 'billboard',
      animationDelay: 1000,
      position: { x: 400, y: 550, z: -5000 },
      rotation: { x: 0, y: 0, z: 0 }
    }
  ]
})
