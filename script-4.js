import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

import typefaceFont from "./fonts/Noto Sans SC_Regular.json";

const scene = new THREE.Scene();
// scene.background = new THREE.Color("#3D3F3E");
// Canvas
const canvas = document.querySelector(".screen-4-canvas")

const textureLoader = new THREE.TextureLoader();

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x208683 }),
);
cube1.scale.set(1.4, 1.4, 1.4);

// scene.add(cube1);

// font
const fontLoader = new FontLoader();
const font = fontLoader.parse(typefaceFont);
let poemChiLine = "月桥花院，琐窗朱户，只有春知处。月桥花院，琐窗朱户，只有春知处。";
let poemLineArr = [];


const baseTextMaterial = new THREE.MeshBasicMaterial({
  color: 0x208683,
//   transparent: true,
});

const createPoemLineMeshes = () => {
  for (const mesh of poemLineArr) {
    scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
  }
  poemLineArr = [];

  for (let i = 0; i < poemChiLine.length; i++) {
    const textGeometry = new TextGeometry(poemChiLine[i], {
      font: font,
      size: 0.05,
      depth: 0.005,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    });

    const text = new THREE.Mesh(textGeometry, baseTextMaterial.clone());
    poemLineArr.push(text);
    textGeometry.center();
    text.position.x = (Math.random() - 0.5) * 6;
    text.position.y = (Math.random() - 0.5) * 4;
    text.position.z = 0;
    scene.add(text);
  }
};

createPoemLineMeshes();
setInterval(createPoemLineMeshes, 10000);


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
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
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

const tick = () => {
  cube1.rotation.x += 0.01;

  for (let i = 0; i < poemLineArr.length; i++) {
    poemLineArr[i].position.y += Math.random() * 0.005;
    poemLineArr[i].position.x += Math.random() * 0.005;
    poemLineArr[i].rotation.x += Math.random() * 0.005;
    let disappearChance = Math.random();
    if (disappearChance < 0.2) {
        // poemLineArr.splice(i, 1);
        poemLineArr[i].material.opacity = 0
        if (disappearChance < 0.1) {
            poemLineArr[i].material.opacity = 1
        }
    }
  }

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
