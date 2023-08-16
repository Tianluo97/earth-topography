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
const url = []
const rawTiff = []
const tifImage = []
const image = []
const geometry = []
const data = []
const mountains = []

//COMMON PARAMETERS
// url[0] = './data/topography/NASADEM_HGT_n42e116.tif';
// url[1] = './data/topography/NASADEM_HGT_n42e117.tif';
// url[2] = './data/topography/NASADEM_HGT_n42e118.tif';
// url[3] = './data/topography/NASADEM_HGT_n42e119.tif';
// url[4] = './data/topography/NASADEM_HGT_n42e120.tif';
// url[5] = './data/topography/NASADEM_HGT_n42e121.tif';
// url[6] = './data/topography/NASADEM_HGT_n42e122.tif';
// url[7] = './data/topography/NASADEM_HGT_n42e123.tif';
// url[8] = './data/topography/NASADEM_HGT_n43e116.tif';
// url[9] = './data/topography/NASADEM_HGT_n43e117.tif';
// url[10] = './data/topography/NASADEM_HGT_n43e118.tif';
// url[11] = './data/topography/NASADEM_HGT_n43e119.tif';
// url[12] = './data/topography/NASADEM_HGT_n43e120.tif';
// url[13] = './data/topography/NASADEM_HGT_n43e121.tif';
// url[14] = './data/topography/NASADEM_HGT_n43e122.tif';
// url[15] = './data/topography/NASADEM_HGT_n43e123.tif';

url[0] = './data/topography/NASADEM_HGT_n42e117.tif';
url[1] = './data/topography/NASADEM_HGT_n42e118.tif';
url[2] = './data/topography/NASADEM_HGT_n42e119.tif';
url[3] = './data/topography/NASADEM_HGT_n42e120.tif';
url[4] = './data/topography/NASADEM_HGT_n42e121.tif';
url[5] = './data/topography/NASADEM_HGT_n43e117.tif';
url[6] = './data/topography/NASADEM_HGT_n43e118.tif';
url[7] = './data/topography/NASADEM_HGT_n43e119.tif';
url[8] = './data/topography/NASADEM_HGT_n43e120.tif';
url[9] = './data/topography/NASADEM_HGT_n43e121.tif';

const tleNumbert = 10
const geometryWidth = 85.276 * 1000 * 0.001,
geometryHeight = 111 * 1000 * 0.001

//提取rawtiff
for(let i = 0; i < tleNumbert; i++){
  rawTiff[i] = await GeoTIFF.fromUrl(url[i]);
  tifImage[i] = await rawTiff[i].getImage();
  image[i] = {
    width: tifImage[i].getWidth(),
    height: tifImage[i].getHeight(),
  };
}

//构建geometry
for(let i = 0; i < tleNumbert; i++){
  if(i === 2 ){
    geometry[i] = new PlaneGeometry(
      geometryWidth,
      geometryHeight,
      3600,
      3600
    )
    data[i] = await tifImage[i].readRasters({ interleave: true });
    const arr1 = new Array(geometry[i].attributes.position.count);
    const arr = arr1.fill(1);
    arr.forEach((a, index) => {
      geometry[i].attributes.position.setZ(index, (data[i][index]/120));
    });
    geometry[i].computeVertexNormals();
  }

  else {
    geometry[i] = new PlaneGeometry(
      geometryWidth,
      geometryHeight,
      1200,
      1200
    )
    data[i] = await tifImage[i].readRasters({ interleave: true });
    const arr1 = new Array(geometry[i].attributes.position.count);
    const arr = arr1.fill(1);
    arr.forEach((a, index) => {
      const row = Math.floor(index / (1200 + 1));
      geometry[i].attributes.position.setZ(index, (data[i][3*row*((1200 * 3)+1) + (index % (1200 + 1)) * 3]/120 ));
    });
    geometry[i].computeVertexNormals();
  // }
}

//构建MountainMesh
const material1 = new THREE.MeshLambertMaterial({side: THREE.DoubleSide});
for(let i = 0; i < tleNumbert; i++){
  mountains[i] = new THREE.Mesh(geometry[i], material1)
  mountains[i].rotation.x = -Math.PI / 2;
  mountains[i].updateMatrixWorld()
}

for(let i = 0; i < tleNumbert; i++){
  mountains[i].position.x = geometryWidth * (i < 5 ? (i - 2) : (i - 7))
  mountains[i].position.z = geometryHeight * (i < 5 ? 0 : -1) + geometryHeight/2
  mountains[i].updateMatrixWorld()
  mountains[i].castShadow = true
  mountains[i].receiveShadow = true
}
}
export {mountains}