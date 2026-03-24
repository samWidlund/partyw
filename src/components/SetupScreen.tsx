import { useState } from 'react'
import type { Team } from '../types/game'
import { ApiStatus } from './ApiStatus'

interface SetupScreenProps {
  onStart: (teams: Team[], category: string) => void
  isLoading?: boolean
  isApiConnected: boolean
}

export function SetupScreen({ onStart, isLoading, isApiConnected }: SetupScreenProps) {
  const [teams, setTeams] = useState<Team[]>([
    { id: '1', name: '', score: 0 },
    { id: '2', name: '', score: 0 },
  ])
  const [category, setCategory] = useState<string>('')

  const addTeam = () => {
    const newId = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString()
    setTeams([...teams, { id: newId, name: '', score: 0 }])
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
    onStart(teams, category.trim())
  }

  return (
    <div className="setup-screen">
      <h1 className="app-title">brainstorm</h1>
      
      <ApiStatus isConnected={isApiConnected} />

      <h2 className="screen-subtitle">Skapa Lag</h2>
      <p className="setup-subtitle">Minst 2 lag</p>

      <div className="category-input-wrapper">
        <input
          type="text"
          className="category-input"
          placeholder="Kategori (valfritt)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div className="teams-list">
        {teams.map((team, index) => (
          <div key={team.id} className="team-input-row">
            <span className="team-number">{index + 1}</span>
            <input
              type="text"
              className="team-name-input"
              placeholder={`Lag ${index + 1}`}
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

      <button type="button" className="add-team-button" onClick={addTeam}>
        + Lägg till lag
      </button>

      <button
        type="button"
        className="start-button"
        onClick={handleStart}
        disabled={!canStart || isLoading}
      >
        {isLoading ? 'Laddar ord...' : 'Starta Spelet'}
      </button>
    </div>
  )
}
