export function playAlarm(): void {
  const ctx = new AudioContext()

  for (let i = 0; i < 4; i++) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.frequency.value = 800
    osc.type = 'square'

    gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.6)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.6 + 0.3)

    osc.start(ctx.currentTime + i * 0.6)
    osc.stop(ctx.currentTime + i * 0.6 + 0.3)
  }
}
