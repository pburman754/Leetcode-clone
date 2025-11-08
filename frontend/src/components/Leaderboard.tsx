import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import './Leaderboard.css';

interface LeaderboardUser {
  id: number;
  username: string;
  points: number;
  solved_count: number;
}

export const Leaderboard = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await api.getLeaderboard();
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-header">
        <h1>🏆 Leaderboard</h1>
        <p>Top performers ranked by points and problems solved</p>
      </div>

      <div className="leaderboard-container">
        {users.length === 0 ? (
          <div className="no-users">No users yet. Be the first to solve problems!</div>
        ) : (
          <div className="leaderboard-list">
            {users.map((user, index) => (
              <div
                key={user.id}
                className={`leaderboard-item rank-${index + 1}`}
                onClick={() => navigate(`/user/${user.username}`)}
              >
                <div className="rank">
                  {getMedalEmoji(index + 1)}
                </div>
                
                <div className="user-details">
                  <div className="username">{user.username}</div>
                  <div className="user-stats">
                    <span className="stat">
                      <span className="stat-label">Solved:</span>
                      <span className="stat-value">{user.solved_count}</span>
                    </span>
                  </div>
                </div>

                <div className="points">
                  <span className="points-value">{user.points}</span>
                  <span className="points-label">points</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};