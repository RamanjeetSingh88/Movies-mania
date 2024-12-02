"use client"; 

import { useRouter } from "next/router"; 
import { useState, useEffect } from "react"; 

const Create = () => {
  // State variables for form inputs and selected options.
  const [name, setName] = useState<string>(""); 
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null); 
  const [ticketType, setTicketType] = useState<string>(""); 
  const [selectedTime, setSelectedTime] = useState<string>(""); 
  const [people, setPeople] = useState<
    { id: string; name: string; seat: string; type: string; time: string }[]
  >([]); // Array to store existing people and their ticket details.
  const [editingPersonId, setEditingPersonId] = useState<string | null>(null); 

  // Constants for the seat grid, ticket types, and movie times.
  const rows = 5; 
  const cols = 8; 
  const ticketTypes = ["Adult", "Young", "Senior"]; // Available ticket types.
  const movieTimes = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"]; // Available movie times.
  const preSelectedSeats = ["1-2", "2-4", "3-6"]; // Seats that are pre-reserved.

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("/api/tickets"); 
        const data = await response.json();

        if (data.success) {
          setPeople(data.data);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error); 
      }
    };

    fetchTickets();
  }, []);

  // Handles adding a new person or updating an existing person's ticket.
  const handleAddOrUpdatePerson = async () => {
    // Validate input fields before proceeding.
    if (!name.trim() || !selectedSeat || !ticketType || !selectedTime) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      if (editingPersonId) {
        // Update an existing ticket.
        const response = await fetch(`/api/tickets/${editingPersonId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, seat: selectedSeat, type: ticketType, time: selectedTime }),
        });
        const data = await response.json();

        if (data.success) {
          setPeople((prev) =>
            prev.map((person) =>
              person.id === editingPersonId
                ? { ...person, name, seat: selectedSeat, type: ticketType, time: selectedTime }
                : person
            )
          );
          alert("Ticket updated successfully!");
        } else {
          alert("Failed to update ticket.");
        }
      } else {
        // Add a new ticket.
        const response = await fetch("/api/tickets/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, seat: selectedSeat, type: ticketType, time: selectedTime }),
        });
        const data = await response.json();

        if (data.success) {
          setPeople([...people, { ...data.data, id: data.data._id }]);
          alert("Ticket added successfully!");
        } else {
          alert("Failed to add ticket.");
        }
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving the ticket."); 
    }

    // Reset form inputs and editing state.
    setName("");
    setSelectedSeat(null);
    setTicketType("");
    setSelectedTime("");
    setEditingPersonId(null);
  };

  // Handles seat selection and ensures pre-selected seats cannot be modified.
  const toggleSeatSelection = (seat: string) => {
    if (preSelectedSeats.includes(seat)) {
      alert("This seat is pre-selected and cannot be chosen."); 
      return;
    }
    setSelectedSeat((prev) => (prev === seat ? null : seat)); 
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
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "2.5rem", color: "#f5c518" }}>
        Add People and Ticket Details
      </h1>

      {/* Input fields for name, ticket type, and time */}
      <div style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "98.5%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        />
        <select
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <option>Select Ticket Type</option>
          {ticketTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <option>Select Time</option>
          {movieTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      {/* Seat selection grid */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>Select a Seat</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 50px)`,
            gap: "0",
            marginTop: "0px",
          }}
        >
          {[...Array(rows)].map((_, row) =>
            [...Array(cols)].map((_, col) => {
              const seat = `${row + 1}-${col + 1}`;
              const isSelected = selectedSeat === seat;
              const isPreSelected = preSelectedSeats.includes(seat);

              return (
                <button
                  key={seat}
                  onClick={() => toggleSeatSelection(seat)}
                  disabled={isPreSelected}
                  style={{
                    backgroundColor: isPreSelected
                      ? "red"
                      : isSelected
                      ? "#f5c518"
                      : "#2a2a2a",
                    width: "50px",
                    height: "50px",
                    borderRadius: "5px",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    cursor: isPreSelected ? "not-allowed" : "pointer",
                  }}
                >
                  {seat}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Add or Update button */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <button
          onClick={handleAddOrUpdatePerson}
          style={{
            width: "20%",
            padding: "10px",
            backgroundColor: "#f5c518",
            borderRadius: "5px",
            color: "#121212",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {editingPersonId ? "Update Person" : "Add Person"}
        </button>
      </div>
    </div>
  );
};

export default Create;
