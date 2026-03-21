import { useState } from 'react'
import type { Team } from '../types/game'
import { ApiStatus } from './ApiStatus'

interface ScoringScreenProps {
  teams: Team[]
  word: string
  onSubmit: (scores: Map<string, number>) => void
  isApiConnected: boolean
}

export function ScoringScreen({ teams, word, onSubmit, isApiConnected }: ScoringScreenProps) {
  const [scores, setScores] = useState<Map<string, number>>(
    new Map(teams.map((t) => [t.id, 0])),
  )

  const updateScore = (teamId: string, score: string) => {
    const numScore = score === '' ? 0 : parseInt(score, 10) || 0
    setScores(new Map(scores).set(teamId, numScore))
  }

  const handleSubmit = () => {
    onSubmit(scores)
  }

  return (
    <div className="scoring-screen">
      <h1 className="app-title">brainstorm</h1>
      
      <ApiStatus isConnected={isApiConnected} />

      <div className="word-reveal">
        <span className="word-label">Ordet var:</span>
        <span className="word-value">{word}</span>
      </div>

      <h2 className="screen-subtitle">Ange Poäng</h2>

      <div className="scores-list">
        {teams.map((team) => (
          <div key={team.id} className="score-input-row">
            <span className="team-name">{team.name}</span>
            <input
              type="number"
              className="score-input"
              value={scores.get(team.id) ?? 0}
              onChange={(e) => updateScore(team.id, e.target.value)}
              min="0"
            />
          </div>
        ))}
      </div>

      <button className="submit-scores-button" onClick={handleSubmit}>
        Skicka Poäng
      </button>
    </div>
  )
}
