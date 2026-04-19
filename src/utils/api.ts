import { words as fallbackWords } from '../data/words'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

const INAPPROPRIATE_WORDS = new Set([
  'poop', 'poo', 'crap', 'damn', 'hell', 'suck', 'fart', 'burp',
  'skit', 'dålig', '服', 'penis', 'vagina', 'kuk', 'fitta', 'mutta',
])

async function fetchFromApi(wordCount: number, category: string): Promise<string[]> {
  const apiKey = import.meta.env.VITE_GROQ_API

  if (!apiKey) {
    console.warn('No API key found, using fallback words')
    return getRandomFallbackWords(wordCount)
  }

  const categoryPrompt = category
    ? `inom kategorin "${category}"`
    : 'olika kategorier'

  const generalExamples = 'äpple, strand, moln, eld, träd'
  const categoryExamples: Record<string, string> = {
    frukt: 'äpple, banan, apelsin, druva, jordgubbe',
    djur: 'hund, katt, häst, fågel, fisk',
    mat: 'pizza, pasta, ris, bröd, ost',
    natur: 'skog, berg, sjö, blomma, träd',
    sport: 'fotboll, tennis, simning, löpning, cykling',
  }

  const examples = category
    ? (categoryExamples[category.toLowerCase()] || generalExamples)
    : generalExamples

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: 'user',
          content: `Generera exakt ${wordCount} olika vanliga svenska ord ${categoryPrompt}. ALLA orden MÅSTE vara relevanta för denna kategori. Returnera ENBART orden, ett per rad, inget annat. Inga nummer, inga beskrivningar, inget kommatecken. Exempel på giltiga ord: ${examples}. Orden ska vara roliga eftersom spelet ska köras på en förfest, väldigt viktigt att orden matchar kategorin som anges. Svara endast på svenska och endast med ord som passar kategorin.`,
        },
      ],
      max_tokens: 500,
      temperature: 0.8,
    }),
  })

  if (!response.ok) {
    console.error('API request failed:', response.status)
    return getRandomFallbackWords(wordCount)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content ?? ''

  const words = content
    .split('\n')
    .map((w: string) => w.trim().toLowerCase().replace(/[^a-zåäö]/g, ''))
    .filter((w: string) => w.length > 1 && w.length < 20)
    .filter((w: string) => !INAPPROPRIATE_WORDS.has(w))

  if (words.length === 0) {
    console.warn('No valid words from API, using fallback')
    return getRandomFallbackWords(wordCount)
  }

  return words.slice(0, wordCount)
}

function getRandomFallbackWords(count: number): string[] {
  const shuffled = [...fallbackWords].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export class WordGenerator {
  private queue: string[] = []
  private fetching = false
  private fetchPromise: Promise<string[]> | null = null
  private category: string = ''

  async prefetch(count: number = 50, category: string = ''): Promise<void> {
    this.category = category
    this.fetchPromise = fetchFromApi(count, category)
    this.fetching = true

    try {
      this.queue = await this.fetchPromise
    } catch {
      this.queue = getRandomFallbackWords(count)
    } finally {
      this.fetching = false
      this.fetchPromise = null
    }
  }

  getWord(): string | null {
    if (this.queue.length === 0) {
      return null
    }
    return this.queue.shift()!
  }

  shouldRefill(): boolean {
    return this.queue.length < 10 && !this.fetching
  }

  async refill(): Promise<void> {
    if (this.shouldRefill()) {
      await this.prefetch(50, this.category)
    }
  }

  getQueueLength(): number {
    return this.queue.length
  }
}

export const wordGenerator = new WordGenerator()
