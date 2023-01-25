import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
  color: '#8803fc',
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
scene.add(camera)

const controls = new OrbitControls(camera, canvas)

const canvas = document.querySelector('.canvas')
const renderer = new THREE.WebGLRenderer({ canvas })

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  // mesh.position.x += 0.2
  window.requestAnimationFrame(loop)
  renderer.render(scene, camera)
}

loop()
