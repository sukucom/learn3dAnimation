import * as THREE from 'three';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 5;

  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(1, 1, 2);
  scene.add(light);

  // 🟩 Create a mesh
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x44aa88 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // 🎬 Create keyframe animation data
  // Animate position.y and rotation.y over time
  const times = [0, 1, 2, 3, 4]; // seconds
  const valuesY = [0, 2, 0, -2, 0]; // bounce up/down
  const valuesRotY = [0, Math.PI, Math.PI * 2, Math.PI * 3, Math.PI * 4];

  const posTrack = new THREE.NumberKeyframeTrack('.position[y]', times, valuesY);
  const rotTrack = new THREE.NumberKeyframeTrack('.rotation[y]', times, valuesRotY);

  // Combine tracks into a clip
  const clip = new THREE.AnimationClip('Dance', -1, [posTrack, rotTrack]);

  // 🎛️ Create an AnimationMixer
  const mixer = new THREE.AnimationMixer(cube);
  const action = mixer.clipAction(clip);
  action.loop = THREE.LoopRepeat; // repeat forever
  action.clampWhenFinished = true;
  action.play();

  const clock = new THREE.Clock();

  // 🔁 Animate loop
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    mixer.update(delta); // update the mixer with frame time
    renderer.render(scene, camera);
  }
  animate();

  // Handle resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

main();
