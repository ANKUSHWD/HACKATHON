import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ParticleBackground from '../components/ParticleBackground';
import { Users, Code, Palette, Target, ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  const team = [
    {
      name: 'ANKUSH KUMAR',
      role: 'Founder & Full Stack Developer',
      bio: 'I am the founder and core developer behind this platform, working as a full stack developer to bring ideas into reality. From designing system architecture to building scalable solutions, I focus on creating a seamless and impactful user experience. My vision is to simplify the placement journey using intelligent technology and real-world problem solving.',
      icon: Code,
      color: '#4f7dff',
      image: '/file_00000000aa8472088f6c9bfd4b6ca7c4.png'
    },
    {
      name: 'AHMED UL ISLAM',
      role: '🎨 Frontend Developer',
      bio: 'AHMED UL ISLAM is responsible for crafting the visual and interactive layer of the platform. With a strong eye for detail and performance, he ensures that every user interaction feels smooth, responsive, and engaging across all devices.',
      icon: Palette,
      color: '#a855f7',
      image: '/IMG_20250207_170020_591.jpg.jpeg'
    },
    {
      name: 'KASHISH KUMARI',
      role: '🖌️ UI/UX Designer',
      bio: 'Kashish leads the design experience, focusing on creating intuitive, user-friendly, and visually appealing interfaces. Her goal is to make complex processes feel simple, ensuring users can navigate effortlessly while enjoying a modern design.',
      icon: Palette,
      color: '#06b6d4',
      image: '/kashish-kumari.jpg'
    },
    {
      name: 'PRASHANT VARSHNEY',
      role: '🎯 Mentor',
      bio: 'Prashant Varshney provides strategic guidance and mentorship to the team. With his experience and insights, he helps shape the vision, refine execution, and ensure the platform delivers real value to its users.',
      icon: Target,
      color: '#22c55e'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative', overflowX: 'hidden' }}>
      <ParticleBackground count={40} />
      
      <Navbar />

      {/* Hero */}
      <section style={{ padding: '140px 80px 80px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Link to="/home" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#8888bb', fontSize: 14, marginBottom: 24, textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 style={{ fontSize: 48, fontWeight: 900, color: '#f0f0ff', marginBottom: 16 }}>
          Meet the <span className="gradient-text">Team</span>
        </h1>
        <p style={{ fontSize: 18, color: '#8888bb', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
          The passionate creators behind OptiHire. We combine AI expertise, design thinking, 
          and real-world placement strategies to help you succeed.
        </p>
      </section>

      {/* Team Section - Apple-style cards */}
      <section style={{ padding: '0 80px 120px', maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr', 
          gap: 40, 
          marginTop: 40,
          maxWidth: 600,
          margin: '40px auto 0'
        }}>
          {team.map(({ name, role, bio, icon: Icon, color, image }, index) => (
            <div
              key={name}
              className="team-card"
              style={{
                padding: '40px 32px',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 24,
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transform: 'translateY(0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 32px 80px ${color}20, 0 0 0 1px ${color}30`;
                e.currentTarget.style.borderColor = `${color}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
              }}
            >
              {/* Photo Passport Space */}
              <div style={{
                width: 140,
                height: 180,
                background: 'linear-gradient(135deg, #4f7dff22, #a855f720)',
                border: `2px dashed ${color}50`,
                borderRadius: 16,
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderStyle = 'solid';
                  e.currentTarget.style.borderColor = `${color}`;
                  e.currentTarget.style.background = `${color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderStyle = 'dashed';
                  e.currentTarget.style.borderColor = `${color}50`;
                  e.currentTarget.style.background = 'linear-gradient(135deg, #4f7dff22, #a855f720)';
                }}
              >
                {image ? (
                  <img 
                    src={image} 
                    alt={`${name} photo`}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      borderRadius: 12
                    }}
                  />
                ) : (
                  <div style={{
                    fontSize: 48,
                    opacity: 0.4,
                    pointerEvents: 'none'
                  }}>
                    📷
                  </div>
                )}
                {!image && (
                  <div style={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    background: `${color}80`,
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: 6,
                    fontSize: 10,
                    fontWeight: 600,
                    pointerEvents: 'none'
                  }}>
                    Add Photo
                  </div>
                )}
              </div>

              {/* Icon */}
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: `${color}18`,
                border: `1px solid ${color}33`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <Icon size={24} color={color} />
              </div>

              {/* Name & Role */}
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#f0f0ff', marginBottom: 8, textAlign: 'center' }}>
                {name}
              </h3>
              <div style={{ fontSize: 14, color, fontWeight: 700, marginBottom: 20, textAlign: 'center' }}>
                {role}
              </div>

              {/* Bio */}
              <p style={{ 
                fontSize: 15, 
                color: '#c0c0d8', 
                lineHeight: 1.7, 
                textAlign: 'center',
                marginBottom: 0 
              }}>
                {bio}
              </p>

              {/* Hover glow effect */}
              <div style={{
                position: 'absolute',
                top: -50,
                left: -50,
                right: -50,
                bottom: -50,
                background: `radial-gradient(circle at 30% 30%, ${color}10 0%, transparent 50%)`,
                opacity: 0,
                transition: 'opacity 0.4s ease',
                pointerEvents: 'none',
                zIndex: 0
              }} />
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .team-card {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        .team-card:nth-child(1) { animation-delay: 0.1s; }
        .team-card:nth-child(2) { animation-delay: 0.2s; }
        .team-card:nth-child(3) { animation-delay: 0.3s; }
        .team-card:nth-child(4) { animation-delay: 0.4s; }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

