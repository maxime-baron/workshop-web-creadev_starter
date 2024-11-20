import * as THREE from 'three'
import GlobalContext from "./GlobalContext"
import DomElement from "../Utils/DomElement"

export default class Scene3D {
    constructor(id) {
        /** context (window) */
        this.globalContext = new GlobalContext()
        this.globalContext.addScene(this)

        /** debug */
        this.params = {}
        this.debug = this.globalContext.debug
        if (!!this.debug.ui) {
            this.debugFolder = this.debug.ui.addFolder(id)
        }

        /** dom element */
        this.domElement = new DomElement(id)
        this.canvas = this.domElement.element
        // this.context = this.canvas.getContext("3d")

        /** example */
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera( 75, this.domElement.aspectRatio, 0.1, 1000 )
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas, antialias: true
        })

        const geometry = new THREE.BoxGeometry( 1, 1, 1 )
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
        this.cube = new THREE.Mesh( geometry, material )
        this.scene.add( this.cube )
        this.camera.position.z = 5

        /** init */
        this.resize()
    }

    get width() { return this.domElement.width }
    get height() { return this.domElement.height }
    get position() { return this.domElement.position }

    resize() {
        this.domElement.setSize()
        this.canvas.width = this.domElement.width
        this.canvas.height = this.domElement.height

        this.camera.aspect = this.domElement.aspectRatio
        this.camera.updateProjectionMatrix()

        this.renderer.setSize( this.width, this.height, false )
        this.renderer.setPixelRatio(this.globalContext.window.pixelRatio)
    }

    onDeviceOrientation() {}

    update() { 
        this.cube.rotation.z += this.globalContext.time.delta / 1000
        this.renderer.render( this.scene, this.camera )
    }

    scroll() {
        this.domElement.setSize()
    }
    destroy() {}
}