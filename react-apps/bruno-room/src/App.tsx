import { PresentationControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Cactus from "./components/Cactus";
import Camera from "./components/Camera";
import Icon from "./components/Icon";
import Level from "./components/Level";
import Pyramid from "./components/Pyramid";
import Sudo from "./components/Sudo";

const App = () => (
  <main>
    <h1 className="sr-only">Bruno room</h1>
    <Canvas
      flat
      dpr={[1, 2]}
      camera={{ fov: 25, position: [0, 0, 8] }}
      style={{
        touchAction: "none",
      }}
    >
      <color attach="background" args={["#e0b7ff"]} />
      <ambientLight />
      <PresentationControls
        snap
        global
        zoom={0.8}
        rotation={[0, -Math.PI / 4, 0]}
        polar={[0, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <group position-y={-0.75} dispose={null}>
          <Level />
          <Sudo />
          <Camera />
          <Cactus />
          <Icon />
          <Pyramid />
        </group>
      </PresentationControls>
    </Canvas>
  </main>
);

export default App;
