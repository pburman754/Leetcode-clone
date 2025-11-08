import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/api';
import './Profile.css';

export const Profile = () => {
  const { user } = useAuth();
  const [problems, setProblems] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const res = await api.getProblems();
      setProblems(res.data);
    } catch (error) {
      console.error('Error fetching problems:', error);
    }
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const solvedProblems = problems.filter(p => user.solvedProblems?.includes(p.id));
  const easyCount = solvedProblems.filter(p => p.difficulty === 'Easy').length;
  const mediumCount = solvedProblems.filter(p => p.difficulty === 'Medium').length;
  const hardCount = solvedProblems.filter(p => p.difficulty === 'Hard').length;

  const totalEasy = problems.filter(p => p.difficulty === 'Easy').length;
  const totalMedium = problems.filter(p => p.difficulty === 'Medium').length;
  const totalHard = problems.filter(p => p.difficulty === 'Hard').length;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h1>{user.username}</h1>
          <p className="profile-email">{user.email}</p>
          <div className="profile-points">⭐ {user.points} points</div>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card-large">
          <div className="stat-title">Problems Solved</div>
          <div className="stat-number-large">{user.solvedCount || 0}</div>
          <div className="stat-subtitle">out of {problems.length}</div>
        </div>

        <div className="difficulty-breakdown">
          <div className="breakdown-item easy">
            <div className="breakdown-header">
              <span>Easy</span>
              <span>{easyCount}/{totalEasy}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill easy"
                style={{ width: `${(easyCount / totalEasy) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="breakdown-item medium">
            <div className="breakdown-header">
              <span>Medium</span>
              <span>{mediumCount}/{totalMedium}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill medium"
                style={{ width: `${(mediumCount / totalMedium) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="breakdown-item hard">
            <div className="breakdown-header">
              <span>Hard</span>
              <span>{hardCount}/{totalHard}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill hard"
                style={{ width: `${(hardCount / totalHard) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="solved-problems-section">
        <h2>Recently Solved Problems</h2>
        
        {solvedProblems.length === 0 ? (
          <div className="no-solved">
            <p>You haven't solved any problems yet.</p>
            <button onClick={() => navigate('/')} className="start-solving-btn">
              Start Solving
            </button>
          </div>
        ) : (
          <div className="solved-problems-list">
            {solvedProblems.slice(0, 10).map((problem) => (
              <div
                key={problem.id}
                className="solved-problem-item"
                onClick={() => navigate(`/problem/${problem.id}`)}
              >
                <div className="problem-title">
                  <span className="check-mark">✅</span>
                  {problem.id}. {problem.title}
                </div>
                <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
                  {problem.difficulty}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {(user as any).recentSubmissions && (user as any).recentSubmissions?.length > 0 && (
        <div className="recent-submissions-section">
          <h2>Recent Submissions</h2>
          <div className="submissions-grid">
            {(user as any).recentSubmissions?.map((sub: any) => {
              const problem = problems.find(p => p.id === sub.problem_id);
              return (
                <div key={sub.id} className={`submission-card ${sub.status.toLowerCase().replace(' ', '-')}`}>
                  <div className="submission-problem">
                    {problem?.title || `Problem #${sub.problem_id}`}
                  </div>
                  <div className="submission-details">
                    <span className="submission-status">{sub.status}</span>
                    <span className="submission-lang">{sub.language}</span>
                    {sub.runtime && <span>{sub.runtime}ms</span>}
                  </div>
                  <div className="submission-time">
                    {new Date(sub.submitted_at).toLocaleDateString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};