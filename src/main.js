import SceneGravityCubes from "./js/scenarios/GravityCubes/SceneGravityCubes"
import SceneBouncingBubbles from "./js/scenarios/SceneBouncingBubbles"
import GlobalContext from "./js/template/GlobalContext"
import { askMotionAccess } from "./js/Utils/DeviceAccess"

/** motion sensors authorization */
const btn = document.getElementById("btn-access")
btn.addEventListener("click", function() {
    askMotionAccess()
}, false)

/** scenes */
const scene2d = new SceneBouncingBubbles("canvas-scene")
const scene3d = new SceneGravityCubes("canvas-scene-3d")
const scene2d2 = new SceneBouncingBubbles("canvas-scene2")

/** main */
const globalContext = new GlobalContext()
const params = {
    test: 0
}
if(!!globalContext.debug.ui) {
    globalContext.debug.ui.add(params, "test", 0, 10)
}
const time = globalContext.time
const update = () => {
    const scale_ = 1 + (Math.cos(3 * time.elapsed / 1000) / 2 + 0.5) / 10
    btn.style.transform = `scale(${scale_}, ${scale_})`
}
time.on("update", update)