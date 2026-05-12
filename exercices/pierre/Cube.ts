import { Mesh, MeshStandardMaterial, TorusGeometry } from "three";
import * as dat from "dat.gui";

export class Cube {
  mesh: Mesh;
  gui!: dat.GUI;

  constructor(gui?: dat.GUI) {
    // donut :
    const geometry = new TorusGeometry(0.3, 0.15, 12, 60);
    const material = new MeshStandardMaterial({
      color: 0x39df2d,
      metalness: 0.7,
      roughness: 0.2,
    });

    this.mesh = new Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.position.y = 0.5;

    if (import.meta.env.VITE_ENVIRONMENT == "development" && gui) {
      this.gui = gui;
      this.initGUI();
    }
  }

  initGUI() {
    // this.gui.add(this.mesh.position, "y").min(0).max(5).step(0.1);
  }
}
