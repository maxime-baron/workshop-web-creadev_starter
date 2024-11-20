import SceneBouncingBubbles from "./js/scenarios/SceneBouncingBubbles"
import SceneGravityCubes from "./js/scenarios/SceneGravityCubes"
import { askMotionAccess } from "./js/Utils/DeviceAccess"

const scene2d = new SceneBouncingBubbles("canvas-scene")
const scene3d = new SceneGravityCubes("canvas-scene-3d")
const scene2d2 = new SceneBouncingBubbles("canvas-scene2")

/** motion sensors authorization */
const btn = document.getElementById("btn-access")
btn.addEventListener("click", function() {
    askMotionAccess()
}, false)