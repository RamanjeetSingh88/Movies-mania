import { NextResponse } from "next/server";

// Function to fetch the user's session data from the authentication API.
const fetchSession = async () => {
  
  const baseUrl =
    typeof window !== "undefined"
      ? "" // Use a relative URL for client-side requests.
      : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Use an absolute URL for server-side requests with a fallback to localhost.

  try {

    const response = await fetch(`${baseUrl}/api/auth/session`);


    if (response.ok) {
      const session = await response.json(); 
      console.log("Session Data:", session);
    } else {
      console.error("Failed to fetch session:", response.statusText); 
    }
  } catch (error) {
    console.error("Error fetching session:", error.message); 
  }
};

// Call fetchSession to initiate the session fetch process.
fetchSession();

// API route handler function.
export default function handler() {
  return NextResponse.json({ message: "Session fetch initiated" }); // Return a JSON response indicating the session fetch has been started.
}
