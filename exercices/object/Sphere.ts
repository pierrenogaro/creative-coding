import { SphereGeometry, MathUtils, Mesh, MeshNormalMaterial } from "three";
import * as dat from "dat.gui";

export class Sphere {
  mesh: Mesh;

  constructor(gui?: dat.GUI) {
    const geometry = new SphereGeometry(3, 32, 16);
    const material = new MeshNormalMaterial();
    this.mesh = new Mesh(geometry, material);
    this.mesh.rotation.y = MathUtils.degToRad(45);
    this.mesh.scale.set(0.1, 0.1, 0.1);

    if (gui) {
      gui.add(this.mesh.position, "x").min(-5).max(5).step(1);
      gui.add(this.mesh.position, "y").min(-5).max(5).step(1);
      gui.add({ d: 0 }, "d").min(-5).max(5).step(0.1).onChange((v: number) => { this.mesh.position.x = v; this.mesh.position.y = v; }); //diagos
    }
  }
}
