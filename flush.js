import { MongoClient } from "mongodb";
import 'dotenv/config';

const uri = process.env.MONGODB_URI; // your Atlas connection string
if (!uri) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables");
}

const client = new MongoClient(uri);

async function flushDatabase() {
  try {
    await client.connect();
    const db = client.db(); // default DB from URI

    // Drop all collections
    const collections = await db.collections();
    for (const collection of collections) {
      console.log(`Dropping collection: ${collection.collectionName}`);
      await collection.drop();
    }

    console.log("✅ Database flushed. All collections dropped.");
  } catch (error) {
    console.error("❌ Error flushing database:", error);
  } finally {
    await client.close();
  }
}

flushDatabase();