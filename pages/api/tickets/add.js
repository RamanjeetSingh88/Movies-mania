// Import the MongoDB client promise to establish a database connection.
const clientPromise = require("../../../lib/mongodb");

// Export the API route handler function to process incoming requests.
export default async function handler(req, res) {
  // Check if the request method is POST to handle ticket creation.
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const db = client.db("movies");
      
      
      const { name, seat, type, time } = req.body;
      
      const result = await db.collection("tickets").insertOne({ name, seat, type, time });
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      // Respond with a 500 status and the error message in case of failure.
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    // Respond with a 405 status for unsupported HTTP methods.
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
