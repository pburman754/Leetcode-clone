import express from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { dbGet, dbAll } from '../db/database';

const router = express.Router();

// Get current user (protected)
router.get('/me', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const user: any = await dbGet(
      'SELECT id, username, email, points, created_at FROM users WHERE id = ?',
      [req.userId]
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const solvedProblems = await dbAll(
      'SELECT problem_id, solved_at FROM solved_problems WHERE user_id = ? ORDER BY solved_at DESC',
      [req.userId]
    );

    const recentSubmissions = await dbAll(
      `SELECT s.id, s.problem_id, s.status, s.runtime, s.submitted_at, s.language
       FROM submissions s
       WHERE s.user_id = ?
       ORDER BY s.submitted_at DESC
       LIMIT 10`,
      [req.userId]
    );

    res.json({
      ...user,
      solvedProblems: solvedProblems.map((sp: any) => sp.problem_id),
      solvedCount: solvedProblems.length,
      recentSubmissions
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await dbAll(
      `SELECT 
        u.id, 
        u.username, 
        u.points,
        COUNT(DISTINCT sp.problem_id) as solved_count
       FROM users u
       LEFT JOIN solved_problems sp ON u.id = sp.user_id
       GROUP BY u.id
       ORDER BY u.points DESC, solved_count DESC
       LIMIT 100`
    );
    res.json(leaderboard);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile by username
router.get('/:username', async (req, res) => {
  try {
    const user: any = await dbGet(
      'SELECT id, username, points, created_at FROM users WHERE username = ?',
      [req.params.username]
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const solvedProblems = await dbAll(
      'SELECT problem_id, solved_at FROM solved_problems WHERE user_id = ?',
      [user.id]
    );

    res.json({
      ...user,
      solvedCount: solvedProblems.length,
      solvedProblems: solvedProblems.map((sp: any) => sp.problem_id)
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;