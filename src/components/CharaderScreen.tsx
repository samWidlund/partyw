import { useState, useEffect, useCallback } from 'react'

type TiltDirection = 'none' | 'up' | 'down'

export function CharaderScreen() {
  const [direction, setDirection] = useState<TiltDirection>('none')

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    const beta = event.beta
    const gamma = event.gamma

    if (beta === null) return

    const absBeta = Math.abs(beta)
    const absGamma = Math.abs(gamma ?? 0)

    const useGamma = absGamma > 30 || absBeta < 30

    if (useGamma && gamma !== null) {
      if (gamma > 30) {
        setDirection('down')
      } else if (gamma < -30) {
        setDirection('up')
      } else {
        setDirection('none')
      }
    } else {
      if (beta > 30) {
        setDirection('up')
      } else if (beta < -30) {
        setDirection('down')
      } else {
        setDirection('none')
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('deviceorientation', handleOrientation)
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [handleOrientation])

  return (
    <div className={`charader-screen charader-${direction}`}>
      <h1>Charader</h1>
      <p className="charader-hint">Vinkla mobilen upp för RÄTT, ner för PASS</p>
    </div>
  )
}