import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';

import routes from './routes';
import './database';
import uploadConfig from './config/upload';

import appError from './Errors/AppErro';
import { eachWeekOfInterval } from 'date-fns';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directtory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof appError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.log(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server errror',
  });
});

app.listen(3333, () => {
  console.log('Server started on por 3333!');
});
