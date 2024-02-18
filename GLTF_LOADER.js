var scene = new THREE.Scene();
// Define the boundaries of the orthographic view
var frustumSize = 75;
var aspect = 600 / 400;
var camera = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, -100, 2000);
// Set the camera position
camera.position.set(0, 0, 5); // These values can be adjusted based on your scene
camera.lookAt(scene.position); // Assuming you have a variable `scene` representing your Three.js scene

// var camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(1000, 1000);
renderer.shadowMap.enabled = true; // Enable shadow mapping
document.getElementById('model-container').appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 5);

var ambientLight = new THREE.AmbientLight(0xcccccc, 1);
scene.add(ambientLight);
var directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 1);
directionalLight.castShadow = true; // Enable shadows for this light
scene.add(directionalLight);

// Configure shadow properties for the directional light (optional, for fine-tuning)
directionalLight.shadow.mapSize.width = 512; // Default is 512
directionalLight.shadow.mapSize.height = 512; // Default is 512
directionalLight.shadow.camera.near = 0.5; // Default is 0.5
directionalLight.shadow.camera.far = 500; // Default is 500


var volumeHeight = 1; // Default height
var volumeObject; // This will reference the specific object in the .glTF scene

document.getElementById('Buton_vedere_in_plan').addEventListener('click', function() {
    camera.position.set(0, 0, 40); // Adjust to your desired new camera position
    camera.lookAt(scene.position); // Make the camera look at the center of the scene
    controls.update(); // Update the controls if necessary
});

document.getElementById('Buton_vedere_frontala').addEventListener('click', function() {
    camera.position.set(40, 0, 0); // Adjust to your desired new camera position
    camera.lookAt(scene.position); // Make the camera look at the center of the scene
    controls.update(); // Update the controls if necessary
});

document.getElementById('Buton_vedere_laterala').addEventListener('click', function() {
    camera.position.set(0, 40, 0); // Adjust to your desired new camera position
    camera.lookAt(scene.position); // Make the camera look at the center of the scene
    controls.update(); // Update the controls if necessary
});

document.getElementById('Buton_vedere_axonometrie').addEventListener('click', function() {
    camera.position.set(40, 40, 40); // Adjust to your desired new camera position
    camera.lookAt(scene.position); // Make the camera look at the center of the scene
    controls.update(); // Update the controls if necessary
});

// Function to update the height of the volume
function updateHeight(newHeight) {
    if (volumeObject) {
        volumeObject.scale.setZ(newHeight / volumeHeight);
        volumeHeight = newHeight; // Update the current height
    }
}

// GLTF Loader to load the 3D model
var loader = new THREE.GLTFLoader();
loader.load(
    'mymodel.gltf', // Update this with the actual path to the .glTF model
    function (gltf) {
        scene.add(gltf.scene);
        // Assuming 'volumeName' is the name of the object in Blender or any 3D software you used to create the model
        volumeObject = gltf.scene.getObjectByName('RH');
        // Set initial scale based on the current model's height
        volumeHeight = volumeObject.scale.z;

        // Event listener for the height input field
        document.getElementById('heightInput').addEventListener('input', function(event) {
            var newHeight = parseFloat(event.target.value);
            updateHeight(newHeight);
        });
    },
    undefined,
    function (error) {
        console.error('An error happened', error);
    }
);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

document.getElementById('enterButton').addEventListener('click', function() {
var newHeight = parseFloat(document.getElementById('heightInput').value);
if(!isNaN(newHeight)) { // Only call updateHeight if newHeight is a number
updateHeight(newHeight);
}
});
