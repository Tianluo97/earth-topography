import { PCFSoftShadowMap, WebGLRenderer } from "three";

export class rootRender extends WebGLRenderer {
    constructor(canvas){
        super({
            canvas,
            // precision: 'highp',
            // alpha: true,
            // premultipliedAlpha: true,
            // antialias: false,
            // stencil: true,
            // preserveDrawingBuffer: false,
            // powerPreference: 'high-performance',
            // failIfMajorPerformanceCaveat: false,
            // depth: true,
            // logarithmicDepthBuffer:false
        })
        this.setSize(window.innerWidth, window.innerHeight)
        this.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.shadowMap.enabled = true
        this.shadowMap.type = PCFSoftShadowMap
    }
}