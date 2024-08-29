import { EnvConfig } from '../configs/env.config';
import mongoose from 'mongoose';

// Environment
const env: EnvConfig = new EnvConfig();
// Mongo DB connection
const mongooseDbConnection = async () => {
  mongoose
    .connect(env.get('dbUri'), {
      user: env.get('dbUser'),
      pass: env.get('dbPass'),
      dbName: env.get('dbName'),
      retryReads: true,
      retryWrites: true,
      authMechanism: 'DEFAULT',
    })
    .then(() => {
      console.log('MongoDB connected successfully!');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });
};
// Export
export { mongooseDbConnection };
