import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import "./index.css";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();

const positionsArr = Float32Array.from(
  { length: 50 * 9 },
  () => 4 * (Math.random() - 0.5),
);

const positionsAttribute = new THREE.BufferAttribute(positionsArr, 3);

const geometry = new THREE.BufferGeometry();

geometry.setAttribute("position", positionsAttribute);

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  100,
);

camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

const handleResize = () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
};

const handleDoubleClick = async () => {
  if (!document.fullscreenElement) {
    await canvas.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
};

globalThis.addEventListener("dblclick", handleDoubleClick);
globalThis.addEventListener("resize", handleResize);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

renderer.render(scene, camera);

const tick = () => {
  controls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(tick);
};

tick();
