import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Turbine } from'/wind turbine/turbine'
import {windTurbineNumber, boundaryGeometry} from '../utilities/constants'

export class Turbines extends THREE.Group {
    constructor(scene, intersectObj) {
        super()
        this.type = "turbines";
        this.scene = scene                      //传进scene场景，绑定scene属性
        this.turbines = []                      //绑定turbines的属性
        this.addTurbines().catch(error => {     //在方法中把turbine依次添加到场景中，并绑定到turbines属性上
            console.error(error);
        });
        this.intesectObj = intersectObj
    }

    async addTurbines(){
        const gltfLoader = new GLTFLoader()
        const gltfData = await gltfLoader.loadAsync('/wind turbine/models/turbine.glb')         //load gltf模型
        gltfData.scene.traverse(function (child) {
            child.receiveShadow = true
            child.castShadow = true
        })

        //let windOriginalPosition
        for(let i = 0; i < windTurbineNumber; i++){             //加载完成模型后，依次把模型添加到场景中去

            let boundaryPosition = new THREE.Vector3().fromBufferAttribute(boundaryGeometry.attributes.position, i); 
            let turbine= new Turbine(this.scene, gltfData)   
            turbine.findLocation(boundaryPosition, this.intesectObj)    
            this.turbines[i]=turbine                           
        }
    }

    update(deltaTime){
        this.turbines.forEach(element =>
        element.update(deltaTime))
    }
}
