import * as THREE from 'three'
import { Mesh, Object3D} from 'three'
import { PlaneGeometry
 } from 'three'
import {geometryWidth, geometryHeight} from '../utilities/constants'

export class Mountain extends Mesh {
    constructor(data) {
        super()

        this.geometry = new PlaneGeometry(
            geometryWidth,
            geometryHeight,
            3600,
            3600
        )
        const arr1 = new Array(this.geometry.attributes.position.count);
        const arr = arr1.fill(1);
        arr.forEach((a, index) => {
            this.geometry.attributes.position.setZ(index, (data[index]/120));
        });
        this.geometry.computeVertexNormals();
        
        this.material = new THREE.MeshLambertMaterial({side: THREE.DoubleSide});
    
        this.rotation.x = -Math.PI / 2;

        this.castShadow = true
        this.receiveShadow = true
    }
    
}
