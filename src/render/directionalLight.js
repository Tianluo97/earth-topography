import { DirectionalLight } from "three";

//directionalLight
class Light extends DirectionalLight {
   constructor(){
    super(0xffffff, 1.0)
    this.castShadow = true;
    this.shadow.mapSize.set(2048,2048)
    this.shadow.camera.near = 0.5;
    this.shadow.camera.far = 500;
    this.shadow.camera.left = -300;
    this.shadow.camera.right = 300;
    this.shadow.camera.top = 300;
    this.shadow.camera.bottom = -300;
    this.shadow.bias = -0.01
   }
}

const light = new Light()
export default light
