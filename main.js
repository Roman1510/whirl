import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

let color = getRandomColor()

function getRandomColor() {
  let letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const scene = new THREE.Scene()
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
  color: color,
})

const mesh = new THREE.Mesh(geometry, material)
mesh.setColor = function (color) {
  mesh.material.color.set(color)
}
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

  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height
  renderer.setSize(sizes.width, sizes.height)
})

setInterval(() => {
  const color = getRandomColor()
  mesh.setColor(getRandomColor())
  controls.update()
}, 3000)

const loop = () => {
  controls.update()
  window.requestAnimationFrame(loop)
  renderer.render(scene, camera)
}

loop()

// const tl = gsap.timeline({ defaults: { duration: 1 } })
// tl.fromTo(mesh.material.color, { duration: 1, ease: 'elastic' })
