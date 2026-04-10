import { useState, useEffect } from 'react';
import { Sparkles, BookOpen, Code, Coffee, Brain, Target, ChevronRight } from 'lucide-react';

const tips = [
  { icon: Code, text: "Practice 3 LeetCode problems daily to maintain momentum", color: "#4f7dff" },
  { icon: BookOpen, text: "Read about System Design — it's asked in 80% of senior interviews", color: "#a855f7" },
  { icon: Brain, text: "Build a project using your weakest skill to learn faster", color: "#06b6d4" },
  { icon: Coffee, text: "Take breaks! The Pomodoro technique boosts retention by 20%", color: "#22c55e" },
  { icon: Target, text: "Focus on 2-3 target companies instead of applying everywhere", color: "#f59e0b" },
];

export default function AIInsightCard() {
  const [currentTip, setCurrentTip] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentTip(prev => (prev + 1) % tips.length);
        setVisible(true);
      }, 300);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const tip = tips[currentTip];
  const Icon = tip.icon;

  return (
    <div style={{
      background: `linear-gradient(135deg, ${tip.color}10, ${tip.color}05)`,
      border: `1px solid ${tip.color}25`,
      borderRadius: 16, padding: '20px 24px',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <Sparkles size={16} color={tip.color} />
        <span style={{ fontSize: 12, fontWeight: 700, color: tip.color, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          AI Insight
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          {tips.map((_, i) => (
            <div key={i} style={{
              width: i === currentTip ? 14 : 4, height: 4, borderRadius: 2,
              background: i === currentTip ? tip.color : 'rgba(255,255,255,0.1)',
              transition: 'all 0.3s',
            }} />
          ))}
        </div>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-8px)',
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          width: 42, height: 42, borderRadius: 12, flexShrink: 0,
          background: `${tip.color}18`, border: `1px solid ${tip.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={20} color={tip.color} />
        </div>
        <p style={{ fontSize: 14, color: '#c0c0d8', lineHeight: 1.6, flex: 1 }}>
          {tip.text}
        </p>
      </div>
    </div>
  );
}
