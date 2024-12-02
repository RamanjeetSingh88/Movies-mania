// Import the MongoDB client promise to establish a connection to the database.
const clientPromise = require("../../../lib/mongodb");

// Define and export the API route handler function to process incoming requests.
export default async function handler(req, res) {
  // Check if the request method is GET to handle retrieving all tickets.
  if (req.method === "GET") {
    try {
      // Await the MongoDB client connection from the shared promise.
      const client = await clientPromise;
      const db = client.db("movies");
      const tickets = await db.collection("tickets").find().toArray();
      res.status(200).json({ success: true, data: tickets });
    } catch (error) {
      // Respond with a 500 status and the error message in case of a server error.
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
