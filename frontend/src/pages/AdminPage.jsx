/**
 * ============================================================
 * TPC ADMIN DASHBOARD — Risk Classification & Agent Feed
 * ============================================================
 * Features:
 *   - Student risk classification (GREEN/YELLOW/RED)
 *   - Placement pipeline funnel (Applied → Interview → Selected)
 *   - Agent activity feed across all students
 *   - Student table with filters, search, sort
 *   - Analytics summary cards
 */
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { dummyStudents, companies } from '../data/dummyData';
import { classifyStudentRisk, runAgentCycle, RULES } from '../utils/agentEngine';
import { matchUserToCompanies } from '../utils/matchEngine';
import {
  Users, TrendingUp, AlertTriangle, CheckCircle, Shield,
  Search, Filter, ArrowUpDown, ChevronDown, ChevronUp,
  BarChart3, Target, Bot, Clock, Zap, Building2, Eye,
  XCircle, Send, MessageSquare, Trophy, GitBranch
} from 'lucide-react';

export default function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortBy, setSortBy] = useState('risk');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    if (!user) { navigate('/auth'); return; }
    if (!user.isAdmin) { navigate('/dashboard'); return; }
  }, [user]);

  // Enrich students with risk, agent logs, and match data
  const enrichedStudents = useMemo(() => {
    return dummyStudents.map(s => {
      const risk = classifyStudentRisk({
        matchScore: s.matchScore,
        probability: s.probability,
        applicationsCount: s.applications?.length || 0,
        aptitude: s.aptitude || 50,
      });

      // Run agent for each student to show what agent would do
      const matched = matchUserToCompanies(s.skills, companies);
      const agentLogs = runAgentCycle({
        student: s,
        skills: s.skills,
        applications: s.applications || [],
        matchedCompanies: matched,
      });

      return { ...s, risk, agentLogs, matchedCompanies: matched };
    });
  }, []);

  // Filtering + sorting
  const filteredStudents = useMemo(() => {
    let list = enrichedStudents;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q));
    }
    if (riskFilter !== 'all') {
      list = list.filter(s => s.risk.level === riskFilter);
    }
    // Sort
    if (sortBy === 'risk') {
      const order = { RED: 0, YELLOW: 1, GREEN: 2 };
      list = [...list].sort((a, b) => order[a.risk.level] - order[b.risk.level]);
    } else if (sortBy === 'matchScore') {
      list = [...list].sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === 'probability') {
      list = [...list].sort((a, b) => b.probability - a.probability);
    }
    return list;
  }, [enrichedStudents, search, riskFilter, sortBy]);

  // Pipeline stats
  const pipeline = useMemo(() => {
    const all = dummyStudents.flatMap(s => s.applications || []);
    return {
      total: dummyStudents.length,
      applied: all.filter(a => a.status === 'Applied').length,
      interview: all.filter(a => a.status === 'Interview').length,
      selected: all.filter(a => a.status === 'Selected').length,
      rejected: all.filter(a => a.status === 'Rejected').length,
    };
  }, []);

  // Risk stats
  const riskStats = useMemo(() => ({
    green: enrichedStudents.filter(s => s.risk.level === 'GREEN').length,
    yellow: enrichedStudents.filter(s => s.risk.level === 'YELLOW').length,
    red: enrichedStudents.filter(s => s.risk.level === 'RED').length,
  }), [enrichedStudents]);

  // All agent logs across students
  const allAgentLogs = useMemo(() => {
    return enrichedStudents
      .flatMap(s => s.agentLogs.map(l => ({ ...l, studentName: s.name })))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 20);
  }, [enrichedStudents]);

  const placementRate = pipeline.total > 0 ? Math.round((pipeline.selected / pipeline.total) * 100) : 0;

  // Active vs inactive (active = lastActive within 3 days)
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
  const activeCount = dummyStudents.filter(s => new Date(s.lastActive) > threeDaysAgo).length;
  const inactiveCount = dummyStudents.length - activeCount;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />

      <div style={{ paddingTop: 80, padding: '80px 40px 40px', maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#f0f0ff', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Shield size={28} color="#4f7dff" /> TPC Admin — <span className="gradient-text">Agentic Command Center</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6666aa' }}>AI-powered risk classification and autonomous agent monitoring across all students.</p>
        </div>

        {/* Tab Nav */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {[
            { key: 'overview', label: 'Overview', icon: BarChart3 },
            { key: 'students', label: 'Students', icon: Users },
            { key: 'pipeline', label: 'Pipeline', icon: GitBranch },
            { key: 'agent-feed', label: 'Agent Feed', icon: Bot },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveSection(tab.key)} style={{
              padding: '10px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600,
              background: activeSection === tab.key ? 'rgba(79,125,255,0.15)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${activeSection === tab.key ? 'rgba(79,125,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
              color: activeSection === tab.key ? '#7fa8ff' : '#6666aa',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <tab.icon size={15} /> {tab.label}
            </button>
          ))}
        </div>

        {/* ===== OVERVIEW ===== */}
        {activeSection === 'overview' && (
          <>
            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
              {[
                { label: 'Total Students', value: pipeline.total, icon: Users, color: '#4f7dff' },
                { label: 'Placement Rate', value: `${placementRate}%`, icon: TrendingUp, color: '#22c55e' },
                { label: 'Active (3d)', value: activeCount, icon: CheckCircle, color: '#a855f7' },
                { label: 'Inactive', value: inactiveCount, icon: AlertTriangle, color: '#ef4444' },
              ].map(card => (
                <div key={card.label} style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 14, padding: '20px', display: 'flex', alignItems: 'center', gap: 14,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `${card.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <card.icon size={20} color={card.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: '#f0f0ff' }}>{card.value}</div>
                    <div style={{ fontSize: 12, color: '#6666aa' }}>{card.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Risk Distribution */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
              {/* Risk Cards */}
              <div style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16, padding: 24,
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f0f0ff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Shield size={18} color="#4f7dff" /> Risk Classification
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { label: 'Ready', level: 'GREEN', count: riskStats.green, color: '#22c55e', desc: 'High score, multiple applications' },
                    { label: 'Moderate', level: 'YELLOW', count: riskStats.yellow, color: '#f59e0b', desc: 'Average scores, needs improvement' },
                    { label: 'At Risk', level: 'RED', count: riskStats.red, color: '#ef4444', desc: 'Low applications, weak profile' },
                  ].map(r => (
                    <div key={r.level} style={{
                      padding: '14px 16px', borderRadius: 12,
                      background: `${r.color}08`, border: `1px solid ${r.color}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: r.color }} />
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: r.color }}>{r.label}</div>
                          <div style={{ fontSize: 11, color: '#6666aa' }}>{r.desc}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: 28, fontWeight: 900, color: r.color }}>{r.count}</span>
                    </div>
                  ))}
                </div>

                {/* Risk bar */}
                <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', height: 12, marginTop: 16 }}>
                  <div style={{ width: `${(riskStats.green / pipeline.total) * 100}%`, background: '#22c55e', transition: 'width 0.5s' }} />
                  <div style={{ width: `${(riskStats.yellow / pipeline.total) * 100}%`, background: '#f59e0b', transition: 'width 0.5s' }} />
                  <div style={{ width: `${(riskStats.red / pipeline.total) * 100}%`, background: '#ef4444', transition: 'width 0.5s' }} />
                </div>
              </div>

              {/* Pipeline Funnel */}
              <div style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16, padding: 24,
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f0f0ff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <GitBranch size={18} color="#a855f7" /> Placement Pipeline
                </h3>
                {[
                  { stage: 'Applied', count: pipeline.applied, icon: Send, color: '#a855f7', width: '100%' },
                  { stage: 'Interview', count: pipeline.interview, icon: MessageSquare, color: '#f59e0b', width: '70%' },
                  { stage: 'Selected', count: pipeline.selected, icon: Trophy, color: '#22c55e', width: '40%' },
                  { stage: 'Rejected', count: pipeline.rejected, icon: XCircle, color: '#ef4444', width: '25%' },
                ].map(s => (
                  <div key={s.stage} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#c0c0d8', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <s.icon size={14} color={s.color} /> {s.stage}
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 800, color: s.color }}>{s.count}</span>
                    </div>
                    <div className="progress-bar" style={{ height: 8 }}>
                      <div className="progress-fill" style={{
                        width: s.width, background: `linear-gradient(90deg, ${s.color}88, ${s.color})`,
                        transition: 'width 0.8s ease',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Agent Summary */}
            <div style={{
              padding: '16px 20px', borderRadius: 14, marginBottom: 20,
              background: 'linear-gradient(135deg,rgba(79,125,255,0.06),rgba(168,85,247,0.06))',
              border: '1px solid rgba(79,125,255,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Bot size={20} color="#4f7dff" />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#f0f0ff' }}>Agent Activity</span>
                <span style={{ fontSize: 12, color: '#6666aa' }}>—</span>
                <span style={{ fontSize: 13, color: '#f59e0b', fontWeight: 600 }}>
                  {allAgentLogs.filter(l => l.severity === 'critical' || l.severity === 'warning').length} alerts triggered
                </span>
              </div>
              <button onClick={() => setActiveSection('agent-feed')} style={{
                padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                background: 'rgba(79,125,255,0.15)', border: '1px solid rgba(79,125,255,0.25)',
                color: '#7fa8ff', cursor: 'pointer',
              }}>
                View Feed →
              </button>
            </div>
          </>
        )}

        {/* ===== STUDENTS TABLE ===== */}
        {activeSection === 'students' && (
          <>
            {/* Search + Filters */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 300px', position: 'relative' }}>
                <Search size={16} color="#6666aa" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search students..."
                  className="input-field"
                  style={{ paddingLeft: 40 }}
                />
              </div>
              <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)} style={{
                padding: '10px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                color: '#c0c0d8', cursor: 'pointer',
              }}>
                <option value="all">All Risks</option>
                <option value="GREEN">🟢 Ready</option>
                <option value="YELLOW">🟡 Moderate</option>
                <option value="RED">🔴 At Risk</option>
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                padding: '10px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                color: '#c0c0d8', cursor: 'pointer',
              }}>
                <option value="risk">Sort: Risk Level</option>
                <option value="matchScore">Sort: Match Score</option>
                <option value="probability">Sort: Probability</option>
              </select>
            </div>

            {/* Table */}
            <div style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, overflow: 'hidden',
            }}>
              {/* Table Header */}
              <div style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
                padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
              }}>
                {['Student', 'Risk', 'Match', 'Probability', 'Applications', 'Agent Alerts'].map(h => (
                  <div key={h} style={{ fontSize: 11, fontWeight: 700, color: '#6666aa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</div>
                ))}
              </div>

              {/* Rows */}
              {filteredStudents.map(student => (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudent(selectedStudent?.id === student.id ? null : student)}
                  style={{
                    display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
                    padding: '16px 20px', cursor: 'pointer',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: selectedStudent?.id === student.id ? 'rgba(79,125,255,0.05)' : 'transparent',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = selectedStudent?.id === student.id ? 'rgba(79,125,255,0.05)' : 'transparent'}
                >
                  {/* Name + Email */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: `${student.risk.color}20`,
                      border: `2px solid ${student.risk.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 700, color: student.risk.color,
                    }}>
                      {student.name[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f0ff' }}>{student.name}</div>
                      <div style={{ fontSize: 11, color: '#444466' }}>{student.email}</div>
                    </div>
                  </div>

                  {/* Risk Badge */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                      background: student.risk.bg, color: student.risk.color,
                      border: `1px solid ${student.risk.color}30`,
                    }}>
                      {student.risk.label}
                    </span>
                  </div>

                  {/* Match */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: student.matchScore >= 70 ? '#22c55e' : student.matchScore >= 50 ? '#f59e0b' : '#ef4444' }}>
                      {student.matchScore}%
                    </span>
                  </div>

                  {/* Probability */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: student.probability >= 70 ? '#22c55e' : student.probability >= 40 ? '#f59e0b' : '#ef4444' }}>
                      {student.probability}%
                    </span>
                  </div>

                  {/* Applications */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#c0c0d8' }}>
                      {student.applications?.length || 0}
                    </span>
                  </div>

                  {/* Agent Alerts */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                      background: student.agentLogs.length > 0 ? 'rgba(245,158,11,0.12)' : 'rgba(34,197,94,0.12)',
                      color: student.agentLogs.length > 0 ? '#f59e0b' : '#22c55e',
                    }}>
                      {student.agentLogs.length > 0 ? `${student.agentLogs.length} alerts` : 'Clear'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Expanded Student Detail */}
            {selectedStudent && (
              <div style={{
                marginTop: 20, padding: 24, borderRadius: 16,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0ff' }}>
                    {selectedStudent.name} — Detail View
                  </h3>
                  <button onClick={() => setSelectedStudent(null)} style={{
                    background: 'none', border: 'none', color: '#6666aa', cursor: 'pointer', fontSize: 13,
                  }}>Close ×</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
                  <DetailCard label="GPA" value={selectedStudent.gpa} />
                  <DetailCard label="Aptitude" value={`${selectedStudent.aptitude}%`} />
                  <DetailCard label="Projects" value={selectedStudent.projects} />
                  <DetailCard label="Interviews" value={selectedStudent.interviewsCompleted} />
                  <DetailCard label="Skills" value={selectedStudent.skills?.length || 0} />
                </div>

                {/* Skills */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                  {selectedStudent.skills?.map(s => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>

                {/* Applications */}
                {selectedStudent.applications?.length > 0 && (
                  <>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: '#8888bb', marginBottom: 10 }}>Applications</h4>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                      {selectedStudent.applications.map((app, i) => (
                        <span key={i} style={{
                          padding: '5px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                          background: app.status === 'Selected' ? 'rgba(34,197,94,0.1)' : app.status === 'Rejected' ? 'rgba(239,68,68,0.1)' : 'rgba(79,125,255,0.1)',
                          color: app.status === 'Selected' ? '#22c55e' : app.status === 'Rejected' ? '#ef4444' : '#7fa8ff',
                          border: `1px solid ${app.status === 'Selected' ? 'rgba(34,197,94,0.2)' : app.status === 'Rejected' ? 'rgba(239,68,68,0.2)' : 'rgba(79,125,255,0.2)'}`,
                        }}>
                          {app.companyName}: {app.status}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                {/* Agent Logs for this student */}
                {selectedStudent.agentLogs?.length > 0 && (
                  <>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: '#8888bb', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Bot size={14} /> Agent Actions
                    </h4>
                    {selectedStudent.agentLogs.slice(0, 5).map((log, i) => (
                      <div key={i} style={{
                        padding: '10px 14px', borderRadius: 10, marginBottom: 6,
                        background: log.severity === 'critical' ? 'rgba(239,68,68,0.06)' : log.severity === 'warning' ? 'rgba(245,158,11,0.06)' : 'rgba(79,125,255,0.05)',
                        border: `1px solid ${log.severity === 'critical' ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.06)'}`,
                        fontSize: 13, color: '#c0c0d8',
                      }}>
                        {log.rule.icon} <strong style={{ color: '#f0f0ff' }}>{log.rule.name}:</strong> {log.message}
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </>
        )}

        {/* ===== PIPELINE VIEW ===== */}
        {activeSection === 'pipeline' && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0ff', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
              <GitBranch size={22} color="#a855f7" /> Placement Pipeline — All Students
            </h2>

            {/* Funnel visualization */}
            <div style={{ maxWidth: 600, margin: '0 auto 40px' }}>
              {[
                { stage: 'Total Students', count: pipeline.total, color: '#4f7dff', width: '100%' },
                { stage: 'Applied', count: pipeline.applied, color: '#a855f7', width: `${(pipeline.applied / Math.max(pipeline.total, 1)) * 100}%` },
                { stage: 'Interviewing', count: pipeline.interview, color: '#f59e0b', width: `${(pipeline.interview / Math.max(pipeline.total, 1)) * 100}%` },
                { stage: 'Selected', count: pipeline.selected, color: '#22c55e', width: `${(pipeline.selected / Math.max(pipeline.total, 1)) * 100}%` },
              ].map((s, i) => (
                <div key={s.stage} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                  <span style={{ width: 100, fontSize: 13, fontWeight: 600, color: '#8888bb', textAlign: 'right' }}>{s.stage}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      height: 36, borderRadius: 8, background: `${s.color}15`,
                      display: 'flex', alignItems: 'center', overflow: 'hidden',
                    }}>
                      <div style={{
                        width: s.width, minWidth: 40, height: '100%', borderRadius: 8,
                        background: `linear-gradient(90deg, ${s.color}88, ${s.color})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 14, fontWeight: 800, color: 'white',
                        transition: 'width 0.8s ease',
                      }}>
                        {s.count}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Per-company breakdown */}
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f0f0ff', marginBottom: 16 }}>Per Company</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
              {companies.map(c => {
                const apps = dummyStudents.flatMap(s => (s.applications || []).filter(a => a.companyId === c.id));
                return (
                  <div key={c.id} style={{
                    padding: '16px', borderRadius: 14,
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      {c.logo.startsWith('http') || c.logo.startsWith('/') ? (
                        <img 
                          src={c.logo} 
                          alt={`${c.name} logo`}
                          style={{ 
                            width: 20, 
                            height: 20, 
                            objectFit: 'contain',
                            borderRadius: 4
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: 20 }}>{c.logo}</span>
                      )}
                      <span style={{ fontSize: 15, fontWeight: 700, color: '#f0f0ff' }}>{c.name}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {['Applied', 'Interview', 'Selected', 'Rejected'].map(status => {
                        const count = apps.filter(a => a.status === status).length;
                        return count > 0 ? (
                          <span key={status} style={{
                            padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700,
                            background: status === 'Selected' ? 'rgba(34,197,94,0.1)' : status === 'Rejected' ? 'rgba(239,68,68,0.1)' : 'rgba(79,125,255,0.1)',
                            color: status === 'Selected' ? '#22c55e' : status === 'Rejected' ? '#ef4444' : '#7fa8ff',
                          }}>
                            {status}: {count}
                          </span>
                        ) : null;
                      })}
                      {apps.length === 0 && <span style={{ fontSize: 12, color: '#444466' }}>No applications yet</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== AGENT FEED ===== */}
        {activeSection === 'agent-feed' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0ff', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Bot size={22} color="#4f7dff" /> Agent Feed — All Students
              </h2>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 14px', borderRadius: 20,
                background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s ease infinite' }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#22c55e' }}>Agent Live</span>
              </div>
            </div>

            {/* Observe → Decide → Act */}
            <div style={{
              padding: '14px 20px', borderRadius: 14, marginBottom: 24,
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {allAgentLogs.map((log, i) => {
                const sevColor = log.severity === 'critical' ? '#ef4444' : log.severity === 'warning' ? '#f59e0b' : log.severity === 'success' ? '#22c55e' : '#4f7dff';
                return (
                  <div key={i} style={{
                    padding: '16px 18px', borderRadius: 14,
                    background: `${sevColor}08`, border: `1px solid ${sevColor}18`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#f0f0ff' }}>
                        {log.rule.icon} {log.studentName}
                      </span>
                      <span style={{
                        padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700,
                        background: `${sevColor}18`, color: sevColor,
                      }}>
                        {log.severity.toUpperCase()}
                      </span>
                      <span style={{
                        padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600,
                        background: 'rgba(168,85,247,0.12)', color: '#a855f7',
                      }}>
                        🤖 AUTO
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: '#c0c0d8', lineHeight: 1.5, marginBottom: 4 }}>{log.message}</p>
                    <div style={{ fontSize: 11, color: '#444466' }}>
                      Rule: {log.rule.name} · Action: {log.action}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

function DetailCard({ label, value }) {
  return (
    <div style={{
      padding: '14px 16px', borderRadius: 12,
      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ fontSize: 11, color: '#6666aa', fontWeight: 600, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: '#f0f0ff' }}>{value}</div>
    </div>
  );
}
