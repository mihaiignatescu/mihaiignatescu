var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(600, 400);
document.getElementById('model-container').appendChild(renderer.domElement);

// Adjust camera position
camera.position.z = 5;

// Lighting
var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
scene.add(ambientLight);
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 0).normalize();
scene.add(directionalLight);

var loader = new THREE.GLTFLoader();
loader.load(
    'mymodel.gltf', // Correct path to the model relative to the root of the web server
    function (gltf) {
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error('An error happened', error);
    }
);


// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
