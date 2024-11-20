import * as THREE from 'three'
import Scene3D from "../template/Scene3D"

export default class SceneGravityCubes extends Scene3D {
    constructor(id) {
        super(id)

        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        this.cube = new THREE.Mesh(geometry, material)
        this.add(this.cube)
        this.camera.position.z = 5
    }

    update() {
        this.cube.rotation.x += this.globalContext.time.delta / 1000 
        
        super.update() //-> rendu de la scene
    }

    scroll() {
        super.scroll()
        this.cube.rotation.z += 0.1
    }
}