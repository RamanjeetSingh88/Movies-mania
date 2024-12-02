// Importing the MongoDB client promise for database connections.
// This ensures we use a shared, reusable MongoDB connection throughout the application.
const clientPromise = require("../../../lib/mongodb");

// Importing ObjectId from the MongoDB library for working with MongoDB document IDs.
const { ObjectId } = require("mongodb");

// API route handler to manage CRUD operations for tickets.
export default async function handler(req, res) {
  const { id } = req.query; // Extracting the ticket ID from the query parameters.

  // Ensure MongoDB client is connected before proceeding.
  let client;
  try {
    client = await clientPromise; // Await the MongoDB connection promise.
  } catch (error) {
    console.error("Error connecting to MongoDB:", error); // Log connection errors for debugging.
    return res
      .status(500)
      .json({ success: false, error: "Database connection failed." }); // Respond with a 500 status if the connection fails.
  }

  const db = client.db("movies"); // Accessing the "movies" database.

  // Validate the provided ID to ensure it's a valid ObjectId.
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, error: "Invalid ticket ID." }); // Respond with a 400 status if the ID is invalid.
  }

  if (req.method === "DELETE") {
    // Handle DELETE requests to remove a ticket.
    try {
      const result = await db
        .collection("tickets")
        .deleteOne({ _id: new ObjectId(id) }); // Attempt to delete the ticket with the specified ID.
      if (result.deletedCount === 0) {
        // Check if the ticket was found and deleted.
        return res
          .status(404)
          .json({ success: false, error: "Ticket not found." }); // Respond with a 404 if no ticket was found.
      }

      // Respond with success if the ticket was deleted.
      return res
        .status(200)
        .json({ success: true, message: "Ticket deleted successfully.", data: result });
    } catch (error) {
      console.error("Error deleting ticket:", error); // Log errors during deletion.
      return res.status(500).json({ success: false, error: "Failed to delete ticket." }); // Respond with a 500 status for unexpected errors.
    }
  } else if (req.method === "PUT") {
    // Handle PUT requests to update a ticket.
    try {
      const { name, seat, type, time } = req.body; // Extract fields from the request body.

      // Validate the provided fields to ensure they meet the expected criteria.
      if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ success: false, error: "Invalid name provided." });
      }
      if (!seat || typeof seat !== "string" || seat.trim() === "") {
        return res.status(400).json({ success: false, error: "Invalid seat provided." });
      }
      if (!type || !["Adult", "Young", "Senior"].includes(type)) {
        return res.status(400).json({ success: false, error: "Invalid type provided." });
      }
      if (!time || typeof time !== "string" || time.trim() === "") {
        return res.status(400).json({ success: false, error: "Invalid time provided." });
      }

      // Attempt to update the ticket in the database.
      const result = await db.collection("tickets").updateOne(
        { _id: new ObjectId(id) }, // Match the ticket by ID.
        { $set: { name, seat, type, time } } // Update the ticket's fields.
      );

      if (result.matchedCount === 0) {
        // Check if the ticket was found for updating.
        return res
          .status(404)
          .json({ success: false, error: "Ticket not found." }); // Respond with a 404 if no ticket was found.
      }

      // Respond with success if the ticket was updated.
      return res
        .status(200)
        .json({ success: true, message: "Ticket updated successfully.", data: result });
    } catch (error) {
      console.error("Error updating ticket:", error); // Log errors during the update.
      return res.status(500).json({ success: false, error: "Failed to update ticket." }); // Respond with a 500 status for unexpected errors.
    }
  } else {
    // Respond with a 405 status for unsupported HTTP methods.
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }
}
