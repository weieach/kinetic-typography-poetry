import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

import typefaceFont from "./fonts/Rowan Light Italic_Regular.json";

const scene = new THREE.Scene();
// Canvas
const canvas = document.querySelector("canvas.screen-2-canvas");

const textureLoader = new THREE.TextureLoader();

// const cube1 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 0x208683 }),
// );
// cube1.scale.set(1.4, 1.4, 1.4);

// scene.add(cube1);

// font
const fontLoader = new FontLoader();
const font = fontLoader.parse(typefaceFont);
let poemChiLine = "Your leaving shadow–";
let poemLineArr = [];


const baseTextMaterial = new THREE.MeshLambertMaterial({
  color: 0xECEDCF,
  transparent: true,
});

    const textGeometry = new TextGeometry(poemChiLine, {
      font: font,
      size: 0.5,
      depth: 0.01,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    });

    const text = new THREE.Mesh(textGeometry, baseTextMaterial.clone());
    textGeometry.center();
    text.position.x = -2;
    text.castShadow = true;

    scene.add(text);


// light
const ambientLight = new THREE.AmbientLight(0xffffff, 2)
scene.add(ambientLight)
const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.x = 2
pointLight.position.y = 10
pointLight.position.z = -4
pointLight.rotation.z = Math.PI/2

pointLight.castShadow = true
pointLight.shadow.mapSize.set(2048, 2048);
pointLight.shadow.camera.near = 0.5;
pointLight.shadow.camera.far = 20;
pointLight.shadow.radius = 3;
pointLight.shadow.bias = -0.0002;
pointLight.shadow.normalBias = 0.02;
// pointLight.lookAt(text)
scene.add(pointLight)

const screen2Section = document.querySelector(".screen-2");
const lightStartY = 1.0;
const lightEndY = 3.5;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const updateLightY = () => {
  // if (!screen2Section) return;
  const rect = screen2Section.getBoundingClientRect();
  const progress = clamp(
    (window.innerHeight - rect.top) / (rect.height + window.innerHeight),
    0,
    1
  );
  pointLight.position.y = lightStartY + ((lightEndY - lightStartY) * progress);
};

const shadowPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(12, 8),
  new THREE.ShadowMaterial({ opacity: 0.35 })
)
shadowPlane.position.y = -0.37
shadowPlane.scale.set(2, 2, 2)
shadowPlane.rotation.x = -Math.PI / 2
shadowPlane.receiveShadow = true
scene.add(shadowPlane)


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);

camera.position.set(2, 1.4, 4);
camera.rotation.y = Math.PI/6;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setClearColor(0x000000, 0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
canvas.style.background =
  "linear-gradient(180deg, #3C3F3E 7.66%, #218683 51.4%)";
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(sizes.width, sizes.height);

//render in browser

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

window.addEventListener("scroll", updateLightY, { passive: true });
window.addEventListener("resize", updateLightY);
updateLightY();

const tick = () => {

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
