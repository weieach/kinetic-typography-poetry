// import * as THREE from "three";
// import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
// import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

// import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
// import { FontLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/FontLoader.js";
// import { TextGeometry } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/geometries/TextGeometry.js";

import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

// import typefaceFont from "./fonts/HYChangLiSongKeBenOriginalW_Regular.json";
// import GUI from 'lil-gui'

loader.load(new URL("./fonts/HYChangLiSongKeBenOriginalW_Regular.json", import.meta.url).href, (typefaceFont) => {

// const gui = new GUI()

const scene = new THREE.Scene();
// Canvas
const canvas = document.querySelector(".screen-7-canvas");

const textureLoader = new THREE.TextureLoader();

// const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);

// font
const fontLoader = new FontLoader();
const font = fontLoader.parse(typefaceFont);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(sizes.width, sizes.height);

const baseTextMaterialMoon = new THREE.MeshStandardMaterial({
  color: 0x3d3e3e,
});

const baseTextMaterialFlower = new THREE.MeshStandardMaterial({
  color: 0x208683,
});

const textGeometryMoon = new TextGeometry("月", {
  font: font,
  size: 1.2,
  depth: 0.002,
  curveSegments: 12,
  bevelEnabled: true,
  bevelThickness: 0.01,
  bevelSize: 0.005,
  bevelOffset: 0,
  bevelSegments: 5,
});

const textGeometryFlower = new TextGeometry("花", {
  font: font,
  size: 1.2,
  depth: 0.002,
  curveSegments: 12,
  bevelEnabled: true,
  bevelThickness: 0.01,
  bevelSize: 0.005,
  bevelOffset: 0,
  bevelSegments: 5,
});

const charMoon = new THREE.Mesh(textGeometryMoon, baseTextMaterialMoon);
const charFlower = new THREE.Mesh(textGeometryFlower, baseTextMaterialFlower);
charMoon.position.set(-4, 0.9, -0.2);
charMoon.castShadow = true;
scene.add(charMoon);

charFlower.position.set(2.5, -0.8, -0.2);
charFlower.castShadow = true;
scene.add(charFlower);

const backPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(12, 8),
  new THREE.MeshLambertMaterial({ color: 0x3d3f3e }),
);
backPlane.position.set(0, 0, -1);
scene.add(backPlane);

const bottomPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(12, 8),
  new THREE.ShadowMaterial({ opacity: 0.2 }), // makes shadow on bottom plane darker
);
bottomPlane.position.set(6, -0.3, -1.13);
bottomPlane.rotation.set(-1, 0, 0.83);
bottomPlane.receiveShadow = true;

// gui.add(bottomPlane.rotation, 'x', - 3, 3, 0.01).name("bottomPlaneRotationX")
// gui.add(bottomPlane.rotation, 'y', - 3, 3, 0.01).name("bottomPlaneRotationY")
// gui.add(bottomPlane.rotation, 'z', - 3, 3, 0.01).name("bottomPlaneRotationZ")

// gui.add(bottomPlane.position, 'x', - 3, 3, 0.01).name("bottomPlanePositionX")
// gui.add(bottomPlane.position, 'y', - 3, 3, 0.01).name("bottomPlanePositionY")
// gui.add(bottomPlane.position, 'z', - 3, 3, 0.01).name("bottomPlanePositionZ")

scene.add(bottomPlane);

// light
const pointLightLeft = new THREE.PointLight(0x208683, 30, 1.6, 0.8);
pointLightLeft.position.set(-4, 1.5, -0.3);
pointLightLeft.castShadow = true;
scene.add(pointLightLeft);

const pointLightRight = new THREE.PointLight(0x208683, 10, 6, 2);
pointLightRight.position.set(3.8, -0.5, -0.3);
pointLightRight.castShadow = false;
scene.add(pointLightRight);

const dirLightFlower = new THREE.DirectionalLight(0x1b5f5c, 10);
dirLightFlower.position.set(2, 4, -2);
dirLightFlower.target = charFlower;
dirLightFlower.castShadow = true;
dirLightFlower.shadow.mapSize.set(2048, 2048);
dirLightFlower.shadow.camera.left = -6;
dirLightFlower.shadow.camera.right = 6;
dirLightFlower.shadow.camera.top = 6;
dirLightFlower.shadow.camera.bottom = -6;
dirLightFlower.shadow.camera.near = 0.5;
dirLightFlower.shadow.camera.far = 20;
dirLightFlower.shadow.bias = -0.0005;
dirLightFlower.shadow.normalBias = 0.02;
scene.add(dirLightFlower);

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const updateDirLightAngle = (progress) => {
  const clamped = clamp(progress, 0, 1);
  const angle = -Math.PI / 3 + clamped * (Math.PI / 3);
  const radius = 3;
  dirLightFlower.position.set(
    charFlower.position.x + -Math.cos(angle) * radius,
    charFlower.position.y + 3 + Math.sin(angle) * 1.5,
    -2
  );
  dirLightFlower.target.updateMatrixWorld();
};

const ambientLight = new THREE.AmbientLight(0xffffff, 3.2);
scene.add(ambientLight);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.z = 3;
// gui.add(camera.rotation, 'x', - 3, 3, 0.01).name("cameraRotationX")

scene.add(camera);

let scrollY = window.scrollY;
let currentSection = 0;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  const newSection = Math.round(scrollY / sizes.height);

  if (newSection !== currentSection) {
    currentSection = newSection;
  }

  if (currentSection === 6) {
    const sectionProgress = clamp(
      (scrollY - sizes.height * currentSection) / sizes.height,
      0,
      1
    );
    updateDirLightAngle(sectionProgress);
  }
});
updateDirLightAngle(0);

const tick = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
});