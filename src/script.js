import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//import { mountains} from '/topography/topography lowMeshLoop'
//import { mountain } from '/topography/topography lowMeshSingle'
import { loadTurbine } from'/wind turbine/windTurbine'
import { Turbines } from'/wind turbine/turbines'
import { addGUI } from '/render/gui'
import { rootRender } from './render/rootRender'
import light from '/render/directionalLight'
import camera from '/render/perspectiveCamera'
import {axexHelper, directionLightHelper, cameraHelper} from '/render/helper'
//import { windTurbineCircle, windTurbineNumber, boundary, geometrySpacedPoints} from './utilities/constants'
import { CircleGeometry, Vector2, Shape, BufferGeometry} from 'three'
import {windTurbineNumber, boundaryGeometry} from './utilities/constants'
import { Mountains } from './topography/Mountains'
/**
 * 
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
const testPlaneGeo = new THREE.PlaneGeometry(100,100,10, 10)
const testMaterial= new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide})
const testPlane = new THREE.Mesh( testPlaneGeo,testMaterial );
testPlane.rotateX(-Math.PI / 2)
testPlane.position.y = 0
//scene.add( testPlane )

const line = new THREE.Line(boundaryGeometry, new THREE.LineBasicMaterial({color: 0xffff00}))
line.position.y = 10
scene.add(line)

/**
 * Turbine
 */
// const turbines= new Turbines(scene, mountain)
const mountains = new Mountains(scene)

/**
 * Mountain
 */
//mountains
//mountains.forEach((children) => 
//scene.add(children)  
//addMountains()

// scene.add(mountain)

/**
 * Sizes
 */ 
const renderer = new rootRender(canvas)
scene.add(light)

window.addEventListener('resize', () =>
{
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxDistance = 5000;
controls.minDistance = 0;

//addHelper and gui
scene.add(new axexHelper(40))
// scene.add(new directionLightHelper(light, 10))
// scene.add(new cameraHelper(light.shadow.camera))
addGUI(light)

/**
 * 
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Model animation
    // if(mixer)
    // {   
    //     turbines.update(deltaTime)
    //     // mixer.forEach(element =>
    //     //    element.update(deltaTime))
    // }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()