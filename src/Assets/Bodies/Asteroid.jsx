import { RigidBody } from '@react-three/rapier';
import React from 'react';
import * as THREE from 'three';


const materials = [
    new THREE.MeshStandardMaterial({
        color: 0x888888,
        roughness: 0.7,
        metalness: 0.5,
        flatShading: true,
    }),
    new THREE.MeshStandardMaterial({
        color: 0x757575,
        roughness: 0.7,
        metalness: 0.5,
        flatShading: true,
    }),
    new THREE.MeshStandardMaterial({
        color: 0xAAAAAA,
        roughness: 0.7,
        metalness: 0.5,
        flatShading: true,
    }),
];

const geometrys = [
    new THREE.DodecahedronGeometry(1, 0),
    new THREE.DodecahedronGeometry(1, 1),
    new THREE.IcosahedronGeometry(1, 1),
    new THREE.OctahedronGeometry(1, 1),
    new THREE.PolyhedronGeometry(1, 2),
    new THREE.TetrahedronGeometry(1, 2)
]

function Asteroid(props) {
    return (
        <RigidBody
            gravityScale={0}
            colliders="ball"
            scale={(Math.random() * 0.5) + 0.2}
            linearDamping={0}
            angularDamping={0}
            >
            <mesh
                castShadow
                receiveShadow
                geometry={geometrys[Math.floor(Math.random() * geometrys.length)]}
                material={materials[Math.floor(Math.random() * materials.length)]}
                position={[Math.random() * 100 - 50, 0, Math.random() * 100 - 50]}
                rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            />
        </RigidBody>
    );
}

export default Asteroid;