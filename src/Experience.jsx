import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import Lights from './Assets/Environmental/Lights'
import { Physics } from '@react-three/rapier'
import Environment from './Assets/Environmental/Environment'
import Asteroid from './Assets/Bodies/Asteroid'
import Player from './Assets/Bodies/Player'
import config from './config'

export default function Experience()
{
    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <Physics debug={config.debugVar}>
            <Lights />
            <Environment />
            {[...Array(config.asteroids)].map((o, i) => {
                return <Asteroid 
                    key={i} 
                    position={[Math.random() * config.size - (config.size * 0.5), 0, Math.random() * config.size - (config.size * 0.5)]}
                    rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]} />
            })}
            <Player fixedCamera={config.fixedCamera} />

        </Physics>

    </>
}