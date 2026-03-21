import { useState } from 'react'
import type { Team } from '../types/game'

interface SetupScreenProps {
  onStart: (teams: Team[]) => void
}

export function SetupScreen({ onStart }: SetupScreenProps) {
  const [teams, setTeams] = useState<Team[]>([
    { id: '1', name: '', score: 0 },
    { id: '2', name: '', score: 0 },
  ])

  const addTeam = () => {
    setTeams([...teams, { id: crypto.randomUUID(), name: '', score: 0 }])
  }

  const removeTeam = (id: string) => {
    if (teams.length <= 2) return
    setTeams(teams.filter((t) => t.id !== id))
  }

  const updateTeamName = (id: string, name: string) => {
    setTeams(teams.map((t) => (t.id === id ? { ...t, name } : t)))
  }

  const canStart = teams.every((t) => t.name.trim() !== '')

  const handleStart = () => {
    if (!canStart) return
    onStart(teams)
  }

  return (
    <div className="setup-screen">
      <h1>Setup Teams</h1>
      <p className="setup-subtitle">Minimum 2 teams</p>

      <div className="teams-list">
        {teams.map((team, index) => (
          <div key={team.id} className="team-input-row">
            <span className="team-number">{index + 1}</span>
            <input
              type="text"
              className="team-name-input"
              placeholder={`Team ${index + 1}`}
              value={team.name}
              onChange={(e) => updateTeamName(team.id, e.target.value)}
            />
            {teams.length > 2 && (
              <button
                className="remove-team-button"
                onClick={() => removeTeam(team.id)}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      <button className="add-team-button" onClick={addTeam}>
        + Add Team
      </button>

      <button
        className="start-button"
        onClick={handleStart}
        disabled={!canStart}
      >
        Start Game
      </button>
    </div>
  )
}
