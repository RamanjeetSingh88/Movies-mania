"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation"; 

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [movies, setMovies] = useState<any[]>([]); 
  const [error, setError] = useState<string | null>(null); 
  const router = useRouter(); 

  // Handles the search action triggered by the "Search" button.
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // Ensure the search query is not empty or whitespace.
      setError("Please enter a valid movie name."); // Display an error message for invalid input.
      return;
    }

    setError(null); 

    try {
      // Fetch movie data from the OMDB API using the search query.
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(
          searchQuery
        )}&apikey=5e599672`
      );

      const data = await response.json();

      if (data.Response === "True") {
        // If the API response is successful, update the movies state with the search results.
        setMovies(data.Search);
      } else {
        // Display an error message if the API response contains an error.
        setError(data.Error);
      }
    } catch (error) {
      
      setError("An error occurred while fetching data. Please try again.");
    }
  };
  const handleMovieClick = (movie: any) => {
    // Navigate to the "create" page with the movie details passed as query parameters.
    router.push(
      `/create?title=${encodeURIComponent(movie.Title)}&year=${
        movie.Year
      }&poster=${movie.Poster}`
    );
  };

  return (
    <div
      style={{
        maxWidth: "100%", // Ensures responsiveness.
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#121212", // Dark theme background.
        color: "#f5f5f5", // Light text for contrast.
      }}
    >
      {/* Header Section */}
      <header
        style={{
          display: "flex", 
          justifyContent: "space-between",
          alignItems: "center", 
          paddingBottom: "20px",
          borderBottom: "1px solid #333", 
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            color: "#f5c518", 
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Search Movies
        </h1>
      </header>

      {/* Search Input Section */}
      <div
        style={{
          marginTop: "30px",
        }}
      >
        {/* Input for movie search query */}
        <input
          type="text"
          placeholder="Enter movie name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state.
          style={{
            width: "98%", // Wide input field for better UX.
            padding: "15px",
            border: "1px solid #333", 
            borderRadius: "30px",
            fontSize: "1rem",
            backgroundColor: "#1c1c1c",
            color: "#f5f5f5",
            marginBottom: "20px",
          }}
        />
        {/* Search Button */}
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "30px",
            backgroundColor: "#f5c518", // Highlighted action button.
            color: "#121212", // High contrast text color.
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease", // Smooth hover effect.
          }}
        >
          Search
        </button>
      </div>

      {/* Error Message Display */}
      {error && (
        <p style={{ color: "red", marginTop: "20px" }}>{error}</p> 
      )}

      {/* Movies Display Section */}
      <div
        style={{
          display: "grid", // Grid layout for responsive movie cards.
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Responsive columns.
          gap: "25px", // Space between movie cards.
          marginTop: "30px",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.imdbID} // Unique key for each movie item.
            onClick={() => handleMovieClick(movie)} 
            style={{
              backgroundColor: "#1c1c1c", // Slightly lighter background for contrast.
              borderRadius: "15px",
              overflow: "hidden", // Clip content to card bounds.
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", 
              transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth hover effects.
              cursor: "pointer",
            }}
          >
            {/* Movie Poster */}
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"} // Fallback image for missing posters.
              alt={movie.Title}
              style={{
                width: "100%", 
                height: "350px", 
                objectFit: "cover", 
              }}
            />
            {/* Movie Title */}
            <h2
              style={{
                fontSize: "1.5rem",
                margin: "15px 10px 5px",
                color: "#f5f5f5",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {movie.Title}
            </h2>
            {/* Movie Year */}
            <p
              style={{
                fontSize: "1rem",
                margin: "0 10px 15px",
                color: "#999", // Subtle text color for secondary info.
                textAlign: "center",
              }}
            >
              Year: {movie.Year}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
