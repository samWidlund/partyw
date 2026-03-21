import type { Team } from '../types/game'

interface FinalScreenProps {
  teams: Team[]
  onRestart: () => void
}

export function FinalScreen({ teams, onRestart }: FinalScreenProps) {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score)
  const winner = sortedTeams[0]

  return (
    <div className="final-screen">
      <h1>Game Over!</h1>

      <div className="winner-section">
        <span className="winner-label">Winner</span>
        <span className="winner-name">{winner.name}</span>
        <span className="winner-score">{winner.score} points</span>
      </div>

      <div className="final-scores">
        <h2>Final Scores</h2>
        {sortedTeams.map((team, index) => (
          <div
            key={team.id}
            className={`final-team-row ${team.id === winner.id ? 'winner' : ''}`}
          >
            <span className="rank">#{index + 1}</span>
            <span className="name">{team.name}</span>
            <span className="score">{team.score}</span>
          </div>
        ))}
      </div>

      <button className="restart-button" onClick={onRestart}>
        New Game
      </button>
    </div>
  )
}
