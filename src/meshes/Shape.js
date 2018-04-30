
import constants from './../config/constants';

const Shape = {

  cube: (position, rotation) => {
    const { nums } = constants;
    const cube = new THREE.Mesh();

    const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
    const cubeMat = Shape.generateMat();
    cube.add(new THREE.Mesh(cubeGeo, cubeMat));

    cube.position.set(position.x, position.y, position.z);
    cube.rotation.set(rotation.x, rotation.y, rotation.z);
    cube.animation = {}

    return cube;
  },

  sphere: () => {

  },

  pyramid: () => {

  },

  tetrahedron: (position, rotation) => {
    const tetraGeo = new THREE.TetrahedronGeometry(1);
    const tetraMat = Shape.generateMat();
    const tetra = new THREE.Mesh(tetraGeo, tetraMat);

    tetra.position.set(position.x, position.y, position.z);
    tetra.rotation.set(rotation.x, rotation.y, rotation.z);
    tetra.animation = {};

    return tetra;
  },

  octahedron: (position, rotation) => {
    const octaGeo = new THREE.OctahedronGeometry(1);
    const octaMat = Shape.generateMat();
    const octa = new THREE.Mesh(octaGeo, octaMat);

    octa.position.set(position.x, position.y, position.z);
    octa.rotation.set(rotation.x, rotation.y, rotation.z);
    octa.animation = {};

    return octa;
  },

  billboard: () => {
    const billboard = new THREE.Mesh();

    const billGeo = new THREE.BoxGeometry(6, 4, 1);
    const billMat = new THREE.MeshPhongMaterial({ color: 0x333333, reflectivity: 1});
    const billboardBody = new THREE.Mesh(billGeo, billMat)
    billboardBody.name = "billboardBody";
    billboard.add(billboardBody);

    const lightGeo = new THREE.BoxGeometry(.5, .5, .5)
    const lightMat = new THREE.MeshPhongMaterial({ color: 0xffdb3d, emissive: 0xffdb3d});
    const light = new THREE.Mesh(lightGeo, lightMat);
    light.name = "light";
    light.position.set(-2.5, 1.5, 0.5)
    billboard.add(light);

    return billboard;
  },

  custom: () => {

  },

  generateMat: () => {
    const colors = [0xffffff, 0xffff00, 0xff00ff, 0xff0000, 0x00ffff, 0xaa00ff, 0x000000];
    const mat = new THREE.MeshPhongMaterial({
      color: colors[Shape.generateNum(6)],
      reflectivity: parseInt(`0.${Shape.generateNum(9)}`),
      flatShading: true
    });
    return mat;
  },

  generateNum: (max) => {
    // returns a random whole number that is < max
    let number = Math.floor(Math.random() * Math.floor(max));

    return number;
  }
}


export default Shape;
