import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { useAuth } from '../context/AuthContext';
import type { Problem } from '../types';
import './ProblemList.css';

export const ProblemList = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [search, setSearch] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await api.getProblems();
        setProblems(res.data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const filteredProblems = problems.filter(p => {
    const matchesDifficulty = filter === 'All' || p.difficulty === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#00b8a3';
      case 'Medium': return '#ffc01e';
      case 'Hard': return '#ff375f';
      default: return '#666';
    }
  };

  const stats = {
    total: problems.length,
    easy: problems.filter(p => p.difficulty === 'Easy').length,
    medium: problems.filter(p => p.difficulty === 'Medium').length,
    hard: problems.filter(p => p.difficulty === 'Hard').length,
    solved: user?.solvedCount || 0
  };

  return (
    <div className="problem-list-page">
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-number">{stats.solved}</div>
          <div className="stat-label">Solved</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-card easy">
          <div className="stat-number">{stats.easy}</div>
          <div className="stat-label">Easy</div>
        </div>
        <div className="stat-card medium">
          <div className="stat-number">{stats.medium}</div>
          <div className="stat-label">Medium</div>
        </div>
        <div className="stat-card hard">
          <div className="stat-number">{stats.hard}</div>
          <div className="stat-label">Hard</div>
        </div>
      </div>

      <div className="filters-section">
        <input
          type="text"
          placeholder="🔍 Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        
        <div className="difficulty-filters">
          {(['All', 'Easy', 'Medium', 'Hard'] as const).map(diff => (
            <button
              key={diff}
              className={`filter-btn ${filter === diff ? 'active' : ''}`}
              onClick={() => setFilter(diff)}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      <div className="problems-table">
        <div className="table-header">
          <div className="col-status">Status</div>
          <div className="col-title">Title</div>
          <div className="col-category">Category</div>
          <div className="col-difficulty">Difficulty</div>
        </div>

        {filteredProblems.map((problem) => {
          const isSolved = user?.solvedProblems?.includes(problem.id);
          return (
            <div
              key={problem.id}
              className="table-row"
              onClick={() => navigate(`/problem/${problem.id}`)}
            >
              <div className="col-status">
                {isSolved ? '✅' : '⭕'}
              </div>
              <div className="col-title">
                <span className="problem-number">{problem.id}.</span> {problem.title}
              </div>
              <div className="col-category">
                {problem.category?.slice(0, 2).map((cat, idx) => (
                  <span key={idx} className="category-tag">{cat}</span>
                ))}
              </div>
              <div
                className="col-difficulty"
                style={{ color: getDifficultyColor(problem.difficulty) }}
              >
                {problem.difficulty}
              </div>
            </div>
          );
        })}

        {filteredProblems.length === 0 && (
          <div className="no-results">No problems found</div>
        )}
      </div>
    </div>
  );
};