const hintProps = [
  { key: 'W', label: '前进', match: 'forward' },
  { key: 'S', label: '后退', match: 'backward' },
  { key: 'A', label: '左移', match: 'left' },
  { key: 'D', label: '右移', match: 'right' },
  { key: 'Space', label: '跳跃', match: 'jump' },
  { key: 'Shift', label: '蹲伏', match: 'crouch' },
  { key: 'C', label: '趴下', match: 'prone' },
  { key: 'V', label: '站立', match: 'stand' },
  { key: 'B', label: '跳舞', match: 'dance' },
]

function ControlHintPanel({ controls, state }) {
  const renderActive = (hint) => {
    if (hint.match === 'prone') return state.posture === 'prone'
    if (hint.match === 'stand') return state.posture === 'stand' && !state.isDancing
    if (hint.match === 'dance') return state.isDancing
    return Boolean(controls[hint.match])
  }

  return (
    <div className="hint-panel">
      <h4>操作锦囊</h4>
      {hintProps.map((hint) => (
        <div
          key={hint.key}
          className={`hint-chip ${renderActive(hint) ? 'active' : ''}`}
        >
          <strong>{hint.key}</strong>
          <span>{hint.label}</span>
        </div>
      ))}
    </div>
  )
}

export default ControlHintPanel
