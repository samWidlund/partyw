export interface Team {
  id: string
  name: string
  score: number
}

export type GameType = 'brainrot' | 'charader'

export type GamePhase = 'menu' | 'setup' | 'playing' | 'scoring' | 'final'
