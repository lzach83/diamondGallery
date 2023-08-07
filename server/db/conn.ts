import { MongoClient, Db } from "mongodb";

const connectionString = process.env.MONGO_URL || "mongodb://localhost:27017";

let client: MongoClient;
let db: Db;

async function connectToDatabase() {
  try {
    client = await MongoClient.connect(connectionString);
    db = client.db("diamondGallery");
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with a non-zero code to indicate failure
  }
}

connectToDatabase();

export { client, db };
