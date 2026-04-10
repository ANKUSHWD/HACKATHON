import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { allSkills } from '../data/dummyData';
import { Zap, ChevronRight, ChevronLeft, Code, FileText, GraduationCap, Info, X, Check, Search } from 'lucide-react';

const steps = [
  { id: 0, title: 'Your Skills', desc: 'What technologies do you know?', icon: Code },
  { id: 1, title: 'Resume', desc: 'Upload your latest resume', icon: FileText },
  { id: 2, title: 'College Details', desc: 'Tell us about your education', icon: GraduationCap },
  { id: 3, title: 'Extra Info', desc: 'Almost done!', icon: Info },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [skills, setSkills] = useState([]);
  const [skillSearch, setSkillSearch] = useState('');
  const [resume, setResume] = useState(null);
  const [college, setCollege] = useState({ name: '', branch: '', year: '', gpa: '' });
  const [extra, setExtra] = useState({ projects: '', github: '', linkedin: '' });
  const [saving, setSaving] = useState(false);
  const { user, updateUser } = useAuth();
  const { saveProfile } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/auth');
    if (user?.onboardingComplete) navigate('/dashboard');
  }, [user]);

  const toggleSkill = (skill) => {
    setSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  const filteredSkills = allSkills.filter(s =>
    s.toLowerCase().includes(skillSearch.toLowerCase()) && !skills.includes(s)
  );

  const canProceed = () => {
    if (step === 0) return skills.length >= 1;
    if (step === 1) return true; // Resume is optional
    if (step === 2) return college.name && college.branch;
    return true;
  };

  const handleFinish = () => {
    setSaving(true);
    setTimeout(() => {
      const profile = {
        skills,
        resume: resume?.name || null,
        college: college.name,
        branch: college.branch,
        year: college.year || '4th',
        gpa: parseFloat(college.gpa) || 7.5,
        projects: parseInt(extra.projects) || 2,
        github: extra.github,
        linkedin: extra.linkedin,
      };
      saveProfile(user, profile);
      updateUser({ onboardingComplete: true });
      navigate('/dashboard');
    }, 1200);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else handleFinish();
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-primary)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px', position: 'relative', overflow: 'hidden',
    }}>
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div style={{
        width: '100%', maxWidth: 600,
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 24, padding: '44px 40px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
        position: 'relative', zIndex: 1,
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, margin: '0 auto 14px',
            background: 'linear-gradient(135deg,#4f7dff,#a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(79,125,255,0.4)',
          }}>
            <Zap size={24} color="white" fill="white" />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#f0f0ff', marginBottom: 4 }}>Set Up Your Profile</h1>
          <p style={{ fontSize: 14, color: '#6666aa' }}>Step {step + 1} of {steps.length} — {steps[step].desc}</p>
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 36 }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: i <= step ? 'linear-gradient(90deg,#4f7dff,#a855f7)' : 'rgba(255,255,255,0.08)',
              transition: 'all 0.4s ease',
            }} />
          ))}
        </div>

        {/* Step title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          {(() => { const Icon = steps[step].icon; return (
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'rgba(79,125,255,0.1)', border: '1px solid rgba(79,125,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={20} color="#7fa8ff" />
            </div>
          ); })()}
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0ff' }}>{steps[step].title}</h2>
          </div>
        </div>

        {/* Step 0: Skills */}
        {step === 0 && (
          <div>
            {/* Selected skills */}
            {skills.length > 0 && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                {skills.map(s => (
                  <span key={s} onClick={() => toggleSkill(s)} style={{
                    padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                    background: 'rgba(79,125,255,0.15)', border: '1px solid rgba(79,125,255,0.3)',
                    color: '#93b4ff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
                  }}>
                    {s} <X size={12} />
                  </span>
                ))}
              </div>
            )}
            {/* Search */}
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <Search size={16} color="#6666aa" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input className="input-field" style={{ paddingLeft: 40 }} placeholder="Search skills..."
                value={skillSearch} onChange={e => setSkillSearch(e.target.value)} />
            </div>
            {/* Options */}
            <div style={{ maxHeight: 200, overflowY: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {filteredSkills.slice(0, 25).map(s => (
                <button key={s} onClick={() => toggleSkill(s)} style={{
                  padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  color: '#8888bb', cursor: 'pointer', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,125,255,0.3)'; e.currentTarget.style.color = '#c0c0e0'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#8888bb'; }}
                >
                  + {s}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 12, color: '#444466', marginTop: 12 }}>Selected: {skills.length} skills (minimum 1)</p>
          </div>
        )}

        {/* Step 1: Resume */}
        {step === 1 && (
          <div>
            <div
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); setResume(e.dataTransfer.files[0]); }}
              style={{
                padding: '48px 24px', borderRadius: 14, textAlign: 'center',
                border: '2px dashed rgba(79,125,255,0.3)', cursor: 'pointer',
                background: resume ? 'rgba(34,197,94,0.05)' : 'rgba(79,125,255,0.03)',
                transition: 'all 0.3s',
              }}
              onClick={() => document.getElementById('resume-input').click()}
            >
              {resume ? (
                <div>
                  <Check size={32} color="#22c55e" style={{ marginBottom: 8 }} />
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#22c55e' }}>Uploaded: {resume.name}</p>
                  <p style={{ fontSize: 12, color: '#6666aa', marginTop: 4 }}>Click to change file</p>
                </div>
              ) : (
                <div>
                  <FileText size={32} color="#4f7dff" style={{ marginBottom: 8 }} />
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#c0c0d8' }}>Drop your resume here</p>
                  <p style={{ fontSize: 12, color: '#6666aa', marginTop: 4 }}>PDF, DOC, DOCX (max 5MB)</p>
                </div>
              )}
            </div>
            <input id="resume-input" type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
              onChange={e => setResume(e.target.files[0])} />
            <p style={{ fontSize: 12, color: '#444466', marginTop: 16 }}>📌 Resume is optional but improves your match accuracy!</p>
          </div>
        )}

        {/* Step 2: College */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#8888bb', marginBottom: 6, display: 'block' }}>College Name *</label>
              <input className="input-field" placeholder="e.g. IIT Bombay" value={college.name}
                onChange={e => setCollege({ ...college, name: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#8888bb', marginBottom: 6, display: 'block' }}>Branch / Major *</label>
              <input className="input-field" placeholder="e.g. Computer Science" value={college.branch}
                onChange={e => setCollege({ ...college, branch: e.target.value })} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#8888bb', marginBottom: 6, display: 'block' }}>Year</label>
                <select className="input-field" value={college.year} onChange={e => setCollege({ ...college, year: e.target.value })}>
                  <option value="">Select</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                  <option value="Graduated">Graduated</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#8888bb', marginBottom: 6, display: 'block' }}>GPA (out of 10)</label>
                <input className="input-field" type="number" step="0.1" min="0" max="10" placeholder="e.g. 8.5"
                  value={college.gpa} onChange={e => setCollege({ ...college, gpa: e.target.value })} />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Extra */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#8888bb', marginBottom: 6, display: 'block' }}>Number of Projects</label>
              <input className="input-field" type="number" min="0" max="50" placeholder="e.g. 5"
                value={extra.projects} onChange={e => setExtra({ ...extra, projects: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#8888bb', marginBottom: 6, display: 'block' }}>GitHub Profile</label>
              <input className="input-field" placeholder="https://github.com/yourname"
                value={extra.github} onChange={e => setExtra({ ...extra, github: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#8888bb', marginBottom: 6, display: 'block' }}>LinkedIn Profile</label>
              <input className="input-field" placeholder="https://linkedin.com/in/yourname"
                value={extra.linkedin} onChange={e => setExtra({ ...extra, linkedin: e.target.value })} />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 36 }}>
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            style={{
              padding: '12px 24px', borderRadius: 10, fontSize: 14, fontWeight: 600,
              background: step === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)', color: step === 0 ? '#333355' : '#c0c0e0',
              cursor: step === 0 ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <ChevronLeft size={16} /> Back
          </button>
          <button
            onClick={nextStep}
            disabled={!canProceed() || saving}
            style={{
              padding: '12px 28px', borderRadius: 10, fontSize: 14, fontWeight: 700,
              background: canProceed() && !saving ? 'linear-gradient(135deg,#4f7dff,#a855f7)' : 'rgba(79,125,255,0.2)',
              border: 'none', color: 'white',
              cursor: canProceed() && !saving ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: canProceed() ? '0 6px 20px rgba(79,125,255,0.3)' : 'none',
            }}
          >
            {saving ? (
              <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
            ) : (
              <>{step === 3 ? 'Finish Setup' : 'Continue'} <ChevronRight size={16} /></>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
