import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import Lights from './Assets/Environmental/Lights'
import { Physics } from '@react-three/rapier'
import Environment from './Assets/Environmental/Environment'
import Asteroid from './Assets/Bodies/Asteroid'
import Player from './Assets/Bodies/Player'
import config from './config'
import { 
    EffectComposer,
    DepthOfField,
    ToneMapping
} from '@react-three/postprocessing'

import { 
    ToneMappingMode, 
} from 'postprocessing'
import { useControls } from 'leva'
import Particles from './Assets/Environmental/Particles'

export default function Experience()
{

    // const { focusDistance, focalLength, bokehScale } = useControls('postprocessing', {
    //     focusDistance: { value: 0.2, min: 0, max: 1 },
    //     focalLength: { value: 0.8, min: 0, max: 1 },
    //     bokehScale: { value: 1, min: 0, max: 10 },
    // })

    return <>

        <Perf position="top-left" />
        {/* <Particles count={1000} /> */}
        <EffectComposer>
            <DepthOfField
                focusDistance={config.postProcessing.focusDistance}
                focalLength={config.postProcessing.focalLength}
                bokehScale={config.postProcessing.bokehScale}
                height={480}
                width={480}
                mode={ToneMappingMode.ACES_FILMIC}
            />
            <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        </EffectComposer>
        
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