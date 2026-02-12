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

// const loader = new FontLoader();

// loader.load(new URL("./fonts/HYChangLiSongKeBenOriginalW_Regular.json", import.meta.url).href, (typefaceFont) => {


  const typefaceFont = await (async () => {
    const res = await fetch(new URL("./fonts/NotoSansSC_Regular.json", import.meta.url));
    const json = await res.json();
    return new FontLoader().parse(json);
  })();

const scene = new THREE.Scene();
// Canvas
const canvas = document.querySelector(".screen-5-canvas");
canvas.style.background = "transparent";

const textureLoader = new THREE.TextureLoader();

// font
const fontLoader = new FontLoader();
const font = fontLoader.parse(typefaceFont);
let poemChiLine = "锦瑟年华谁与度";
let poemLineArr = [];

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight * 2,
};
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(sizes.width, sizes.height);

const baseTextMaterial = new THREE.MeshBasicMaterial({
  color: 0x3d3e3e,
  //   transparent: true,
});

for (let i = 0; i < poemChiLine.length; i++) {
  const textGeometry = new TextGeometry(poemChiLine[i], {
    font: font,
    size: 0.1,
    depth: 0.002,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.005,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  const text = new THREE.Mesh(textGeometry, baseTextMaterial.clone());
  poemLineArr.push(text);
  textGeometry.center();
  text.position.x = (Math.random() - 0.5) * 3;
  text.position.y = (Math.random() - 0.5) * 3;
  text.position.z = 0;
  scene.add(text);
}

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.z = 3;
scene.add(camera);

/**
 * Scroll
 */
let scrollY = window.scrollY;
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // camera.position.y = - scrollY / sizes.height + 6;
  for (let i = 0; i < poemLineArr.length; i++) {
    // text.rotation.x = elapsedTime * 0.01;
    poemLineArr[i].rotation.y = elapsedTime * (0.1 + i / 25);
    // poemLineArr[i].position.y -= 0.0005 + i / 10000;

    gsap.to(poemLineArr[i].rotation, {
      scrollTrigger: {
        trigger: ".screen-6",
        start: "top 70%",
        end: "top 30%",
        scrub: true,
      },
      y: '+=18',
      
    });
  }

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();

// })