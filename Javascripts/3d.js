let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

// Function to resize the canvas to full screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Redraw or re-render canvas content if needed
    draw();
}

// Function to draw on the canvas (example content)
function draw() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Call resizeCanvas initially and on every window resize
window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();

cubeRotation = {
    x: 0,
    y: 0,
    z: 0
}

const cube = {
    vertices: [
        { x: -1, y: -1, z: -1 },
        { x: 1, y: -1, z: -1 },
        { x: 1, y: 1, z: -1 },
        { x: -1, y: 1, z: -1 },
        { x: -1, y: -1, z: 1 },
        { x: 1, y: -1, z: 1 },
        { x: 1, y: 1, z: 1 },
        { x: -1, y: 1, z: 1 }
    ],
    edges: [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
    ]
}

const scene = {
    scaleX: 0.5,
    scaleY: 0.5,
    offsetX: 0.5,
    offsetY: 0.5,
    distance: 2
}

function scaleCube(vertices, scale) {
    let scaledVertices = vertices.map(vertex => {
        return {
            x: vertex.x * scale.X,
            y: vertex.y * scale.Y,
            z: vertex.z * scale.Z
        };
    });

    return {
        vertices: scaledVertices,
    };
}


function rotateCube(vertices, angle) {
    let rotatedVertices = vertices.map(v => {
        // Original coordinates
        const originalX = v.x;
        const originalY = v.y;
        const originalZ = v.z;

        // Rotate around X axis
        let x = originalX;
        let y = originalY * Math.cos(angle.x) - originalZ * Math.sin(angle.x);
        let z = originalY * Math.sin(angle.x) + originalZ * Math.cos(angle.x);

        // Rotate around Y axis
        let newY = y;
        y = newY * Math.cos(angle.y) - z * Math.sin(angle.y);
        z = newY * Math.sin(angle.y) + z * Math.cos(angle.y);

        // Rotate around Z axis
        let newZ = z;
        z = newZ * Math.cos(angle.z) - x * Math.sin(angle.z);
        x = newZ * Math.sin(angle.z) + x * Math.cos(angle.z);

        return { x, y, z };
    });
    return rotatedVertices;
}


function projectCube(vertices, scene) {

    return vertices.map(v => {
        var z = v.z + scene.distance;
        return {
            x: (v.x / z) * scene.scaleX,
            y: (v.y / z) * scene.scaleY,
        };
    });

}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rotate cube
    let angle = cubeRotation;
    
    drawCube(cube, angle);

    cubeRotation.x += 0.01;
    requestAnimationFrame(drawScene);
}

function drawCube(cube, angle) {

    let newCubeVertices = rotateCube(cube.vertices, angle);

    // Project vertices to 2D
    var projectedVertices = projectCube(newCubeVertices, scene);

    cube.edges.forEach(function (edge) {
        ctx.beginPath();
        ctx.moveTo((projectedVertices[edge[0]].x + scene.offsetX) * canvas.width, (projectedVertices[edge[0]].y + scene.offsetY) * canvas.height);
        ctx.lineTo((projectedVertices[edge[1]].x + scene.offsetX) * canvas.width, (projectedVertices[edge[1]].y + scene.offsetY) * canvas.height);
        ctx.stroke();
    });
}

drawScene();