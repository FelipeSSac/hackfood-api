/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';

import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import { uploadConfig } from '@config/upload';
import { globalErrorHandling } from './middlewares/globalErrorHandling';
import { routes } from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(globalErrorHandling);
app.use('/files', express.static(uploadConfig.uploadsFolder));

const port = process.env.PORT || 3333;

app.get('/', (_, res) => {
  res.json({ message: 'Hello world!!' });
});

app.listen(port, async () => {
  console.log(`🚀 Server started on port ${port}!`);
});
