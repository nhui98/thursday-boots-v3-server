import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import userRouter from "./routes/user.route";
import connect from "./utils/connect";
import log from "./utils/logger";

const app: Express = express();

//* Middleware
app.use(express.json());

//* Routes
app.use("/api/user", userRouter);

//* Start Server and Connect to DB
const PORT = process.env.PORT || 1337;
app.listen(PORT, async () => {
  log.info(`server running on port ${PORT}`);
  await connect();
});
