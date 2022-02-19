/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import { routes } from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

const port = process.env.PORT || 3333;

app.listen(port, async () => {
  console.log(`🚀 Server started on port ${port}!`);
});
