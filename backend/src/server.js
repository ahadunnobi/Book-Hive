import "dotenv/config";
import { createApp } from "./app.js";
import { connectDb } from "./config/db.js";

const PORT = parseInt(process.env.PORT || "5000", 10);
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("Missing MONGODB_URI in environment.");
  process.exit(1);
}

const app = createApp();

await connectDb(uri);

app.listen(PORT, () => {
  console.log(`BookHive API listening on port ${PORT}`);
});
