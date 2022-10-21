import mongoose from "mongoose";
import log from "./logger";

export default async function connect() {
  const MONGO_URI = process.env.MONGO_URI;

  try {
    if (!MONGO_URI) throw new Error("No Mongo URI");

    await mongoose.connect(MONGO_URI);
    log.info("DB Connected");
  } catch (error) {
    log.error("Could not connect to DB");
    process.exit(1);
  }
}
