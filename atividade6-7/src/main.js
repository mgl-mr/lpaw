import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { createSkyBox } from './skybox';

import { events, key, mouse, mouseMove } from "./events";

events(window);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  40, window.innerWidth / window.innerHeight, 0.1, 1000
);

camera.position.z = 100;

//Resimensionamento da camera ao redimensionar a tela
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  // console.log(`Resize: ${camera.aspect}`)
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

const controls = new OrbitControls(camera, renderer.domElement);

var light = new THREE.AmbientLight(0xffffff, 10);
scene.add(light);

var plight = new THREE.PointLight(0xffffff, 50, 50);
plight.position.set(0, 25, -10);
scene.add(plight);

let model;
const modelPath = 'models/ufo/';
const mtlFile = 'ufoBlender.mtl';
const objFile = 'ufoBlender.obj';

const manager = new THREE.LoadingManager();
manager.onProgress = (item, loaded, total) => {
  console.log(item, loaded, total);
};

const mtlLoader = new MTLLoader(manager);
const objLoader = new OBJLoader();

mtlLoader.setPath(modelPath)
  .load(mtlFile, (materials) => {
    materials.preload();
    objLoader.setMaterials(materials);
    objLoader.setPath(modelPath).load(objFile, (object) => {
      model = object;
      model.scale.setScalar(.5);//redimensiona o objeto
      model.position.x = .05;
      model.rotation.z = .5;
      scene.add(model);
      createSkyBox('space1', 700).then(sky => {
        console.log('sky created');
        console.log(sky);
        scene.add(sky);
        animate();
      });
    })
  })

function animate() {
  controls.update();
  model.rotation.y = key.a ? model.rotation.y -=0.1 : model.rotation.y;
  model.rotation.y = key.d ? model.rotation.y +=0.1 : model.rotation.y;  

  model.rotation.x = key.w ? model.rotation.x -=0.1 : model.rotation.x;
  model.rotation.x = key.s ? model.rotation.x +=0.1 : model.rotation.x; 

  model.rotation.z = key.q ? model.rotation.z -=0.1 : model.rotation.z;
  model.rotation.z = key.e ? model.rotation.z +=0.1 : model.rotation.z; 
  
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

