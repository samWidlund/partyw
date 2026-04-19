import { useState, useEffect, useCallback } from 'react'

type TiltDirection = 'none' | 'up' | 'down'

export function CharaderScreen() {
  const [direction, setDirection] = useState<TiltDirection>('none')

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    const beta = event.beta

    if (beta !== null) {
      if (beta > 45) {
        setDirection('up')
      } else if (beta < -45) {
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