import Scene2D from "../Scene2D"
import { degToRad } from "../Utils/MathUtils"

export default class SceneBouncingBubbles extends Scene2D {
    constructor(id) {
        super(id)

        this.draw()
    }

    draw() {
        /** scenario */
        this.context.strokeStyle = "white"
        this.context.fillStyle = "red"
        this.context.lineWidth = 4
        this.context.lineCap = "round"

        this.context.beginPath()
        this.context.arc(50, 100, 20, 0, degToRad(360))
        this.context.fill()
        this.context.stroke()
        this.context.closePath()

        this.context.beginPath()
        this.context.arc(200, 200, 20, 0, degToRad(360))
        this.context.fill()
        this.context.stroke()
        this.context.closePath()
    }

    resize() {
        super.resize()
        this.draw()
    }
}