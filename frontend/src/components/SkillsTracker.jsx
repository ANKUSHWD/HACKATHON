import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Star } from 'lucide-react';
import { getSkillStrength } from '../utils/probabilityEngine';

const skillCategories = {
  'Frontend': ['React', 'Next.js', 'Vue.js', 'Angular', 'JavaScript', 'TypeScript', 'CSS', 'Tailwind', 'SASS'],
  'Backend': ['Node.js', 'Python', 'Java', 'C#', 'Go', 'Rust', 'PHP', 'Django', 'FastAPI', 'Spring'],
  'Database': ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'Firebase', 'SQL', 'NoSQL'],
  'Cloud & DevOps': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'DevOps'],
  'CS Fundamentals': ['Algorithms', 'Data Structures', 'System Design'],
  'AI & Data': ['Machine Learning', 'TensorFlow', 'PyTorch', 'Data Science'],
};

export default function SkillsTracker({ skills = [] }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getCategory = (categories, skills) => {
    return Object.entries(categories).map(([cat, catSkills]) => {
      const owned = catSkills.filter(s => skills.some(u => u.toLowerCase() === s.toLowerCase()));
      const pct = Math.round((owned.length / catSkills.length) * 100);
      return { cat, total: catSkills.length, owned: owned.length, pct };
    }).filter(c => c.total > 0);
  };

  const categoryData = getCategory(skillCategories, skills);
  const overallStrength = getSkillStrength(skills);

  return (
    <div ref={ref} style={{
      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 16, padding: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <TrendingUp size={20} color="#4f7dff" />
          <span style={{ fontSize: 16, fontWeight: 700, color: '#f0f0ff' }}>Skills Tracker</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Star size={14} color="#fbbf24" fill="#fbbf24" />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24' }}>{skills.length} skills</span>
        </div>
      </div>

      {/* Overall strength */}
      <div style={{
        padding: '14px 16px', borderRadius: 12, marginBottom: 20,
        background: 'linear-gradient(135deg,rgba(79,125,255,0.1),rgba(168,85,247,0.1))',
        border: '1px solid rgba(79,125,255,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: 12, color: '#8888bb', marginBottom: 4 }}>Overall Skill Strength</div>
          <div style={{ fontSize: 24, fontWeight: 800, background: 'linear-gradient(135deg,#4f7dff,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {overallStrength}%
          </div>
        </div>
        <div style={{ width: 60, height: 60, position: 'relative' }}>
          <svg width="60" height="60" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
            <circle cx="30" cy="30" r="24" fill="none"
              stroke="url(#grad)" strokeWidth="5"
              strokeDasharray="150.8"
              strokeDashoffset={animated ? 150.8 - (150.8 * overallStrength / 100) : 150.8}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1.5s ease' }}
            />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4f7dff" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Category breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {categoryData.map(({ cat, total, owned, pct }) => (
          <div key={cat}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontSize: 13, color: '#c0c0d8', fontWeight: 500 }}>{cat}</span>
              <span style={{ fontSize: 12, color: '#6666aa' }}>{owned}/{total}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: animated ? `${pct}%` : '0%' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Skills chips */}
      {skills.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 12, color: '#6666aa', marginBottom: 10, fontWeight: 600 }}>Your Skills</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {skills.map(skill => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
