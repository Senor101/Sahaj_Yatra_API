import { Request, Response } from 'express';

const throwError = (
  req: Request,
  res: Response,
  message: string,
  statusCode: number
) => {
  return res.status(statusCode).json({
    error: message,
  });
};

export default throwError;
