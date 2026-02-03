import * as THREE from 'three'

const scene = new THREE.Scene();
// Canvas
const canvas = document.querySelector('canvas.webgl')


const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xfff })
)
scene.add(cube1);


// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)




// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

//render in browser


const tick = () => {
    cube1.rotation.x += 0.01;
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick);

}

tick();