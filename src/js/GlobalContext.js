import Debug from "./Utils/Debug"
import Time from "./Utils/Time"

let instanceGlobalContext = null

export default class GlobalContext {
    constructor() {
        if (!!instanceGlobalContext) return instanceGlobalContext
        instanceGlobalContext = this

        this.sceneCollection = []

        window.addEventListener('resize', () => { this.resize() })
        window.addEventListener('scroll', () => { this.scroll() })
        this.time = new Time()
        this.time.on('update', () => { this.update() })

        /** debug */
        this.debug = new Debug()
    }

    get window() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            pixelRatio: Math.min(window.devicePixelRatio, 2)
        }
    }

    addScene(scene) {
        this.sceneCollection.push(scene)
    }

    resize() {
        this.sceneCollection.forEach(s => { s.resize() })
    }

    update() {
        this.sceneCollection.forEach(s => {
            if (s.domElement.isVisible) {
                s.update()
            }
        })
    }

    scroll() {
        this.sceneCollection.forEach(s => { s.scroll() })
    }
}