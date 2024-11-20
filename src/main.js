import SceneBouncingBubbles from "./js/scenarios/SceneBouncingBubbles"
import Scene3D from "./js/template/Scene3D"
import { askMotionAccess } from "./js/Utils/DeviceAccess"

const scene2d = new SceneBouncingBubbles("canvas-scene")
const scene3d = new Scene3D("canvas-scene-3d")
const scene2d2 = new SceneBouncingBubbles("canvas-scene2")

/** motion sensors authorization */
const btn = document.getElementById("btn-access")
btn.addEventListener("click", function() {
    askMotionAccess()
}, false)