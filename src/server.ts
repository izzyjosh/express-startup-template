import { app } from "./app";
import { connectToDatabase } from "./databases/mongoDB";
import config from "./config/config";

const startServer = async () => {
  await connectToDatabase();

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
};

startServer();
