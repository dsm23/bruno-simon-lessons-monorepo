import { useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import type { Material, Mesh, PerspectiveCamera } from "three";
import type { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Level: Mesh;
  };
  materials: {
    Level: Material;
  };
};

export default function Level() {
  const { nodes } = useGLTF("/level-react-draco.glb") as GLTFResult;
  const { camera } = useThree<{
    camera: PerspectiveCamera;
  }>();

  useSpring(
    () => ({
      from: { y: camera.position.y + 5 },
      to: { y: camera.position.y },
      config: { friction: 100 },
      onChange: ({ value }: { value: { y: number } }) => {
        camera.position.y = value.y;
        camera.lookAt(0, 0, 0);
      },
    }),
    [],
  );

  return (
    <mesh
      geometry={nodes.Level.geometry}
      material={nodes.Level.material}
      position={[-0.38, 0.69, 0.62]}
      rotation={[Math.PI / 2, -Math.PI / 9, 0]}
    />
  );
}
