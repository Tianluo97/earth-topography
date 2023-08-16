import * as THREE from 'three'
import { _earthRadius } from '/utilities/constants.ts'
// import { mergedMaterial } from './topographyMaterial.js';
import { GUI } from 'dat.gui'
//import GeoTIFF, {fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';
import { Mountain } from'/topography/Mountain'
import {geometryWidth, geometryHeight} from '../utilities/constants'

export class Mountains extends THREE.Group {
  constructor(scene){
    super()
    this.type = "mountains"
    this.scene = scene                      
    this.mountains = [] 
    this.url = []
    this.addMountains().catch(error => {     
      console.error(error);
  });
}

async addMountains(){

    this.url[0] = './data/topography/NASADEM_HGT_n42e119.tif';
    this.url[1] = './data/topography/NASADEM_HGT_n43e119.tif';
    this.url[2] = './data/topography/NASADEM_HGT_n42e118.tif';
    this.url[3] = './data/topography/NASADEM_HGT_n43e118.tif';
    this.url[4] = './data/topography/NASADEM_HGT_n42e120.tif';
    this.url[5] = './data/topography/NASADEM_HGT_n43e120.tif';

    let rawTiff, tifImage, data
    for (let i = 0; i< this.url.length; i++ ){
      //提取rawtiff
        rawTiff = await GeoTIFF.fromUrl(this.url[i]);
        tifImage = await rawTiff.getImage();
        data = await tifImage.readRasters({ interleave: true });
        let mountain = new Mountain(data)
        this.scene.add(mountain)

        mountain.position.z = -geometryHeight * (i % 2)
        if(i == 2 || i == 3) {
          mountain.position.x = - geometryWidth
        }
        else if(i == 4|| i == 5) {
          mountain.position.x = geometryWidth
        }
        this.mountains.push(mountain)    
    }
  }
}

