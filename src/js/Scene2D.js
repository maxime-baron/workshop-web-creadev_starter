import GlobalContext from "./GlobalContext"
import DomElement from "./Utils/DomElement"

export default class Scene2D {
    constructor(id) {
        /** context (window) */
        this.globalContext = new GlobalContext()
        this.globalContext.addScene(this)

        /** dom element */
        this.domElement = new DomElement(id)
        this.canvas = this.domElement.element
        this.context = this.canvas.getContext("2d")

        /** init */
        this.resize()
    }

    resize() {
        console.log("resize scene 2d")
        this.domElement.setSize()
        const pixelRatio_ = this.globalContext.window.pixelRatio
        this.canvas.width = this.domElement.width * pixelRatio_
        this.canvas.height = this.domElement.height * pixelRatio_
        this.context.scale(pixelRatio_, pixelRatio_)
    }
}