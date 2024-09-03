// Import the GLTFLoader from the Three.js examples
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000); // Aspect ratio matches the container size

const renderer = new THREE.WebGLRenderer();
renderer.setSize(475, 475); // Match the size of the container
document.getElementById('threejs-container').appendChild(renderer.domElement);

// Add lighting (optional but recommended)
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Load the GLTF model
const loader = new GLTFLoader();
loader.load(
    '00_model/mymodel.gltf', // Replace with the path to your GLTF model
    function (gltf) {
        // Add the loaded model to the scene
        scene.add(gltf.scene);
        gltf.scene.scale.set(0.5, 0.5, 0.5); // Adjust the scale if necessary
        gltf.scene.position.set(0, 0, 0); // Adjust the position if necessary
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Render the scene
    renderer.render(scene, camera);
}
animate();
