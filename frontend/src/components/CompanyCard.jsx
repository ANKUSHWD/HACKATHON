import { useState } from 'react';
import { getProbabilityMeta } from '../utils/probabilityEngine';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Building2, Calendar, Package, ChevronDown, ChevronUp, Zap, Send, CheckCircle, AlertTriangle } from 'lucide-react';

export default function CompanyCard({ company, rank }) {
  const [expanded, setExpanded] = useState(false);
  const { applyToCompany } = useData();
  const { user } = useAuth();
  const probMeta = getProbabilityMeta(company.probability || 0);
  const isHighOpp = company.matchScore >= 80;

  const matchColor = company.matchScore >= 75 ? '#22c55e'
    : company.matchScore >= 50 ? '#4f7dff'
    : company.matchScore >= 30 ? '#f59e0b' : '#ef4444';

  const daysLeft = () => {
    const diff = new Date(company.deadline) - new Date();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid rgba(255,255,255,0.07)`,
        borderRadius: 16,
        padding: '20px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(79,125,255,0.3)';
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(79,125,255,0.1)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Rank badge */}
      {rank <= 3 && (
        <div style={{
          position: 'absolute', top: 12, right: 12,
          padding: '2px 8px', borderRadius: 20,
          background: rank === 1 ? 'rgba(255,215,0,0.15)' : rank === 2 ? 'rgba(192,192,192,0.15)' : 'rgba(205,127,50,0.15)',
          border: `1px solid ${rank === 1 ? 'rgba(255,215,0,0.4)' : rank === 2 ? 'rgba(192,192,192,0.4)' : 'rgba(205,127,50,0.4)'}`,
          fontSize: 11, fontWeight: 700,
          color: rank === 1 ? '#ffd700' : rank === 2 ? '#c0c0c0' : '#cd7f32',
        }}>
          {rank === 1 ? '🥇 Top Pick' : rank === 2 ? '🥈 #2' : '🥉 #3'}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: `${company.color}22`,
          border: `1px solid ${company.color}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, flexShrink: 0,
          overflow: 'hidden',
        }}>
          {company.logo.startsWith('http') || company.logo.startsWith('/') ? (
            <img 
              src={company.logo} 
              alt={`${company.name} logo`}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                borderRadius: 8
              }}
            />
          ) : (
            company.logo
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#f0f0ff' }}>{company.name}</span>
            {company.difficulty && (
              <span style={{
                padding: '1px 6px', borderRadius: 6, fontSize: 9, fontWeight: 700,
                background: company.difficulty === 'Hard' ? 'rgba(239,68,68,0.12)' : 'rgba(245,158,11,0.12)',
                color: company.difficulty === 'Hard' ? '#ef4444' : '#f59e0b',
              }}>{company.difficulty}</span>
            )}
          </div>
          <div style={{ fontSize: 12, color: '#6666aa' }}>{company.domain}</div>
        </div>
        {/* HIGH OPPORTUNITY agent flag */}
        {isHighOpp && !company.hasApplied && (
          <div style={{
            padding: '3px 8px', borderRadius: 8, fontSize: 10, fontWeight: 700,
            background: 'rgba(34,197,94,0.12)', color: '#22c55e',
            border: '1px solid rgba(34,197,94,0.25)',
            display: 'flex', alignItems: 'center', gap: 3,
            animation: 'pulse 2s ease infinite',
          }}>🎯 HIGH OPP</div>
        )}
        {/* Application status badge */}
        {company.hasApplied && (
          <div style={{
            padding: '3px 8px', borderRadius: 8, fontSize: 10, fontWeight: 700,
            background: company.applicationStatus === 'Selected' ? 'rgba(34,197,94,0.12)' : 'rgba(79,125,255,0.12)',
            color: company.applicationStatus === 'Selected' ? '#22c55e' : '#7fa8ff',
            display: 'flex', alignItems: 'center', gap: 3,
          }}>
            <CheckCircle size={10} /> {company.applicationStatus}
          </div>
        )}
      </div>

      {/* Match Score Bar */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: '#8888bb' }}>Skill Match</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: matchColor }}>{company.matchScore}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${company.matchScore}%`, background: `linear-gradient(90deg, ${matchColor}88, ${matchColor})` }} />
        </div>
      </div>

      {/* Probability */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: 12, color: '#8888bb' }}>Selection Probability</span>
        <span style={{
          padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700,
          background: probMeta.bg, border: `1px solid ${probMeta.border}`, color: probMeta.color,
        }}>
          {company.probability}% — {probMeta.label}
        </span>
      </div>

      {/* Meta Info */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6666aa' }}>
          <Package size={12} />
          <span>{company.package}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: daysLeft() <= 7 ? '#ef4444' : '#6666aa' }}>
          <Calendar size={12} />
          <span>{daysLeft()} days left</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6666aa' }}>
          <Building2 size={12} />
          <span>{company.slots} slots</span>
        </div>
      </div>

      {/* Expand button */}
      <button
        onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
        style={{
          width: '100%', marginTop: 14, padding: '8px',
          background: 'rgba(79,125,255,0.08)', border: '1px solid rgba(79,125,255,0.15)',
          borderRadius: 8, color: '#7fa8ff', fontSize: 12, fontWeight: 600,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          transition: 'all 0.2s',
        }}
      >
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {expanded ? 'Less Details' : 'View Details'}
      </button>

      {/* Expanded view */}
      {expanded && (
        <div style={{ marginTop: 14, animation: 'fadeIn 0.3s ease' }}>
          <div style={{ fontSize: 13, color: '#a0a0c0', marginBottom: 10 }}>{company.description}</div>

          {company.matchedSkills?.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#22c55e', marginBottom: 6 }}>✅ Your Skills Match</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {company.matchedSkills.map(s => (
                  <span key={s} style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#86efac' }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {company.missingSkills?.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#ef4444', marginBottom: 6 }}>❌ Skills to Add</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {company.missingSkills.map(s => (
                  <span key={s} style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {company.hasApplied ? (
            <div style={{
              marginTop: 14, width: '100%', padding: '10px',
              background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: 10, color: '#22c55e',
              fontSize: 13, fontWeight: 700, textAlign: 'center',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <CheckCircle size={14} /> Applied — Status: {company.applicationStatus}
            </div>
          ) : (
            <button onClick={(e) => { e.stopPropagation(); applyToCompany(company.id, user?.id); }} style={{
              marginTop: 14, width: '100%', padding: '10px',
              background: 'linear-gradient(135deg,#4f7dff,#a855f7)',
              border: 'none', borderRadius: 10, color: 'white',
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 4px 20px rgba(79,125,255,0.3)',
            }}>
              <Send size={14} /> Apply Now
            </button>
          )}
        </div>
      )}
    </div>
  );
}
