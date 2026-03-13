import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Sky, Sparkles } from '@react-three/drei'
import CapybaraScene from './scene/CapybaraScene'
import { useKeyboardControls } from './hooks/useKeyboardControls'
import { useCapybaraState } from './hooks/useCapybaraState'
import StatusBar from './components/StatusBar'
import ControlHintPanel from './components/ControlHintPanel'
import './App.css'

function App() {
  const controls = useKeyboardControls()
  const capybaraState = useCapybaraState(controls)

  return (
    <div className="app-frame">
      <div className="sky-glow" />
      <Canvas
        camera={{ position: [0, 3.2, 6.5], fov: 50 }}
        shadows
        className="capybara-canvas"
      >
        <Sky
          distance={450}
          sunPosition={[5, 12, -5]}
          inclination={0.45}
          azimuth={0.15}
        />
        <fog attach="fog" args={['#050609', 2.6, 22]} />
        <color attach="background" args={['#060609']} />
        <ambientLight intensity={0.6} />
        <directionalLight
          castShadow
          intensity={1.2}
          position={[4, 8, 4]}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <CapybaraScene controls={controls} capybaraState={capybaraState} />
        <Sparkles
          count={50}
          size={3}
          scale={[12, 3, 12]}
          position={[0, 0.3, 0]}
          speed={0.2}
          noise={1.3}
          color="#ffe6b5"
        />
        <Environment preset="park" background />
        <OrbitControls
          enablePan={true}
          maxPolarAngle={Math.PI / 2.3}
          minPolarAngle={0.9}
          minDistance={5}
          maxDistance={15}
        />
      </Canvas>

      <div className="hud-stack">
        <StatusBar state={capybaraState} />
        <ControlHintPanel controls={controls} state={capybaraState} />
      </div>
      <div className="floating-pulse" />
    </div>
  )
}

export default App
