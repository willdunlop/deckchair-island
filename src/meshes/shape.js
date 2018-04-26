/**
* geoOptions: {
*
* }
*/

export default class Shape {
  constructor(type, geoOptions, matOptions) {

    // this.type = type;
    // this.geoOptions = geoOptions;
    // this.matOptions = matOptions;

    // this.init();
  }

  init() {
    switch(this.type) {
      case 'cube':
        this.cube();
      case 'sphere':
        this.sphere();
      case 'pyramid':
        this.pyramid();
      case 'octahedron':
        this.octahedron();
      case 'custom':
        this.custom();
      default:
        this.random();
    }
  }

  cube() {
    const faceSize = this.generateNum(10);
    const cubeGeo = new THREE.BoxGeometry(faceSize, faceSize, faceSize);
    const cubeMat = new THREE.MeshPhongMaterial({ color: 0x000000, reflectivity: 1 });
    return new THREE.Mesh(cubeGeo, cubeMat);
  }

  sphere() {

  }

  pyramid() {

  }

  tetrahedron() {

  }

  octahedron() {

  }

  custom() {

  }

  random() {

  }

  generateMat() {
    //build a material options object
  }

  generateNum(max) {
    // returns a random whole number that is < max
    let number = Math.floor(Math.random() * Math.floor(max));
    if (number === 0) number++;
    return number;
  }
}
