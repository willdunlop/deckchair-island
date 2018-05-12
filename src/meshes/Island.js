

export default function Island() {
  const island = new THREE.Mesh();

  island.add(platform());
  //  create and add deckchair
  //  create and add palm/fern

  return island
}

function platform() {
  const geo = new THREE.BoxGeometry(175, 5, 175);
  const mat = new THREE.MeshPhongMaterial({ color: 0xa3c3d0 });
  const platform = new THREE.Mesh(geo, mat);
  platform.name= "platform";
  return platform;
}

function deckchair() {

}

function tree() {

}
