import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { Zap, Mail, Lock, User, ArrowRight, Eye, EyeOff, Shield } from 'lucide-react';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState(searchParams.get('mode') === 'signup' ? 'signup' : 'login');
  const [role, setRole] = useState('student'); // 'student' or 'admin'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Logout current user before switching accounts
    logout();

    setTimeout(() => {
      if (mode === 'signup') {
        if (!form.name || !form.email || !form.password) {
          setError('Please fill all fields');
          setLoading(false);
          return;
        }
        const user = signup(form);
        navigate('/onboarding');
      } else {
        if (!form.email || !form.password) {
          setError('Please fill all fields');
          setLoading(false);
          return;
        }
        const result = login(form.email, form.password);
        if (result.success) {
          if (result.user.isAdmin) navigate('/admin');
          else if (result.user.onboardingComplete) navigate('/dashboard');
          else navigate('/onboarding');
        } else {
          setError('Invalid credentials. Try signing up first!');
        }
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <Navbar />

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', padding: '100px 20px 40px',
      }}>
        <div style={{
          width: '100%', maxWidth: 440,
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24, padding: '48px 40px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
          position: 'relative', zIndex: 1,
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16, margin: '0 auto 16px',
              background: 'linear-gradient(135deg,#4f7dff,#a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 30px rgba(79,125,255,0.4)',
            }}>
              <Zap size={28} color="white" fill="white" />
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: '#f0f0ff', marginBottom: 6 }}>
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p style={{ fontSize: 14, color: '#6666aa' }}>
              {role === 'admin'
                ? (mode === 'login' ? 'TPC Admin command center' : 'Register as TPC admin')
                : (mode === 'login' ? 'Sign in to your dashboard' : 'Start your placement journey')}
            </p>
          </div>

          {/* Role Toggle */}
          <div style={{
            display: 'flex', background: 'rgba(255,255,255,0.04)',
            borderRadius: 12, padding: 4, marginBottom: 16,
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            {['student', 'admin'].map(r => (
              <button key={r} onClick={() => setRole(r)}
                style={{
                  flex: 1, padding: '10px', borderRadius: 10, fontSize: 13, fontWeight: 600,
                  background: role === r ? (r === 'admin' ? 'rgba(168,85,247,0.2)' : 'rgba(79,125,255,0.2)') : 'none',
                  border: role === r ? `1px solid ${r === 'admin' ? 'rgba(168,85,247,0.3)' : 'rgba(79,125,255,0.3)'}` : '1px solid transparent',
                  color: role === r ? (r === 'admin' ? '#c084fc' : '#7fa8ff') : '#6666aa',
                  cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}
              >
                {r === 'admin' ? <><Shield size={14} /> TPC Admin</> : <><User size={14} /> Student</>}
              </button>
            ))}
          </div>

          {/* Tab toggle */}
          <div style={{
            display: 'flex', background: 'rgba(255,255,255,0.04)',
            borderRadius: 12, padding: 4, marginBottom: 32,
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            {['login', 'signup'].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); }}
                style={{
                  flex: 1, padding: '10px', borderRadius: 10, fontSize: 14, fontWeight: 600,
                  background: mode === m ? 'rgba(79,125,255,0.2)' : 'none',
                  border: mode === m ? '1px solid rgba(79,125,255,0.3)' : '1px solid transparent',
                  color: mode === m ? '#7fa8ff' : '#6666aa',
                  cursor: 'pointer', transition: 'all 0.2s',
                  textTransform: 'capitalize',
                }}
              >
                {m === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div style={{
              padding: '10px 14px', borderRadius: 10, marginBottom: 20,
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
              fontSize: 13, color: '#fca5a5',
            }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {mode === 'signup' && (
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#8888bb', marginBottom: 6, display: 'block' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="#6666aa" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    className="input-field"
                    style={{ paddingLeft: 40 }}
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#8888bb', marginBottom: 6, display: 'block' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#6666aa" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  className="input-field"
                  style={{ paddingLeft: 40 }}
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#8888bb', marginBottom: 6, display: 'block' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#6666aa" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  className="input-field"
                  style={{ paddingLeft: 40, paddingRight: 40 }}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 0 }}>
                  {showPassword ? <EyeOff size={16} color="#6666aa" /> : <Eye size={16} color="#6666aa" />}
                </button>
              </div>
            </div>

            {/* Demo hint */}
            {mode === 'login' && role === 'admin' && (
              <div style={{
                padding: '10px 14px', borderRadius: 10, fontSize: 12, color: '#c084fc',
                background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.15)',
              }}>
                <div style={{ fontWeight: 700, marginBottom: 2 }}>🛡️ TPC Admin Credentials</div>
                <div style={{ color: '#8888bb' }}>
                  Email: <strong style={{ color: '#c084fc' }}>admin@optihire.com</strong> · Password: <strong style={{ color: '#c084fc' }}>admin123</strong>
                </div>
              </div>
            )}
            {mode === 'login' && role === 'student' && (
              <div style={{
                padding: '8px 12px', borderRadius: 8, fontSize: 12, color: '#6666aa',
                background: 'rgba(79,125,255,0.05)', border: '1px solid rgba(79,125,255,0.1)',
              }}>
                💡 Sign up first, then log in with your credentials.
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '14px', borderRadius: 12, fontSize: 15, fontWeight: 700,
                background: loading ? 'rgba(79,125,255,0.5)' : 'linear-gradient(135deg,#4f7dff,#a855f7)',
                border: 'none', color: 'white', cursor: loading ? 'wait' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: '0 6px 25px rgba(79,125,255,0.35)',
                transition: 'all 0.2s', marginTop: 8,
              }}
            >
              {loading ? (
                <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
              ) : (
                <>{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={16} /></>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
