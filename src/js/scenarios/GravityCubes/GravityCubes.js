import * as THREE from 'three'
import { Bodies, Body } from 'matter-js'

export default class GravityCube extends THREE.Mesh {
    constructor(size = 30) {
        /** three mesh */
        const colors = ['red', 'yellow', 'blue']
        const randomNmbr = Math.floor(Math.random() * 3);
        const color = colors[randomNmbr]
        const geometry_ = new THREE.BoxGeometry(size, size, size)
        const material_ = new THREE.MeshBasicMaterial({ color })
        super(geometry_, material_)

        /** matter js body */
        this.body = Bodies.rectangle(
            0, 0, size, size
        )
    }

    setPosition(x, y) {
        /** three */
        this.position.x = x
        this.position.y = y

        /** matter */
        Body.setPosition(this.body, { x: x, y: -y })
    }

    update() {
        this.position.x = this.body.position.x
        this.position.y = -this.body.position.y
        this.rotation.z = -this.body.angle
    }
}