import { PerspectiveCamera } from 'three'


class RootCamera extends PerspectiveCamera {
    constructor() {
      super(35, window.innerWidth /window.innerHeight, 0.1, 10000)
      this.position.set(0, 200, 0);
    }
}
  
const camera = new RootCamera()
export default camera
