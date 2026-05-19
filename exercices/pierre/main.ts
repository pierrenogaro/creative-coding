import "@/style.css";
import "./style.css";
import {
  AmbientLight,
  AxesHelper,
  CameraHelper,
  DirectionalLight,
  DirectionalLightHelper,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PCFShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from "three";
import textureBg from "./texture-bg.jpg";
import textureMountains from "./pierre-mountains.png";
import { Cube } from "./Cube";
import * as dat from "dat.gui";
import { Ground } from "./Ground";

class App {
  canvas: HTMLCanvasElement;
  renderer!: WebGLRenderer;
  camera!: PerspectiveCamera;
  scene!: Scene;
  cube!: Cube;
  ground!: Ground;
  gui!: dat.GUI;

  constructor(canvas: HTMLCanvasElement) {
    this.animate = this.animate.bind(this);
    this.canvas = canvas;
    this.initRenderer();
    this.initCamera();
    this.initScene();
    if (import.meta.env.VITE_ENVIRONMENT == "development") {
      this.initHelpers();
      this.initGUI();
    }
    this.initLights();
    this.initObjects();
    this.animate();
  }

  initRenderer() {
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      // alpha: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFShadowMap;
  }

  initCamera() {
    this.camera = new PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      200,
    );
    this.camera.position.set(0, 2, 7);
  }

  initScene() {
    this.scene = new Scene();
  }

  initHelpers() {
    const cameraHelper = new CameraHelper(this.camera);
    this.scene.add(cameraHelper);
    const gridHelper = new GridHelper(20, 20);
    this.scene.add(gridHelper);
    const axesHelper = new AxesHelper(3);
    this.scene.add(axesHelper);
  }

  initLights() {
    console.log("initLights");
    const ambient = new AmbientLight(0xffffff, 1);
    this.scene.add(ambient);

    const dirLight = new DirectionalLight(0xffffff, 3);
    dirLight.position.set(5, 5, 5);
    dirLight.castShadow = true;
    this.scene.add(dirLight);
    const helper = new DirectionalLightHelper(dirLight, 5);
    this.scene.add(helper);
  }

  initObjects() {
    const loader = new TextureLoader();
    const tex1 = loader.load(textureBg);
    const tex2 = loader.load(textureMountains);
    const mat = new MeshStandardMaterial({ map: tex1 });

    const bgPlane = new Mesh(new PlaneGeometry(8, 6), mat);
    bgPlane.position.set(0, 1.5, -8);
    bgPlane.receiveShadow = true;
    this.scene.add(bgPlane);

    this.canvas.addEventListener("click", () => {
      mat.map = mat.map === tex1 ? tex2 : tex1;
      mat.needsUpdate = true;
    });

    // 2 devant
    const torus1 = new Cube(this.gui);
    torus1.mesh.position.set(-1, 0.5, 1);
    this.scene.add(torus1.mesh);

    const torus2 = new Cube(this.gui);
    torus2.mesh.position.set(1, 0.5, 1);
    this.scene.add(torus2.mesh);

    // 3 derrière
    const torus3 = new Cube(this.gui);
    torus3.mesh.position.set(-3, 0.5, -2.5);
    this.scene.add(torus3.mesh);

    const torus4 = new Cube(this.gui);
    torus4.mesh.position.set(0, 0.5, -2.5);
    this.scene.add(torus4.mesh);

    const torus5 = new Cube(this.gui);
    torus5.mesh.position.set(3, 0.5, -2.5);
    this.scene.add(torus5.mesh);

    this.ground = new Ground(this.gui);
    this.scene.add(this.ground.mesh);
  }

  initGUI() {
    this.gui = new dat.GUI();
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  console.log("loaded");
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  new App(canvas);
});
