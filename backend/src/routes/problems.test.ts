import request from 'supertest';
import express from 'express';
import problemsRouter from './problems';
import { dbAll } from '../db/database';

jest.mock('../db/database', () => ({
  dbGet: jest.fn(),
  dbRun: jest.fn(),
  dbAll: jest.fn(),
}));

import { Request, Response, NextFunction } from 'express';

// Mock the auth middleware
jest.mock('../middleware/auth', () => ({
  authMiddleware: (req: Request, res: Response, next: NextFunction) => {
    (req as any).userId = 1; // Mock user ID
    next();
  },
}));

const app = express();
app.use(express.json());
app.use('/problems', problemsRouter);

describe('GET /problems/:id/submissions', () => {
  it('should return submissions for a problem', async () => {
    const mockSubmissions = [{ id: 1, code: 'console.log("hello")' }];
    (dbAll as jest.Mock).mockResolvedValue(mockSubmissions);

    const response = await request(app).get('/problems/1/submissions');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockSubmissions);
  });

  it('should return a 500 error on database failure', async () => {
    (dbAll as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/problems/1/submissions');
    expect(response.status).toBe(500);
  });
});
