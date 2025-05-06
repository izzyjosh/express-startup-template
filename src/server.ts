import { app } from "./app";
import { connectToDatabase } from "./databases/mongoDB";
import config from "./config/config";
import serverless from "serverless-http";

const startServer = async () => {
  await connectToDatabase();
  
  
const handler = serverless(app);

// Export the handler for Vercel serverless function
export default (req, res) => {
  return handler(req, res);
};
  // app.listen(config.port, () => {
//     console.log(`Server running on port ${config.port}`);
//   });
};

startServer();
