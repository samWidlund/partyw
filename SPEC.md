# Project vision
Create a web app which is a game to play with your friends, called "brainstorm"

# Game specification
- Multiple teams play in the game
- Each player has paper and pen

## Game plan
1. Click on "Start Game" after setting up teams (minimum 2 teams)
2. Click "Generate Word" - a random word is fetched from Groq AI
3. A timer starts counting down (default 40 seconds, customizable)
4. Each player writes down words on paper that relate to the shown word
5. When the timer stops (or you press Stop), enter points for each team manually
6. Repeat for more rounds
7. Press "End Game" to see the winner

## Features
- Team setup with customizable team names
- Optional category input for themed word generation (e.g., "animals", "food", "sports")
- Adjustable timer (input box with placeholder showing default)
- Live countdown timer displayed during rounds
- Alarm sound (4 beeps) when timer reaches 0
- Manual score entry per team after each round
- Final scores and winner display
- AI-powered word generation via Groq API (falls back to hardcoded list if API unavailable)

## Technical details
- Words are pre-fetched in batches of 50 from Groq API
- Fallback to hardcoded word list if API fails
- Alarm uses Web Audio API (no external files)
- API key stored in .env file (never committed)
