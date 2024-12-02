"use client"; // Enables client-side rendering for this component.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Home = () => {
  // State to store the latest movies fetched from the API
  const [latestMovies, setLatestMovies] = useState<any[]>([]);

  // State to manage error messages, if any
  const [error, setError] = useState<string | null>(null);


  const router = useRouter();

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
        // API call to fetch movies
        const response = await fetch(
          `https://www.omdbapi.com/?s=movie&y=2024&apikey=5e599672`
        );

        // Check if the API response is not okay
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();

 
        if (data.Response === "True") {

          setLatestMovies(data.Search.slice(0, 10));
        } else {
          // Set an error message if the API response contains an error
          setError(data.Error);
        }
      } catch (err: any) {
        // Handle network or other unforeseen errors
        setError("An error occurred while fetching latest movies.");
      }
    };

    fetchLatestMovies(); 
  }, []);

  const handleMovieClick = (movie: any) => {
    router.push(
      `/create?title=${encodeURIComponent(movie.Title)}&year=${
        movie.Year
      }&poster=${movie.Poster}`
    );
  };

  const goToSearch = () => {
    router.push("/search");
  };

  const goToTickets = () => {
    router.push("/details");
  };

  return (
    <div
      style={{
        maxWidth: "100%", 
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#121212", 
        color: "#f5f5f5", 
      }}
    >

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
          Movies Mania
        </h1>
        <div style={{ display: "flex", gap: "10px" }}>
          {/* Button to navigate to the search page */}
          <button
            onClick={goToSearch}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "30px",
              backgroundColor: "#f5c518",
              color: "#121212",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease", 
            }}
          >
            Go to Search
          </button>
          {/* Button to navigate to the tickets page */}
          <button
            onClick={goToTickets}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "30px",
              backgroundColor: "#28a745", 
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            My Tickets
          </button>
          {/* Sign-in button for unauthenticated users */}
          <SignedOut>
            <SignInButton mode="modal">
              <button
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "30px",
                  backgroundColor: "#007bff", 
                  color: "#fff",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          {/* Profile and sign-out button for authenticated users */}
          <SignedIn>
            <div
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "30px",
                backgroundColor: "#dc3545", // Red for sign-out
                color: "#fff",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "inline-block", // Ensure proper layout
              }}
            >
              <UserButton userProfileUrl="/profile" afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
      </header>

      {/* Error message display */}
      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
          {error}
        </p>
      )}

      {/* Latest Movies Section */}
      <h2
        style={{
          fontSize: "1.8rem",
          fontWeight: "bold",
          marginTop: "30px",
          marginBottom: "20px",
        }}
      >
        Latest Movies of 2024
      </h2>
      <div
        style={{
          display: "grid", // Grid layout for movies
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Responsive columns
          gap: "25px", // Space between grid items
        }}
      >
        {latestMovies.map((movie) => (
          <div
            key={movie.imdbID} 
            onClick={() => handleMovieClick(movie)} 
            style={{
              backgroundColor: "#1c1c1c", 
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease", 
              cursor: "pointer",
            }}
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"} 
              alt={movie.Title}
              style={{
                width: "100%",
                height: "350px", 
                objectFit: "cover", 
              }}
            />
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
            <p
              style={{
                fontSize: "1rem",
                margin: "0 10px 15px",
                color: "#999", 
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

export default Home;
