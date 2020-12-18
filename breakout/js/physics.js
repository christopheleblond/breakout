var Physics = {
    collisionRect: (recta, rectb) => {

        if((rectb.x >= recta.x + recta.w)      // trop à droite
        || (rectb.x + rectb.w <= recta.x) // trop à gauche
        || (rectb.y >= recta.y + recta.h) // trop en bas
        || (rectb.y + rectb.h <= recta.y))  // trop en haut
            return false
        else {
            return true
        } 
    },
    intersect(p1, p2, p3, p4, dir) {
        let x1 = p1.x
        let y1 = p1.y
        let x2 = p2.x
        let y2 = p2.y
        let x3 = p3.x
        let y3 = p3.y
        let x4 = p4.x
        let y4 = p4.y

        let denom = ((y4-y3) * (x2-x1)) - ((x4-x3) * (y2-y1))
        if (denom != 0) {
            let ua = (((x4-x3) * (y1-y3)) - ((y4-y3) * (x1-x3))) / denom
            if ((ua >= 0) && (ua <= 1)) {
                let ub = (((x2-x1) * (y1-y3)) - ((y2-y1) * (x1-x3))) / denom
                if ((ub >= 0) && (ub <= 1)) {
                    var x = x1 + (ua * (x2-x1))
                    var y = y1 + (ua * (y2-y1))
                    return { x: x, y: y, dir: dir }
                }
            }
        }
        return null
    }
}