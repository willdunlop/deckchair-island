/**
 * @function animateWater()
 * @param {Number} - A number for controlling the speed of the waves
 * WARNING: MORE MATHS ᕙ(⇀‸↼‶)ᕗ
 */
export default function Waves(water, wavesOptions, timestamp = 0) {
  //  normal map manipulation
  water.material.uniforms.time.value += 1.0 / 60.0;

  //  Waves
  if (wavesOptions.active) {
    timestamp /= 750; //    1000 = fairly chill, 100 = excessively fucked,

    const { seperation, waveWidth, waveHeight } = wavesOptions;

    for (let i = 0; i < water.geometry.vertices.length; i++) {
      const vertice = water.geometry.vertices[i];
      vertice.z = (seperation * Math.sin((timestamp + (vertice.x * waveWidth)))) * 3 + (1 * Math.cos((timestamp + (vertice.y)))) * waveHeight;
    }
    water.geometry.computeFaceNormals();
    water.geometry.normalsNeedUpdate = true;
    water.geometry.verticesNeedUpdate = true;
  }
}
