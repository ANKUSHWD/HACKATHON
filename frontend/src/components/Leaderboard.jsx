import { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, TrendingUp, Star, Flame } from 'lucide-react';

const leaderboardData = [
  { rank: 1, name: "Ananya Bose", score: 97, skills: 12, streak: 15, change: "up" },
  { rank: 2, name: "Priya Patel", score: 95, skills: 10, streak: 12, change: "up" },
  { rank: 3, name: "Arjun Sharma", score: 91, skills: 9, streak: 8, change: "same" },
  { rank: 4, name: "Neha Singh", score: 77, skills: 7, streak: 5, change: "up" },
  { rank: 5, name: "Abhishek Jain", score: 72, skills: 6, streak: 3, change: "down" },
  { rank: 6, name: "Kavya Reddy", score: 63, skills: 5, streak: 7, change: "up" },
  { rank: 7, name: "Rohit Kumar", score: 48, skills: 3, streak: 1, change: "down" },
  { rank: 8, name: "Vivek Gupta", score: 28, skills: 2, streak: 0, change: "down" },
];

export default function Leaderboard({ currentUserName }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { setTimeout(() => setAnimated(true), 200); }, []);

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown size={18} color="#ffd700" fill="#ffd700" />;
    if (rank === 2) return <Medal size={18} color="#c0c0c0" />;
    if (rank === 3) return <Medal size={18} color="#cd7f32" />;
    return <span style={{ fontSize: 14, fontWeight: 700, color: '#444466', width: 18, textAlign: 'center', display: 'inline-block' }}>{rank}</span>;
  };

  const getRankColor = (rank) => {
    if (rank === 1) return { bg: 'rgba(255,215,0,0.08)', border: 'rgba(255,215,0,0.2)' };
    if (rank === 2) return { bg: 'rgba(192,192,192,0.08)', border: 'rgba(192,192,192,0.2)' };
    if (rank === 3) return { bg: 'rgba(205,127,50,0.08)', border: 'rgba(205,127,50,0.2)' };
    return { bg: 'rgba(255,255,255,0.02)', border: 'rgba(255,255,255,0.05)' };
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <Trophy size={22} color="#fbbf24" />
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0ff' }}>Leaderboard</h2>
      </div>

      {/* Top 3 podium */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 28
      }}>
        {leaderboardData.slice(0, 3).map((user, i) => {
          const order = [1, 0, 2]; // Silver, Gold, Bronze display order
          const u = leaderboardData[order[i]];
          const colors = ['#c0c0c0', '#ffd700', '#cd7f32'];
          return (
            <div key={u.rank} style={{
              background: `rgba(${u.rank === 1 ? '255,215,0' : u.rank === 2 ? '192,192,192' : '205,127,50'},0.06)`,
              border: `1px solid rgba(${u.rank === 1 ? '255,215,0' : u.rank === 2 ? '192,192,192' : '205,127,50'},0.2)`,
              borderRadius: 16, padding: '24px 16px', textAlign: 'center',
              transform: u.rank === 1 ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.3s',
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%', margin: '0 auto 12px',
                background: `linear-gradient(135deg,${colors[order[i]]}44,${colors[order[i]]}22)`,
                border: `2px solid ${colors[order[i]]}66`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 800, color: colors[order[i]],
              }}>
                {u.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#f0f0ff', marginBottom: 4 }}>{u.name}</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: colors[order[i]], marginBottom: 4 }}>{u.score}%</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <Flame size={12} color="#ef4444" />
                <span style={{ fontSize: 11, color: '#6666aa' }}>{u.streak} day streak</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {leaderboardData.map((user, i) => {
          const rc = getRankColor(user.rank);
          const isYou = user.name.toLowerCase().includes(currentUserName?.toLowerCase?.() || '___');
          return (
            <div key={user.rank} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px',
              borderRadius: 12,
              background: isYou ? 'rgba(79,125,255,0.1)' : rc.bg,
              border: `1px solid ${isYou ? 'rgba(79,125,255,0.3)' : rc.border}`,
              opacity: animated ? 1 : 0,
              transform: animated ? 'translateX(0)' : 'translateX(-20px)',
              transition: `all 0.4s ease ${i * 0.06}s`,
            }}>
              <div style={{ width: 28, display: 'flex', justifyContent: 'center' }}>
                {getRankIcon(user.rank)}
              </div>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'linear-gradient(135deg,#4f7dff33,#a855f733)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: '#7fa8ff', flexShrink: 0,
              }}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f0ff' }}>
                  {user.name} {isYou && <span style={{ fontSize: 11, color: '#4f7dff' }}>(You)</span>}
                </div>
                <div style={{ fontSize: 11, color: '#444466' }}>
                  {user.skills} skills · {user.streak} day streak
                </div>
              </div>
              <div style={{
                fontSize: 16, fontWeight: 800,
                color: user.score >= 80 ? '#22c55e' : user.score >= 50 ? '#4f7dff' : '#ef4444',
              }}>
                {user.score}%
              </div>
              <div style={{ width: 20 }}>
                {user.change === 'up' && <TrendingUp size={14} color="#22c55e" />}
                {user.change === 'down' && <TrendingUp size={14} color="#ef4444" style={{ transform: 'rotate(180deg)' }} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
