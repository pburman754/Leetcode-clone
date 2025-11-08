import express from 'express';
import { problems } from '../data/problems';
import { executeCode } from '../controllers/codeExecutor';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { dbGet, dbRun } from '../db/database';

const router = express.Router();

// Get all problems
router.get('/', (req, res) => {
  const problemList = problems.map(p => ({
    id: p.id,
    title: p.title,
    difficulty: p.difficulty,
    category: p.category,
  }));
  res.json(problemList);
});

// Get a single problem by id
router.get('/:id', (req, res) => {
  const problem = problems.find(p => p.id === parseInt(req.params.id));
  if (problem) {
    res.json(problem);
  } else {
    res.status(404).json({ error: 'Problem not found' });
  }
});

// Submit a solution (protected)
router.post('/:id/submit', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { code, language } = req.body;
    const problem = problems.find(p => p.id === parseInt(req.params.id));

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    const { success, results, error } = executeCode(
      code,
      problem.testCases,
      language,
      problem.functionName
    );

    // Save submission
    await dbRun(
      `INSERT INTO submissions (user_id, problem_id, code, language, status, runtime)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        req.userId,
        problem.id,
        code,
        language,
        success ? 'Accepted' : 'Wrong Answer',
        // In a real app, you'd measure runtime
        success ? Math.floor(Math.random() * 100) + 50 : null 
      ]
    );

    if (success) {
      // Check if already solved
      const alreadySolved = await dbGet(
        'SELECT id FROM solved_problems WHERE user_id = ? AND problem_id = ?',
        [req.userId, problem.id]
      );

      if (!alreadySolved) {
        // Add to solved_problems
        await dbRun(
          'INSERT INTO solved_problems (user_id, problem_id) VALUES (?, ?)',
          [req.userId, problem.id]
        );
        
        // Update user points
        const points = problem.difficulty === 'Easy' ? 10 : problem.difficulty === 'Medium' ? 20 : 30;
        await dbRun(
          'UPDATE users SET points = points + ? WHERE id = ?',
          [points, req.userId]
        );
      }
    }

    if (error) {
      return res.status(400).json({ success: false, error, results });
    }
    
    res.json({ success, results });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get submissions for a problem (protected)
router.get('/:id/submissions', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const submissions = await dbAll(
      'SELECT * FROM submissions WHERE user_id = ? AND problem_id = ? ORDER BY submitted_at DESC',
      [req.userId, req.params.id]
    );
    res.json(submissions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get note (protected)
router.get('/:id/note', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const note = await dbGet(
      'SELECT content FROM notes WHERE user_id = ? AND problem_id = ?',
      [req.userId, req.params.id]
    );
    res.json(note || { content: '' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Save note (protected)
router.post('/:id/note', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { content } = req.body;
    
    // Check if note exists
    const existingNote: any = await dbGet(
      'SELECT id FROM notes WHERE user_id = ? AND problem_id = ?',
      [req.userId, req.params.id]
    );

    if (existingNote) {
      // Update existing note
      await dbRun(
        'UPDATE notes SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ? AND problem_id = ?',
        [content, req.userId, req.params.id]
      );
    } else {
      // Insert new note
      await dbRun(
        'INSERT INTO notes (user_id, problem_id, content) VALUES (?, ?, ?)',
        [req.userId, req.params.id, content]
      );
    }
    
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
