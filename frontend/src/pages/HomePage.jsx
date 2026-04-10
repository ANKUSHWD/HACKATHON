import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ParticleBackground from '../components/ParticleBackground';
import { testimonials, faqs, companies } from '../data/dummyData';
import { ChevronDown, ChevronUp, Zap, Brain, TrendingUp, Shield, Star, ArrowRight, Check } from 'lucide-react';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [visibleWords, setVisibleWords] = useState([]);

  const heroWords = ['Smart', 'AI.', 'Real', 'Placements'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const animateWords = () => {
      heroWords.forEach((word, index) => {
        setTimeout(() => {
          setVisibleWords((prev) => [...prev, word]);
        }, index * 600);
      });
    };
    const startTimer = setTimeout(animateWords, 500);
    return () => clearTimeout(startTimer);
  }, []);

  const features = [
    { icon: Brain, title: 'AI-Powered Matching', desc: 'Our algorithm matches your skills to company requirements with 95% accuracy', color: '#4f7dff' },
    { icon: TrendingUp, title: 'Placement Probability', desc: 'Know your exact selection chances before applying, powered by real data', color: '#a855f7' },
    { icon: Zap, title: 'Smart Recommendations', desc: 'Daily personalized tasks and skill roadmaps to maximize your placement', color: '#06b6d4' },
    { icon: Shield, title: 'Mock Interviews', desc: 'AI-evaluated mock interviews with detailed scoring and improvement tips', color: '#22c55e' },
  ];

  const stats = [
    { value: '94%', label: 'Placement Rate' },
    { value: '500+', label: 'Companies' },
    { value: '12K+', label: 'Students Placed' },
    { value: '4.9★', label: 'Average Rating' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative', overflowX: 'hidden' }}>
      <ParticleBackground count={60} />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <Navbar />

      {/* Hero */}
      <section className="hero-gradient" style={{ paddingTop: 140, paddingBottom: 100, textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: 'rgba(79,125,255,0.1)', border: '1px solid rgba(79,125,255,0.2)', marginBottom: 32 }}>
          <span style={{ fontSize: 12, color: '#7fa8ff', fontWeight: 600 }}>🤖 Agentic AI — Autonomous Placement Intelligence</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 900, lineHeight: 1.1,
          color: '#f0f0ff', marginBottom: 24, maxWidth: 900, margin: '0 auto 24px',
        }}>
          {visibleWords.map((word, index) => (
            <span
              key={index}
              style={{
                display: 'inline-block',
                animation: 'fadeInUp 0.8s ease-out forwards',
                marginRight: word === 'AI.' ? '0.3em' : '0.5em',
              }}
            >
              {word === 'Placements' ? (
                <span className="gradient-text">{word}</span>
              ) : (
                word
              )}
            </span>
          ))}
        </h1>

        <p style={{ fontSize: 18, color: '#8888bb', maxWidth: 620, margin: '0 auto 48px', lineHeight: 1.7 }}>
          OptiHire's autonomous AI agent watches your profile, detects opportunities, flags risks, and takes action — Your Personal Career Mentor.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/auth?mode=signup" style={{
            padding: '16px 36px', borderRadius: 14, fontSize: 16, fontWeight: 700,
            background: 'linear-gradient(135deg,#4f7dff,#a855f7)', color: 'white',
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: '0 8px 30px rgba(79,125,255,0.4)',
            transition: 'all 0.3s',
          }}>
            Get Started Free <ArrowRight size={18} />
          </Link>
          <button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '16px 36px', borderRadius: 14, fontSize: 16, fontWeight: 600,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#c0c0e0', cursor: 'pointer',
            }}
          >
            Learn More
          </button>
        </div>

        <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', marginTop: 80 }}>
          {stats.map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 900, background: 'linear-gradient(135deg,#4f7dff,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{value}</div>
              <div style={{ fontSize: 13, color: '#6666aa', fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Company logos */}
      <section style={{ padding: '60px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ fontSize: 13, color: '#6666aa', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Trusted by students placed at</p>
        </div>
        <div style={{ display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap', padding: '0 40px' }}>
          {companies.slice(0, 8).map((c) => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: 0.6, transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
            >
              {c.logo.startsWith('http') || c.logo.startsWith('/') ? (
                <img 
                  src={c.logo} 
                  alt={`${c.name} logo`}
                  style={{ 
                    width: 24, 
                    height: 24, 
                    objectFit: 'contain',
                    borderRadius: 4
                  }}
                />
              ) : (
                <span style={{ fontSize: 24 }}>{c.logo}</span>
              )}
              <span style={{ fontSize: 14, fontWeight: 700, color: '#c0c0d8' }}>{c.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '100px 80px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 42, fontWeight: 900, color: '#f0f0ff', marginBottom: 16 }}>
            Everything You Need to <span className="gradient-text">Get Placed</span>
          </h2>
          <p style={{ fontSize: 16, color: '#6666aa', maxWidth: 500, margin: '0 auto' }}>
            One intelligent platform to go from "applying everywhere" to "choosing the right offer."
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="card glass-hover" style={{ textAlign: 'center', padding: '32px 24px', borderRadius: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: `${color}18`, border: `1px solid ${color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <Icon size={26} color={color} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0ff', marginBottom: 10 }}>{title}</h3>
              <p style={{ fontSize: 14, color: '#6666aa', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Simplified rest - full content available in LandingPage if needed */}
      <section style={{ padding: '80px', textAlign: 'center' }}>
        <Link to="/about" style={{ color: '#4f7dff', fontSize: 18, fontWeight: 600 }}>Learn about our team →</Link>
      </section>
    </div>
  );
}

