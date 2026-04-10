import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CompanyCard from '../components/CompanyCard';
import SkillsTracker from '../components/SkillsTracker';
import AIRecommendation from '../components/AIRecommendation';
import NotificationToast from '../components/NotificationToast';
import Leaderboard from '../components/Leaderboard';
import AIInsightCard from '../components/AIInsightCard';
import JourneyTimeline from '../components/JourneyTimeline';
import AgentLogsPanel from '../components/AgentLogsPanel';
import {
  BarChart3, TrendingUp, Building2, Target, CheckCircle, Circle,
  Zap, ArrowUpRight, Bell, Calendar
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { matchedCompanies, userProfile, loadUserProfile, dailyTasks, toggleTask, notifications, dismissNotification, applications, agentLogs } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (!user) { navigate('/auth'); return; }
    if (!user.onboardingComplete) { navigate('/onboarding'); return; }
    loadUserProfile(user);
  }, [user]);

  const skills = userProfile?.skills || [];
  const topCompanies = matchedCompanies.slice(0, 6);
  const avgMatch = matchedCompanies.length
    ? Math.round(matchedCompanies.reduce((s, c) => s + c.matchScore, 0) / matchedCompanies.length) : 0;
  const avgProb = matchedCompanies.length
    ? Math.round(matchedCompanies.reduce((s, c) => s + (c.probability || 0), 0) / matchedCompanies.length) : 0;
  const strongMatches = matchedCompanies.filter(c => c.matchScore >= 60).length;
  const completedTasks = dailyTasks.filter(t => t.done).length;

  const summaryCards = [
    { label: 'Avg Match', value: `${avgMatch}%`, icon: BarChart3, color: '#4f7dff', bg: 'rgba(79,125,255,0.1)' },
    { label: 'Avg Probability', value: `${avgProb}%`, icon: TrendingUp, color: '#a855f7', bg: 'rgba(168,85,247,0.1)' },
    { label: 'Applications', value: applications.length, icon: Building2, color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
    { label: 'Tasks Done', value: `${completedTasks}/${dailyTasks.length}`, icon: Target, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />
      <NotificationToast notifications={notifications} onDismiss={dismissNotification} />

      <div style={{ display: 'flex', paddingTop: 64 }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main style={{ flex: 1, padding: '32px', overflowY: 'auto', minHeight: 'calc(100vh - 64px)' }}>
          {/* Welcome */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#f0f0ff', marginBottom: 6 }}>
              Welcome back, <span className="gradient-text">{user?.name || 'Student'}</span> 👋
            </h1>
            <p style={{ fontSize: 14, color: '#6666aa' }}>
              Here's your placement intelligence overview for today.
            </p>
          </div>

          {/* Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
            {summaryCards.map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 14, padding: '20px', display: 'flex', alignItems: 'center', gap: 14,
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}44`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={20} color={color} />
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#f0f0ff' }}>{value}</div>
                  <div style={{ fontSize: 12, color: '#6666aa', fontWeight: 500 }}>{label}</div>
                </div>
              </div>
            ))}
          </div>

          {activeTab === 'dashboard' && (
            <>
              {/* AI Insight Card */}
              <div style={{ marginBottom: 24 }}>
                <AIInsightCard />
              </div>

              {/* Skills tags bar */}
              <div style={{
                padding: '16px 20px', borderRadius: 14, marginBottom: 32,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
              }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#6666aa' }}>Your Skills:</span>
                {skills.slice(0, 8).map(s => <span key={s} className="skill-tag">{s}</span>)}
                {skills.length > 8 && <span style={{ fontSize: 12, color: '#444466' }}>+{skills.length - 8} more</span>}
              </div>

              {/* Two column layout */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, marginBottom: 32 }}>
                {/* Company matches */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Building2 size={20} color="#4f7dff" />
                      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0ff' }}>Company Matches</h2>
                    </div>
                    <button onClick={() => setActiveTab('companies')} style={{
                      fontSize: 13, color: '#7fa8ff', background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600,
                    }}>
                      View All <ArrowUpRight size={14} />
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                    {topCompanies.slice(0, 4).map((c, i) => (
                      <CompanyCard key={c.id} company={c} rank={i + 1} />
                    ))}
                  </div>
                </div>

                {/* AI Panel */}
                <AIRecommendation skills={skills} matchedCompanies={matchedCompanies} userProfile={userProfile} />
              </div>

              {/* Bottom row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <SkillsTracker skills={skills} />

                {/* Daily Tasks */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 16, padding: 24,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <Calendar size={20} color="#f59e0b" />
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#f0f0ff' }}>Daily Tasks</span>
                    <span style={{
                      marginLeft: 'auto', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                      background: 'rgba(245,158,11,0.15)', color: '#fbbf24',
                    }}>
                      {completedTasks}/{dailyTasks.length}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {dailyTasks.map(task => (
                      <div key={task.id} onClick={() => toggleTask(task.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '12px 14px', borderRadius: 10, cursor: 'pointer',
                          background: task.done ? 'rgba(34,197,94,0.05)' : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${task.done ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)'}`,
                          transition: 'all 0.2s',
                        }}
                      >
                        {task.done
                          ? <CheckCircle size={18} color="#22c55e" />
                          : <Circle size={18} color="#444466" />
                        }
                        <div style={{ flex: 1 }}>
                          <span style={{
                            fontSize: 13, fontWeight: 500,
                            color: task.done ? '#6b7280' : '#c0c0d8',
                            textDecoration: task.done ? 'line-through' : 'none',
                          }}>
                            {task.icon} {task.task}
                          </span>
                        </div>
                        <span style={{
                          fontSize: 11, padding: '2px 8px', borderRadius: 20,
                          background: 'rgba(79,125,255,0.1)', color: '#7fa8ff', fontWeight: 600,
                        }}>
                          +{task.xp} XP
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* XP bar */}
                  <div style={{ marginTop: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: '#6666aa' }}>Daily XP Progress</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#fbbf24' }}>
                        {dailyTasks.filter(t => t.done).reduce((s, t) => s + t.xp, 0)}/100 XP
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{
                        width: `${Math.min(dailyTasks.filter(t => t.done).reduce((s, t) => s + t.xp, 0), 100)}%`,
                        background: 'linear-gradient(90deg,#f59e0b,#fbbf24)',
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'companies' && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0ff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Building2 size={22} color="#4f7dff" /> All Company Matches
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
                {matchedCompanies.map((c, i) => (
                  <CompanyCard key={c.id} company={c} rank={i + 1} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div style={{
              maxWidth: 600,
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: 32,
            }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0ff', marginBottom: 24 }}>Your Profile</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#4f7dff,#a855f7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28, fontWeight: 800, color: 'white',
                  }}>
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#f0f0ff' }}>{user?.name}</div>
                    <div style={{ fontSize: 14, color: '#6666aa' }}>{user?.email}</div>
                  </div>
                </div>

                <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

                {userProfile && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <ProfileField label="College" value={userProfile.college} />
                    <ProfileField label="Branch" value={userProfile.branch} />
                    <ProfileField label="Year" value={userProfile.year} />
                    <ProfileField label="GPA" value={userProfile.gpa} />
                    <ProfileField label="Projects" value={userProfile.projects} />
                    <ProfileField label="Resume" value={userProfile.resume || 'Not uploaded'} />
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div style={{ maxWidth: 600 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0ff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Target size={22} color="#f59e0b" /> Daily Tasks
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {dailyTasks.map(task => (
                  <div key={task.id} onClick={() => toggleTask(task.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '16px 18px', borderRadius: 14, cursor: 'pointer',
                      background: task.done ? 'rgba(34,197,94,0.06)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${task.done ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.07)'}`,
                    }}
                  >
                    {task.done ? <CheckCircle size={20} color="#22c55e" /> : <Circle size={20} color="#444466" />}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: task.done ? '#6b7280' : '#f0f0ff', textDecoration: task.done ? 'line-through' : 'none' }}>
                        {task.icon} {task.task}
                      </div>
                      <div style={{ fontSize: 12, color: '#444466', marginTop: 2 }}>{task.type}</div>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24' }}>+{task.xp} XP</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <Leaderboard currentUserName={user?.name} />
          )}

          {activeTab === 'journey' && (
            <JourneyTimeline />
          )}

          {activeTab === 'agent' && (
            <AgentLogsPanel />
          )}

          {activeTab === 'settings' && (
            <div style={{
              textAlign: 'center', padding: '80px 20px',
              background: 'rgba(255,255,255,0.02)', borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <Zap size={48} color="#4f7dff" style={{ marginBottom: 16, opacity: 0.5 }} />
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#668', marginBottom: 8 }}>Settings Coming Soon</h2>
              <p style={{ fontSize: 14, color: '#444466' }}>This feature is under development.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div style={{
      padding: '12px 16px', borderRadius: 10,
      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ fontSize: 11, color: '#6666aa', fontWeight: 600, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: '#c0c0d8' }}>{value}</div>
    </div>
  );
}
