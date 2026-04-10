import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ParticleBackground from '../components/ParticleBackground';
import { testimonials, faqs, companies } from '../data/dummyData';
import { ChevronDown, ChevronUp, Zap, Brain, TrendingUp, Shield, Star, ArrowRight, Check } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [visibleWords, setVisibleWords] = useState([]);

  const heroWords = ["Smart", "AI.", "Real", "Placements"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const animateWords = () => {
      heroWords.forEach((word, index) => {
        setTimeout(() => {
          setVisibleWords(prev => [...prev, word]);
        }, index * 600); // 600ms delay between each word
      });
    };

    // Start animation after a brief delay
    const startTimer = setTimeout(animateWords, 500);
    return () => clearTimeout(startTimer);
  }, []);

  const features = [
    { icon: Brain, title: "AI-Powered Matching", desc: "Our algorithm matches your skills to company requirements with 95% accuracy", color: '#4f7dff' },
    { icon: TrendingUp, title: "Placement Probability", desc: "Know your exact selection chances before applying, powered by real data", color: '#a855f7' },
    { icon: Zap, title: "Smart Recommendations", desc: "Daily personalized tasks and skill roadmaps to maximize your placement", color: '#06b6d4' },
    { icon: Shield, title: "Mock Interviews", desc: "AI-evaluated mock interviews with detailed scoring and improvement tips", color: '#22c55e' },
  ];

  const stats = [
    { value: "94%", label: "Placement Rate" },
    { value: "500+", label: "Companies" },
    { value: "12K+", label: "Students Placed" },
    { value: "4.9★", label: "Average Rating" },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative', overflowX: 'hidden' }}>
      {/* Animated backgrounds */}
      <ParticleBackground count={60} />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <Navbar transparent={true} />

      {/* Hero */}
      <section className="hero-gradient" style={{ paddingTop: 140, paddingBottom: 100, textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Badge */}
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
            onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '16px 36px', borderRadius: 14, fontSize: 16, fontWeight: 600,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#c0c0e0', cursor: 'pointer',
            }}
          >
            Learn More
          </button>
        </div>

        {/* Stats */}
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
          {companies.slice(0, 8).map(c => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: 0.6, transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
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
            <div key={title} className="card glass-hover" style={{ textAlign: 'center' }}>
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

      {/* How it works */}
      <section style={{ padding: '80px', background: 'rgba(79,125,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.04)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: '#f0f0ff', textAlign: 'center', marginBottom: 60 }}>
            How It <span className="gradient-text">Works</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
            {[
              { step: '01', title: 'Create Profile', desc: 'Add your skills, GPA, and upload your resume in 2 minutes.' },
              { step: '02', title: 'AI Analysis', desc: 'Our AI analyzes your profile against 500+ company requirements.' },
              { step: '03', title: 'Get Matched', desc: 'See your match % and probability score for each company.' },
              { step: '04', title: 'Prepare & Apply', desc: 'Follow AI tasks, practice mock interviews, and apply with confidence.' },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px',
                  background: 'linear-gradient(135deg,#4f7dff,#a855f7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 900, color: 'white',
                  boxShadow: '0 8px 30px rgba(79,125,255,0.3)',
                }}>
                  {step}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#f0f0ff', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, color: '#6666aa', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '100px 80px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: '#f0f0ff', marginBottom: 60 }}>
            Students <span className="gradient-text">Love</span> OptiHire
          </h2>

          {/* Active testimonial */}
          <div style={{
            padding: '40px', borderRadius: 20,
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            marginBottom: 32, transition: 'all 0.4s ease',
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 20 }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={18} color="#fbbf24" fill="#fbbf24" />)}
            </div>
            <p style={{ fontSize: 18, color: '#c0c0d8', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 24 }}>
              "{testimonials[currentTestimonial].text}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: `${testimonials[currentTestimonial].color}33`,
                border: `2px solid ${testimonials[currentTestimonial].color}55`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, fontWeight: 700, color: testimonials[currentTestimonial].color,
              }}>
                {testimonials[currentTestimonial].avatar}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, color: '#f0f0ff', fontSize: 15 }}>{testimonials[currentTestimonial].name}</div>
                <div style={{ fontSize: 13, color: '#6666aa' }}>{testimonials[currentTestimonial].role} · {testimonials[currentTestimonial].college}</div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrentTestimonial(i)} style={{
                width: i === currentTestimonial ? 24 : 8, height: 8, borderRadius: 4,
                background: i === currentTestimonial ? '#4f7dff' : 'rgba(255,255,255,0.15)',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s',
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px', background: 'rgba(79,125,255,0.02)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: '#f0f0ff', textAlign: 'center', marginBottom: 48 }}>
            Frequently <span className="gradient-text">Asked</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((f, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 14, overflow: 'hidden', transition: 'all 0.2s',
              }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', padding: '18px 24px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
                    color: '#f0f0ff', fontSize: 15, fontWeight: 600, textAlign: 'left',
                  }}
                >
                  <span>{f.q}</span>
                  {openFaq === i ? <ChevronUp size={18} color="#4f7dff" /> : <ChevronDown size={18} color="#4f7dff" />}
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', fontSize: 14, color: '#8888bb', lineHeight: 1.7 }}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 80px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{
          maxWidth: 700, margin: '0 auto', padding: '60px 40px',
          background: 'linear-gradient(135deg,rgba(79,125,255,0.1),rgba(168,85,247,0.1))',
          border: '1px solid rgba(79,125,255,0.2)', borderRadius: 24,
          boxShadow: '0 0 80px rgba(79,125,255,0.1)',
        }}>
          <h2 style={{ fontSize: 40, fontWeight: 900, color: '#f0f0ff', marginBottom: 16 }}>
            Ready to Get <span className="gradient-text">Placed?</span>
          </h2>
          <p style={{ fontSize: 16, color: '#6666aa', marginBottom: 36, lineHeight: 1.6 }}>
            Join 12,000+ students who used OptiHire to land their dream jobs.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            {['No credit card required', 'Free forever for students', 'AI-powered matching'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Check size={14} color="#22c55e" />
                <span style={{ fontSize: 13, color: '#8888bb' }}>{t}</span>
              </div>
            ))}
          </div>
          <Link to="/auth?mode=signup" style={{
            padding: '16px 40px', borderRadius: 14, fontSize: 16, fontWeight: 700,
            background: 'linear-gradient(135deg,#4f7dff,#a855f7)', color: 'white',
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
            boxShadow: '0 8px 30px rgba(79,125,255,0.4)',
          }}>
            Start Free Today <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 80px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
          <Zap size={16} color="#4f7dff" fill="#4f7dff" />
          <span style={{ fontSize: 16, fontWeight: 800, color: '#f0f0ff' }}>
            Opti<span style={{ background: 'linear-gradient(135deg,#4f7dff,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Hire</span>
          </span>
        </div>
        <p style={{ fontSize: 13, color: '#333355' }}>© 2026 OptiHire. AI-Powered Placement Intelligence. Built for hackathon.</p>
      </footer>
    </div>
  );
}
