import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

const scene = new THREE.Scene()
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
  color: '#F7CAC9',
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(5, 10, 10)
scene.add(light)

const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
)

camera.position.z = 20
camera.position.y = 1 // Move the camera up slightly
scene.add(camera)

const canvas = document.querySelector('.canvas')
const renderer = new THREE.WebGLRenderer({ canvas })

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 4

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Center the sphere in the viewport
  const yOffset =
    sizes.width > sizes.height ? 0 : (sizes.height - sizes.width) / 2
  renderer.setSize(sizes.width, sizes.height)
  renderer.domElement.style.top = yOffset + 'px'
})

const tweenColor = () => {
  const color = getRandomColor()
  gsap.to(mesh.material.color, {
    r: parseInt(color.slice(1, 3), 16) / 255,
    g: parseInt(color.slice(3, 5), 16) / 255,
    b: parseInt(color.slice(5, 7), 16) / 255,
    duration: 2,
    ease: 'power4.inOut',
    onComplete: tweenColor,
  })
}

tweenColor()

const loop = () => {
  controls.update()
  window.requestAnimationFrame(loop)
  renderer.render(scene, camera)
}

loop()

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
