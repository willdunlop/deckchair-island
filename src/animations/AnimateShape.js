export default function AnimateShape(shape) {
  //  Cube Scale-in
  let shapeScaleUnit = shape.scale.x
  if (shapeScaleUnit < 175) {
      shapeScaleUnit = shapeScaleUnit + 5;
      shape.scale.set(shapeScaleUnit, shapeScaleUnit, shapeScaleUnit);
    }
    //  Cube Motion
  let shapePosZ = shape.position.z;
  shapePosZ = shapePosZ + 3;
  shape.position.setZ(shapePosZ);
  //  Remove Cube from scene
  if(shapePosZ >= 1) scene.remove(shape);
}
