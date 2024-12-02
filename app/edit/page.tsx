"use client"; 

import { useRouter, useSearchParams } from "next/navigation"; 
import { useState, useEffect } from "react"; 

const Edit = () => {
  // Get search parameters from the URL.
  const searchParams = useSearchParams();
  const router = useRouter(); // Router instance for programmatic navigation.

  // State to manage the form data, pre-filled with default values.
  const [formData, setFormData] = useState({
    id: "", 
    name: "", 
    seat: "", 
    type: "", 
    time: "", 
  });

  // Populate form data from URL query parameters when the component loads or the parameters change.
  useEffect(() => {
    if (searchParams) {
      const id = searchParams.get("id") || ""; 
      const name = searchParams.get("name") || ""; 
      const seat = searchParams.get("seat") || ""; 
      const type = searchParams.get("type") || "";
      const time = searchParams.get("time") || ""; 

      // Update the form state with extracted values.
      setFormData({ id, name, seat, type, time });
    }
  }, [searchParams]);

  // Handles the update action when the "Update" button is clicked.
  const handleUpdate = async () => {
    // Validate form inputs before submitting.
    if (!formData.name || !formData.seat || !formData.type || !formData.time) {
      alert("Please fill out all fields."); // Alert the user if any field is empty.
      return;
    }

    try {
      // Send a PUT request to update the ticket details.
      const response = await fetch(`/api/tickets/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          seat: formData.seat,
          type: formData.type,
          time: formData.time,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update ticket."); // Throw an error if the update fails.
      }

      alert("Ticket updated successfully!"); // Notify the user of a successful update.
      router.push("/details");
    } catch (error) {
      console.error("Error updating ticket:", error); 
      alert("An error occurred while updating the ticket."); 
    }
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
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "20px",
          color: "#f5c518",
          fontWeight: "bold",
        }}
      >
        Edit Ticket
      </h1>
      <div style={{ marginBottom: "30px" }}>
        {/* Name Input Field */}
        <label
          htmlFor="name"
          style={{
            display: "block",
            marginBottom: "5px",
            fontWeight: "bold",
          }}
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{
            width: "100%", // Full-width input for better usability.
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #333", 
            borderRadius: "5px",
            backgroundColor: "#1c1c1c", // Input field background.
            color: "#f5f5f5", // Input text color.
            fontSize: "1rem",
          }}
        />

        {/* Seat Input Field */}
        <label
          htmlFor="seat"
          style={{
            display: "block",
            marginBottom: "5px",
            fontWeight: "bold",
          }}
        >
          Seat
        </label>
        <input
          type="text"
          id="seat"
          value={formData.seat}
          onChange={(e) => setFormData({ ...formData, seat: e.target.value })}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #333",
            borderRadius: "5px",
            backgroundColor: "#1c1c1c",
            color: "#f5f5f5",
            fontSize: "1rem",
          }}
        />

        {/* Type Dropdown Field */}
        <label
          htmlFor="type"
          style={{
            display: "block",
            marginBottom: "5px",
            fontWeight: "bold",
          }}
        >
          Type
        </label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #333",
            borderRadius: "5px",
            backgroundColor: "#1c1c1c",
            color: "#f5f5f5",
            fontSize: "1rem",
          }}
        >
          <option value="">Select Type</option>
          <option value="Adult">Adult</option>
          <option value="Young">Young</option>
          <option value="Senior">Senior</option>
        </select>

        {/* Time Dropdown Field */}
        <label
          htmlFor="time"
          style={{
            display: "block",
            marginBottom: "5px",
            fontWeight: "bold",
          }}
        >
          Time
        </label>
        <select
          id="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #333",
            borderRadius: "5px",
            backgroundColor: "#1c1c1c",
            color: "#f5f5f5",
            fontSize: "1rem",
          }}
        >
          <option value="">Select Time</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="1:00 PM">1:00 PM</option>
          <option value="4:00 PM">4:00 PM</option>
          <option value="7:00 PM">7:00 PM</option>
          <option value="10:00 PM">10:00 PM</option>
        </select>

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: "#f5c518", // Highlighted color for the button.
            color: "#121212",
            fontSize: "1.2rem",
            fontWeight: "bold",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Edit;
