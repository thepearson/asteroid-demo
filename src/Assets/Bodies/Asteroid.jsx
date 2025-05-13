import { RigidBody } from '@react-three/rapier';
import React from 'react';
import * as THREE from 'three';


const materials = [
    new THREE.MeshStandardMaterial({
        color: 0x888888,
        roughness: 0.7,
        metalness: 0.5,
        flatShading: true,
    })
];

const geometrys = [
    new THREE.DodecahedronGeometry(1, 0),
    new THREE.DodecahedronGeometry(1, 1)
]

function Asteroid({rotation = [0, 0, 0], position = [0, 0, 0]}) {
    return (
        <RigidBody
            gravityScale={0}
            colliders="ball"
            scale={(Math.random() * 0.5) + 0.5}
            position={position}
            rotation={rotation}
            linearDamping={0}
            angularDamping={0}
            enabledTranslations={[true, false, true]}
            >
            <mesh
                castShadow
                receiveShadow
                geometry={geometrys[Math.floor(Math.random() * geometrys.length)]}
                material={materials[Math.floor(Math.random() * materials.length)]}
            />
        </RigidBody>
    );
}

export default Asteroid;