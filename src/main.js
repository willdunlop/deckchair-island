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

import TWEEN from '@tweenjs/tween.js';

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
  octa,
  justBegun,
  tween;
  

const { width, height } = constants.screen;
const { AMOUNTX, AMOUNTY, lightColor, waterColor } = constants;

const wavesOptions = {
  active: true,
  seperation: -20,
  waveWidth: 100,
  waveHeight: 50
};

init();
animate(0);

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
    camera.position.set(0,150,0);

    /** Light */
    light = new THREE.DirectionalLight(lightColor, 0.8);
    const lightPosition = light.position.clone().normalize();

    const secondLight = new THREE.DirectionalLight(0xffdddd, 0.4);
    secondLight.position.set(-50,10,100);

    const thirdLight = new THREE.DirectionalLight(0xffdddd, 0.2);
    thirdLight.position.set(0,-20,0);

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
    controls.target.set( 0, 150, 0 );
    controls.panningMode = THREE.HorizontalPanning;
    controls.minDistance = 40.0;
    controls.maxDistance = 200.0;
    camera.lookAt( controls.target );

    /** Floating shapes */
    //  generate from an array of shapes in the constants file
    cube = Shape.cube(constants.cube1.position, constants.cube1.rotation);
    tetra = Shape.tetrahedron(constants.tetra1.position, constants.tetra1.rotation);
    octa = Shape.octahedron(constants.octa1.position, constants.octa1.rotation);
    AnimateShape.float(cube, 2000, scene);
    AnimateShape.float(tetra, 6500, scene);
    AnimateShape.float(octa, 7500, scene);
    scene.add(cube);
    scene.add(tetra);
    scene.add(octa);
    
    
    
    /** Add shit to the scene */
    scene.add(light);
    scene.add(secondLight);
    scene.add(thirdLight);
    scene.add(water);
    scene.add(sky);

    stats = new Stats();
    container.appendChild(stats.dom);

    justBegun = new Audio('assets/songs/just-begun.mp3');
    console.log("it's just beguuuuun, oh what a feeling", justBegun);
    document.getElementById("songPlay").onclick = playSong


    /** Window resize event listener */
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// function applyTweens(shape) {
//     var endScale = {x: 175, y: 175, z: 175 };
//     var endTranslation = {x: shape.position.x, y: shape.position.y, z: 3000};
//     shape.animation.scale = new AnimateShape(shape, endScale, 1000, 2000).scale();
//     shape.animation.translate = new AnimateShape(shape, endTranslation, 3000, 3000).translation();
//     shape.animation.scale.start();
//     shape.animation.translate.start();
// }

function shapeAnimationTiming() {
//   window.setTimeout(() => {
    // AnimateShape(cube, tween);
//   }, 2000);
//   window.setTimeout(() => {
//     scene.add(tetra);
//     AnimateShape(tetra);
//   }, 6500);
//   window.setTimeout(() => {
//     scene.add(octa);
//     AnimateShape(octa);
//   }, 7500);

}

function animate(timestamp) {
  setTimeout(() => {
    requestAnimationFrame(animate);
    render(timestamp);
    stats.update();
  }, 1000/60);
}

function render(timestamp) {
    water.material.uniforms.time.value += 1.0 / 60.0;
    TWEEN.update();

    // Waves(water, wavesOptions, timestamp)

  renderer.render(scene, camera);
}

function playSong() {
  console.log("playSong was called");
  justBegun.play();
}

/**
 * set values with input outside of render
 * render will automatically update 
 * 
 */

