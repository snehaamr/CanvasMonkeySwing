// Get the canvas and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas size
canvas.width = 800;
canvas.height = 400;

// Tree positions
const tree1 = { x: 150, y: 100, width: 20, height: 150 };
const tree2 = { x: 500, y: 100, width: 20, height: 150 };

// Monkey properties
const monkey = {
    x: tree1.x + tree1.width / 2, // Starting position at tree 1
    y: tree1.y + 50, // 50px below the tree top (where the zipline starts)
    width: 50,
    height: 50,
    velocityX: 0,
    velocityY: 0,
    gravity: 0.1,
    speed: 0, // Initial speed is 0
    ropeLength: 350, // Distance between trees
    t: 0, // Parametric value for the position on the Bezier curve
    direction: 1, // 1 for moving right (tree1 -> tree2), -1 for left (tree2 -> tree1)
    isSwinging: false, // Whether the monkey is swinging or not
};

// Draw trees (trunks)
function drawTrees() {
    ctx.fillStyle = '#8B4513'; // Brown color for tree trunks
    ctx.fillRect(tree1.x, tree1.y, tree1.width, tree1.height); // Tree 1 trunk
    ctx.fillRect(tree2.x, tree2.y, tree2.width, tree2.height); // Tree 2 trunk

    // Draw the curved rope (zipline) between the trees using a Bezier curve
    ctx.beginPath();
    ctx.moveTo(tree1.x + tree1.width / 2, tree1.y + 50); // Starting point of the rope
    ctx.quadraticCurveTo(
        (tree1.x + tree2.x) / 2, // Control point (middle of the zipline)
        Math.max(tree1.y, tree2.y) + 100, // Make the rope sag
        tree2.x + tree2.width / 2, // Ending point of the rope
        tree2.y + 50
    );
    ctx.strokeStyle = '#000'; // Black for the zipline
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Function to calculate the position on the Bezier curve
function bezier(t, p0, p1, p2) {
    const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
    const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
    return { x, y };
}

// Draw the monkey
function drawMonkey() {
    ctx.fillStyle = '#FFD700'; // Monkey color (golden for simplicity)
    ctx.beginPath();
    ctx.arc(monkey.x, monkey.y, monkey.width / 2, 0, Math.PI * 2); // Head
    ctx.fill();

    ctx.fillStyle = '#A52A2A'; // Monkey body color (brown)
    ctx.fillRect(monkey.x - monkey.width / 4, monkey.y + monkey.height / 2, monkey.width / 2, monkey.height); // Body

    // Simple representation of the arms
    ctx.fillStyle = '#FFD700'; // Monkey arms color (same as head)
    ctx.beginPath();
    ctx.arc(monkey.x - monkey.width / 2, monkey.y + monkey.height / 2, 10, 0, Math.PI * 2); // Left arm
    ctx.arc(monkey.x + monkey.width / 2, monkey.y + monkey.height / 2, 10, 0, Math.PI * 2); // Right arm
    ctx.fill();
}

// Update monkey's position along the curved zipline
function updateMonkeyPosition() {
    if (monkey.isSwinging) {
        // Calculate the current position on the Bezier curve
        const p0 = { x: tree1.x + tree1.width / 2, y: tree1.y + 50 }; // Start of the rope
        const p2 = { x: tree2.x + tree2.width / 2, y: tree2.y + 50 }; // End of the rope
        const controlPoint = {
            x: (p0.x + p2.x) / 2, // Midpoint for curve
            y: Math.max(tree1.y, tree2.y) + 100, // Make the rope sag
        };
        
        const position = bezier(monkey.t, p0, controlPoint, p2);

        monkey.x = position.x;
        monkey.y = position.y;

        // Speed is based on the angle of the zipline (slope of the Bezier curve)
        const nextPosition = bezier(monkey.t + 0.01, p0, controlPoint, p2); // Small step ahead
        const dx = nextPosition.x - position.x;
        const dy = nextPosition.y - position.y;
        const angle = Math.atan2(dy, dx); // Calculate the angle of movement

        // Update speed based on the angle (gravity makes the monkey go faster when moving downwards)
        monkey.speed += monkey.gravity * Math.sin(angle);

        // Update the position based on the speed
        monkey.t += monkey.direction * monkey.speed * 0.01;

        // Check if the monkey reaches the end of the zipline
        if (monkey.t >= 1 || monkey.t <= 0) {
            monkey.direction *= -1; // Reverse direction
            monkey.speed = 0; // Reset speed at each end
        }
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    drawTrees(); // Draw trees and zipline
    updateMonkeyPosition(); // Update monkey's position
    drawMonkey(); // Draw the monkey

    requestAnimationFrame(animate); // Request the next frame
}

// Start the animation
animate();

// Add event listener to the Swing button
const swingButton = document.getElementById('swingButton');
swingButton.addEventListener('click', () => {
    if (!monkey.isSwinging) {
        // Start the swing
        monkey.isSwinging = true;
        monkey.t = 0; // Reset the position to the start (tree 1)
        monkey.direction = 1; // Swing towards tree 2
        monkey.speed = 0; // Reset speed
    }
});
