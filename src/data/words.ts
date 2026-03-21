export const words: string[] = [
  'apple', 'beach', 'cloud', 'dream', 'earth', 'fire', 'garden', 'heart',
  'island', 'jungle', 'kingdom', 'lamp', 'mountain', 'night', 'ocean',
  'planet', 'queen', 'river', 'star', 'tree', 'umbrella', 'valley', 'winter',
  'bear', 'cat', 'dog', 'eagle', 'fish', 'giraffe', 'horse', 'lion',
  'monkey', 'owl', 'penguin', 'rabbit', 'snake', 'tiger', 'whale', 'zebra',
  'banana', 'bread', 'cheese', 'donut', 'egg', 'fries', 'grapes', 'hamburger',
  'pizza', 'rice', 'salad', 'tomato', 'waffle', 'rain', 'sun', 'wind',
  'snow', 'rainbow', 'forest', 'desert', 'volcano', 'waterfall', 'bottle',
  'chair', 'door', 'fork', 'key', 'mirror', 'pencil', 'ring', 'clock',
]

export function getRandomWord(): string {
  return words[Math.floor(Math.random() * words.length)]
}
