/**
 * Three.js code for InfiniOcean
 * Trial run for attempting to "re-build" the ocean scene
 *
 * Checklist
 *
 * 1. Create an infinite ocean landscape    -   DONE!
 * 2. Apply vertex wave manipulation        -   DONE!!
 * 3. Slip it into the existing project     -   ¯\_(´⊙︿⊙`)_/¯
 */
import constants from './config/constants';

import Boat from './meshes/boat';
import Water from './meshes/Water';
import Shape from './meshes/Shape';
import AnimateShape from './animations/AnimateShape';

import Waves from './animations/waves';

let container,
  stats,
  camera,
  scene,
  renderer,
  light,
  controls,
  particles,
  water,
  count,
  sphere,
  cube,
  tetra,
  octa;

const { width, height } = constants.screen;
const { AMOUNTX, AMOUNTY, lightColor, waterColor } = constants;

const wavesOptions = {
  active: true,
  seperation: -20,
  waveWidth: 100,
  waveHeight: 50
}

init();
animate();

function init() {
    /** Create and add renderer to the HTML */
    container = document.getElementById('container');

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    /** Scene */
    scene = new THREE.Scene();

    /** Camera */
    camera = new THREE.PerspectiveCamera(40, width / height, 1, 10000);
    camera.position.set(0,75,0);

    /** Light */
    light = new THREE.DirectionalLight(lightColor, 0.8);
    const lightPosition = light.position.clone().normalize();

    const secondLight = new THREE.DirectionalLight(0xffdddd, 0.75);
    secondLight.rotation.set(90,90,90);

    /** Water */
    water = Water(lightPosition);
    water.rotation.x = - Math.PI / 2;   // ytho?
    water.rotation.z = 180

    /** Sky */
    const sky = new THREE.Sky();
    sky.scale.setScalar(10000);

    sky.fog = true;
    const uniforms = sky.material.uniforms;
    uniforms.turbidity.value = 4.3;
    uniforms.rayleigh.value = 2.75;
    uniforms.luminance.value = 0.85;
    uniforms.mieCoefficient.value = 0.005;
    uniforms.mieDirectionalG.value = 0.85;

    const parameters = {
        distance: 400,
        inclination: 0.47,
        azimuth: 0.250
    };

    /** I have no idea what this shit does */
    const cubeCamera = new THREE.CubeCamera(1, 2000, 256);
    cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;

    /**
     * @function updateSun()
     * Allows for updating the suns state.
     * Function is nested within init() so as to inherit its variables
     *
     * WARNING: Contains Maths ¯\_(´⊙︿⊙`)_/¯
     */
    function updateSun() {
        const theta = Math.PI * (parameters.inclination - 0.5);
        const phi = 2 * Math.PI * (parameters.azimuth - 0.5);

        light.position.x = parameters.distance * Math.cos(phi);
        light.position.y = parameters.distance * Math.sin(phi) * Math.sin(theta);
        light.position.z = parameters.distance * Math.sin(phi) * Math.cos(theta);

        sky.material.uniforms.sunPosition.value = light.position.copy(light.position);
        water.material.uniforms.sunDirection.value.copy(light.position).normalize();

        cubeCamera.update(renderer, scene);
    }

    updateSun();

    /** Controls */

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.target.set( 0, 75, 0 );
    controls.panningMode = THREE.HorizontalPanning;
    controls.minDistance = 40.0;
    controls.maxDistance = 200.0;
    camera.lookAt( controls.target );

    cube = new Shape().cube();
    tetra = new Shape().tetrahedron();
    octa = new Shape().octahedron();

    /** Add shit to the scene */
    scene.add(light);
    scene.add(secondLight);
    scene.add(water);
    scene.add(sky);
    // scene.add(Boat());

    stats = new Stats();
    container.appendChild(stats.dom);

    /** Window resize event listener */
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * @function animateWater()
 * @param {Number} - A number for controlling the speed of the waves
 * WARNING: MORE MATHS ᕙ(⇀‸↼‶)ᕗ
 */
function animateWater(timestamp = 0) {
    timestamp /= 750; //    1000 = fairly chill, 100 = excessively fucked,

    const seperation = -20;
    const waveWidth = 100;
    const waveHeight = 50;

    for (let i = 0; i < water.geometry.vertices.length; i++) {
        const vertice = water.geometry.vertices[i];
        vertice.z = (seperation * Math.sin((timestamp + (vertice.x * waveWidth)))) * 3 + (1 * Math.cos((timestamp + (vertice.y)))) * waveHeight;
    }
    water.geometry.computeFaceNormals();
    water.geometry.normalsNeedUpdate = true;
    water.geometry.verticesNeedUpdate = true;

}

function shapeAnimationTiming() {
  window.setTimeout(() => {
    scene.add(cube);
    AnimateShape(cube);
  }, 2000);
  window.setTimeout(() => {
    scene.add(tetra);
    AnimateShape(tetra);
  }, 6500);
  window.setTimeout(() => {
    scene.add(octa);
    AnimateShape(octa);
  }, 7500);

}

function animate(timestamp) {
  setTimeout(() => {
    requestAnimationFrame(animate);
    render();
    stats.update();
  }, 1000/60);
}

function render() {
  water.material.uniforms.time.value += 1.0 / 60.0;
  shapeAnimationTiming();
  // Waves(water, wavesOptions, 0)
  // animateWater(timestamp);

  renderer.render(scene, camera);
}
