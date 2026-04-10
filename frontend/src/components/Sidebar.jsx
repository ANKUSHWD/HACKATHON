import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
  LayoutDashboard, User, Building2, Brain, Settings,
  LogOut, Zap, ChevronRight, Trophy, Target, Bot, GitBranch
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', tab: 'dashboard', section: 'main' },
  { icon: User, label: 'Profile', tab: 'profile', section: 'main' },
  { icon: Building2, label: 'Companies', tab: 'companies', section: 'main' },
  { icon: GitBranch, label: 'My Journey', tab: 'journey', section: 'main' },
  { icon: Brain, label: 'AI Prep', tab: 'interview', section: 'main', route: '/interview' },
  { icon: Target, label: 'Daily Tasks', tab: 'tasks', section: 'main' },
  { icon: Bot, label: 'Agent Logs', tab: 'agent', section: 'extra', badge: true },
  { icon: Trophy, label: 'Leaderboard', tab: 'leaderboard', section: 'extra' },
  { icon: Settings, label: 'Settings', tab: 'settings', section: 'extra' },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { agentLogs, agentRunning } = useData();

  const handleNav = (item) => {
    if (item.route) {
      navigate(item.route);
    } else {
      setActiveTab(item.tab);
    }
  };

  const unreadAgentCount = agentLogs.filter(l => l.severity === 'critical' || l.severity === 'warning').length;

  return (
    <div style={{
      width: 260, minHeight: '100vh',
      background: 'rgba(255,255,255,0.02)',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', flexDirection: 'column',
      padding: '80px 16px 24px',
      position: 'sticky', top: 0,
      backdropFilter: 'blur(20px)',
    }}>
      {/* User Info */}
      <div style={{
        padding: '16px',
        background: 'rgba(79,125,255,0.08)',
        border: '1px solid rgba(79,125,255,0.15)',
        borderRadius: 14, marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'linear-gradient(135deg,#4f7dff,#a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 700, color: 'white', flexShrink: 0,
          }}>
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f0ff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name || 'Student'}
            </div>
            <div style={{ fontSize: 12, color: '#6666aa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.email || ''}
            </div>
          </div>
        </div>
      </div>

      {/* Agent Status Indicator */}
      <div style={{
        padding: '10px 14px', borderRadius: 10, marginBottom: 16,
        background: agentRunning ? 'rgba(34,197,94,0.06)' : 'rgba(79,125,255,0.05)',
        border: `1px solid ${agentRunning ? 'rgba(34,197,94,0.15)' : 'rgba(79,125,255,0.1)'}`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: agentRunning ? '#22c55e' : '#4f7dff',
          animation: agentRunning ? 'agentPulse 1s ease infinite' : 'agentPulse 3s ease infinite',
        }} />
        <span style={{ fontSize: 11, fontWeight: 600, color: agentRunning ? '#22c55e' : '#7fa8ff' }}>
          {agentRunning ? '🤖 Agent Processing...' : '🤖 Agent Watching'}
        </span>
      </div>

      {/* Main Nav */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#444466', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '0 8px', marginBottom: 8 }}>
          Main Menu
        </div>
        {navItems.filter(i => i.section === 'main').map(item => (
          <NavItem key={item.label} item={item} active={activeTab === item.tab} onClick={() => handleNav(item)} />
        ))}
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '12px 0' }} />

      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#444466', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '0 8px', marginBottom: 8 }}>
          AI & More
        </div>
        {navItems.filter(i => i.section === 'extra').map(item => (
          <NavItem
            key={item.label} item={item}
            active={activeTab === item.tab}
            onClick={() => handleNav(item)}
            badgeCount={item.badge ? unreadAgentCount : 0}
          />
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* Logout */}
      <button
        onClick={() => { logout(); navigate('/'); }}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '11px 14px', borderRadius: 10,
          background: 'none', border: '1px solid rgba(239,68,68,0.15)',
          color: '#ef4444', cursor: 'pointer', fontSize: 14, fontWeight: 500,
          transition: 'all 0.2s', width: '100%',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}
      >
        <LogOut size={16} /> Logout
      </button>

      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <Zap size={12} color="#4f7dff" fill="#4f7dff" />
          <span style={{ fontSize: 11, color: '#333355', fontWeight: 600 }}>OptiHire AI v2.0 — Agentic</span>
        </div>
      </div>

      <style>{`
        @keyframes agentPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

function NavItem({ item, active, onClick, badgeCount = 0 }) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 14px', borderRadius: 10, width: '100%',
        background: active ? 'rgba(79,125,255,0.15)' : 'none',
        border: active ? '1px solid rgba(79,125,255,0.25)' : '1px solid transparent',
        color: active ? '#7fa8ff' : '#6666aa',
        cursor: 'pointer', fontSize: 14, fontWeight: 500,
        textAlign: 'left', transition: 'all 0.2s', marginBottom: 2,
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#b0b0d0'; }}}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#6666aa'; }}}
    >
      <Icon size={17} />
      <span style={{ flex: 1 }}>{item.label}</span>
      {badgeCount > 0 && (
        <span style={{
          width: 20, height: 20, borderRadius: '50%', fontSize: 10, fontWeight: 800,
          background: '#ef4444', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {badgeCount}
        </span>
      )}
      {active && <ChevronRight size={14} />}
    </button>
  );
}
