import * as THREE from 'three'
import { _earthRadius } from '/utilities/constants.ts'
// import { mergedMaterial } from './topographyMaterial.js';
import { GUI } from 'dat.gui'
//import GeoTIFF, {fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';
import {
  PlaneGeometry,
} from 'three'; 

const gui = new GUI()

/**
 * Vertex
 */

let url = './data/topography/NASADEM_HGT_n42e119.tif';

const geometryWidth = 85.276 * 1000 * 0.001,
geometryHeight = 111 * 1000 * 0.001

//提取rawtiff
let rawTiff = await GeoTIFF.fromUrl(url);
let tifImage = await rawTiff.getImage();
let image = {
  width: tifImage.getWidth(),
  height: tifImage.getHeight(),
};


//构建geometry

let geometry = new PlaneGeometry(
    geometryWidth,
    geometryHeight,
    3600,
    3600
)
let data = await tifImage.readRasters({ interleave: true });
const arr1 = new Array(geometry.attributes.position.count);
const arr = arr1.fill(1);
arr.forEach((a, index) => {
  geometry.attributes.position.setZ(index, (data[index]/120));
});
geometry.computeVertexNormals();


//构建MountainMesh
const material1 = new THREE.MeshLambertMaterial({side: THREE.DoubleSide});

let mountain = new THREE.Mesh(geometry, material1)
mountain.rotation.x = -Math.PI / 2;
mountain.updateMatrixWorld()
mountain.castShadow = true
mountain.receiveShadow = true

export {mountain}