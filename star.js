const starList = [
    [[0, 0, 0], [0, 0, 0], 0, "Sun", "big", "yellow"],
    [[14, 29, 43], [-62, 40, 46], 4.2421, "Proxima Centauri", "smol", "red"],
    [[14, 39, 36.5], [-60, 50, 2], 4.3650, "Alpha Centauri", "big", "yellow"],
    [[17, 39, 35.1], [4, 41, 36], 5.9630, "Barnard's Star", "smol", "red"],
    [[10, 49, 18.7], [-53, 19, 10], 6.5880, "Luhman 16", "smol", "brown"],
    [[10, 56, 29.2], [7, 0, 53], 7.7825, "Wolf 359", "smol", "red"],
    [[11, 3, 20.2], [35, 58, 12], 8.2905, "Lalande 21185", "smol", "red"],
    [[6, 45, 8.8], [-16, 42, 58], 8.5828, "Sirius", "big", "white"],
    [[1, 39, 1.3], [-17, 57, 1], 8.7280, "Luyten 726-8", "smol", "red"],
    [[15, 41, 51.5], [-22, 50, 25], 9.3000, "Wise 1541-2250", "smol", "brown"],
    [[18, 49, 49.4], [-23, 50, 10], 9.6183, "Ross 154", "smol", "red"],
    [[23, 41, 54.7], [44, 10, 30], 10.322, "Ross 248", "smol", "red"],
    [[3, 32, 55.8], [-9, 27, 30], 10.522, "Epsilon Eridani", "big", "orange"],
    [[23, 5, 52], [-35, 51, 11], 10.742, "Lacaille 9352", "smol", "red"],
    [[11, 47, 44.4], [0, 48, 16], 10.919, "Ross 128", "smol", "red"],
    [[22, 38, 33.4], [-15, 18, 7], 11.266, "EZ Aquarii", "smol", "red"],
    [[7, 39, 18.1], [5, 13, 30], 11.402, "Procyon", "big", "white"],
    [[21, 6, 53.9], [38, 44, 58], 11.403, "61 Cygni", "big", "orange"],
    [[18, 42, 46.7], [59, 37, 49], 11.525, "Struve 2398", "smol", "red"],
    [[1, 18, 22.9], [44, 1, 23], 11.624, "Groombridge 34", "big", "red"],
    [[22, 3, 21.7], [-56, 47, 10], 11.824, "Epsilon Indi", "big", "orange"],
    [[8, 29, 49.5], [26, 46, 37], 11.826, "DX Cancri", "smol", "red"],
    [[1, 44, 4.1], [-15, 56, 15], 11.887, "Tau Ceti", "big", "yellow"],
    [[3, 35, 59.7], [-44, 30, 45], 11.991, "GJ 1061", "smol", "red"],
    [[1, 12, 30.6], [-16, 59, 56], 12.132, "YZ Ceti", "smol", "red"],
    [[7, 27, 24.5], [5, 13, 33], 12.366, "Luyten's Star", "smol", "red"],
    [[2, 53, 0.9], [16, 52, 53], 12.571, "Teegarden's Star", "smol", "red"],
    [[18, 45, 5.3], [-63, 57, 48], 12.571, "SCR 1845-6357", "smol", "red"],
    [[5, 11, 40.6], [-45, 1, 6], 12.777, "Kapteyn's Star", "smol", "red"],
    [[21, 17, 15.3], [-38, 52, 3], 12.870, "Lacaille 8760", "smol", "red"],
    [[22, 27, 59.5], [57, 41, 45], 13.149, "Kruger 60", "smol", "red"],
    [[10, 48, 14.7], [-39, 56, 6], 13.167, "DEN 1048-3956", "smol", "red"],
    [[6, 29, 23.4], [-2, 48, 50], 13.349, "Ross 614", "smol", "red"],
]

function raToTheta(h, m, s) {
    return 15 * h + 15 / 60 * m + 15 / 3600 * s;
}
function decToPhi(d, m, s) {
    return (d + (m / 60 + s / 3600) * Math.sign(d));
}

function createStarsFromList(list) {
    const starList = []
    for (const star of list) {
        const rA = star[0]
        const dec = star[1]
        const dist = star[2]

        const theta = raToTheta(rA[0], rA[1], rA[2])
        const phi = decToPhi(dec[0], dec[1], dec[2])

        let newStar = new Star(createVector(
            dist * cos(phi) * sin(theta),
            dist * cos(phi) * cos(theta),
            dist * sin(phi)
        ), star[3], star[4], star[5])
        starList.push(newStar)
    }
    return starList
}

class Star {
    constructor(pos, name, size, color) {
        this.pos = pos
        this.name = name
        this.color = color
        this.size = size
    }
    draw() {
        const p2d = project(this.pos)
        const toGrid2d = project(createVector(this.pos.x, this.pos.y, 0))

        stroke("darkred");
        strokeWeight(4);
        line(p2d.x, p2d.y, toGrid2d.x, toGrid2d.y)

        noStroke()
        fill(this.color)
        circle(p2d.x, p2d.y, this.size === "smol" ? 8 : 24)

        return p2d
    }
    highlight() {
        const p2d = project(this.pos)
        stroke("white")
        strokeWeight(4);
        noFill()
        circle(p2d.x, p2d.y, 30)

        strokeWeight(0.75);
        fill(255)
        text(this.name, p2d.x + 30, p2d.y + 5)
    }
}