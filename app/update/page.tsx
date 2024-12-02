"use client"; // Enables client-side rendering for this component.

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const UpdateTicket = () => {
  const searchParams = useSearchParams(); 
  const router = useRouter(); 
  const ticketId = searchParams?.get("id"); // Extract the ticket ID from query parameters.

  // State variables for managing ticket details and loading state.
  const [name, setName] = useState<string>(""); 
  const [selectedSeat, setSelectedSeat] = useState<string>(""); 
  const [ticketType, setTicketType] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  // Constants for dropdown options.
  const ticketTypes = ["Adult", "Young", "Senior"]; // Available ticket types.
  const movieTimes = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"];

  // Fetch ticket details when the component mounts or ticket ID changes.
  useEffect(() => {
    if (!ticketId) {
      alert("No Ticket ID provided!"); 
      router.push("/details"); 
      return;
    }

    const fetchTicketDetails = async () => {
      try {
        // Fetch ticket details from the API using the ticket ID.
        const response = await fetch(`/api/tickets/${ticketId}`);
        if (!response.ok) throw new Error("Failed to fetch ticket details");

        const data = await response.json();
        if (data.success) {
          // Populate state with fetched ticket details.
          const { name, seat, type, time } = data.data;
          setName(name || "");
          setSelectedSeat(seat || "");
          setTicketType(type || "");
          setSelectedTime(time || "");
        } else {
          alert("Failed to fetch ticket details."); // Alert if fetching fails.
        }
      } catch (error) {
        console.error("Error fetching ticket details:", error); // Log any errors.
      } finally {
        setIsLoading(false); 
      }
    };

    fetchTicketDetails(); // Invoke the fetch function.
  }, [ticketId, router]);

  // Handle the ticket update action.
  const handleUpdateTicket = async () => {
    // Validate that all required fields are filled.
    if (!name.trim() || !selectedSeat || !ticketType || !selectedTime) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      // Send a PUT request to update the ticket details.
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          seat: selectedSeat,
          type: ticketType,
          time: selectedTime,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Ticket updated successfully!"); 
        router.push("/details"); 
      } else {
        alert("Failed to update ticket."); 
      }
    } catch (error) {
      console.error("Error updating ticket:", error); 
      alert("An error occurred while updating the ticket."); 
    }
  };

  // Display a loading message while ticket details are being fetched.
  if (isLoading) {
    return (
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#121212", 
          color: "#f5f5f5", 
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", // Subtle shadow for depth.
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", color: "#f5c518" }}>
          Loading Ticket Details...
        </h1>
      </div>
    );
  }

  // Render the ticket update form.
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#121212",
        color: "#f5f5f5",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "20px",
          color: "#f5c518",
          fontWeight: "bold",
        }}
      >
        Update Ticket Details
      </h1>
      <div>
        {/* Input for ticket holder name */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />
        {/* Input for seat */}
        <input
          type="text"
          placeholder="Seat"
          value={selectedSeat}
          onChange={(e) => setSelectedSeat(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />
        {/* Dropdown for ticket type */}
        <select
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <option>Select Ticket Type</option>
          {ticketTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {/* Dropdown for movie time */}
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <option>Select Time</option>
          {movieTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        {/* Update Ticket Button */}
        <button
          onClick={handleUpdateTicket}
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: "#f5c518",
            color: "#121212",
            fontSize: "1.2rem",
            fontWeight: "bold",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update Ticket
        </button>
      </div>
    </div>
  );
};

export default UpdateTicket;
