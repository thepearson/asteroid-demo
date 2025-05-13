import { RigidBody } from '@react-three/rapier';
import React from 'react';
import { Environment as DreiEnv } from '@react-three/drei';

function Environment(props) {

    const files = [
        './environment/px.png', // positive x
        './environment/nx.png', // negative x
        './environment/py.png', // positive y
        './environment/ny.png', // negative y
        './environment/pz.png', // positive z
        './environment/nz.png', // negative z
      ];

    return (
        <>
        {/* <color attach="background" args={['#000000']} /> */}
        <DreiEnv files={files} background />
        
        </>
    );
}

export default Environment;