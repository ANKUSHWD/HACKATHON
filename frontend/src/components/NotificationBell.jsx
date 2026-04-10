/**
 * NotificationBell — Persistent notification dropdown in Navbar
 * Shows agent actions, deadline alerts, opportunities
 */
import { useState, useRef, useEffect } from 'react';
import { Bell, X, Check, Bot, Clock, Target, AlertTriangle } from 'lucide-react';
import { useData } from '../context/DataContext';

const typeConfig = {
  agent: { icon: Bot, color: '#4f7dff', label: 'Agent' },
  deadline: { icon: Clock, color: '#ef4444', label: 'Deadline' },
  opportunity: { icon: Target, color: '#22c55e', label: 'Opportunity' },
  warning: { icon: AlertTriangle, color: '#f59e0b', label: 'Warning' },
};

export default function NotificationBell() {
  const { persistentNotifs, markNotifRead, clearAllNotifs } = useData();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const unreadCount = persistentNotifs.filter(n => !n.read).length;

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const formatTime = (ts) => {
    const d = new Date(ts);
    const now = new Date();
    const diff = Math.floor((now - d) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return d.toLocaleDateString();
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'relative', background: 'none', border: 'none',
          cursor: 'pointer', padding: 8, borderRadius: 10,
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}
      >
        <Bell size={20} color={unreadCount > 0 ? '#f59e0b' : '#6666aa'} />
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute', top: 2, right: 2,
            width: 18, height: 18, borderRadius: '50%',
            background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 800, color: 'white',
            border: '2px solid #0a0a1a',
            animation: 'pulse 2s ease-in-out infinite',
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, marginTop: 8,
          width: 380, maxHeight: 460, overflowY: 'auto',
          background: 'rgba(15,15,30,0.98)', backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          zIndex: 1000,
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#f0f0ff' }}>Notifications</div>
              <div style={{ fontSize: 11, color: '#444466' }}>{unreadCount} unread</div>
            </div>
            {persistentNotifs.length > 0 && (
              <button onClick={clearAllNotifs} style={{
                fontSize: 12, color: '#6666aa', background: 'none', border: 'none',
                cursor: 'pointer', fontWeight: 600,
              }}>
                Clear All
              </button>
            )}
          </div>

          {/* Notifications */}
          {persistentNotifs.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center' }}>
              <Bell size={28} color="#333355" style={{ marginBottom: 8 }} />
              <p style={{ fontSize: 13, color: '#444466' }}>No notifications yet</p>
            </div>
          ) : (
            <div style={{ padding: '8px' }}>
              {persistentNotifs.map(notif => {
                const config = typeConfig[notif.type] || typeConfig.agent;
                const Icon = config.icon;
                return (
                  <div
                    key={notif.id}
                    onClick={() => markNotifRead(notif.id)}
                    style={{
                      display: 'flex', gap: 12, padding: '12px',
                      borderRadius: 10, cursor: 'pointer', marginBottom: 2,
                      background: notif.read ? 'transparent' : 'rgba(79,125,255,0.05)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                    onMouseLeave={e => e.currentTarget.style.background = notif.read ? 'transparent' : 'rgba(79,125,255,0.05)'}
                  >
                    <div style={{
                      width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                      background: `${config.color}15`, border: `1px solid ${config.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={16} color={config.color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 13, color: notif.read ? '#6666aa' : '#c0c0d8',
                        lineHeight: 1.5, fontWeight: notif.read ? 400 : 500,
                      }}>
                        {notif.message}
                      </div>
                      <div style={{ fontSize: 11, color: '#444466', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{
                          padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 600,
                          background: `${config.color}15`, color: config.color,
                        }}>
                          {config.label}
                        </span>
                        {formatTime(notif.timestamp)}
                      </div>
                    </div>
                    {!notif.read && (
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4f7dff', flexShrink: 0, marginTop: 6 }} />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
