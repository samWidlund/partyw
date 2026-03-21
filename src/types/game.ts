export interface Team {
  id: string
  name: string
  score: number
}

export type GamePhase = 'setup' | 'playing' | 'scoring' | 'final'
