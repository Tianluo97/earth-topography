import * as THREE from 'three'

const baseColor = new THREE.TextureLoader().load('./textures/topography/test/DefaultMaterial_BaseColor.png' ); 
const normalMap = new THREE.TextureLoader().load('./textures/topography/test/DefaultMaterial_Normal.png' ); 
const metalMap = new THREE.TextureLoader().load('./textures/topography/test/DefaultMaterial_Metallic.png' ); 
const roughness = new THREE.TextureLoader().load('./textures/topography/test/DefaultMaterial_Roughness.png' ); 
const displacementMap = new THREE.TextureLoader().load('./textures/topography/test/DefaultMaterial_Displacement.png' );  
const aoMap = new THREE.TextureLoader().load('./textures/topography/test/Ambient Occlusion Map from Mesh DefaultMaterial.png' );

export const mergedMaterial = new THREE.MeshStandardMaterial({
    map: baseColor,
    //normalMap: normalMap,
    aoMap: aoMap,
    displacementMap: displacementMap,
    displacementScale: 0.0,
    metalnessMap: metalMap,
    metalness: 0.4771,
    roughness: 0.5313,
    roughnessMap: roughness,
    transparent:true
    //displacementMap: displacementMap
    //side: THREE.DoubleSide 
});