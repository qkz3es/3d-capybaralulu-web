import { useEffect, useMemo, useRef, useState } from 'react'

export function useCapybaraState(controls) {
  const [posture, setPosture] = useState('stand')
  const [isDancing, setIsDancing] = useState(false)

  const proneRef = useRef(controls.proneTrigger)
  const standRef = useRef(controls.standTrigger)
  const danceRef = useRef(controls.danceTrigger)

  useEffect(() => {
    if (controls.proneTrigger > proneRef.current) {
      proneRef.current = controls.proneTrigger
      setPosture('prone')
      setIsDancing(false)
    }
  }, [controls.proneTrigger])

  useEffect(() => {
    if (controls.standTrigger > standRef.current) {
      standRef.current = controls.standTrigger
      setPosture('stand')
      setIsDancing(false)
    }
  }, [controls.standTrigger])

  useEffect(() => {
    if (controls.danceTrigger > danceRef.current) {
      danceRef.current = controls.danceTrigger
      setIsDancing((prev) => {
        const toggled = !prev
        setPosture(toggled ? 'dance' : 'stand')
        return toggled
      })
    }
  }, [controls.danceTrigger])

  const movementState = useMemo(() => {
    if (isDancing) return '舞动'
    if (controls.jump) return '跳跃'
    if (controls.forward || controls.backward || controls.left || controls.right) {
      return '行走'
    }
    return '静止'
  }, [controls, isDancing])

  const statusLabel = useMemo(() => {
    if (isDancing) return '舞动中'
    if (controls.jump) return '冲向空中'
    if (controls.crouch) return '低姿态'
    if (posture === 'prone') return '趴下'
    if (controls.forward || controls.backward || controls.left || controls.right) {
      return '踱步'
    }
    return '静谧'
  }, [controls, posture, isDancing])

  const lastAction = useMemo(() => {
    return controls.lastPress || '等待输入'
  }, [controls.lastPress])

  return {
    posture,
    isDancing,
    movementState,
    statusLabel,
    lastAction,
  }
}
