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
    const cube = new THREE.Mesh();

    const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
    const cubeMat = this.generateMat();
    cube.add(new THREE.Mesh(cubeGeo, cubeMat));

    // const cubeLight = new THREE.PointLight(0xffdddd, 1, 100);
    // cubeLight.position.set(0,30,0);
    // cube.add(cubeLight);

    cube.position.set(-500, 200, -3000);
    cube.rotation.set(45, 45, 0);

    return cube;
  }

  sphere() {

  }

  pyramid() {

  }

  tetrahedron() {
    const tetraGeo = new THREE.TetrahedronGeometry(1);
    const tetraMat = this.generateMat();
    const tetra = new THREE.Mesh(tetraGeo, tetraMat);

    tetra.position.set(300, 150, -3000);
    tetra.rotation.set(45, 45, 45);

    return tetra;
  }

  octahedron() {
    const octaGeo = new THREE.OctahedronGeometry(1);
    const octaMat = this.generateMat();
    const octa = new THREE.Mesh(octaGeo, octaMat);

    octa.position.set(-750, 600, -5000);

    return octa;
  }

  custom() {

  }

  random() {

  }

  generateMat() {
    const colors = [0xffffff, 0xffff00, 0xff00ff, 0xff0000, 0x000000];
    const mat = new THREE.MeshPhongMaterial({
      color: colors[this.generateNum(4)],
      reflectivity: parseInt(`0.${this.generateNum(9)}`),
      flatShading: true
    });
    return mat;
  }

  generateNum(max) {
    // returns a random whole number that is < max
    let number = Math.floor(Math.random() * Math.floor(max));

    return number;
  }
}
