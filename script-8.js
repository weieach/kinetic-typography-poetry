// import * as THREE from "three";
// import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
// import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { FontLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/geometries/TextGeometry.js";

import typefaceFont from "./fonts/HYChangLiSongKeBenOriginalW_Regular.json";
import GUI from 'lil-gui'

const canvas = document.querySelector(".screen-8-canvas");
const screen8Section = document.querySelector(".screen-8");
const scene = new THREE.Scene();

const gui = new GUI();

const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight * 2,
};

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(sizes.width, sizes.height);

const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.rotation.set(0.02, 0.03, 0.41);
camera.position.set(-0.02, 0.04, 3);
scene.add(camera);


gui.add(camera.position, 'x', - 5, 5, 0.01).name("camera-8-positionX")
gui.add(camera.position, 'y', - 5, 5, 0.01).name("camera-8-positionY")
gui.add(camera.position, 'z', - 5, 5, 0.01).name("camera-8-positionZ")

gui.add(camera.rotation, 'x', - 3, 3, 0.01).name("camera-8-RotationX")
gui.add(camera.rotation, 'y', - 3, 3, 0.01).name("camera-8-RotationY")
gui.add(camera.rotation, 'z', - 3, 3, 0.01).name("camera-8-RotationZ")

const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);

const textCanvas = document.createElement("canvas");
textCanvas.width = 1024;
const textCtx = textCanvas.getContext("2d");
const textContent = "飞云冉冉蘅皋暮，彩笔新题断肠句。";
const fontSize = 64;
const paddingTop = 20;
const paddingBottom = 20;
textCtx.font = `${fontSize}px serif`;
const metrics = textCtx.measureText(textContent);
const textHeight =
  (metrics.actualBoundingBoxAscent || fontSize) +
  (metrics.actualBoundingBoxDescent || fontSize * 0.2);
textCanvas.height = Math.ceil(textHeight + paddingTop + paddingBottom);

textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
textCtx.fillStyle = "#ffffff";
textCtx.font = `${fontSize}px serif`;
textCtx.textAlign = "center";
textCtx.textBaseline = "top";
textCtx.fillText(textContent, textCanvas.width / 2, paddingTop);

const yourTextTexture = new THREE.CanvasTexture(textCanvas);
yourTextTexture.minFilter = THREE.LinearFilter;
yourTextTexture.needsUpdate = true;

const w = 2.0;
const h = w * (textCanvas.height / textCanvas.width);
const segX = 80,
  segY = 50;

const geo = new THREE.PlaneGeometry(w, h, segX, segY);
geo.translate(-w / 2, -h / 2, 0);

const mat = new THREE.MeshStandardMaterial({
  map: yourTextTexture,
  roughness: 0.9,
  metalness: 0.0,
  side: THREE.DoubleSide,
});

const page = new THREE.Mesh(geo, mat);
page.rotation.set(-Math.PI / 4, 0, 0);
scene.add(page);

const pointLight = new THREE.PointLight(0xffffff, 1.2, 5);
pointLight.position.set(0.5, 0.6, 1.5);
scene.add(pointLight);

const pos = geo.attributes.position;
const v = new THREE.Vector3();

let peel = 0.0;
let peelTarget = 0.0;
const clock = new THREE.Clock();
const autoPeel = true;

function updatePeel() {
  const edgeY = 0; // top edge (local space)
  const radius = 0.5;
  const liftMax = 0.8;
  const curlTightness = 50;

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);

    const d = Math.abs(v.y - edgeY);
    const t = THREE.MathUtils.clamp(1.0 - d / radius, 0.0, 1.0);
    const influence = t * t * (3 - 2 * t);
    const a = peel * influence;
    const s = Math.sin((a * Math.PI) / 2);
    const lift = liftMax * s * s;
    const bend = (s * s) / curlTightness;

    v.z = lift;
    v.x -= bend * 0.8;
    v.y -= bend * 0.04;

    pos.setXYZ(i, v.x, v.y, v.z);
  }

  pos.needsUpdate = true;
  geo.computeVertexNormals();
}

const startPeel = () => {
  peelTarget = 1.0;
};
const stopPeel = () => {
  peelTarget = 0.0;
};

if (canvas) {
  canvas.style.pointerEvents = "auto";
  canvas.addEventListener("mouseenter", startPeel);
  canvas.addEventListener("mouseleave", stopPeel);
  canvas.addEventListener("touchstart", startPeel, { passive: true });
  canvas.addEventListener("touchend", stopPeel);
}

if (screen8Section) {
  screen8Section.addEventListener("mouseenter", startPeel);
  screen8Section.addEventListener("mouseleave", stopPeel);
}

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const tick = () => {
  if (autoPeel) {
    const elapsed = clock.getElapsedTime();
    peelTarget = 0.5 + 0.5 * Math.sin(elapsed * 0.8);
  }
  peel += (peelTarget - peel) * 0.08;
  updatePeel();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
