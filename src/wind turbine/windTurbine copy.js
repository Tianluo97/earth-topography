import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Object3D
 } from 'three'

export class windTurbine extends Object3D {
    constructor() {
        super()
        const windTurbine = new THREE.Object3D()
        const loader = new GLTFLoader()
        loader.load(
            './wind turbine/models/turbine.glb',
            function (gltf) {
                gltf.scene.traverse(function (child) {
                    child.receiveShadow = true
                    child.castShadow = true
                })

                windTurbine.add(gltf.scene)
                windTurbine.scale.set(0.001, 0.001, 0.001)
                // // Animation
                // mixer = new THREE.AnimationMixer(gltf.scene)    //获取动画的对象
                // action = mixer.clipAction(gltf.animations[0])   //获取其中的一个动画
                // action.play()                                   //开始play动画
            }
        )
        this.add(windTurbine)
    }

}