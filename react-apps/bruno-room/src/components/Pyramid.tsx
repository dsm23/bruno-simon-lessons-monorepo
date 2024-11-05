import { useEffect } from "react";
import { a, useSpring } from "@react-spring/three";
import { useGLTF, useMatcapTexture } from "@react-three/drei";
import type { Euler } from "@react-three/fiber";
import type { Material, Mesh } from "three";
import type { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Pyramid: Mesh;
  };
  materials: {
    Pyramid: Material;
  };
};

const Pyramid = () => {
  const { nodes } = useGLTF("/level-react-draco.glb") as GLTFResult;
  const [matcap] = useMatcapTexture("489B7A_A0E7D9_6DC5AC_87DAC7", 1024);
  const [spring, api] = useSpring<{
    rotation: Euler;
  }>(
    () => ({
      rotation: [0, 0, 0],
      config: { mass: 5, tension: 200 },
    }),
    [],
  );

  useEffect(() => {
    let timeout: number;

    const rotate = () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      api.start({
        rotation: [
          (Math.random() - 0.5) * Math.PI * 3,
          0,
          (Math.random() - 0.5) * Math.PI * 3,
        ],
      });
      timeout = setTimeout(rotate, (0.5 + Math.random() * 2) * 1000);
    };

    rotate();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <a.mesh
      geometry={nodes.Pyramid.geometry}
      position={[-0.8, 1.33, 0.25]}
      rotation={spring.rotation}
    >
      <meshMatcapMaterial matcap={matcap} />
    </a.mesh>
  );
};

export default Pyramid;
