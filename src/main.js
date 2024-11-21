import { Composite } from "matter-js"
import SceneGravityCubes from "./js/scenarios/GravityCubes/SceneGravityCubes"
import SceneBouncingBubbles from "./js/scenarios/SceneBouncingBubbles"
import GlobalContext from "./js/template/GlobalContext"
import { askMotionAccess } from "./js/Utils/DeviceAccess"

/** motion sensors authorization */
const btn = document.getElementById("btn-access")
btn.addEventListener("click", function () {
    askMotionAccess()
}, false)

/** scenes */
const scene1 = new SceneBouncingBubbles("canvas-scene")
const scene2 = new SceneGravityCubes("canvas-scene-3d")
const scene3 = new SceneBouncingBubbles("canvas-scene2")

/** main */
const globalContext = new GlobalContext()
const params = {
    test: 0
}
if (!!globalContext.debug.ui) {
    globalContext.debug.ui.add(params, "test", 0, 10)
}
const time = globalContext.time
const update = () => {
    const scale_ = 1 + (Math.cos(5 * time.elapsed / 1000) / 2 + 0.5) / 20
    btn.style.transform = `scale(${scale_}, ${1})`

    /** bubbles + cube scan = is IN or OUT ? */
    const outScene2_down = scene2.cubes.filter(c => { return c.position.y < -scene2.height / 2 })

    /** remove entities (cube + bubble) OUT of their own scene */
    outScene2_down.forEach(cubeToRemove => {
        /** dispose from memory */
        cubeToRemove.geometry.dispose()
        cubeToRemove.material.dispose()
        cubeToRemove.removeFromParent()

        /** dispose from matter js */
        Composite.remove(scene2.engine.world, cubeToRemove.body)

        /** dispose from scene */
        scene2.cubes = scene2.cubes.filter(c => { return c !== cubeToRemove })
    })

    console.log(scene2.cubes.length)

    /** add new entities to corresponding scene, ex: bulle scene 1 -> cube scene 2 */
}
time.on("update", update)