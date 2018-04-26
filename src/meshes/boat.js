export default function Boat() {
    let mesh = new THREE.Object3D();
    mesh.name = "boat";
    
    /** Boat Body */
    const bodyGeo = new THREE.BoxGeometry(50,50,100,1,1,1);
    const bodyMat = new THREE.MeshPhongMaterial({ color: '#90531d', shading: THREE.FlatShading})
    const boatBody = new THREE.Mesh(bodyGeo, bodyMat);
    boatBody.name = 'boat body';
    boatBody.castShadow = true;
    boatBody.recieveShadow = true;

    mesh.add(boatBody);

    console.log("Greetings from boat!");

    return mesh;
    /** Boat Mast */


    /** Boat Sail */


}