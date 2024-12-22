import { MongoClient } from "mongodb";

// connects to cluster
const MONGO_URI = "mongodb+srv://janhvihalder:Krishna8$@janhviscluster.2h5yi.mongodb.net/?retryWrites=true&w=majority&appName=janhviscluster"; 
//  Add this in .env.local
const MONGO_DB = "db1"  // Database name

// if (!MONGO_URI || !MONGO_DB) {
//   throw new Error("Please define the MONGO_URI and MONGO_DB environment variables in .env.local");
// }

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(MONGO_DB);
  return { client, db };
}