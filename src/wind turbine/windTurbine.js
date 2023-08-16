import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Object3D} from 'three'
import { windTurbineCircle, windTurbineNumber} from '../utilities/constants'

 

let windOriginalPosition= (function boundary(){
    const boundary = new THREE.CircleGeometry(windTurbineCircle, windTurbineNumber);
    boundary.rotateX(-Math.PI/2);
    let windOriginalPosition = []
    for(let i = 0; i < windTurbineNumber; i++){
        //将风机的位置map到圆上
        windOriginalPosition[i] = new THREE.Vector3().fromBufferAttribute(boundary.attributes.position, i); 
        windOriginalPosition[i].multiplyScalar(Math.random())
    }
    return  windOriginalPosition;
})()
 

let dir = new THREE.Vector3(0,1,0).normalize()
let raycaster, origin, intersectObject

function setWindTurbineLocation (i, intesectObj){
    //判断tubine的y position,使得其落在mountain上
    origin = new THREE.Vector3(windOriginalPosition[i].x, 0, windOriginalPosition[i].z)
    raycaster = new THREE.Raycaster(origin, dir)
    intersectObject = raycaster.intersectObject(intesectObj)
    //windOriginalPosition[i].y = intersectObject[0].point.y
}
export function loadTurbine(mixer, windTurbine, scene){
//export function loadTurbine(mixer, windTurbine, scene, intesectObj){
    
    const gltfLoader = new GLTFLoader()
    gltfLoader.load
    ('/wind turbine/models/turbine.glb',
        (gltf) =>
            {   
                gltf.scene.traverse(function (child) {
                    child.receiveShadow = true
                    child.castShadow = true
                })

                for(let i = 0; i < windTurbineNumber; i++)
                {
                    //场景中添加windTurbine
                    windTurbine[i] = gltf.scene.clone()
                    windTurbine[i].scale.set(0.02 * 0.1, 0.02 * 0.1, 0.02 * 0.1)
                   // windTurbine[i].scale.set(0.02 * 0.001, 0.02 * 0.001, 0.02 * 0.001)
                    //setWindTurbineLocation(i, intesectObj)
                    
                    windTurbine[i].position.copy(windOriginalPosition[i])

                    scene.add(windTurbine[i])

                    // Animation
                    mixer[i] = new THREE.AnimationMixer(windTurbine[i] )    
                    let action = mixer[i].clipAction(gltf.animations[0])  
                    action.play()                                   
                }
            }
    )
}

