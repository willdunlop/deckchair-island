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
  cube1: {
    position: { x: -500, y: 200, z: -3000 },
    rotation: {x: 45, y: 45, z: 0 }
  },

  tetra1: {
    position: { x: 300, y: 150, z: -3000 },
    rotation: {x: 45, y: 45, z: 45 }
  },

  octa1: {
    position: { x: -750, y: 600, z: -5000 },
    rotation: {x: 0, y: 0, z: 0 }
  },
})
