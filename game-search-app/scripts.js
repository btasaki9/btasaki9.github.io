// JavaScript code for the Game Search App
// This script handles user interactions, API calls to RAWG.io, and updating the DOM with game information

// API configuration constants
// API key for accessing RAWG game database
const API_KEY = "adeda8483eb742b2bbb59a24e6326b8d";
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

// Function to display game information in the UI
async function displayGame(name) {
   try {
      const results = await searchGame(name);

      if (!results.length) return alert("Game not found!");

      const game = await getGameDetails(results[0].id);

      // Set the game title in the h2 element
      document.getElementById("game-title").textContent    = game.name;
      // Set the release date, using "Unknown" if not available
      document.getElementById("game-released").textContent = game.released ?? "N/A";
      // Set the Metacritic score, formatting it or showing "N/A" if not available
      document.getElementById("game-metacritic").textContent = game.metacritic ? game.metacritic + " / 100" : "N/A";
      // Set the game cover image, using a placeholder if no image is available
      document.getElementById("game-cover").src            = game.background_image ?? "https://via.placeholder.com/300x400";
      // Show the image container after search
      document.getElementById("image").style.display = "flex";
      // esrb rating 
      document.getElementById("game-esrb").textContent = game.esrb_rating?.name ?? "N/A";
      //developers 
      document.getElementById("game-developer").textContent = game.developers?.[0]?.name ?? "N/A";
      //overview 
      document.getElementById("game-overview").textContent = game.description_raw ?? "No overview available.";
   } catch (error) {
      console.error("Error fetching game data:", error);
      alert("An error occurred while fetching game data. Please try again.");
   }
}

// Event listener for the search form submission
document.getElementById("search-form").addEventListener("submit", function(e) {
   e.preventDefault();
   const query = document.getElementById("search-input").value.trim();
   if (query) displayGame(query);
});