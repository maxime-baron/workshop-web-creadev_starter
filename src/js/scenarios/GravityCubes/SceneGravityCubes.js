import * as THREE from 'three'
import Scene3D from "../../template/Scene3D"
import { Composite, Engine, Runner } from 'matter-js'
import { randomRange } from '../../Utils/MathUtils'
import GravityCube from './GravityCubes'
import Wall from './Wall'

const THICKNESS = 15

export default class SceneGravityCubes extends Scene3D {
    constructor(id) {
        super(id)

        /** orthographic camera */
        this.camera = new THREE.OrthographicCamera(
            -this.width / 2, this.width / 2, this.height / 2, -this.height / 2,
            0.1, 2000 //-> near / far default (optional)
        )
        this.camera.position.z = 1000

        /** walls */
        this.wallRight = new Wall('blue')
        this.wallBottom = new Wall('red')
        this.add(this.wallRight)
        this.add(this.wallBottom)

        /** cube */
        this.cubes = []
        const colors = ['red', 'yellow', 'blue']
        for(let i=0; i < 10; i++) {
            const cube_ = new GravityCube(50, colors[i % colors.length])
            const x_ = randomRange( -this.width / 2, this.width / 2 )
            const y_ = randomRange( -this.height / 2, this.height / 2 )
            cube_.setPosition(x_, y_)

            this.add(cube_)
            this.cubes.push(cube_)
        }

        /** matter js */
        this.engine = Engine.create({ render: { visible: false } })
        this.bodies = [
            this.wallRight.body,
            this.wallBottom.body,
            ...this.cubes.map(c => c.body)
        ]
        Composite.add(this.engine.world, this.bodies)
        this.runner = Runner.create()
        Runner.run(this.runner, this.engine)

        /** resize */
        this.resize()
    }

    update() {
        // this.cube.rotation.x += this.globalContext.time.delta / 1000 

        this.cubes.forEach(c => { c.update() })

        super.update() //-> rendu de la scene
    }

    scroll() {
        super.scroll()
        // this.cube.rotation.z += 0.1 (example)
    }

    resize() {
        super.resize()

        this.camera.left = -this.width / 2
        this.camera.right = this.width / 2
        this.camera.top = this.height / 2
        this.camera.bottom = -this.height / 2

        if (!!this.wallRight) {
            this.wallRight.setPosition(this.width / 2, 0)
            this.wallRight.setSize(THICKNESS, this.height)

            this.wallBottom.setPosition(0, -this.height / 2)
            this.wallBottom.setSize(this.width / 1.5, THICKNESS)
        }
    }
}