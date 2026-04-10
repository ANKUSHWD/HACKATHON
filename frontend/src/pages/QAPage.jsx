import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ParticleBackground from '../components/ParticleBackground';
import { Search, ChevronDown, ChevronUp, Zap, MessageCircle, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: "How does the AI matching work?",
    a: "Our proprietary algorithm analyzes 500+ company requirements against your skills, projects, GPA, and interview history to calculate precise match percentages and placement probabilities."
  },
  {
    q: "Is it really free for students?",
    a: "Yes! Completely free for students. No credit card required, no usage limits, forever. We make money from enterprise partnerships only."
  },
  {
    q: "How accurate is the placement probability?",
    a: "95%+ accuracy based on 12K+ placements. We use real hiring data, rejection patterns, and your profile evolution to predict outcomes."
  },
  {
    q: "Can I track my AI agent actions?",
    a: "Yes! Your personal AI agent logs every action: profile scans, opportunity detection, task creation, risk alerts. Full transparency."
  },
  {
    q: "What happens in mock interviews?",
    a: "AI conducts timed interviews, evaluates responses with detailed scores (content, clarity, structure), and provides personalized improvement plans."
  },
  {
    q: "Do companies see my profile?",
    a: "Only companies you apply to. We anonymize data until match threshold (80%+) and you approve the connection."
  },
  {
    q: "How often should I update my profile?",
    a: "Daily! Add new projects, skills, grades. AI recalculates matches instantly and creates personalized daily tasks."
  },
  {
    q: "What if I get no matches?",
    a: "Impossible. We show ALL opportunities ranked by probability. Even 20% matches get you improvement roadmap + skill gaps analysis."
  }
];

export default function QAPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setSearchParams({ q: query || null });
    
    const filtered = faqs.filter(faq => 
      faq.q.toLowerCase().includes(query) || 
      faq.a.toLowerCase().includes(query)
    );
    setFilteredFaqs(filtered);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative', overflowX: 'hidden' }}>
      <ParticleBackground count={30} />
      
      <Navbar />

      {/* Search Header */}
      <section style={{ padding: '140px 80px 60px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 800, margin: '0 auto 60px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 44, fontWeight: 900, color: '#f0f0ff', marginBottom: 16 }}>
            Frequently <span className="gradient-text">Asked</span>
          </h1>
          <p style={{ fontSize: 18, color: '#8888bb', lineHeight: 1.7 }}>
            Search or browse common questions. Can't find answer? <Link to="/auth" style={{ color: '#4f7dff' }}>Contact support</Link>.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ 
          maxWidth: 600, 
          margin: '0 auto',
          position: 'relative'
        }}>
          <Search size={20} style={{ 
            position: 'absolute', 
            left: 20, 
            top: '50%', 
            transform: 'translateY(-50%)', 
            color: '#8888bb',
            zIndex: 2 
          }} />
          <input
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Ask anything... 'mock interview', 'free', 'accuracy' etc."
            style={{
              width: '100%',
              padding: '18px 24px 18px 60px',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16,
              color: '#f0f0ff',
              fontSize: 16,
              outline: 'none',
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#4f7dff';
              e.target.style.boxShadow = '0 0 0 3px rgba(79,125,255,0.1)';
              e.target.style.background = 'rgba(255,255,255,0.08)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255,255,255,0.1)';
              e.target.style.boxShadow = 'none';
              e.target.style.background = 'rgba(255,255,255,0.05)';
            }}
          />
          {filteredFaqs.length === 0 && searchQuery && (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#8888bb'
            }}>
              <HelpCircle size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
              <p style={{ fontSize: 16 }}>No results for "{searchQuery}". Try different keywords or <Link to="/auth" style={{ color: '#4f7dff' }}>contact us</Link>.</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ List */}
      <section style={{ padding: '0 80px 120px', maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filteredFaqs.map((faq, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16,
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              <button
                onClick={() => toggleFaq(index)}
                style={{
                  width: '100%', padding: '24px 28px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  color: '#f0f0ff', fontSize: 16, fontWeight: 600, textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(79,125,255,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'linear-gradient(135deg, #4f7dff20, #a855f720)',
                    border: '1px solid rgba(79,125,255,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <MessageCircle size={18} color="#4f7dff" />
                  </div>
                  <span>{faq.q}</span>
                </div>
                {openFaq === index ? <ChevronUp size={20} color="#4f7dff" /> : <ChevronDown size={20} color="#4f7dff" />}
              </button>
              
              {openFaq === index && (
                <div style={{
                  padding: '0 28px 28px',
                  fontSize: 15,
                  color: '#c0c0d8',
                  lineHeight: 1.7,
                  background: 'rgba(79,125,255,0.03)'
                }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {searchQuery === '' && (
          <div style={{
            textAlign: 'center',
            padding: '60px 40px',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: 20,
            marginTop: 40,
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <Zap size={48} color="#8888bb" style={{ margin: '0 auto 20px', opacity: 0.6 }} />
            <h3 style={{ fontSize: 20, color: '#f0f0ff', marginBottom: 12 }}>Still have questions?</h3>
            <p style={{ fontSize: 15, color: '#8888bb', marginBottom: 24 }}>
              Join thousands of students getting real-time answers from our AI.
            </p>
            <Link 
              to="/auth?mode=signup"
              style={{
                padding: '14px 32px',
                background: 'linear-gradient(135deg, #4f7dff, #a855f7)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: 14,
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 8px 30px rgba(79,125,255,0.4)'
              }}
            >
              Get Started Free
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

