process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
process.env.APP_ENV = process.env.APP_ENV || 'dev';
process.env.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || '';
process.env.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '';

import dotenv from 'dotenv';
import express from 'express';

dotenv.config({ path: `${__dirname}/config/${process.env.APP_ENV}.env`});

const app: express.Application = express();

export { app };