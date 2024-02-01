/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Mom from './components/Mom'
import CameraPostionLogger from "./helpers/CameraPositionLogger"
function App() {

  return (
    <>
     <Canvas camera={{
      fov: 75,
      near: 1,
      far: 1000,
      position:[1.5, 1.5, 1],
     }}>
      <color attach='background' args={['white']} />
      <OrbitControls />
      <CameraPostionLogger event='mousedown'/>
      <ambientLight intensity={9} />
      <Mom />
     </Canvas>
    </>
  )
}

export default App
