import { NextResponse } from "next/server"; // Importing Next.js response helper for server-side operations.

// Function to log user activity by sending data to the logging API.
const logActivity = async (logData) => {
    // Attempt to send log data to the specified API endpoint.
    const response = await fetch('/api/auth/_log', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(logData), 
    });

    // Check if the response indicates a successful request.
    if (response.ok) {
        const result = await response.json(); 
        console.log("Log saved:", result); 
    } else {
        console.error("Failed to save log"); 
    }
};

// Call the `logActivity` function with an example log entry.
logActivity({
    event: "User Logged In", 
    timestamp: new Date().toISOString(), 
});
