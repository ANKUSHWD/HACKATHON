import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';
import { LogOut, User, Settings, ChevronDown } from 'lucide-react';

export default function Navbar({ transparent = false }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
  };

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 32px',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: transparent ? 'transparent' : 'rgba(7,7,20,0.8)',
        backdropFilter: transparent ? 'none' : 'blur(20px)',
        borderBottom: transparent ? 'none' : '1px solid rgba(255,255,255,0.06)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img 
          src="/optihere.png" 
          alt="OptiHire Logo" 
          style={{ 
            width: 36, 
            height: 36, 
            borderRadius: 10,
            objectFit: 'cover'
          }} 
        />
        <span style={{ fontSize: 20, fontWeight: 800, color: '#f0f0ff' }}>
          Opti<span style={{ background: 'linear-gradient(135deg,#4f7dff,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Hire</span>
        </span>
      </Link>

      {/* Center Navigation */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        position: 'relative'
      }}>
        <Link 
          to="/home" 
          style={{
            padding: '8px 16px',
            color: '#c0c0e0',
            textDecoration: 'none',
            fontSize: 15,
            fontWeight: 500,
            borderRadius: 10,
            transition: 'all 0.3s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#f0f0ff';
            e.currentTarget.style.background = 'rgba(79,125,255,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#c0c0e0';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          Home
        </Link>
        <Link 
          to="/about" 
          style={{
            padding: '8px 16px',
            color: '#c0c0e0',
            textDecoration: 'none',
            fontSize: 15,
            fontWeight: 500,
            borderRadius: 10,
            transition: 'all 0.3s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#f0f0ff';
            e.currentTarget.style.background = 'rgba(79,125,255,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#c0c0e0';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          About
        </Link>
        <Link 
          to="/qa" 
          style={{
            padding: '8px 16px',
            color: '#c0c0e0',
            textDecoration: 'none',
            fontSize: 15,
            fontWeight: 500,
            borderRadius: 10,
            transition: 'all 0.3s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#f0f0ff';
            e.currentTarget.style.background = 'rgba(79,125,255,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#c0c0e0';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          Q&A
        </Link>
        <Link 
          to="/support" 
          style={{
            padding: '8px 16px',
            color: '#c0c0e0',
            textDecoration: 'none',
            fontSize: 15,
            fontWeight: 500,
            borderRadius: 10,
            transition: 'all 0.3s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#f0f0ff';
            e.currentTarget.style.background = 'rgba(79,125,255,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#c0c0e0';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          Support
        </Link>
      </nav>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <NotificationBell />
            <div style={{ position: 'relative' }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 16px',
                background: 'rgba(79,125,255,0.1)',
                border: '1px solid rgba(79,125,255,0.2)',
                borderRadius: 10, cursor: 'pointer',
                color: '#f0f0ff', fontSize: 14, fontWeight: 500,
                transition: 'all 0.2s',
              }}
            >
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: 'linear-gradient(135deg,#4f7dff,#a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: 'white',
              }}>
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <span>{user.name || 'User'}</span>
              <ChevronDown size={14} style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div style={{
                position: 'absolute', top: '110%', right: 0, minWidth: 180,
                background: 'rgba(13,13,43,0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                animation: 'fadeIn 0.2s ease',
              }}>
                <button onClick={() => { navigate('/dashboard'); setDropdownOpen(false); }} className="dropdown-item">
                  <User size={15} /> Profile
                </button>
                <button onClick={() => { navigate('/dashboard'); setDropdownOpen(false); }} className="dropdown-item">
                  <Settings size={15} /> Settings
                </button>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
                <button onClick={handleLogout} className="dropdown-item" style={{ color: '#ef4444' }}>
                  <LogOut size={15} /> Logout
                </button>
              </div>
            )}
          </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/auth" style={{
              padding: '8px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600,
              color: '#f0f0ff', textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.2s',
            }}>Login</Link>
            <Link to="/auth?mode=signup" style={{
              padding: '8px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600,
              background: 'linear-gradient(135deg,#4f7dff,#a855f7)',
              color: 'white', textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(79,125,255,0.3)',
            }}>Sign Up</Link>
          </div>
        )}
      </div>

      <style>{`
        .dropdown-item {
          display: flex; align-items: center; gap: 10px;
          width: 100%; padding: 10px 16px;
          background: none; border: none; cursor: pointer;
          color: #c0c0e0; font-size: 14px; font-weight: 500;
          text-align: left; transition: all 0.2s;
        }
        .dropdown-item:hover { background: rgba(79,125,255,0.1); color: #f0f0ff; }
      `}</style>
    </nav>
  );
}
