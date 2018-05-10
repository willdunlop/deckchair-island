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
import TWEEN from '@tweenjs/tween.js';

import constants from './config/constants';
import helpers from './config/helpers';

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
  water,
  video,
  isPlaying,
  justBegun;

const { width, height } = constants.screen;
const { AMOUNTX, AMOUNTY, lightColor, waterColor } = constants;

const wavesOptions = {
  active: true,
  seperation: -1,
  waveWidth: 5,
  waveHeight: 5
};

let timestamp = 0, pausedTimestamp = 0, delta = 0, timeCaptured = false;

document.getElementById("songPlay").onclick = () => {
  init();
  animate(timestamp);
}



function init() {
    /** Create and add renderer to the HTML */
    container = document.getElementById('container');
    initVideo();
    document.getElementById("playPause").onclick = () => playPause();


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

    const ambientLight = new THREE.AmbientLight(0xffdddd, 0.2);

    /** Water */
    water = Water(lightPosition);
    water.rotation.x = - Math.PI / 2;
    water.rotation.z = 180;

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
        inclination: 0.49,
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
    // controls.maxAzimuthAngle = Math.PI / 2;
    controls.minDistance = 40.0;
    controls.maxDistance = 20000.0;
    camera.lookAt( controls.target );

    /** Floating shapes */
    //  generates from an array of shapes in the constants file
    constants.shapes.forEach(shapeProperties => {
      const shape = Shape[shapeProperties.type](shapeProperties.position, shapeProperties.rotation);
      shape.name = shapeProperties.name;
      AnimateShape.float(shape, shapeProperties.animationDelay, scene);
      scene.add(shape);
    });

    /** Add shit to the scene */
    scene.add(light);
    scene.add(secondLight);
    // scene.add(thirdLight);
    scene.add(ambientLight)
    scene.add(water);
    scene.add(sky);

    stats = new Stats();
    container.appendChild(stats.dom);

    /** Window resize event listener */
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('keydown', e => helpers.control.waveStrength(e.key, wavesOptions));


}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(timestamp) {
  requestAnimationFrame(animate);
  render(timestamp);
  stats.update();
}

function render(timestamp) {
  tweenControl(timestamp);
  water.material.uniforms.time.value += 1.0 / 60.0;
  Waves(water, wavesOptions, timestamp)
  renderer.render(scene, camera);
}

function initVideo() {
  video = document.createElement('video');
  video.id = 'video';
  video.src = 'assets/songs/just-begun.mp4';
  document.getElementById('video-container').appendChild(video);
  video.load();
  video.play();
  isPlaying = true;
}

function playPause() {
  if (isPlaying) {
    isPlaying = false;
    video.pause();
  } else {
    isPlaying = true;
    video.play();
  }
}


function tweenControl(timestamp) {
  if(!isPlaying){
    if(!timeCaptured) {
      pausedTimestamp = timestamp;
      timeCaptured = true;
    }
  } else {
    if(timeCaptured){
      delta += (timestamp - pausedTimestamp);
      timeCaptured = false;
    }
    TWEEN.update(timestamp - delta);
  }
}
