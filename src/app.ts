process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
process.env.APP_ENV = process.env.APP_ENV || 'dev';

import dotenv from 'dotenv';
import express from 'express';

dotenv.config({ path: `${__dirname}/config/${process.env.APP_ENV}.env`});

const app: express.Application = express();

export { app };