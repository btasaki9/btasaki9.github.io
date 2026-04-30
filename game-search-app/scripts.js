// JavaScript code for the Game Search App
// This script handles user interactions, API calls to RAWG.io and OpenCritic, and updating the DOM with game information

// API configuration constants
// API key for accessing RAWG game database
const API_KEY = "adeda8483eb742b2bbb59a24e6326b8d";
// *** NEW ***
const OPENCRITIC_KEY = "3933a62283msh6859f42dfe04d17p1da7cajsn41b441386073";
// URL for RAWG API endpoints
const BASE_URL = "https://api.rawg.io/api";

// Function to search for games by name using the RAWG API
async function searchGame(gameName) {
   const res = await fetch(`${BASE_URL}/games?search=${encodeURIComponent(gameName)}&key=${API_KEY}`);
   const data = await res.json();
   return data.results;
}

// Function to get detailed information about a specific game
async function getGameDetails(gameId) {
   const res = await fetch(`${BASE_URL}/games/${gameId}?key=${API_KEY}`);
   return await res.json();
}

// *** NEW *** Search OpenCritic for a game by name
async function searchOpenCritic(gameName) {
   const res = await fetch(`https://opencritic-api.p.rapidapi.com/game/search?criteria=${encodeURIComponent(gameName)}`, {
      headers: {
         "x-rapidapi-host": "opencritic-api.p.rapidapi.com",
         "x-rapidapi-key": OPENCRITIC_KEY
      }
   });
   const data = await res.json();
   return data[0];
}

// *** NEW *** Get OpenCritic score details using game ID
async function getOpenCriticDetails(gameId) {
   const res = await fetch(`https://opencritic-api.p.rapidapi.com/game/${gameId}`, {
      headers: {
         "x-rapidapi-host": "opencritic-api.p.rapidapi.com",
         "x-rapidapi-key": OPENCRITIC_KEY
      }
   });
   return await res.json();
}

// Function to display game information in the UI
async function displayGame(name) {
   // *** NEW *** fetch both APIs at the same time
   const [results, ocResult] = await Promise.all([
      searchGame(name),
      searchOpenCritic(name)
   ]);

   if (!results.length) return alert("Game not found!");

   // *** NEW *** get details from both APIs at the same time
   const [game, ocDetails] = await Promise.all([
      getGameDetails(results[0].id),
      getOpenCriticDetails(ocResult.id)
   ]);

   // Set the game title in the h2 element
   document.getElementById("game-title").textContent    = game.name;
   // Set the release date, using "Unknown" if not available
   document.getElementById("game-released").textContent = game.released ?? "Unknown";
   // Set the Metacritic score, formatting it or showing "N/A" if not available
   document.getElementById("game-metacritic").textContent = game.metacritic ? game.metacritic + " / 100" : "N/A";
   // Set the game cover image, using a placeholder if no image is available
   document.getElementById("game-cover").src            = game.background_image ?? "https://via.placeholder.com/300x400";
   // *** NEW *** Set the OpenCritic average score
   document.getElementById("game-opencritic").textContent = ocDetails.averageScore ? Math.round(ocDetails.averageScore) + " / 100" : "N/A";
}

// Event listener for the search form submission
document.getElementById("search-form").addEventListener("submit", function(e) {
   e.preventDefault();
   const query = document.getElementById("search-input").value.trim();
   if (query) displayGame(query);
});