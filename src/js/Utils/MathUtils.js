export function degToRad(deg) {
    return deg * Math.PI / 180
}

export function randomRange(min, max) {
    const min_ = Math.min(min, max)
    const max_ = Math.max(min, max)
    return min_ + (max_ - min_) * Math.random()
}