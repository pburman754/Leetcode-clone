"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const problems_1 = require("../data/problems");
const codeExecutor_1 = require("../controllers/codeExecutor");
const users_1 = require("../data/users");
const router = express_1.default.Router();
// Get all problems
router.get('/', (req, res) => {
    const problemsList = problems_1.problems.map(p => ({
        id: p.id,
        title: p.title,
        difficulty: p.difficulty
    }));
    res.json(problemsList);
});
// Get single problem
router.get('/:id', (req, res) => {
    const problem = problems_1.problems.find(p => p.id === parseInt(req.params.id));
    if (!problem) {
        return res.status(404).json({ error: 'Problem not found' });
    }
    res.json(problem);
});
// Submit solution
router.post('/:id/submit', (req, res) => {
    const { code, language, userId = 1 } = req.body;
    const problem = problems_1.problems.find(p => p.id === parseInt(req.params.id));
    if (!problem) {
        return res.status(404).json({ error: 'Problem not found' });
    }
    const executionResult = (0, codeExecutor_1.executeCode)(code, problem.testCases, language, problem.functionName);
    // Update user progress if all tests passed
    let updatedUser;
    if (executionResult.success) {
        updatedUser = (0, users_1.updateUserProgress)(userId, problem.id);
    }
    res.json({
        ...executionResult,
        user: updatedUser
    });
});
exports.default = router;
