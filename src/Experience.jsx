import { OrbitControls, useGLTF, useTexture, Center, Sparkles, shaderMaterial} from '@react-three/drei'
import * as THREE from 'three'
import { useFrame,extend } from '@react-three/fiber'
import { useRef } from 'react'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFregmentShader from './shaders/portal/fragment.glsl'


const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#ff0000'),
        uColorEnd: new THREE.Color('#3a1111')
    },
    portalVertexShader,
    portalFregmentShader
)
extend({ PortalMaterial })

export default function Experience()
{
    const { nodes } = useGLTF('./model/portal.glb')

    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false

    const portalMaterial = useRef()

    useFrame((state, delta) => {
        portalMaterial.current.uTime += delta * 2
    },[])

    return <>

        <OrbitControls makeDefault />
        <color args={['#030202']} attach='background'/>

        <Center>
            <mesh geometry={ nodes.baked.geometry}>
                <meshBasicMaterial map={ bakedTexture }/>
            </mesh>
            <mesh geometry={ nodes.poleLightA.geometry} position={ nodes.poleLightA.position}>
                <meshBasicMaterial color='#ffffe5'/>
            </mesh>
            <mesh geometry={ nodes.poleLightB.geometry} position={ nodes.poleLightB.position}>
                <meshBasicMaterial color='#ffffe5'/>
            </mesh>
            <mesh geometry={ nodes.portalLight.geometry} position={ nodes.portalLight.position} rotation={ nodes.portalLight.rotation}>
                <portalMaterial ref={ portalMaterial }/>
            </mesh>
            <Sparkles
                size={ 6 }
                scale={[ 4, 2, 4 ]}
                position-y={ 1.5 }
                color='#ff8888'
                speed={ 0.5 }
                count={ 40 }
            />
        </Center>

    </>
}