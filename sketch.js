// Global Variabes
let scrollAmount = 50
let rotateXAmount = -135
let rotateYAmount = -55
let rotateXSpeed = 0
let rotateYSpeed = 0
let position 
let mouseVector

let edges;
let stars;
let bottomStars;
let topStars;

let closestStar = null
let closestStarDistance = 999999999

function preload() {
    img = loadImage('space.jpg');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES)
    
    edges = []
    const size = 14
    for(let i = -size; i <= size; i += 2) {
        edges.push([createVector(i, -size, 0), createVector(i, size, 0), "#202950"])
        edges.push([createVector(-size, i, 0), createVector(size, i, 0), "#202950"])
    }
    stars = createStarsFromList(starList)

     
    mouseVector = createVector()
    position = createVector(width/2,height/2)
}

function draw() {
    background(0);
    image(img, 0, 0, windowWidth, windowHeight);

    mouseVector.x = mouseX
    mouseVector.y = mouseY

    closestStarDistance = 999999999
    closestStar = undefined

    fill('limegreen');
    text(`CamX ${rotateXAmount}`, 0, 30);
    text(`CamY ${rotateYAmount}`, 0, 50);
    rotateXAmount -= rotateXSpeed
    rotateYAmount += rotateYSpeed
    rotateYAmount = constrain(rotateYAmount, -180,  0)

    topStars = stars.filter((e) => (abs(rotateYAmount) <= 90 && e.pos.z >= 0) || (abs(rotateYAmount) >= 90 && e.pos.z <= 0))
    bottomStars = stars.filter((e) => (abs(rotateYAmount) <= 90 && e.pos.z <= 0) || (abs(rotateYAmount) >= 90 && e.pos.z >= 0))

    const inputX = btoi(keyIsDown(LEFT_ARROW)) - btoi(keyIsDown(RIGHT_ARROW))
    const inputY = btoi(keyIsDown(UP_ARROW)) - btoi(keyIsDown(DOWN_ARROW)) 
    position.x += inputX * 0.5
    position.y += inputY * 0.5

    // translate(width/2, height/2)
    // scale(scrollAmount)

    for (const star of bottomStars) {
        drawingContext.setLineDash([5, 15]);
        const p2d = star.draw()
        assignClosest(p2d, star)
    }

    for (const e of edges) {
        const e_start = project(e[0])
        const e_end = project(e[1])  

        stroke(e[2]);
        strokeWeight(1.5);
        drawingContext.setLineDash([10, 5]);
        line(e_start.x, e_start.y, e_end.x, e_end.y)
    }
    setLineDash([])

    for (const star of topStars) {
        const p2d = star.draw()
        assignClosest(p2d, star)
    }

    if (closestStar && closestStarDistance < 10) {
        closestStar.highlight()
    }

    rotateXSpeed *= 0.9
    rotateYSpeed *= 0.9
    console.log()
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function btoi(b) {
    return b ? 1 : 0
}

function assignClosest(p2d, star) {
    const mouseDist = p2d.dist(mouseVector)
    if (mouseDist < closestStarDistance) {
        closestStarDistance = mouseDist
        closestStar = star
    }   
}

function project(v3d) {
    let v2d = createVector(v3d.x, v3d.y)

    const cx = cos(rotateXAmount)
    const sx = sin(rotateXAmount)

    v2d.x = v3d.x * cx - (v3d.y * sx)
    v2d.y = v3d.x * sx + (v3d.y * cx) 
    v2d.y = v3d.z * sin(rotateYAmount) + (v2d.y * cos(rotateYAmount)) 

    v2d.x *= scrollAmount
    v2d.y *= scrollAmount
    
    v2d.x += position.x
    v2d.y += position.y
    
    return v2d
}

const scrollSpeed = 1.5
function mouseWheel(event) {
    if (event.delta > 0) {
        scrollAmount += scrollSpeed;
    } else {
        scrollAmount -= scrollSpeed;
    }    
    scrollAmount = max(scrollAmount, 0)
}

function mouseDragged(e) {
    if (e.button !== 0) return

    rotateXSpeed = e.movementX * 0.75
    rotateYSpeed = e.movementY * 0.75
}

function mouseReleased(e) {
    if (e.button === 0 && closestStar && closestStarDistance < 10) {
        let div = createDiv('p5*js');
        div.position(width/2, height/2);
    }
}

function keyPressed(event) {}

function keyReleased(event) {}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}