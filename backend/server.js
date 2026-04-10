import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ===== In-memory store (demo) =====
const users = {};
const applicationStore = {};  // userId -> applications[]
const agentLogStore = {};     // userId -> agentLogs[]

const companies = [
  { id: 1, name: "Google", requiredSkills: ["JavaScript", "Python", "Data Structures", "Algorithms", "System Design"], slots: 12, package: "₹45 LPA", difficulty: "Hard" },
  { id: 2, name: "Microsoft", requiredSkills: ["C#", "JavaScript", "Cloud", "Azure", "Algorithms"], slots: 8, package: "₹40 LPA", difficulty: "Hard" },
  { id: 3, name: "Amazon", requiredSkills: ["Java", "Algorithms", "Data Structures", "AWS", "System Design"], slots: 15, package: "₹38 LPA", difficulty: "Hard" },
  { id: 4, name: "Meta", requiredSkills: ["React", "JavaScript", "GraphQL", "Data Structures", "CSS"], slots: 6, package: "₹50 LPA", difficulty: "Hard" },
  { id: 5, name: "Flipkart", requiredSkills: ["Java", "MySQL", "Microservices", "Algorithms", "APIs"], slots: 20, package: "₹28 LPA", difficulty: "Medium" },
  { id: 6, name: "Razorpay", requiredSkills: ["Node.js", "APIs", "SQL", "JavaScript", "Security"], slots: 5, package: "₹35 LPA", difficulty: "Medium" },
  { id: 7, name: "Swiggy", requiredSkills: ["React Native", "JavaScript", "APIs", "Redux", "Firebase"], slots: 10, package: "₹30 LPA", difficulty: "Medium" },
  { id: 8, name: "Zepto", requiredSkills: ["Python", "Machine Learning", "TensorFlow", "Statistics", "SQL"], slots: 4, package: "₹32 LPA", difficulty: "Hard" },
];

// ===== ROUTES =====

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', name: 'OptiHire Agentic AI API', version: '2.0.0' });
});

// Signup
app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
  if (users[email]) return res.status(400).json({ error: 'User already exists' });
  const user = { id: Date.now().toString(), name, email, createdAt: new Date().toISOString() };
  users[email] = { ...user, password };
  res.json({ success: true, user });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users[email];
  if (!user || user.password !== password) return res.status(401).json({ error: 'Invalid credentials' });
  const { password: _, ...safeUser } = user;
  res.json({ success: true, user: safeUser });
});

// Get companies
app.get('/api/companies', (req, res) => {
  res.json({ companies });
});

// ===== AI RECOMMENDATION =====
app.post('/api/ai/recommend', (req, res) => {
  const { skills = [], matchScore = 0, probability = 0 } = req.body;
  let action, description;
  if (probability >= 75) { action = 'Apply Now'; description = 'Your profile is strong! Focus on interview preparation.'; }
  else if (probability >= 40) { action = 'Improve Skills'; description = 'Strengthen weak areas to boost your match score.'; }
  else { action = 'Build Foundation'; description = 'Focus on core CS fundamentals before applying.'; }
  res.json({ action, description, probability, matchScore });
});

// ===== INTERVIEW EVALUATE =====
app.post('/api/interview/evaluate', (req, res) => {
  const { question, answer, keywords = [] } = req.body;
  if (!answer || answer.trim().length < 10) return res.json({ score: 0, feedback: 'Answer too short.' });
  const answerLower = answer.toLowerCase();
  const matched = keywords.filter(k => answerLower.includes(k.toLowerCase()));
  const score = Math.round((matched.length / Math.max(keywords.length, 1)) * 100);
  res.json({ score, matched, missed: keywords.filter(k => !matched.includes(k)) });
});

// ===== APPLICATION TRACKING =====

// Create application
app.post('/api/applications/apply', (req, res) => {
  const { userId, companyId } = req.body;
  if (!userId || !companyId) return res.status(400).json({ error: 'userId and companyId required' });
  
  const company = companies.find(c => c.id === companyId);
  if (!company) return res.status(404).json({ error: 'Company not found' });

  if (!applicationStore[userId]) applicationStore[userId] = [];
  
  // Check duplicate
  if (applicationStore[userId].some(a => a.companyId === companyId)) {
    return res.status(400).json({ error: 'Already applied to this company' });
  }

  const application = {
    id: `app_${Date.now()}`,
    companyId,
    companyName: company.name,
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0],
  };

  applicationStore[userId].push(application);
  res.json({ success: true, application });
});

// Update application status
app.put('/api/applications/status', (req, res) => {
  const { userId, applicationId, status } = req.body;
  const validStatuses = ['Applied', 'Interview', 'Selected', 'Rejected'];
  if (!validStatuses.includes(status)) return res.status(400).json({ error: 'Invalid status' });

  const apps = applicationStore[userId] || [];
  const app = apps.find(a => a.id === applicationId);
  if (!app) return res.status(404).json({ error: 'Application not found' });

  app.status = status;
  res.json({ success: true, application: app });
});

// Get user applications
app.get('/api/applications/:userId', (req, res) => {
  const apps = applicationStore[req.params.userId] || [];
  res.json({ applications: apps });
});

// ===== AGENTIC AI ENGINE =====

// Run agent cycle for a student
app.post('/api/agent/run', (req, res) => {
  const { userId, skills = [], applications = [], matchedCompanies = [] } = req.body;
  
  const logs = [];
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

  // RULE 1: Inactivity
  const recentApps = applications.filter(a => new Date(a.appliedDate) > threeDaysAgo);
  if (recentApps.length === 0) {
    logs.push({
      id: `agent_${Date.now()}_inactivity`,
      rule: 'INACTIVITY',
      action: 'RECOMMEND_APPLY',
      message: 'No applications in last 3 days. Agent recommends applying to top-matching companies.',
      severity: 'warning',
      timestamp: new Date().toISOString(),
      auto: true,
    });
  }

  // RULE 2: Skill gaps
  const critical = ['Algorithms', 'Data Structures', 'System Design'];
  const missing = critical.filter(s => !skills.some(us => us.toLowerCase().includes(s.toLowerCase())));
  for (const skill of missing) {
    logs.push({
      id: `agent_${Date.now()}_skill_${skill}`,
      rule: 'SKILL_GAP',
      action: 'SUGGEST_IMPROVEMENT',
      message: `Missing critical skill: ${skill}. Agent suggests focused preparation.`,
      severity: 'info',
      timestamp: new Date().toISOString(),
      auto: true,
    });
  }

  // RULE 3: High opportunities
  const highOpp = matchedCompanies.filter(c => c.matchScore >= 80 && !applications.some(a => a.companyId === c.id));
  for (const c of highOpp) {
    logs.push({
      id: `agent_${Date.now()}_opp_${c.id}`,
      rule: 'HIGH_OPPORTUNITY',
      action: 'FLAG_HIGH_OPPORTUNITY',
      message: `HIGH OPPORTUNITY: ${c.name} has ${c.matchScore}% match. Apply now!`,
      severity: 'success',
      timestamp: new Date().toISOString(),
      auto: true,
    });
  }

  // Store logs
  if (!agentLogStore[userId]) agentLogStore[userId] = [];
  agentLogStore[userId] = [...logs, ...agentLogStore[userId]].slice(0, 50);

  res.json({ success: true, logs, count: logs.length });
});

// Get agent logs
app.get('/api/agent/logs/:userId', (req, res) => {
  const logs = agentLogStore[req.params.userId] || [];
  res.json({ logs });
});

// ===== ADMIN: RISK ANALYSIS =====
app.get('/api/admin/risk-analysis', (req, res) => {
  // In production, this would query the database
  // For demo, return classification logic description
  res.json({
    description: 'Risk classification: GREEN (ready) / YELLOW (moderate) / RED (at-risk)',
    criteria: {
      RED: 'Low applications + Low match score + Low aptitude',
      YELLOW: 'Moderate scores, some applications',
      GREEN: 'High match, multiple applications, strong profile',
    },
    formula: {
      skillsWeight: 0.5,
      projectsWeight: 0.2,
      performanceWeight: 0.2,
      aptitudeWeight: 0.1,
    },
  });
});

app.listen(PORT, () => {
  console.log(`\n  🚀 OptiHire Agentic AI API v2.0 running at http://localhost:${PORT}\n`);
});
