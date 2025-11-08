import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="main-header">
      <div className="header-content">
        <Link to="/" className="logo">
          🧑‍💻 LeetCode Clone
        </Link>

        <nav className="nav-links">
          <Link to="/">Problems</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          {user && <Link to="/profile">Profile</Link>}
        </nav>

        <div className="header-right">
          {user ? (
            <>
              <div className="user-info-header">
                <span className="username">{user.username}</span>
                <span className="points">⭐ {user.points}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="login-link">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};