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


const camera = {
    fov : 90 * (Math.PI / 180),
    aspect : window.innerWidth / window.innerHeight,
    near : 0.1,
    far : 1000
}


function scaleVertices(vertices, scale) {
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


function rotatedVertices(vertices, angle) {
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

function createPerspectiveMatrix(fov, aspect, near, far) {
    const f = 1.0 / Math.tan(fov / 2);
    const rangeInv = 1 / (near - far);

    return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (near + far) * rangeInv, -1,
        0, 0, near * far * rangeInv * 2, 0
    ];
}


function applyPerspective(vertex, perspectiveMatrix) {
    // Convert the vertex into a 4D point for matrix multiplication
    const point = [vertex.x, vertex.y, vertex.z, 1];
    const transformed = [];

    // Matrix multiplication
    for (let i = 0; i < 4; i++) {
        transformed[i] = point[0] * perspectiveMatrix[i * 4 + 0] +
                         point[1] * perspectiveMatrix[i * 4 + 1] +
                         point[2] * perspectiveMatrix[i * 4 + 2] +
                         point[3] * perspectiveMatrix[i * 4 + 3];
    }

    // Convert back to 3D point
    if (transformed[3] !== 0) {
        transformed[0] /= transformed[3];
        transformed[1] /= transformed[3];
        transformed[2] /= transformed[3];
    }

    return { x: transformed[0], y: transformed[1], z: transformed[2] };
}


function isVertexInFrustum(vertex, frustum) {
    // Implement frustum culling logic here
    // This usually involves checking if the vertex is within the frustum boundaries
    // Return true if inside the frustum, false otherwise
}

function projectVertices(vertices, scene) {

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

    let newCubeVertices = rotatedVertices(cube.vertices, angle);
    const perspectiveMatrix = createPerspectiveMatrix(camera.fov, camera.aspect, camera.near, camera.far);
    let transformedCube = {
        vertices: cube.vertices.map(v => {
            let transformedVertex = applyPerspective(v, perspectiveMatrix);
            return isVertexInFrustum(transformedVertex, /* your frustum */) ? transformedVertex : null;
        }),
        edges: cube.edges
    };
    // Project vertices to 2D
    var projectedVertices = projectVertices(newCubeVertices, scene);

    cube.edges.forEach(function (edge) {
        ctx.beginPath();
        ctx.moveTo((projectedVertices[edge[0]].x + scene.offsetX) * canvas.width, (projectedVertices[edge[0]].y + scene.offsetY) * canvas.height);
        ctx.lineTo((projectedVertices[edge[1]].x + scene.offsetX) * canvas.width, (projectedVertices[edge[1]].y + scene.offsetY) * canvas.height);
        ctx.stroke();
    });
}

drawScene();



