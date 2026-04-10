import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ParticleBackground from '../components/ParticleBackground';
import { Mail, Phone, MessageCircle, ShieldCheck, Zap, Clock, ArrowLeft } from 'lucide-react';

export default function SupportPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative', overflowX: 'hidden' }}>
      <ParticleBackground count={30} />
      
      <Navbar />

      {/* Hero */}
      <section style={{ padding: '140px 80px 80px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Link to="/home" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#8888bb', fontSize: 14, marginBottom: 24, textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 style={{ fontSize: 48, fontWeight: 900, color: '#f0f0ff', marginBottom: 16 }}>
          <span className="gradient-text">Support</span> Center
        </h1>
        <p style={{ fontSize: 18, color: '#8888bb', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
          We're here to help you succeed. Get in touch anytime.
        </p>
      </section>

      {/* Contact Cards */}
      <section style={{ padding: '0 80px 120px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: 32 
        }}>
          {/* Email */}
          <div className="glass-hover" style={{
            padding: '48px 32px',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 24,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={() => window.location.href = 'mailto:kuno.clannation@gmail.com'}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(79,125,255,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
          }}
          >
            <div style={{
              width: 72, height: 72, borderRadius: 20,
              background: 'rgba(79,125,255,0.15)',
              border: '1px solid rgba(79,125,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <Mail size={32} color="#4f7dff" />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#f0f0ff', marginBottom: 12 }}>Email Support</h3>
            <p style={{ fontSize: 15, color: '#8888bb', marginBottom: 16 }}>Technical issues & questions</p>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#4f7dff' }}>
              kuno.clannation@gmail.com
            </div>
          </div>

          {/* Phone */}
          <div className="glass-hover" style={{
            padding: '48px 32px',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 24,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={() => window.location.href = 'tel:+918076812631'}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(34,197,94,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
          }}
          >
            <div style={{
              width: 72, height: 72, borderRadius: 20,
              background: 'rgba(34,197,94,0.15)',
              border: '1px solid rgba(34,197,94,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <Phone size={32} color="#22c55e" />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#f0f0ff', marginBottom: 12 }}>Phone Support</h3>
            <p style={{ fontSize: 15, color: '#8888bb', marginBottom: 16 }}>Live assistance anytime</p>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#22c55e' }}>
              +91 80768 12631
            </div>
          </div>

          {/* Quick Resources */}
          <div style={{
            padding: '48px 32px',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 24,
            textAlign: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(168,85,247,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
          }}
          >
            <div style={{
              width: 72, height: 72, borderRadius: 20,
              background: 'rgba(168,85,247,0.15)',
              border: '1px solid rgba(168,85,247,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <MessageCircle size={32} color="#a855f7" />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#f0f0ff', marginBottom: 12 }}>Self Help</h3>
            <p style={{ fontSize: 15, color: '#8888bb' }}>Quick solutions</p>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to="/qa" style={{ color: '#c0c0d8', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#4f7dff'}>
                FAQ & Guides
              </Link>
              <Link to="/about" style={{ color: '#c0c0d8', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#4f7dff'}>
                Team Directory
              </Link>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div style={{
          marginTop: 60,
          padding: '60px',
          background: 'linear-gradient(135deg, rgba(79,125,255,0.05), rgba(34,197,94,0.05))',
          borderRadius: 24,
          border: '1px solid rgba(79,125,255,0.2)',
          textAlign: 'center',
          maxWidth: 900
        }}>
          <ShieldCheck size={56} color="#22c55e" style={{ margin: '0 auto 24px' }} />
          <h2 style={{ fontSize: 32, fontWeight: 900, color: '#f0f0ff', marginBottom: 16 }}>
            We Got Your Back
          </h2>
          <p style={{ fontSize: 16, color: '#8888bb', marginBottom: 32, lineHeight: 1.7 }}>
            Response guaranteed within 2 hours. Live phone support 24/7. No question too small.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            <a href="mailto:kuno.clannation@gmail.com" style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #4f7dff, #a855f7)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: 14,
              fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 8
            }}>
              <Mail size={18} />
              Send Email
            </a>
            <a href="tel:+918076812631" style={{
              padding: '16px 32px',
              background: 'rgba(34,197,94,0.15)',
              border: '1px solid rgba(34,197,94,0.4)',
              color: '#22c55e',
              textDecoration: 'none',
              borderRadius: 14,
              fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 8
            }}>
              <Phone size={18} />
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
