function StatusBar({ state }) {
  return (
    <div className="status-panel">
      <h3>操控回显</h3>
      <strong>{state.statusLabel}</strong>
      <div className="status-pill">{state.movementState}</div>
      <div className="status-meta">
        <p className="status-meta-item">
          姿态：{state.posture === 'dance' ? '舞动' : state.posture === 'prone' ? '趴下' : '站立'}
        </p>
        <p className="status-meta-item">最近按键：{state.lastAction}</p>
      </div>
    </div>
  )
}

export default StatusBar
