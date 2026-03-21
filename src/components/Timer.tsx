interface TimerProps {
  seconds: number
}

export function Timer({ seconds }: TimerProps) {
  return (
    <div className="timer">
      <span className="timer-value">{seconds}</span>
      <span className="timer-label">seconds</span>
    </div>
  )
}
