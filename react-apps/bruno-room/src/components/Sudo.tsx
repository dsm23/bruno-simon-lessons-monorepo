import { useEffect } from "react";
import { a, useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { MathUtils } from "three";
import type { Euler } from "@react-three/fiber";
import type { Material, Mesh } from "three";
import type { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Sudo: Mesh;
    SudoHead: Mesh;
  };
  materials: {
    Sudo: Material;
    SudoHead: Material;
  };
};

export default function Sudo() {
  const { nodes } = useGLTF("/level-react-draco.glb") as GLTFResult;
  const [spring, api] = useSpring<{
    rotation: Euler;
  }>(
    () => ({
      rotation: [0, 0, 0],
      config: { friction: 40 },
    }),
    [],
  );

  useEffect(() => {
    let timeout: number;

    const wander = () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      api.start({
        rotation: [
          Math.PI / 2 + MathUtils.randFloatSpread(2) * 0.3,
          0,
          0.29 + MathUtils.randFloatSpread(2) * 0.2,
        ],
      });
      timeout = setTimeout(wander, (1 + Math.random() * 3) * 1000);
    };

    wander();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <mesh
        geometry={nodes.Sudo.geometry}
        material={nodes.Sudo.material}
        position={[0.68, 0.33, -0.67]}
        rotation={[Math.PI / 2, 0, 0.29]}
      />
      <a.mesh
        geometry={nodes.SudoHead.geometry}
        material={nodes.SudoHead.material}
        position={[0.68, 0.33, -0.67]}
        rotation={spring.rotation}
      />
    </>
  );
}
