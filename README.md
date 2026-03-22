# brainstorm

<p align="center">
  <h1> Swedish AI-powered word association game</h1>
  
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite)
![Groq](https://img.shields.io/badge/Groq-API-orange)

  <p>Play with friends and family in teams, earning points by brainstorming associated words to randomly generated prompts.</p>
</p>

---

## Preview

<div align="center">
  <img src="public/landingpage.png" alt="Landing page" width="100%" style="border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);" />
  <br /><br />
  <img src="public/game.png" alt="Game" width="100%" style="border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);" />
</div>

---

## Features

| Feature | Description |
|---------|-------------|
|  **AI-generated words** | Words dynamically generated using Groq AI API |
| **Adjustable timer** | Set round duration (default: 40 seconds) |
| **Team support** | Create and manage multiple teams |
| **Manual scoring** | Enter points for each team per round |
| **Alarm sound** | Clear audio signal when timer ends |
| **Final results** | Display winning team and scores |
| **Swedish design** | Festive dark theme |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repo
git clone <repo-url>
cd brainstorm

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Configure AI

Create a `.env` file in the project root:

```env
VITE_GROQ_API=your_api_key_here
```

Get a free API key at [console.groq.com](https://console.groq.com).

> **Note:** If no API key is configured, a fallback local list of Swedish words will be used.

---

## How to Play

1. **Create teams** - Add at least 2 teams with names
2. **Choose category** (optional) - Enter a category for related words
3. **Generate word** - Press the button for a random AI-generated word
4. **Brainstorm** - All players write associated words on paper
5. **Compare** - When timer ends, teammates compare their words
6. **Score** - Each matching word = 1 point to the team
7. **Continue** - Play more rounds or end game to see results

---

## Tech Stack
- **React 19** + TypeScript
- **Vite** for build and development
- **Groq API** for AI-generated words
- **Web Audio API** for alarm sounds
- **CSS** with custom festive dark theme

---

## License

MIT
