import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import Lights from './Assets/Environmental/Lights'
import { Physics } from '@react-three/rapier'
import Environment from './Assets/Environmental/Environment'
import Asteroid from './Assets/Bodies/Asteroid'

export default function Experience()
{
    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <Physics debug>
            <Lights />
            <Environment />
            {[...Array(1000)].map((o, i) => {
                return <Asteroid key={i} />
            })}

        </Physics>

    </>
}