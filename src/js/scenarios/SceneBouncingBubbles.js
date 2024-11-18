import Scene2D from "../Scene2D"
import { degToRad, randomRange } from "../Utils/MathUtils"

class Bubble {
    constructor(context, x, y, radius) {
        this.context = context
        this.x = x
        this.y = y
        this.radius = radius

        /** speed */
        this.vx = randomRange(-1, 1)
        this.vy = randomRange(-1, 1)
    }

    draw() {
        this.context.beginPath()
        this.context.arc(this.x, this.y, this.radius, 0, degToRad(360))
        this.context.fill()
        this.context.stroke()
        this.context.closePath()
    }

    update() {
        this.x += this.vx
        this.y += this.vy
    }
}

export default class SceneBouncingBubbles extends Scene2D {
    constructor(id) {
        super(id)

        this.bubbles = []
        for (let i = 0; i < 10; i++) {
            const x_ = this.width * Math.random()
            const y_ = this.height * Math.random()
            const bubble_ = new Bubble(this.context, x_, y_, 20)
            this.bubbles.push(bubble_)
        }

        this.draw()
    }

    draw() {
        /** style */
        this.context.strokeStyle = "white"
        this.context.fillStyle = "red"
        this.context.lineWidth = 4
        this.context.lineCap = "round"

        /** draw */
        if (!!this.bubbles) {
            this.bubbles.forEach(b => {
                b.draw()
            })
        }
    }

    update() {
        if (!!this.bubbles) {
            this.bubbles.forEach(b => {
                b.update()
            })
        }

        this.clear()
        this.draw()
    }

    resize() {
        super.resize()
        this.draw()
    }
}