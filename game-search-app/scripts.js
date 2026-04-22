//js for the game search app

//for search bar 
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    console.log('Searching for:', query);
    // TODO: Implement actual search functionality
});