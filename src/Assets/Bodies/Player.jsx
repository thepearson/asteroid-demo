import React, { useRef, useState } from 'react'
import { useGLTF, useKeyboardControls } from '@react-three/drei'
import { RigidBody, useRapier } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'


export default function Player({fixedCamera = true, ...rest}) {
    const player = useRef()
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
    const { rapier, world } = useRapier()
    const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3(100, 100, 100))
    const [ smoothedCameraTarget ] = useState(() => new THREE.Vector3())
    const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-spaceship/model.gltf')

    useFrame((state, delta) => {
        if (!player.current) return;

        const { forward, back, left, right  } = getKeys()

        const impulse = new THREE.Vector3(0, 0, 0); // Use THREE.Vector3
        const impulseStrength = 500 * delta
        const rotationSpeed = 1;

        if (left) {
            player.current.setAngvel(new THREE.Vector3(0, rotationSpeed, 0), true);
        }

        if (right) {
            player.current.setAngvel(new THREE.Vector3(0, - rotationSpeed, 0), true);
        }

        if (forward) {
            impulse.z += impulseStrength
        }

        if (back) {
            impulse.z -= impulseStrength
        }

        // Transform the impulse vector to match the tank's current rotation
        // Clone impulse before applying quaternion to avoid modifying it for next frame
        const worldImpulse = impulse.clone().applyQuaternion(player.current.rotation());

        // Apply the transformed impulse
        if (worldImpulse.lengthSq() > 0) { // Only apply if there is an impulse
            player.current.applyImpulse(worldImpulse, true);
        }


        /**
         * Camera
         */
        if (fixedCamera) {

            const bodyPosition = player.current.translation()

            const cameraPosition = new THREE.Vector3()
            cameraPosition.copy(bodyPosition)
            cameraPosition.z += 50
            cameraPosition.y += 50

            const cameraTarget = new THREE.Vector3()
            cameraTarget.copy(bodyPosition)
            cameraTarget.y += 2

            smoothedCameraPosition.lerp(cameraPosition, 10 * delta)
            smoothedCameraTarget.lerp(cameraTarget, 10 * delta)

            state.camera.position.copy(smoothedCameraPosition)
            state.camera.lookAt(smoothedCameraTarget)
        }
    });

    return (
        <RigidBody
            ref={player} 
            gravityScale={0}
            colliders="cuboid"
            linearDamping={0.8}
            angularDamping={3}
            rotation={[0, 0, 0]}
            enabledTranslations={[true, false, true]}
            enabledRotations={[false, true, false]}
        >
            <group{...rest} dispose={null}>
                <mesh geometry={nodes.Cube005.geometry} material={materials.Mat0} />
                <mesh geometry={nodes.Cube005_1.geometry} material={materials.Mat1} />
                <mesh geometry={nodes.Cube005_2.geometry} material={materials.Mat2} />
                <mesh geometry={nodes.Cube005_3.geometry} material={materials.Window_Frame} />
                <mesh geometry={nodes.Cube005_4.geometry} material={materials.Mat4} />
                <mesh geometry={nodes.Cube005_5.geometry} material={materials.Mat3} />
                <mesh geometry={nodes.Cube005_6.geometry} material={materials.Window} />
            </group>
        </RigidBody>
    )
}

useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-spaceship/model.gltf')