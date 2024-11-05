import type { SpringValue } from "@react-spring/three";
import type { Euler, MeshProps, Vector3 } from "@react-three/fiber";

// https://r3f.docs.pmnd.rs/api/objects#declaring-objects
// https://r3f.docs.pmnd.rs/tutorials/typescript#typing-shorthand-props
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: Omit<MeshProps, "position" | "rotation"> & {
        position?: Vector3 | SpringValue<Vector3>;
        rotation?: Euler | SpringValue<Euler>;
      };
    }
  }
}
