import { GUI } from 'dat.gui'

export const addGUI = (light) => {
    const gui = new GUI()
    const directionalLightFolder = gui.addFolder('THREE.DirectionalLight')
    directionalLightFolder.add(light.position, 'x', -50, 50, 0.01)
    directionalLightFolder.add(light.position, 'y', -50, 50, 0.01)
    directionalLightFolder.add(light.position, 'z', -50, 50, 0.01)

    directionalLightFolder
        .add(light.shadow.camera, 'left', -500, 500, 0.1)
        .onChange(() => light.shadow.camera.updateProjectionMatrix())
    directionalLightFolder
        .add(light.shadow.camera, 'right', -500, 500, 0.1)
        .onChange(() => light.shadow.camera.updateProjectionMatrix())
    directionalLightFolder
        .add(light.shadow.camera, 'top', -500, 500, 0.1)
        .onChange(() => light.shadow.camera.updateProjectionMatrix())
    directionalLightFolder
        .add(light.shadow.camera, 'bottom', -500, 500, 0.1)
        .onChange(() => light.shadow.camera.updateProjectionMatrix())
    directionalLightFolder
        .add(light.shadow.camera, 'near', 0.0, 1000)
        .onChange(() => light.shadow.camera.updateProjectionMatrix())
    directionalLightFolder
        .add(light.shadow.camera, 'far', 0.1, 1000)
        .onChange(() => light.shadow.camera.updateProjectionMatrix())

    directionalLightFolder.open()

}