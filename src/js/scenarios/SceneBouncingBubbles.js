import GlobalContext from "../GlobalContext"
import Scene2D from "../Scene2D"
import { degToRad, randomRange } from "../Utils/MathUtils"

class Bubble {
    constructor(context, x, y, radius) {
        this.context = context
        this.x = x
        this.y = y
        this.radius = radius

        this.time = new GlobalContext().time

        /** speed */
        this.vx = randomRange(-200, 200)
        this.vy = randomRange(-200, 200)
    }

    draw() {
        this.context.beginPath()
        this.context.arc(this.x, this.y, this.radius, 0, degToRad(360))
        this.context.fill()
        this.context.stroke()
        this.context.closePath()
    }

    update(width, height) {
        this.x += this.vx * this.time.delta / 1000
        this.y += this.vy * this.time.delta / 1000

        /** bounce */
        // if (this.x < 0 || this.x > width) this.vx *= -1
        // if (this.y < 0 || this.y > height) this.vy *= -1

        /** bounce corrected */
        this.vx = this.x < this.radius ? Math.abs(this.vx) : this.vx
        this.vx = this.x > width - this.radius ? -Math.abs(this.vx) : this.vx
        this.vy = this.y < this.radius ? Math.abs(this.vy) : this.vy
        this.vy = this.y > height - this.radius ? -Math.abs(this.vy) : this.vy
    }
}

export default class SceneBouncingBubbles extends Scene2D {
    constructor(id) {
        super(id)

        this.bubbles = []
        for (let i = 0; i < 10; i++) {
            const x_ = this.width * Math.random()
            const y_ = this.height * Math.random()
            const bubble_ = new Bubble(this.context, x_, y_, 10)
            this.bubbles.push(bubble_)
        }

        this.draw()
    }

    draw() {
        /** style */
        this.context.strokeStyle = "white"
        this.context.fillStyle = "black"
        this.context.lineWidth = 2
        this.context.lineCap = "round"

        /** draw */
        if (!!this.bubbles) {
            for (let i = 0; i < this.bubbles.length; i++) {
                const current_ = this.bubbles[i]
                for (let j = i; j < this.bubbles.length; j++) {
                    const next_ = this.bubbles[j]

                    // threshold = 200

                    this.context.beginPath()
                    this.context.moveTo(current_.x, current_.y)
                    this.context.lineTo(next_.x, next_.y)
                    this.context.stroke()
                    this.context.closePath()
                }
            }

            this.bubbles.forEach(b => {
                b.draw()
            })
        }
    }

    update() {
        if (!!this.bubbles) {
            this.bubbles.forEach(b => {
                b.update(this.width, this.height)
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