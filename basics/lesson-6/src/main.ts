import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import "~/index.css";

const sizes = {
  width: 800,
  height: 600,
} as const;

const cursor = {
  x: 0,
  y: 0,
};

const handleMouseMove = (event: MouseEvent) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = 0.5 - event.clientY / sizes.height;
};

globalThis.addEventListener("mousemove", handleMouseMove);

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
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

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

const tick = () => {
  controls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(tick);
};

tick();
