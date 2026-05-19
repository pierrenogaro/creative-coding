import { Mesh, MeshStandardMaterial, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export class Rhino {
  mesh = new Object3D();

  constructor() {
    console.log("rhino");
    this.init();
    this.update();
  }

  async init() {
    const gltfLoader = new GLTFLoader();
    const gltf = await gltfLoader.loadAsync("./models/rhino.glb");

    const material = new MeshStandardMaterial({
      color: 0x222222, //DARK
    });

    gltf.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = material;
      }
    });

    this.mesh.add(gltf.scene);
  }

  update() {
    this.mesh.scale.set(0.5, 0.5, 0.5);
  }
}
