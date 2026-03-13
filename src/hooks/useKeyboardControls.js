import { useEffect, useState } from 'react'

const BASE_STATE = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  jump: false,
  crouch: false,
  danceTrigger: 0,
  proneTrigger: 0,
  standTrigger: 0,
  lastPress: null,
}

const KEY_BINDINGS = {
  KeyW: 'forward',
  KeyS: 'backward',
  KeyA: 'left',
  KeyD: 'right',
  ArrowUp: 'forward',
  ArrowDown: 'backward',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  Space: 'jump',
  ShiftLeft: 'crouch',
  ShiftRight: 'crouch',
  KeyB: 'danceTrigger',
  KeyC: 'proneTrigger',
  KeyV: 'standTrigger',
}

const LABELS = {
  forward: '前进',
  backward: '后退',
  left: '左移',
  right: '右移',
  jump: '跳跃',
  crouch: '蹲伏',
  danceTrigger: '跳舞',
  proneTrigger: '趴下',
  standTrigger: '站立',
}

export function useKeyboardControls() {
  const [controls, setControls] = useState(BASE_STATE)

  useEffect(() => {
    const handleKeyDown = (event) => {
      const action = KEY_BINDINGS[event.code]
      if (!action) return
      if (event.repeat && (action === 'danceTrigger' || action === 'proneTrigger' || action === 'standTrigger')) {
        return
      }

      if (action === 'danceTrigger') {
        setControls((prev) => ({
          ...prev,
          danceTrigger: prev.danceTrigger + 1,
          lastPress: LABELS[action],
        }))
        return
      }

      if (action === 'proneTrigger') {
        setControls((prev) => ({
          ...prev,
          proneTrigger: prev.proneTrigger + 1,
          lastPress: LABELS[action],
        }))
        return
      }

      if (action === 'standTrigger') {
        setControls((prev) => ({
          ...prev,
          standTrigger: prev.standTrigger + 1,
          lastPress: LABELS[action],
        }))
        return
      }

      setControls((prev) => {
        if (prev[action]) {
          return { ...prev, lastPress: LABELS[action] || event.code }
        }
        return {
          ...prev,
          [action]: true,
          lastPress: LABELS[action] || event.code,
        }
      })
    }

    const handleKeyUp = (event) => {
      const action = KEY_BINDINGS[event.code]
      if (!action) return
      if (action === 'danceTrigger' || action === 'proneTrigger' || action === 'standTrigger') {
        return
      }
      if (action === 'jump' || action === 'crouch' || action === 'forward' || action === 'backward' || action === 'left' || action === 'right') {
        setControls((prev) => ({ ...prev, [action]: false }))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return controls
}
