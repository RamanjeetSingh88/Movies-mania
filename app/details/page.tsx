"use client"; // Enables client-side rendering for this component.

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Interface defining the structure of a ticket object.
interface Ticket {
  id: string; 
  name: string;
  seat: string; 
  type: string; 
  time: string; 
}

const ShowDetails = () => {
  const [people, setPeople] = useState<Ticket[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 
  // Fetches tickets from the backend API.
  const fetchTickets = async () => {
    setLoading(true); // Show the loading indicator while fetching.
    setError(null); 
    try {
      const response = await fetch("/api/tickets"); // API call to fetch tickets.
      if (!response.ok) throw new Error("Failed to fetch tickets");

      const data = await response.json();
      if (data?.success) {
        // Transform the fetched data to match the Ticket interface.
        setPeople(
          data.data.map((ticket: any) => ({
            id: ticket._id, // Map _id from the database to id for the Ticket interface.
            name: ticket.name,
            seat: ticket.seat,
            type: ticket.type,
            time: ticket.time,
          }))
        );
      } else {
        // Handle errors returned by the API.
        throw new Error(data.message || "Unknown error fetching tickets");
      }
    } catch (error: any) {
      console.error("Error fetching tickets:", error); 
      setError(error.message || "Error fetching tickets"); 
    } finally {
      setLoading(false); // Hide the loading indicator after the process.
    }
  };

  // Fetch tickets when the component is mounted.
  useEffect(() => {
    fetchTickets();
  }, []);

 
  const handleDelete = async (id: string) => {
    if (!id) {
      console.error("No ID provided to handleDelete");
      alert("Invalid ticket ID.");
      return;
    }

    // Confirm the deletion action with the user.
    if (!confirm("Are you sure you want to delete this ticket?")) return;

    try {
      const response = await fetch(`/api/tickets/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Ticket deleted successfully!");
        // Remove the deleted ticket from the state.
        setPeople((prev) => prev.filter((person) => person.id !== id));
      } else {
        const data = await response.json();
        console.error("Failed to delete ticket:", data.message || "Unknown error");
        alert(data.message || "Failed to delete ticket.");
      }
    } catch (error) {
      console.error("Error deleting ticket:", error); 
      alert("An error occurred while deleting the ticket.");
    }
  };

  // Navigates to the edit page with the ticket's details as query parameters.
  const handleEdit = (ticket: Ticket) => {
    router.push(
      `/edit?id=${ticket.id}&name=${encodeURIComponent(ticket.name)}&seat=${ticket.seat}&type=${ticket.type}&time=${ticket.time}`
    );
  };

  // Navigates to the purchase page to add a new ticket.
  const handlePurchase = () => {
    router.push("/create");
  };

  // Styles for the component to maintain a consistent and responsive layout.
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      maxWidth: "100%", // Full-width container for responsiveness.
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#121212",
      color: "#f5f5f5",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", 
    },
    header: {
      textAlign: "center",
      fontSize: "2.5rem",
      color: "#f5c518",
    },
    button: {
      padding: "10px 20px",
      fontSize: "1rem",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    purchaseButton: {
      backgroundColor: "#28a745", 
      color: "#fff",
      marginBottom: "20px",
    },
    list: {
      listStyleType: "none", 
      padding: 0,
    },
    listItem: {
      marginBottom: "15px",
      padding: "10px",
      backgroundColor: "#1c1c1c", 
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)", 
    },
    actionButton: {
      marginRight: "10px",
      padding: "5px 10px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    editButton: {
      backgroundColor: "#007bff", 
      color: "#fff",
    },
    deleteButton: {
      backgroundColor: "red", 
      color: "#fff",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Ticket Details</h1>
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handlePurchase}
          style={{ ...styles.button, ...styles.purchaseButton }}
          aria-label="Purchase a new ticket"
        >
          Purchase
        </button>
      </div>
      {loading ? (
        <p style={{ textAlign: "center", color: "#aaa" }}>Loading tickets...</p> // Show loading text.
      ) : error ? (
        <p style={{ textAlign: "center", color: "red" }}>{error}</p> // Display error message.
      ) : people.length === 0 ? (
        <p style={{ textAlign: "center", color: "#aaa" }}>No tickets available.</p> // Show message if no tickets are found.
      ) : (
        <ul style={styles.list}>
          {people.map((ticket) => (
            <li key={ticket.id} style={styles.listItem}>
              <p style={{ margin: 0 }}>
                <strong>Name:</strong> {ticket.name}
              </p>
              <p style={{ margin: "5px 0" }}>
                <strong>Seat:</strong> {ticket.seat} | <strong>Type:</strong>{" "}
                {ticket.type} | <strong>Time:</strong> {ticket.time}
              </p>
              <div>
                <button
                  onClick={() => handleEdit(ticket)}
                  style={{ ...styles.actionButton, ...styles.editButton }}
                  aria-label={`Edit ticket for ${ticket.name}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ticket.id)}
                  style={{ ...styles.actionButton, ...styles.deleteButton }}
                  aria-label={`Delete ticket for ${ticket.name}`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowDetails;
