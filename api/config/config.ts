import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  secretKey: string;
  databaseUrl: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  secretKey: process.env.SECRET_KEY || "izzyjosh",
  databaseUrl: process.env.DATABASE_URL || ""
};

export default config;
