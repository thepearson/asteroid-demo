import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points } from '@react-three/drei';

const Particles = ({ count }) => {
    const pointsRef = useRef();
  
    const particles = useMemo(() => {
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      }
      return positions;
    }, [count]);
  
    useFrame(() => {
      if (pointsRef.current) {
          pointsRef.current.rotation.y += 0.001;
      }
    });
  
    return (
      <Points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={1} color="orange" />
      </Points>
    );
};

export default Particles;