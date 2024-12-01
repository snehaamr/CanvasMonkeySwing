# Monkey Swining from tree to tree using HTML, CSS, JS and Canvas

# Description
This is a simple web-based simulation where a monkey swings along a curved zipline between two trees. The user can press a "Swing" button to make the monkey move back and forth on the zipline. The movement is dynamic and based on the physics of gravity, with the speed of the monkey changing according to its position on the rope, accelerating as it moves downwards and slowing as it reaches the other end of the zipline.

# Features
Curved Zipline: The zipline between the two trees is represented using a quadratic Bezier curve, which simulates the sag of the rope caused by gravity.
Swinging Physics: The monkey moves along the curve with its speed changing depending on its angle and position, influenced by gravity.
User Interaction: The user can click a "Swing" button to start the monkey's swinging motion. The monkey starts at one tree, swings toward the other, and then switches direction.
Responsive Design: The game works well on all screen sizes with a centered canvas and an easily clickable button.

# How It Works
1. HTML Structure
The basic HTML contains:
A <canvas> element where the zipline simulation is rendered.
A <button> element labeled "Swing", which triggers the monkey's movement when clicked.
2. CSS Styling
The style.css file ensures the canvas is centered in the browser window, along with basic styling for the button.
The button is styled to have a green background, white text, and some hover effects.
3. JavaScript Logic
The monkey object is defined to store the monkey's position (x, y), speed, gravity, and movement direction (t for the position along the curve).
The zipline is drawn using a quadratic Bezier curve to simulate the sag of the rope. The curve is calculated dynamically using control points.
The monkey's movement is updated in each animation frame, with its speed adjusted based on the angle of the curve. The monkey accelerates when moving downward (gravity effect).
The Swing Button triggers the movement of the monkey when clicked. When the button is pressed, the monkey starts swinging from one tree to the other and reverses direction when it reaches the other tree.
4. Animation Loop
The game uses requestAnimationFrame to create a smooth animation loop. In each frame:
The canvas is cleared.
The trees and the zipline are redrawn.
The monkey's position along the curve is recalculated.
The monkey's position and speed are updated based on the curve's direction.
5. Interaction
When the user clicks the "Swing" button:
The monkey's swing starts from tree 1 and moves toward tree 2.
The swing continues, and the direction reverses once the monkey reaches the end of the zipline.
Gravity influences the monkey's speed, making it swing faster as it goes downward and slower when approaching the other tree.

# How to Run
Clone or download the project files.
Open index.html in a web browser.
Press the "Swing" button to see the monkey swing from tree to tree!

# Future Enhancements
Add gravity effects: Simulate gravity more realistically, including the weight of the monkey affecting the swing.
Interactive elements: Allow the user to control the speed of the monkey or make the zipline adjustable (longer/shorter, steeper/less steep).
Sound Effects: Add sounds for swinging, button press, and maybe a "monkey noise" when the monkey swings.
Graphics: Replace the simple shapes with actual images or more detailed animations for the monkey and trees.

# How to Extend the Project
If you want to extend or modify the project:
You can replace the simple circle and rectangles used for the monkey and trees with more detailed images or sprites.
You can experiment with the zipline curve by adjusting the control points of the Bezier curve to make the rope sag more or less.
You can add additional features like wind or rope elasticity to make the swing feel more dynamic.

