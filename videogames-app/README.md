# Video Game Library - MongoDB Web App
# Author: Leon Nguyen
## Routes & Example Queries

### Pages
- GET `/upload` → form to add a new game
- GET `/list` → shows every game in the collection
- GET `/query` → form that uses AJAX/Fetch to query games

### REST Routes
- POST `/game` → create a new game (body: title, studio, genre, price, releaseDate)
- GET `/games` → returns games. Supports query params:
  - `?maxPrice=59.99` → games ≤ $59.99, sorted cheapest first
  - `?genre=Action` → only Action games
  - `?maxPrice=40&genre=RPG` → combined filters

Example curl query:
curl "http://localhost:3000/games?maxPrice=50&genre=Action"