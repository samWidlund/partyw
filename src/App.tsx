import { useState, useRef } from 'react'
import { getRandomWord } from './data/words'
import { Timer } from './components/Timer'
import { SetupScreen } from './components/SetupScreen'
import { ScoringScreen } from './components/ScoringScreen'
import { FinalScreen } from './components/FinalScreen'
import type { Team, GamePhase } from './types/game'
import './App.css'

const DEFAULT_TIME = 40

function App() {
  const [phase, setPhase] = useState<GamePhase>('setup')
  const [teams, setTeams] = useState<Team[]>([])
  const [word, setWord] = useState<string>('')
  const [timeRemaining, setTimeRemaining] = useState<number>(DEFAULT_TIME)
  const [timerInput, setTimerInput] = useState<string>('')
  const intervalRef = useRef<number | null>(null)

  const startGame = (selectedTeams: Team[]) => {
    setTeams(selectedTeams)
    setPhase('playing')
  }

  const generateWord = () => {
    const seconds = timerInput ? parseInt(timerInput, 10) : DEFAULT_TIME
    setWord(getRandomWord())
    setTimeRemaining(seconds)
    setPhase('playing')

    intervalRef.current = window.setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          setPhase('scoring')
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setTimeRemaining(0)
    setPhase('scoring')
  }

  const submitScores = (scores: Map<string, number>) => {
    setTeams((prev) =>
      prev.map((team) => ({
        ...team,
        score: team.score + (scores.get(team.id) ?? 0),
      })),
    )
    setWord('')
    setTimeRemaining(DEFAULT_TIME)
    setPhase('playing')
  }

  const restartGame = () => {
    setPhase('setup')
    setTeams([])
    setWord('')
    setTimeRemaining(DEFAULT_TIME)
    setTimerInput('')
  }

  if (phase === 'setup') {
    return (
      <section id="center">
        <SetupScreen onStart={startGame} />
      </section>
    )
  }

  if (phase === 'scoring') {
    return (
      <section id="center">
        <ScoringScreen teams={teams} word={word} onSubmit={submitScores} />
      </section>
    )
  }

  if (phase === 'final') {
    return (
      <section id="center">
        <FinalScreen teams={teams} onRestart={restartGame} />
      </section>
    )
  }

  return (
    <>
      <section id="center">
        <div className="scores-display">
          {teams.map((team) => (
            <div key={team.id} className="team-score">
              <span className="team-name">{team.name}</span>
              <span className="score-value">{team.score}</span>
            </div>
          ))}
        </div>

        {word && phase === 'playing' ? (
          <>
            <div className="word-display">
              <h1 className="word">{word}</h1>
            </div>
            <Timer seconds={timeRemaining} />
            <button className="stop-button" onClick={stopTimer}>
              Stop
            </button>
          </>
        ) : (
          <div className="generate-section">
            <h1>partyW</h1>
            <input
              type="number"
              className="timer-input"
              placeholder={String(DEFAULT_TIME)}
              value={timerInput}
              onChange={(e) => setTimerInput(e.target.value)}
            />
            <button className="generate-button" onClick={generateWord}>
              Generate Word
            </button>
          </div>
        )}

        <button className="end-game-button" onClick={() => setPhase('final')}>
          End Game
        </button>
      </section>
    </>
  )
}

export default App
