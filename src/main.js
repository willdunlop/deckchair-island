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
// import THREE from 'three';

 var container, 
    stats,
    camera, 
    scene, 
    renderer, 
    light,
    controls, 
    particles,
    water, 
    count,
    sphere;

    var width = window.innerWidth;
    var height = window.innerHeight;

    var AMOUNTX = 50, AMOUNTY = 50;

    var lightColor = 0xffdddd;
    var waterColor = 0x233c3e;  //  0x001e0f

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
        camera = new THREE.PerspectiveCamera(90, width / height, 1, 10000);
        camera.position.set(30,150,100);

        /** Light */
        light = new THREE.DirectionalLight(lightColor, 0.8);

        /** Water Geo and shader */
        var waterGeometry = new THREE.PlaneGeometry(10000, 10000, AMOUNTX, AMOUNTY);
        const waterNormalMap = new THREE.TextureLoader().load(
            'assets/img/water-norms3.png',
            function(texture) { 
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
            }
        );    
        var waterOptions = {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: waterNormalMap,
            alpha: 1.0,
            size: 8.6,
            sunDirection: light.position.clone().normalize(),
            sunColor: lightColor,
            waterColor: waterColor,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
        };

        water = new THREE.Water(waterGeometry, waterOptions)

        water.rotation.x = - Math.PI / 2;   // ytho?
        water.rotation.z = 180

        /***** WIREFAMEY SHIT ******/
        // water.material.wireframe = true;


        /** Sky */
        var sky = new THREE.Sky();
        sky.scale.setScalar(10000);

        var uniforms = sky.material.uniforms;
        uniforms.turbidity.value = 4.3;
        uniforms.rayleigh.value = 2.75;
        uniforms.luminance.value = 0.85;
        uniforms.mieCoefficient.value = 0.005;
        uniforms.mieDirectionalG.value = 0.85;

        var parameters = {
            distance: 400,
            inclination: 0.47,
            azimuth: 0.205
        };

        /** I have no idea what this shit does */
        var cubeCamera = new THREE.CubeCamera(1, 2000, 256);
        cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;

        /**
         * @function updateSun()
         * Allows for updating the suns state.
         * Function is nested within init() so as to inherit its variables
         * 
         * WARNING: Contains Maths ¯\_(´⊙︿⊙`)_/¯
         */
        function updateSun() {
            var theta = Math.PI * (parameters.inclination - 0.5);
            var phi = 2 * Math.PI * (parameters.azimuth - 0.5);

            light.position.x = parameters.distance * Math.cos(phi);
            light.position.y = parameters.distance * Math.sin(phi) * Math.sin(theta);
            light.position.z = parameters.distance * Math.sin(phi) * Math.cos(theta);

            sky.material.uniforms.sunPosition.value = light.position.copy(light.position);
            water.material.uniforms.sunDirection.value.copy(light.position).normalize();

            cubeCamera.update(renderer, scene);
        }

        updateSun();

        /** Controls */
        // controls = new THREE.PointerLockControls(camera);
        // controls.enabled = true;
        // controls = new THREE.FirstPersonControls(camera);

        controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.maxPolarAngle = Math.PI * 0.495;
        controls.target.set( 30, 150, 0 );
        controls.panningMode = THREE.HorizontalPanning;
        controls.minDistance = 40.0;
        controls.maxDistance = 200.0;
        camera.lookAt( controls.target );

        /** Stats */

        /** GUI */

        /** Window resize event listener */
        
        /** Add shit to the scene */
        scene.add(light);
        scene.add(water);
        scene.add(sky);
        // scene.add(controls.getObject());


        window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**
     * @function animateWater()
     * @param {Number} - A number for doing stuff
     * WARNING: MORE MATHS ᕙ(⇀‸↼‶)ᕗ
     */
    function animateWater(timestamp) {
        timestamp /= 1000;
        for (var i = 0; i < water.geometry.vertices.length; i++) {
            var vertice = water.geometry.vertices[i];
            vertice.z = (-20 * Math.sin((timestamp + (vertice.x * 100)))) * 3 + (1 * Math.cos((timestamp + (vertice.y)))) * 50;
        }
        water.geometry.computeFaceNormals();	
        water.geometry.normalsNeedUpdate = true;  
        water.geometry.verticesNeedUpdate = true;

    }
    
    function animate(timestamp) {
        requestAnimationFrame(animate);

        /** RENDERABLES */
        water.material.uniforms.time.value += 1.0 / 60.0;
        animateWater(timestamp);
        /** END RENDERABLES */

        renderer.render(scene, camera);
    }
