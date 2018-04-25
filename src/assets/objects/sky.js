export default class Sky {
    constructor() {
        /** Sky */
        this.sky = new THREE.Sky();
        this.sky.scale.setScalar(10000);
    
        this.uniforms = sky.material.uniforms;
        this.uniforms.turbidity.value = 4.3;
        this.uniforms.rayleigh.value = 2.75;
        this.uniforms.luminance.value = 0.85;
        this.uniforms.mieCoefficient.value = 0.005;
        this.uniforms.mieDirectionalG.value = 0.85;
    
        this.parameters = {
            distance: 400,
            inclination: 0.47,
            azimuth: 0.205
        };
    
        /** I have no idea what this shit does */
        var cubeCamera = new THREE.CubeCamera(1, 2000, 256);
        cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
    }


    /**
     * @function updateSun()
     * Allows for updating the suns state.
     * Function is nested within init() so as to inherit its variables
     * 
     * WARNING: Contains Maths ¯\_(´⊙︿⊙`)_/¯
     */
    updateSun() {
        var theta = Math.PI * (parameters.inclination - 0.5);
        var phi = 2 * Math.PI * (parameters.azimuth - 0.5);

        light.position.x = parameters.distance * Math.cos(phi);
        light.position.y = parameters.distance * Math.sin(phi) * Math.sin(theta);
        light.position.z = parameters.distance * Math.sin(phi) * Math.cos(theta);

        sky.material.uniforms.sunPosition.value = light.position.copy(light.position);
        water.material.uniforms.sunDirection.value.copy(light.position).normalize();

        cubeCamera.update(renderer, scene);
    }
}