import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import Lights from './Assets/Lights'
import { Physics } from '@react-three/rapier'
import Environment from './Assets/Environment'

export default function Experience()
{
    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <Physics>
            <Lights />
            <Environment />
        </Physics>

    </>
}