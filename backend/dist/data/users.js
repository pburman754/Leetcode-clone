"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProgress = exports.getUserById = exports.users = void 0;
// Simple in-memory storage (use database in production)
exports.users = [
    {
        id: 1,
        name: "Guest",
        solvedProblems: [],
        points: 0
    }
];
const getUserById = (id) => {
    return exports.users.find(u => u.id === id);
};
exports.getUserById = getUserById;
const updateUserProgress = (userId, problemId) => {
    const user = (0, exports.getUserById)(userId);
    if (user && !user.solvedProblems.includes(problemId)) {
        user.solvedProblems.push(problemId);
        user.points += 1;
    }
    return user;
};
exports.updateUserProgress = updateUserProgress;
