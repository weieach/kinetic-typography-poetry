// import * as THREE from "three";

// import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
// import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import { FontLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/FontLoader.js";

import { TextGeometry } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/geometries/TextGeometry.js";


import typefaceFont from "./fonts/HYChangLiSongKeBenOriginalW_Regular.json";
import GUI from 'lil-gui'


const scene = new THREE.Scene();
scene.background = new THREE.Color("#3D3F3E");
// Canvas
const canvas = document.querySelector("canvas.screen-1-canvas");

/**
 * Debug
 */
// const gui = new GUI()
const axesHelper = new THREE.AxesHelper(10)
// scene.add(axesHelper)

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
let poemChiLine = "凌波不过横塘路凌波不过横塘路";
let poemLineArr = [];

// shadow plane
const shadowPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(12, 8),
  new THREE.MeshStandardMaterial({ color: 0x3E3F3F }),
  // new THREE.ShadowMaterial({ opacity: 0.5 })
)
shadowPlane.position.z = 0
shadowPlane.scale.set(20, 20, 0.1)
shadowPlane.receiveShadow = true
scene.add(shadowPlane)


// light
const ambientLight = new THREE.AmbientLight(0xffffff, 3)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0x68ADAB, 30, 10, 4)
pointLight.position.set(7, -3, 1.8);
scene.add(pointLight)

const baseTextMaterial = new THREE.MeshBasicMaterial({
  color: 0x208683,
  transparent: true,
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
      size: 0.8 + (i/20),
      depth: 0.01,
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
    let oddFac = i % 2;
    let posY = 0;
    if (oddFac == 0){
      posY = 1;
    } else {
      posY = -1;
    }
    // text.position.x = (Math.random()*1.8 - 1) * i;
    // text.position.y = (Math.random() *0.2) * i;
    text.position.x = i*2.2-7;
    text.position.y = -(i+1) + Math.random()*posY*1.2+5;
    text.position.z = 0;
    text.rotation.z = Math.PI * 0;
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
camera.position.set(7, -8, 5);
camera.rotation.set(0.8, 0, 0)
scene.add(camera);

// gui.add(camera.rotation, 'x', - 3, 3, 0.01)
// gui.add(camera.rotation, 'y', - 3, 3, 0.01)
// gui.add(camera.rotation, 'z', - 3, 3, 0.01)
// gui.add(camera.position, 'y', - 3, 3, 0.01).name("positionY")

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setClearColor(0x000000, 0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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

let stepCounter = 0;
let frameCounter = 0;
let opacityVar = 0;
let opacityIncrement = 0.0015;
const clock = new THREE.Clock()


const tick = () => {

  const elapsedTime = clock.getElapsedTime()
  for (let i = 0; i < poemChiLine.length; i++) {
    poemLineArr[i].material.opacity = 0;
  }
  for (let i = 0; i < stepCounter; i++) {

    opacityVar += opacityIncrement;
    // let opacityVarMapped = mapRange(opacityVar, 0, 1, 0, 0.5);

    poemLineArr[i].material.opacity = opacityVar;

  }

  
  if(stepCounter >= poemChiLine.length){
    stepCounter = 0;
    opacityIncrement *= -1;
  }
  frameCounter++;
  if(frameCounter % 20 ==0){
      stepCounter++;

  }
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);

};

tick();

function mapRange(value, inMin, inMax, outMin, outMax){
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}