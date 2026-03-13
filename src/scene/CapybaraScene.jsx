import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { DoubleSide, MathUtils, Vector3 } from 'three'

const Tree = ({ position }) => (
  <group position={position}>
    <mesh position={[0, 1.2, 0]}>
      <cylinderGeometry args={[0.12, 0.14, 2.4, 10]} />
      <meshStandardMaterial color="#5c3b24" />
    </mesh>
    <mesh position={[0, 2.25, 0]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#4e7c35" roughness={0.8} />
    </mesh>
  </group>
)

const Bench = ({ position }) => (
  <group position={position}>
    <mesh position={[0, 0.45, 0]}>
      <boxGeometry args={[1.6, 0.12, 0.5]} />
      <meshStandardMaterial color="#967159" />
    </mesh>
    <mesh position={[0, 0.85, -0.2]}>
      <boxGeometry args={[1.6, 0.5, 0.1]} />
      <meshStandardMaterial color="#542f10" />
    </mesh>
    <mesh position={[-0.75, 0.45, 0]}>
      <boxGeometry args={[0.1, 0.8, 0.1]} />
      <meshStandardMaterial color="#8b5a2b" />
    </mesh>
    <mesh position={[0.75, 0.45, 0]}>
      <boxGeometry args={[0.1, 0.8, 0.1]} />
      <meshStandardMaterial color="#8b5a2b" />
    </mesh>
  </group>
)

function CapybaraScene({ controls, capybaraState }) {
  const sceneRef = useRef()
  const bodyRef = useRef()
  const headRef = useRef()
  const tailRef = useRef()
  const directionRef = useMemo(() => new Vector3(), [])
  const moveVector = useMemo(() => new Vector3(), [])
  const glowTarget = useMemo(() => new Vector3(1, 1, 1), [])
  const jumpVelocity = useRef(0)
  const jumpLock = useRef(false)
  const glowRef = useRef()

  useFrame((ctx, delta) => {
    if (!bodyRef.current) return

    moveVector.set(
      (controls.right ? 1 : 0) - (controls.left ? 1 : 0),
      0,
      (controls.backward ? 1 : 0) - (controls.forward ? 1 : 0)
    )

    const body = bodyRef.current
    let verticalPosition = body.position.y
    if (moveVector.lengthSq() > 0) {
      moveVector.normalize()
      body.position.addScaledVector(moveVector, 2.2 * delta)
      const targetRotation = Math.atan2(moveVector.x, moveVector.z)
      body.rotation.y = MathUtils.damp(body.rotation.y, targetRotation, 5, delta)
    }

    const currentPos = body.position
    if (currentPos.length() > 4.5) {
      currentPos.setLength(4.5)
    }
    if (controls.jump && !jumpLock.current && jumpVelocity.current === 0) {
      jumpVelocity.current = 5
      jumpLock.current = true
    }
    if (!controls.jump) {
      jumpLock.current = false
    }

    if (controls.jump && !jumpLock.current && jumpVelocity.current === 0) {
      jumpVelocity.current = 5
      jumpLock.current = true
    }
    if (!controls.jump) {
      jumpLock.current = false
    }
    if (jumpVelocity.current !== 0 || controls.jump) {
      verticalPosition += jumpVelocity.current * delta
      jumpVelocity.current += -12 * delta
      if (verticalPosition <= 0.35) {
        verticalPosition = 0.35
        jumpVelocity.current = 0
      }
    }

    if (capybaraState.isDancing && jumpVelocity.current === 0) {
      verticalPosition = 0.45 + Math.sin(ctx.clock.elapsedTime * 5) * 0.08
    }

    if (jumpVelocity.current !== 0 || controls.jump) {
      verticalPosition += jumpVelocity.current * delta
      jumpVelocity.current += -12 * delta
      if (verticalPosition <= 0.35) {
        verticalPosition = 0.35
        jumpVelocity.current = 0
      }
    }

    if (capybaraState.isDancing && jumpVelocity.current === 0) {
      verticalPosition = 0.45 + Math.sin(ctx.clock.elapsedTime * 5) * 0.08
    }

    body.position.y = verticalPosition

    if (tailRef.current) {
      tailRef.current.rotation.z =
        Math.sin(
          ctx.clock.elapsedTime * (capybaraState.isDancing ? 4 : 1.5)
        ) * 0.45
    }

    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(ctx.clock.elapsedTime * 1.3) * 0.1
    }

    if (capybaraState.isDancing) {
      directionRef.set(Math.sin(ctx.clock.elapsedTime * 1.1), 0, Math.cos(ctx.clock.elapsedTime * 1.1))
      bodyRef.current.rotation.y = MathUtils.damp(
        bodyRef.current.rotation.y,
        Math.atan2(directionRef.x, directionRef.z),
        0.3,
        delta
      )
    }

    if (glowRef.current) {
      const targetScale = capybaraState.isDancing ? 2.4 : controls.jump ? 1.6 : 1
      glowTarget.set(targetScale, 1, targetScale)
      glowRef.current.scale.lerp(glowTarget, 0.12)
      const targetIntensity = capybaraState.isDancing ? 0.95 : controls.jump ? 0.55 : 0.3
      glowRef.current.material.emissiveIntensity = MathUtils.damp(
        glowRef.current.material.emissiveIntensity || 0,
        targetIntensity,
        3.5,
        delta
      )
    }
  })

  return (
    <>
      <hemisphereLight intensity={0.45} skyColor="#ffd9a4" groundColor="#1a2b1a" />
      <spotLight
        position={[4, 9, 6]}
        angle={0.45}
        penumbra={0.25}
        intensity={1.6}
        color="#ffe9c7"
        castShadow
        shadow-bias={-0.0001}
      />
      <group ref={bodyRef} position={[0, 0.35, 0]} castShadow scale={[0.75, 0.75, 0.75]}>
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[1.8, 0.7, 2.3]} />
          <meshStandardMaterial color="#b06c3c" roughness={0.55} />
        </mesh>
        <mesh ref={headRef} position={[0, 0.85, 1.3]}>
          <sphereGeometry args={[0.65, 24, 24]} />
          <meshStandardMaterial color="#c68c5f" roughness={0.5} />
        </mesh>
        <mesh position={[0.5, 0.8, 1.6]}>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshStandardMaterial color="#1c1a16" />
        </mesh>
        <mesh position={[-0.5, 0.8, 1.6]}>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshStandardMaterial color="#1c1a16" />
        </mesh>
        <mesh position={[0, 0.2, 0.9]}>
          <cylinderGeometry args={[0.35, 0.25, 1, 12]} />
          <meshStandardMaterial color="#a55d34" />
        </mesh>
        <mesh ref={tailRef} position={[0, 0.15, -1.2]} rotation={[0.3, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 1.1, 10]} />
          <meshStandardMaterial color="#8b5a2b" />
        </mesh>
        {[-0.65, 0.65].map((offset) => (
          <mesh key={`leg-${offset}`} position={[offset, -0.25, 0.8]}>
            <cylinderGeometry args={[0.18, 0.18, 0.8, 12]} />
            <meshStandardMaterial color="#5f3a23" />
          </mesh>
        ))}
        {[-0.65, 0.65].map((offset) => (
          <mesh key={`leg-back-${offset}`} position={[offset, -0.25, -0.8]}>
            <cylinderGeometry args={[0.18, 0.18, 0.8, 12]} />
            <meshStandardMaterial color="#5f3a23" />
          </mesh>
        ))}
      </group>

      <mesh rotation-x={-Math.PI / 2} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color="#1b2215" metalness={0.1} roughness={0.8} />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} scale={[1, 1, 0.4]} position={[0, 0.01, 0]}>
        <planeGeometry args={[8, 18]} />
        <meshStandardMaterial color="#2d3b20" />
      </mesh>

      <mesh
        ref={glowRef}
        rotation-x={-Math.PI / 2}
        position={[0, 0.02, 0]}
        scale={[1, 1, 1]}
        renderOrder={1}
      >
        <ringGeometry args={[0.9, 2.2, 64]} />
        <meshStandardMaterial
          color="#ffd7a4"
          emissive="#ffd7a4"
          emissiveIntensity={0.35}
          transparent
          opacity={0.42}
          depthWrite={false}
          side={DoubleSide}
        />
      </mesh>

      <pointLight
        position={[0, 3.5, -1]}
        intensity={capybaraState.isDancing ? 1.6 : 0.9}
        color={capybaraState.isDancing ? '#ffd899' : '#ffd5b2'}
        distance={12}
        decay={2}
      />

      <Tree position={[-4, 0, -1]} />
      <Tree position={[4, 0, -1]} />
      <Bench position={[0, 0, -3.5]} />
      <Bench position={[3.5, 0, 1]} />
      <group position={[0, 0.25, -7]} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[12, 1.6, 1.2]} />
          <meshStandardMaterial color="#111412" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0, 1.05, -0.3]}>
          <boxGeometry args={[10, 0.5, 0.2]} />
          <meshStandardMaterial color="#ffd499" emissive="#ffd499" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0, 0.55, -0.5]}>
          <boxGeometry args={[8, 0.12, 0.05]} />
          <meshStandardMaterial color="#ffe4c2" />
        </mesh>
      </group>
    </>
  )
}

export default CapybaraScene
