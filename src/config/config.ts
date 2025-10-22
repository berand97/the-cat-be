import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('3000').transform(Number),
  HOST: z.string().default('localhost'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  MONGODB_URI: z.string().default('mongodb://localhost:27017/cat-breeds-api'),
  MONGODB_TEST_URI: z.string().default('mongodb://localhost:27017/cat-breeds-api-test'),
  
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  JWT_EXPIRES_IN: z.string().default('24h'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  BCRYPT_SALT_ROUNDS: z.string().default('12').transform(Number),
  
  CAT_API_URL: z.string().url().default('https://api.thecatapi.com/v1'),
  CAT_API_KEY: z.string().optional(),
  
  RATE_LIMIT_WINDOW_MS: z.string().default('900000').transform(Number),
  RATE_LIMIT_MAX_REQUESTS: z.string().default('100').transform(Number),
  
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  LOG_FILE: z.string().default('logs/app.log'),
  
  CORS_ORIGIN: z.string().default('*'),
  CORS_CREDENTIALS: z.string().default('false').transform(val => val === 'true'),
});

const env = envSchema.parse(process.env);

export const config = {
  server: {
    port: env.PORT,
    host: env.HOST,
    nodeEnv: env.NODE_ENV,
  },

  database: {
    uri: env.MONGODB_URI,
    testUri: env.MONGODB_TEST_URI,
  },

  auth: {
    jwt: {
      secret: env.JWT_SECRET,
      expiresIn: env.JWT_EXPIRES_IN,
      refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
    },
    bcrypt: {
      saltRounds: env.BCRYPT_SALT_ROUNDS,
    },
  },

  externalApis: {
    catApi: {
      url: env.CAT_API_URL,
      key: env.CAT_API_KEY,
    },
  },

  security: {
    rateLimit: {
      windowMs: env.RATE_LIMIT_WINDOW_MS,
      maxRequests: env.RATE_LIMIT_MAX_REQUESTS,
    },
    cors: {
      origin: env.CORS_ORIGIN,
      credentials: env.CORS_CREDENTIALS,
    },
  },

  logging: {
    level: env.LOG_LEVEL,
    file: env.LOG_FILE,
  },
};

export default config;