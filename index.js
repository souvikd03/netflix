// API key from TMDB
const api = "api_key=7d11171b075974ec0eee4ebb5def759a";

// Base URL of the site
const base_url = "https://api.themoviedb.org/3";
const banner_url = "https://image.tmdb.org/t/p/original";
const img_url = "https://image.tmdb.org/t/p/w185";

// Requests for movie data
const requests = {
    fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
    fetchNetflixOriginals: `${base_url}/discover/tv?${api}&with_networks=213`,
    fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
    fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
    fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
    fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,
    fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=99`,
    fetchDrama: `${base_url}/discover/movie?${api}&with_genres=18`,
    fetchThrillerMovies: `${base_url}/discover/movie?${api}&with_genres=53`,
    fetchMysteryMovies: `${base_url}/discover/movie?${api}&with_genres=9648`,
    fetchFantasy: `${base_url}/discover/movie?${api}&with_genres=14`,
    fetchFamilyMovies: `${base_url}/discover/movie?${api}&with_genres=10751`,
    fetchAdventureMovies: `${base_url}/discover/movie?${api}&with_genres=12`,
    fetchCrimeMovies: `${base_url}/discover/movie?${api}&with_genres=80`,
    fetchAnimation: `${base_url}/discover/movie?${api}&with_genres=16`,
};

// Function to truncate the string
function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

// Function to create movie rows
function createMovieRow(fetchUrl, rowTitle) {
    fetch(fetchUrl)
        .then((res) => res.json())
        .then((data) => {
            const headrow = document.getElementById("headrow");
            const row = document.createElement("div");

            row.className = "row";
            row.classList.add(`${rowTitle.toLowerCase().replace(/\s/g, '')}row`);

            headrow.appendChild(row);

            const title = document.createElement("h2");
            title.className = "row_title";
            title.innerText = rowTitle;

            row.appendChild(title);

            const row_posters = document.createElement("div");
            row_posters.className = "row_posters";
            row.appendChild(row_posters);

            data.results.forEach((movie) => {
                const poster = document.createElement("img");
                poster.className = "row_posterLarge";
                const s = movie.name?.replace(/\s+/g, "") || movie.title?.replace(/\s+/g, "");
                poster.id = s;
                poster.src = img_url + movie.poster_path;
                row_posters.appendChild(poster);
            });
        });
}

// Fetch banner
fetch(requests.fetchNetflixOriginals)
    .then((res) => res.json())
    .then((data) => {
        const setMovie = data.results[Math.floor(Math.random() * data.results.length)];

        const banner = document.getElementById("banner");
        const banner_title = document.getElementById("banner_title");
        const banner_desc = document.getElementById("banner_description");

        banner.style.backgroundImage = `url(${banner_url + setMovie.backdrop_path})`;
        banner_title.innerText = setMovie.name || setMovie.title; // Updated to set title
        banner_desc.innerText = truncate(setMovie.overview, 150); // Updated to set description
    });


// Create rows for different movie categories
createMovieRow(requests.fetchNetflixOriginals, "Netflix Originals");
createMovieRow(requests.fetchTrending, "Trending Now");
createMovieRow(requests.fetchActionMovies, "Action Movies");
createMovieRow(requests.fetchComedyMovies, "Comedy Movies");
createMovieRow(requests.fetchHorrorMovies, "Horror Movies");
createMovieRow(requests.fetchRomanceMovies, "Romance Movies");
createMovieRow(requests.fetchDocumentaries, "Documentaries");
createMovieRow(requests.fetchDrama, "Drama");
createMovieRow(requests.fetchThrillerMovies, "Thriller Movies");
createMovieRow(requests.fetchMysteryMovies, "Mystery Movies");
createMovieRow(requests.fetchFantasy, "Fantasy Movies");
createMovieRow(requests.fetchFamilyMovies, "Family Movies");
createMovieRow(requests.fetchAdventureMovies, "Adventure Movies");
createMovieRow(requests.fetchCrimeMovies, "Crime Movies");
createMovieRow(requests.fetchAnimation, "Animation Movies");
