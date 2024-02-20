/* eslint-disable react/no-unknown-property */
import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Mom(props) {
  const { nodes, materials, animations } = useGLTF('./models/mom.glb');
  const { ref, actions } = useAnimations(animations);

  useEffect(() => {
    void actions["Armature|mixamo.com|Layer0"].reset().stop();
  }, );

  useFrame((state, delta) => {
    if (actions["Armature|mixamo.com|Layer0"]) {
      actions["Armature|mixamo.com|Layer0"].time += delta;
    }
  });

  return (
    <>
      <group {...props} ref={ref}>
        <group name="Armature" position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]} scale={1}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="model_0" geometry={nodes.model_0.geometry} material={materials['Material.002']} skeleton={nodes.model_0.skeleton} />
          <skinnedMesh name="model_1" geometry={nodes.model_1.geometry} material={materials['Material.001']} skeleton={nodes.model_1.skeleton} />
          <skinnedMesh name="model_2" geometry={nodes.model_2.geometry} material={materials['Material.003']} skeleton={nodes.model_2.skeleton} />
        </group>
        <group name="Circle" position={[0.012, 0.011, 0]} scale={0.001} />
      </group>
    </>
  );
}

useGLTF.preload('./models/mom.glb');

export default Mom;
