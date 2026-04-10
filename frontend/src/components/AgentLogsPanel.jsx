/**
 * AgentLogsPanel — Shows autonomous agent actions feed
 * Displays: rule fired, action taken, severity, timestamp
 * Includes live "Agent is watching..." indicator
 */
import { useData } from '../context/DataContext';
import { Bot, Zap, AlertTriangle, CheckCircle, Info, Shield, Clock } from 'lucide-react';

const severityConfig = {
  critical: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)', icon: AlertTriangle, label: 'CRITICAL' },
  warning: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', icon: AlertTriangle, label: 'WARNING' },
  success: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.2)', icon: CheckCircle, label: 'OPPORTUNITY' },
  info: { color: '#4f7dff', bg: 'rgba(79,125,255,0.1)', border: 'rgba(79,125,255,0.2)', icon: Info, label: 'INFO' },
};

export default function AgentLogsPanel() {
  const { agentLogs, agentRunning } = useData();

  const formatTime = (ts) => {
    const d = new Date(ts);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      {/* Header with live indicator */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Bot size={22} color="#4f7dff" />
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0ff' }}>Agent Actions</h2>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 14px', borderRadius: 20,
          background: agentRunning ? 'rgba(34,197,94,0.1)' : 'rgba(79,125,255,0.08)',
          border: `1px solid ${agentRunning ? 'rgba(34,197,94,0.25)' : 'rgba(79,125,255,0.15)'}`,
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: agentRunning ? '#22c55e' : '#4f7dff',
            animation: agentRunning ? 'pulse 1s ease-in-out infinite' : 'none',
          }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: agentRunning ? '#22c55e' : '#7fa8ff' }}>
            {agentRunning ? 'Agent Processing...' : 'Agent Watching'}
          </span>
        </div>
      </div>

      <p style={{ fontSize: 13, color: '#6666aa', marginBottom: 20 }}>
        The AI agent autonomously monitors your profile and triggers actions without your input.
      </p>

      {/* Agent architecture diagram */}
      <div style={{
        padding: '16px 20px', borderRadius: 14, marginBottom: 24,
        background: 'linear-gradient(135deg,rgba(79,125,255,0.06),rgba(168,85,247,0.06))',
        border: '1px solid rgba(79,125,255,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20,
        fontSize: 13, color: '#8888bb',
      }}>
        <span style={{ fontWeight: 700, color: '#4f7dff' }}>👁️ OBSERVE</span>
        <span>→</span>
        <span style={{ fontWeight: 700, color: '#a855f7' }}>🧠 DECIDE</span>
        <span>→</span>
        <span style={{ fontWeight: 700, color: '#22c55e' }}>⚡ ACT</span>
      </div>

      {/* Logs */}
      {agentLogs.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 20px',
          background: 'rgba(255,255,255,0.02)', borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <Bot size={40} color="#444466" style={{ marginBottom: 16 }} />
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#668', marginBottom: 8 }}>No Actions Yet</h3>
          <p style={{ fontSize: 13, color: '#444466' }}>The agent will trigger actions once it analyzes your data.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {agentLogs.map((log, i) => {
            const config = severityConfig[log.severity] || severityConfig.info;
            const SevIcon = config.icon;
            return (
              <div key={log.id || i} style={{
                padding: '16px 18px', borderRadius: 14,
                background: config.bg,
                border: `1px solid ${config.border}`,
                transition: 'all 0.2s',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  {/* Severity icon */}
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: `${config.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <SevIcon size={18} color={config.color} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Rule + Severity badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#f0f0ff' }}>
                        {log.rule.icon} {log.rule.name}
                      </span>
                      <span style={{
                        padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700,
                        background: `${config.color}20`, color: config.color,
                        letterSpacing: '0.5px',
                      }}>
                        {config.label}
                      </span>
                      {log.auto && (
                        <span style={{
                          padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600,
                          background: 'rgba(168,85,247,0.15)', color: '#a855f7',
                        }}>
                          🤖 AUTO
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    <p style={{ fontSize: 13, color: '#c0c0d8', lineHeight: 1.6, marginBottom: 6 }}>
                      {log.message}
                    </p>

                    {/* Timestamp */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#444466' }}>
                      <Clock size={11} />
                      <span>Agent triggered at {formatTime(log.timestamp)}</span>
                      <span style={{ margin: '0 4px' }}>·</span>
                      <span style={{ fontWeight: 600 }}>Action: {log.action}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
