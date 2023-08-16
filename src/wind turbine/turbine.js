import * as THREE from 'three'
import { Object3D} from 'three'
import { centroid} from '../utilities/constants'

export class Turbine extends Object3D {
    constructor(scene, gltf) {
        super()
        this.scene= scene;
        this.windTurbine= gltf.scene.clone()

        this.windTurbine.scale.set(0.02 * 0.001, 0.02 * 0.001, 0.02 * 0.001)
        this.scene.add(this.windTurbine)

        this.mixer = new THREE.AnimationMixer(this.windTurbine )    
        let action = this.mixer.clipAction(gltf.animations[0])  
        action.play()          
    }

    findLocation(boundaryPosition, intersectObj){

        const centerPosition = new THREE.Vector3(centroid.x, 0.0, -centroid.y)
        centerPosition.sub(boundaryPosition)
        centerPosition.multiplyScalar(Math.random())
        boundaryPosition.add(centerPosition) 

        let dir = new THREE.Vector3(0,1,0)
        let raycaster, origin, intersectObject
        origin = new THREE.Vector3(boundaryPosition.x, 0, boundaryPosition.z)
        raycaster = new THREE.Raycaster(origin, dir)
        intersectObject = raycaster.intersectObject(intersectObj)
        boundaryPosition.y = intersectObject[0].point.y

        this.windTurbine.position.copy(boundaryPosition)
    }

    update(deltaTime){
        this.mixer.update(deltaTime)
    }
}
