import { useState } from 'react';
import { getAIRecommendation } from '../utils/aiRecommender';
import { Brain, ChevronRight, CheckCircle, Circle, Zap, Target, Clock } from 'lucide-react';

export default function AIRecommendation({ skills = [], matchedCompanies = [] }) {
  const [tasksState, setTasksState] = useState({});

  const topCompany = matchedCompanies[0];
  const avgMatch = matchedCompanies.length
    ? Math.round(matchedCompanies.reduce((s, c) => s + c.matchScore, 0) / matchedCompanies.length)
    : 0;
  const avgProbability = matchedCompanies.length
    ? Math.round(matchedCompanies.reduce((s, c) => s + (c.probability || 0), 0) / matchedCompanies.length)
    : 0;
  const missingSkills = topCompany?.missingSkills || [];

  const rec = getAIRecommendation({ skills, matchScore: avgMatch, probability: avgProbability, missingSkills });

  const toggleTask = (i) => {
    setTasksState(prev => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 16, padding: 24,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'linear-gradient(135deg,#4f7dff22,#a855f722)',
          border: '1px solid rgba(79,125,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Brain size={18} color="#7fa8ff" />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#f0f0ff' }}>AI Recommendations</div>
          <div style={{ fontSize: 11, color: '#6666aa' }}>Based on your skills & matches</div>
        </div>
      </div>

      {/* Action Card */}
      <div style={{
        padding: '16px', borderRadius: 12, marginBottom: 20,
        background: `linear-gradient(135deg, ${rec.actionColor}15, ${rec.actionColor}05)`,
        border: `1px solid ${rec.actionColor}33`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <span style={{ fontSize: 28 }}>{rec.actionIcon}</span>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: rec.actionColor }}>{rec.action}</div>
            <div style={{ fontSize: 12, color: '#8888bb' }}>AI Decision</div>
          </div>
        </div>
        <p style={{ fontSize: 13, color: '#c0c0d8', lineHeight: 1.6 }}>{rec.description}</p>
      </div>

      {/* Weekly Goal */}
      <div style={{
        padding: '12px 16px', borderRadius: 10, marginBottom: 20,
        background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.15)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <Target size={16} color="#a855f7" />
        <div>
          <div style={{ fontSize: 11, color: '#8888bb' }}>Weekly Goal</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#c084fc' }}>{rec.weeklyGoal}</div>
        </div>
      </div>

      {/* Tasks */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#8888bb', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Zap size={13} color="#4f7dff" /> Recommended Tasks
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {rec.tasks.map((t, i) => (
            <div
              key={i}
              onClick={() => toggleTask(i)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '10px 12px', borderRadius: 10, cursor: 'pointer',
                background: tasksState[i] ? 'rgba(34,197,94,0.05)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${tasksState[i] ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.05)'}`,
                transition: 'all 0.2s',
              }}
            >
              {tasksState[i]
                ? <CheckCircle size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: 1 }} />
                : <Circle size={16} color="#444466" style={{ flexShrink: 0, marginTop: 1 }} />
              }
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 13, color: tasksState[i] ? '#6b7280' : '#c0c0d8', fontWeight: 500,
                  textDecoration: tasksState[i] ? 'line-through' : 'none',
                }}>
                  {t.task}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                  <span style={{
                    fontSize: 10, padding: '1px 7px', borderRadius: 20, fontWeight: 600,
                    background: t.priority === 'high' ? 'rgba(239,68,68,0.15)' : t.priority === 'medium' ? 'rgba(245,158,11,0.15)' : 'rgba(99,102,241,0.15)',
                    color: t.priority === 'high' ? '#ef4444' : t.priority === 'medium' ? '#f59e0b' : '#818cf8',
                    border: `1px solid ${t.priority === 'high' ? 'rgba(239,68,68,0.2)' : t.priority === 'medium' ? 'rgba(245,158,11,0.2)' : 'rgba(99,102,241,0.2)'}`,
                  }}>
                    {t.priority}
                  </span>
                  <span style={{ fontSize: 10, color: '#444466' }}>{t.skill}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Focus skills */}
      {rec.prioritySkills.length > 0 && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#8888bb', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Clock size={13} color="#f59e0b" /> Focus On Next
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {rec.prioritySkills.map(s => (
              <span key={s} style={{
                padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: '#fbbf24',
                display: 'flex', alignItems: 'center', gap: 5,
              }}>
                <ChevronRight size={12} /> {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
