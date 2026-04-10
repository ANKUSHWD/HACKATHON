/**
 * JourneyTimeline — Visual placement lifecycle tracker
 * Shows: Resume → Applied → Interview → Selected/Rejected
 */
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { FileText, Send, MessageSquare, Trophy, XCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const stages = [
  { key: 'Resume', icon: FileText, label: 'Resume Ready', color: '#4f7dff' },
  { key: 'Applied', icon: Send, label: 'Applied', color: '#a855f7' },
  { key: 'Interview', icon: MessageSquare, label: 'Interview', color: '#f59e0b' },
  { key: 'Selected', icon: Trophy, label: 'Selected', color: '#22c55e' },
];

const statusOrder = { Resume: 0, Applied: 1, Interview: 2, Selected: 3, Rejected: 3 };

export default function JourneyTimeline() {
  const { applications, updateApplicationStatus } = useData();
  const { user } = useAuth();
  const [expandedApp, setExpandedApp] = useState(null);

  // Pipeline summary counts
  const counts = {
    Applied: applications.filter(a => a.status === 'Applied').length,
    Interview: applications.filter(a => a.status === 'Interview').length,
    Selected: applications.filter(a => a.status === 'Selected').length,
    Rejected: applications.filter(a => a.status === 'Rejected').length,
  };

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0ff', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
        <FileText size={22} color="#4f7dff" /> My Placement Journey
      </h2>
      <p style={{ fontSize: 13, color: '#6666aa', marginBottom: 28 }}>Track your application lifecycle across all companies.</p>

      {/* Pipeline Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
        {[
          { label: 'Applied', value: counts.Applied, color: '#a855f7', icon: '📤' },
          { label: 'Interview', value: counts.Interview, color: '#f59e0b', icon: '🎤' },
          { label: 'Selected', value: counts.Selected, color: '#22c55e', icon: '🏆' },
          { label: 'Rejected', value: counts.Rejected, color: '#ef4444', icon: '❌' },
        ].map(item => (
          <div key={item.label} style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 14, padding: '18px 16px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: item.color }}>{item.value}</div>
            <div style={{ fontSize: 12, color: '#6666aa', fontWeight: 500 }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Application Cards with Timeline */}
      {applications.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 20px',
          background: 'rgba(255,255,255,0.02)', borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <Send size={40} color="#444466" style={{ marginBottom: 16 }} />
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#668', marginBottom: 8 }}>No Applications Yet</h3>
          <p style={{ fontSize: 14, color: '#444466' }}>Go to Companies and click "Apply" to start tracking your journey.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {applications.map(app => {
            const currentStage = statusOrder[app.status] ?? 1;
            const isRejected = app.status === 'Rejected';
            const isExpanded = expandedApp === app.id;

            return (
              <div key={app.id} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16, overflow: 'hidden', transition: 'all 0.2s',
              }}>
                {/* Header */}
                <div
                  onClick={() => setExpandedApp(isExpanded ? null : app.id)}
                  style={{
                    padding: '18px 20px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 12,
                      background: isRejected ? 'rgba(239,68,68,0.1)' : `rgba(79,125,255,0.1)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18,
                    }}>
                      {isRejected ? '❌' : app.status === 'Selected' ? '🏆' : '📤'}
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#f0f0ff' }}>{app.companyName}</div>
                      <div style={{ fontSize: 12, color: '#6666aa' }}>Applied: {app.appliedDate}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                      background: isRejected ? 'rgba(239,68,68,0.12)' : app.status === 'Selected' ? 'rgba(34,197,94,0.12)' : 'rgba(79,125,255,0.12)',
                      color: isRejected ? '#ef4444' : app.status === 'Selected' ? '#22c55e' : '#7fa8ff',
                      border: `1px solid ${isRejected ? 'rgba(239,68,68,0.25)' : app.status === 'Selected' ? 'rgba(34,197,94,0.25)' : 'rgba(79,125,255,0.25)'}`,
                    }}>
                      {app.status}
                    </span>
                    {isExpanded ? <ChevronUp size={16} color="#6666aa" /> : <ChevronDown size={16} color="#6666aa" />}
                  </div>
                </div>

                {/* Expanded Timeline */}
                {isExpanded && (
                  <div style={{ padding: '0 20px 20px' }}>
                    {/* Visual timeline */}
                    <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0 20px', position: 'relative' }}>
                      {stages.map((stage, i) => {
                        const isReached = currentStage >= i;
                        const isCurrent = currentStage === i && !isRejected;
                        const Icon = stage.icon;
                        return (
                          <div key={stage.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                            {/* Connector line */}
                            {i > 0 && (
                              <div style={{
                                position: 'absolute', top: 18, right: '50%', width: '100%', height: 3,
                                background: isReached ? stage.color : 'rgba(255,255,255,0.08)',
                                zIndex: 0, transition: 'background 0.5s',
                              }} />
                            )}
                            {/* Circle */}
                            <div style={{
                              width: 36, height: 36, borderRadius: '50%', zIndex: 1,
                              background: isReached ? `${stage.color}22` : 'rgba(255,255,255,0.04)',
                              border: `2px solid ${isReached ? stage.color : 'rgba(255,255,255,0.1)'}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              boxShadow: isCurrent ? `0 0 12px ${stage.color}44` : 'none',
                              transition: 'all 0.3s',
                            }}>
                              <Icon size={16} color={isReached ? stage.color : '#444466'} />
                            </div>
                            <span style={{
                              fontSize: 11, color: isReached ? stage.color : '#444466',
                              fontWeight: isCurrent ? 700 : 500, marginTop: 6,
                            }}>
                              {stage.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Status update buttons (demo) */}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {['Applied', 'Interview', 'Selected', 'Rejected'].map(status => (
                        <button
                          key={status}
                          onClick={() => updateApplicationStatus(app.id, status, user?.id)}
                          disabled={app.status === status}
                          style={{
                            padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                            background: app.status === status ? 'rgba(79,125,255,0.2)' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${app.status === status ? 'rgba(79,125,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
                            color: app.status === status ? '#7fa8ff' : '#6666aa',
                            cursor: app.status === status ? 'default' : 'pointer',
                          }}
                        >
                          → {status}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
