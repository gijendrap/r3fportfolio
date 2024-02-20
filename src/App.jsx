/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame } from "@react-three/fiber"
import { ScrollControls, useScroll } from "@react-three/drei"
import { getProject, val } from "@theatre/core"
import { SheetProvider, PerspectiveCamera, useCurrentSheet } from "@theatre/r3f"

import * as THREE from 'three'
import { useRef } from 'react'
import Mom from './components/Mom'
import CameraPostionLogger from "./helpers/CameraPositionLogger"
import { useControls } from 'leva'

function Lights() {
  const ambientRef = useRef()
  const directionalRef = useRef()
  const pointRef = useRef()
  const spotRef = useRef()

  useControls('Ambient Light', {
    visible: {
      value: false,
      onChange: (v) => {
        ambientRef.current.visible = v
      },
    },
    color: {
      value: 'white',
      onChange: (v) => {
        ambientRef.current.color = new THREE.Color(v)
      },
    },
  })

  useControls('Directional Light', {
    visible: {
      value: true,
      onChange: (v) => {
        directionalRef.current.visible = v
      },
    },
    position: {
      x: 1,
      y: 1,
      z: 1,
      onChange: (v) => {
        directionalRef.current.position.copy(v)
      },
    },
    color: {
      value: 'white',
      onChange: (v) => {
        directionalRef.current.color = new THREE.Color(v)
      },
    },
  })

  useControls('Point Light', {
    visible: {
      value: false,
      onChange: (v) => {
        pointRef.current.visible = v
      },
    },
    position: {
      x: 2,
      y: 0,
      z: 0,
      onChange: (v) => {
        pointRef.current.position.copy(v)
      },
    },
    color: {
      value: 'white',
      onChange: (v) => {
        pointRef.current.color = new THREE.Color(v)
      },
    },
  })

  useControls('Spot Light', {
    visible: {
      value: false,
      onChange: (v) => {
        spotRef.current.visible = v
      },
    },
    position: {
      x: 3,
      y: 2.5,
      z: 1,
      onChange: (v) => {
        spotRef.current.position.copy(v)
      },
    },
    color: {
      value: 'white',
      onChange: (v) => {
        spotRef.current.color = new THREE.Color(v)
      },
    },
  })

  return (
    <>
      <ambientLight ref={ambientRef} />
      <directionalLight ref={directionalRef} />
      <pointLight ref={pointRef} />
      <spotLight ref={spotRef} />
    </>
  )
}

function App() {

  const sheet = getProject('fly Through').sheet('Scene')

  return (
    <>
     <Canvas gl={{preserveDrawingBuffer:true}}>
     <ScrollControls pages={6}>
     <SheetProvider sheet={sheet}>
         <Scene />
     </SheetProvider>
     </ScrollControls>
     </Canvas>
    </>
  )
}

export default App

function Scene() {
  const sheet = useCurrentSheet()
  const scroll = useScroll()

  useFrame(() => {
    const sequenceLength = val (sheet.sequence.pointer.length)

    sheet.sequence.position = scroll.offset = sequenceLength

  })

  return(
    <>

    <color attach='background' args={['white']} />
      <CameraPostionLogger event='mousedown'/>
      <ambientLight intensity={10} />
      <Mom />
      <Lights/>
      <perspectiveCamera
        theatreKey = 'Camera'
        makeDefault 
        position={[1,9,0]}
        fov={90}
        near={0.1}
        far={70}
     />
    </>
  )

}
