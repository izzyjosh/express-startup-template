import { Response } from 'express';

interface SendResponseOptions<T> {
  res: Response;
  statusCode: number;
  message: string;
  data?: T;
}

export const successResponse = <T>({
  res,
  statusCode,
  message,
  data
}: SendResponseOptions<T>): void => {
  const responseBody: {
    statusCode: number;
    success: boolean;
    message: string;
    data?: T;
  } = {
    statusCode,
    success: true,
    message
  };

  if (data !== undefined && data !== null) {
    responseBody.data = data;
  }

  res.status(statusCode).json(responseBody);
};