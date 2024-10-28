import imgColors from "@repo/static-assets/textures/door/color.jpg";
import gsap from "gsap";
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import "~/index.css";

type DebugObj = {
  color: THREE.ColorRepresentation;
  spin: () => void;
  subdivision: number;
};

const gui = new GUI({
  width: 300,
  title: "Debug UI",
  container: document.querySelector("main") as HTMLElement,
  autoPlace: true,
});

gui.domElement.classList.add("autoPlace");

globalThis.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    gui.show(gui._hidden);
  }
});

const debugObj: DebugObj = {
  color: "#ff0000",
  spin: () => {
    gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2 });
  },
  subdivision: 2,
};

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load(imgColors);
texture.colorSpace = THREE.SRGBColorSpace;

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

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

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  map: texture,
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const cubeTweaks = gui.addFolder("Cube");

cubeTweaks.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
cubeTweaks.add(mesh, "visible");
cubeTweaks.add(material, "wireframe");
cubeTweaks.addColor(debugObj, "color").onChange(() => {
  material.color.set(debugObj.color);
});

cubeTweaks.add(debugObj, "spin");
cubeTweaks
  .add(debugObj, "subdivision")
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObj.subdivision,
      debugObj.subdivision,
      debugObj.subdivision,
    );
  });

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
