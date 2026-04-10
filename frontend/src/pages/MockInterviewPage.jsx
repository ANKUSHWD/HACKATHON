import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { interviewQuestions } from '../data/dummyData';
import { evaluateAnswer, calculateOverallInterviewScore, getInterviewFeedback } from '../utils/interviewEvaluator';
import { Brain, ChevronRight, Send, RotateCcw, Trophy, ArrowLeft, MessageSquare, Clock, Target } from 'lucide-react';

export default function MockInterviewPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState('');
  const [evaluations, setEvaluations] = useState([]);
  const [finished, setFinished] = useState(false);
  const [evaluating, setEvaluating] = useState(false);

  useEffect(() => {
    if (!user) navigate('/auth');
  }, [user]);

  const questions = interviewQuestions.default;

  const handleSubmitAnswer = () => {
    if (!answer.trim()) return;
    setEvaluating(true);

    setTimeout(() => {
      const evaluation = evaluateAnswer(questions[currentQ], answer);
      const newEvals = [...evaluations, { question: questions[currentQ], answer, ...evaluation }];
      setEvaluations(newEvals);
      setAnswer('');
      setEvaluating(false);

      if (currentQ + 1 < questions.length) {
        setCurrentQ(currentQ + 1);
      } else {
        setFinished(true);
      }
    }, 800);
  };

  const overallScore = calculateOverallInterviewScore(evaluations);
  const feedback = getInterviewFeedback(overallScore);

  const reset = () => {
    setStarted(false);
    setCurrentQ(0);
    setAnswer('');
    setEvaluations([]);
    setFinished(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <Navbar />

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '100px 24px 60px' }}>
        {/* Back button */}
        <button onClick={() => navigate('/dashboard')} style={{
          display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#6666aa',
          background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24,
        }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        {/* Not started */}
        {!started && (
          <div style={{
            textAlign: 'center', padding: '80px 40px',
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 24, position: 'relative', zIndex: 1,
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: 20, margin: '0 auto 24px',
              background: 'linear-gradient(135deg,#4f7dff,#a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 10px 40px rgba(79,125,255,0.4)',
            }}>
              <Brain size={40} color="white" />
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#f0f0ff', marginBottom: 12 }}>
              AI Mock <span className="gradient-text">Interview</span>
            </h1>
            <p style={{ fontSize: 16, color: '#6666aa', marginBottom: 36, maxWidth: 500, margin: '0 auto 36px' }}>
              Answer {questions.length} technical questions. Our AI will evaluate your responses and give you a detailed score with improvement suggestions.
            </p>

            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6666aa' }}>
                <MessageSquare size={16} color="#4f7dff" />
                <span style={{ fontSize: 14 }}>{questions.length} Questions</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6666aa' }}>
                <Clock size={16} color="#a855f7" />
                <span style={{ fontSize: 14 }}>~15 minutes</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6666aa' }}>
                <Target size={16} color="#22c55e" />
                <span style={{ fontSize: 14 }}>AI Scored</span>
              </div>
            </div>

            <button onClick={() => setStarted(true)} style={{
              padding: '16px 44px', borderRadius: 14, fontSize: 16, fontWeight: 700,
              background: 'linear-gradient(135deg,#4f7dff,#a855f7)', border: 'none',
              color: 'white', cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(79,125,255,0.4)',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              Start Interview <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* In progress */}
        {started && !finished && (
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 24, padding: '40px', position: 'relative', zIndex: 1,
          }}>
            {/* Progress */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
              {questions.map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 4, borderRadius: 2,
                  background: i <= currentQ ? 'linear-gradient(90deg,#4f7dff,#a855f7)' : 'rgba(255,255,255,0.08)',
                  transition: 'all 0.3s',
                }} />
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <span style={{ fontSize: 13, color: '#6666aa', fontWeight: 600 }}>
                Question {currentQ + 1} of {questions.length}
              </span>
              <span style={{ fontSize: 13, color: '#444466' }}>
                {questions[currentQ].expectedTopics}
              </span>
            </div>

            {/* Question */}
            <div style={{
              padding: '24px', borderRadius: 16, marginBottom: 24,
              background: 'linear-gradient(135deg,rgba(79,125,255,0.08),rgba(168,85,247,0.08))',
              border: '1px solid rgba(79,125,255,0.15)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: 'linear-gradient(135deg,#4f7dff,#a855f7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Brain size={18} color="white" />
                </div>
                <p style={{ fontSize: 17, fontWeight: 600, color: '#f0f0ff', lineHeight: 1.6 }}>
                  {questions[currentQ].question}
                </p>
              </div>
            </div>

            {/* Answer */}
            <textarea
              className="input-field"
              rows={6}
              placeholder="Type your answer here... Be detailed and use examples!"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              style={{
                resize: 'vertical', marginBottom: 20, fontFamily: 'Inter, system-ui, sans-serif',
                lineHeight: 1.7,
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: '#444466' }}>
                {answer.trim().split(/\s+/).filter(Boolean).length} words
              </span>
              <button
                onClick={handleSubmitAnswer}
                disabled={!answer.trim() || evaluating}
                style={{
                  padding: '14px 32px', borderRadius: 12, fontSize: 14, fontWeight: 700,
                  background: answer.trim() && !evaluating ? 'linear-gradient(135deg,#4f7dff,#a855f7)' : 'rgba(79,125,255,0.2)',
                  border: 'none', color: 'white',
                  cursor: answer.trim() && !evaluating ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', gap: 8,
                  boxShadow: answer.trim() ? '0 6px 20px rgba(79,125,255,0.3)' : 'none',
                }}
              >
                {evaluating ? (
                  <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                ) : (
                  <><Send size={15} /> Submit Answer</>
                )}
              </button>
            </div>

            {/* Previous evaluations */}
            {evaluations.length > 0 && (
              <div style={{ marginTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#6666aa', marginBottom: 12 }}>Previous Answers</h3>
                {evaluations.map((ev, i) => (
                  <div key={i} style={{
                    padding: '12px 16px', borderRadius: 10, marginBottom: 8,
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <span style={{ fontSize: 13, color: '#8888bb' }}>Q{i + 1}: {ev.question.question.slice(0, 40)}...</span>
                    <span style={{
                      padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                      background: ev.score >= 70 ? 'rgba(34,197,94,0.15)' : ev.score >= 40 ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                      color: ev.score >= 70 ? '#22c55e' : ev.score >= 40 ? '#f59e0b' : '#ef4444',
                    }}>
                      {ev.score}% ({ev.grade})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {finished && (
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 24, padding: '48px 40px', position: 'relative', zIndex: 1,
          }}>
            {/* Score header */}
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 20px' }}>
                <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="60" cy="60" r="52" fill="none"
                    stroke={feedback.color} strokeWidth="8"
                    strokeDasharray="326.7"
                    strokeDashoffset={326.7 - (326.7 * overallScore / 100)}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1.5s ease' }}
                  />
                </svg>
                <div style={{
                  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                  fontSize: 28, fontWeight: 900, color: feedback.color,
                }}>
                  {overallScore}%
                </div>
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 900, color: '#f0f0ff', marginBottom: 8 }}>
                <Trophy size={24} color={feedback.color} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                {feedback.grade}
              </h2>
              <p style={{ fontSize: 15, color: '#8888bb', maxWidth: 500, margin: '0 auto' }}>{feedback.message}</p>
            </div>

            {/* Tips */}
            <div style={{
              padding: '20px', borderRadius: 14, marginBottom: 32,
              background: 'rgba(79,125,255,0.06)', border: '1px solid rgba(79,125,255,0.12)',
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#7fa8ff', marginBottom: 12 }}>💡 Improvement Tips</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {feedback.tips.map((tip, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ChevronRight size={14} color="#4f7dff" />
                    <span style={{ fontSize: 14, color: '#c0c0d8' }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed results */}
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f0f0ff', marginBottom: 16 }}>Detailed Results</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {evaluations.map((ev, i) => (
                <div key={i} style={{
                  padding: '18px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#c0c0d8' }}>Q{i + 1}: {ev.question.question}</span>
                    <span style={{
                      padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700,
                      background: ev.score >= 70 ? 'rgba(34,197,94,0.15)' : ev.score >= 40 ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                      color: ev.score >= 70 ? '#22c55e' : ev.score >= 40 ? '#f59e0b' : '#ef4444',
                      border: `1px solid ${ev.score >= 70 ? 'rgba(34,197,94,0.3)' : ev.score >= 40 ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.3)'}`,
                    }}>
                      {ev.score}% — {ev.grade}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: '#6666aa', marginBottom: 10, fontStyle: 'italic' }}>
                    "{ev.answer.slice(0, 120)}{ev.answer.length > 120 ? '...' : ''}"
                  </div>
                  <div style={{ fontSize: 13, color: '#8888bb', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                    {ev.feedback}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12, marginTop: 32, justifyContent: 'center' }}>
              <button onClick={reset} style={{
                padding: '14px 28px', borderRadius: 12, fontSize: 14, fontWeight: 600,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#c0c0e0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <RotateCcw size={16} /> Try Again
              </button>
              <button onClick={() => navigate('/dashboard')} style={{
                padding: '14px 28px', borderRadius: 12, fontSize: 14, fontWeight: 700,
                background: 'linear-gradient(135deg,#4f7dff,#a855f7)', border: 'none',
                color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                boxShadow: '0 6px 20px rgba(79,125,255,0.3)',
              }}>
                Back to Dashboard <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
