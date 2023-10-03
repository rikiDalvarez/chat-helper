import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../.env") });
//console.log(path.resolve(process.cwd(), ".env") )

// Interface to load env variables

interface ENV {
  NODE_ENV: string | undefined;
  DATABASE_ENV: string | undefined;
  PORT: number | undefined;
  MONGO_URI: string | undefined;
  DATABASE: string | undefined;
  TEST_DATABASE: string | undefined;
  JWT_SECRET: string | undefined;
  GOOGLE_CLIENT_ID: string | undefined;
  GOOGLE_SECRET_ID: string | undefined;
  GOOGLE_OAUTH_REDIRECT_URL: string | undefined;
}

interface Config {
  NODE_ENV: string;
  DATABASE_ENV: string;
  PORT: number;
  MONGO_URI: string;
  DATABASE: string;
  TEST_DATABASE: string;
  JWT_SECRET: string;
  GOOGLE_CLIENT_ID: string | undefined;
  GOOGLE_SECRET_ID: string | undefined;
  GOOGLE_OAUTH_REDIRECT_URL: string | undefined;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    // MONGO_URI_TEST: process.env.MONGO_URI_TEST,
    DATABASE: process.env.DATABASE,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_ENV: process.env.DATABASE_ENV,
    TEST_DATABASE: process.env.TEST_DATABASE,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET_ID: process.env.GOOGLE_SECRET_ID,
    GOOGLE_OAUTH_REDIRECT_URL: process.env.GOOGLE_OAUTH_REDIRECT_URL
  };
};
    
    const getSanitizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
