import { useEffect } from "react";
import { a, useSpring } from "@react-spring/three";
import { useGLTF, useMatcapTexture } from "@react-three/drei";
import type { Euler, Vector3 } from "@react-three/fiber";
import type { Material, Mesh } from "three";
import type { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    React: Mesh;
  };
  materials: {
    React: Material;
  };
};

export default function Icon() {
  const { nodes } = useGLTF("/level-react-draco.glb") as GLTFResult;
  const [matcap] = useMatcapTexture("65A0C7_C3E4F8_A7D5EF_97CAE9", 1024);

  const [springs, api] = useSpring<{
    position: Vector3;
    rotation: Euler;
  }>(() => ({
    rotation: [0.8, 1.1, -0.4],
    position: [-0.79, 1.3, 0.62],
    config: { mass: 2, tension: 200 },
  }));

  useEffect(() => {
    let timeout: number;
    let floating = false;

    const bounce = () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      api.start({
        rotation: [0.8 - (floating ? 0.8 + Math.PI * 1.8 : 0), 1.1, -0.4],
        position: [-0.79, floating ? 1.4 : 1.3, 0.62],
      });

      floating = !floating;
      timeout = setTimeout(bounce, 1.5 * 1000);
    };

    bounce();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <a.mesh
      geometry={nodes.React.geometry}
      position={springs.position}
      rotation={springs.rotation}
    >
      <meshMatcapMaterial matcap={matcap} />
    </a.mesh>
  );
}
