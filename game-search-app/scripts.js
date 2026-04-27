// JavaScript code for the Game Search App
// This script handles user interactions, API calls to RAWG.io, and updating the DOM with game information

// API configuration constants
//  API key for accessing RAWG game database
const API_KEY = "adeda8483eb742b2bbb59a24e6326b8d";
//  URL for RAWG API endpoints
const BASE_URL = "https://api.rawg.io/api";

// Function to search for games by name using the RAWG API
// Takes a game name as input and returns an array of matching games
async function searchGame(gameName) {
   // Construct the API URL with search query and API key
   const res = await fetch(`${BASE_URL}/games?search=${encodeURIComponent(gameName)}&key=${API_KEY}`);
   // Parse the JSON response
   const data = await res.json();
   // Return the results array containing game objects
   return data.results;
}

// Function to get detailed information about a specific game
// Takes a game ID and returns the full game details object
async function getGameDetails(gameId) {
   // Fetch detailed game data using the game ID
   const res = await fetch(`${BASE_URL}/games/${gameId}?key=${API_KEY}`);
   // Return the parsed game details
   return await res.json();
}

// Function to display game information in the UI
// Takes a game name, searches for it, and updates the DOM with the results
async function displayGame(name) {
   // Search for games matching the provided name
   const results = await searchGame(name);
   // If no games found, show an alert and exit
   if (!results.length) return alert("Game not found!");

   // Get detailed information for the first search result
   const game = await getGameDetails(results[0].id);

   // Update the DOM elements with game information
   // Set the game title in the h2 element
   document.getElementById("game-title").textContent    = game.name;
   // Set the release date, using "Unknown" if not available
   document.getElementById("game-released").textContent = game.released ?? "Unknown";
   // Set the Metacritic score, formatting it or showing "N/A" if not available
   document.getElementById("game-score").textContent    = game.metacritic ? game.metacritic + " / 100" : "N/A";
}

// Event listener for the search form submission
// Prevents default form behavior and triggers game search
document.getElementById("search-form").addEventListener("submit", function(e) {
   // Prevent the form from submitting and reloading the page
   e.preventDefault();
   // Get the search query from the input field and trim whitespace
   const query = document.getElementById("search-input").value.trim();
   // If there's a query, call displayGame to show results
   if (query) displayGame(query);
});