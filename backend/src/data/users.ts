export interface User {
  id: number;
  name: string;
  solvedProblems: number[];
  points: number;
}

// Simple in-memory storage (use database in production)
export const users: User[] = [
  {
    id: 1,
    name: "Guest",
    solvedProblems: [],
    points: 0
  }
];

export const getUserById = (id: number): User | undefined => {
  return users.find(u => u.id === id);
};

export const updateUserProgress = (userId: number, problemId: number): User | undefined => {
  const user = getUserById(userId);
  if (user && !user.solvedProblems.includes(problemId)) {
    user.solvedProblems.push(problemId);
    user.points += 1;
  }
  return user;
};