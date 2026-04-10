// =====================================================
// OptiHire AI — Dummy Data (Extended for Agentic System)
// =====================================================

// Company data with difficulty ratings
export const companies = [
  {
    id: 1, name: "Google", logo: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", color: "#4285f4",
    domain: "Software Engineering", difficulty: "Hard",
    requiredSkills: ["JavaScript", "Python", "Data Structures", "Algorithms", "System Design"],
    slots: 12, deadline: "2026-05-15", package: "₹45 LPA",
    description: "Build products for billions of users."
  },
  {
    id: 2, name: "Microsoft", logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31", color: "#00a4ef",
    domain: "Software Development", difficulty: "Hard",
    requiredSkills: ["C#", "JavaScript", "Cloud", "Azure", "Algorithms"],
    slots: 8, deadline: "2026-05-20", package: "₹40 LPA",
    description: "Empower every person and organization."
  },
  {
    id: 3, name: "Amazon", logo: "📦", color: "#ff9900",
    domain: "Full Stack Development", difficulty: "Hard",
    requiredSkills: ["Java", "Algorithms", "Data Structures", "AWS", "System Design"],
    slots: 15, deadline: "2026-05-10", package: "₹38 LPA",
    description: "Earth's most customer-centric company."
  },
  {
    id: 4, name: "Meta", logo: "https://logos-world.net/wp-content/uploads/2020/11/Meta-Logo.png", color: "#0668e1",
    domain: "Frontend Engineering", difficulty: "Hard",
    requiredSkills: ["React", "JavaScript", "GraphQL", "Data Structures", "CSS"],
    slots: 6, deadline: "2026-05-25", package: "₹50 LPA",
    description: "Build the future of social connection."
  },
  {
    id: 5, name: "Flipkart", logo: "🛒", color: "#2874f0",
    domain: "Backend Development", difficulty: "Medium",
    requiredSkills: ["Java", "MySQL", "Microservices", "Algorithms", "APIs"],
    slots: 20, deadline: "2026-04-30", package: "₹28 LPA",
    description: "India's largest e-commerce platform."
  },
  {
    id: 6, name: "Razorpay", logo: "💳", color: "#0c6cf2",
    domain: "Fintech Engineering", difficulty: "Medium",
    requiredSkills: ["Node.js", "APIs", "SQL", "JavaScript", "Security"],
    slots: 5, deadline: "2026-06-01", package: "₹35 LPA",
    description: "Power payments for Indian businesses."
  },
  {
    id: 7, name: "Swiggy", logo: "https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png",
    domain: "Mobile Development", difficulty: "Medium",
    requiredSkills: ["React Native", "JavaScript", "APIs", "Redux", "Firebase"],
    slots: 10, deadline: "2026-05-18", package: "₹30 LPA",
    description: "Delivering happiness to millions."
  },
  {
    id: 8, name: "Zepto", logo: "/zepto.png", color: "#7c3aed",
    domain: "ML Engineering", difficulty: "Hard",
    requiredSkills: ["Python", "Machine Learning", "TensorFlow", "Statistics", "SQL"],
    slots: 4, deadline: "2026-05-28", package: "₹32 LPA",
    description: "Quick commerce reinvented."
  },
];

// Interview questions per domain
export const interviewQuestions = {
  default: [
    { id: 1, question: "Tell me about yourself and your technical background.", keywords: ["experience", "projects", "skills", "built", "developed", "worked"], expectedTopics: "Background, projects, technical skills" },
    { id: 2, question: "Explain the difference between SQL and NoSQL databases.", keywords: ["sql", "nosql", "relational", "schema", "flexible", "scalable", "mongodb", "postgresql"], expectedTopics: "Database types, use cases, trade-offs" },
    { id: 3, question: "What is the time complexity of binary search and why?", keywords: ["log n", "o(log n)", "divide", "divide and conquer", "half", "sorted"], expectedTopics: "Algorithm analysis, divide and conquer" },
    { id: 4, question: "How would you handle rate limiting in a REST API?", keywords: ["limit", "throttle", "redis", "token bucket", "sliding window", "rate", "request"], expectedTopics: "API design, caching, performance" },
    { id: 5, question: "Describe a challenging project you built and how you solved its main problem.", keywords: ["challenge", "problem", "solution", "implemented", "optimized", "team", "result"], expectedTopics: "Problem solving, teamwork, technical depth" },
  ]
};

// Extended student data with journey tracking for admin panel
export const dummyStudents = [
  {
    id: 1, name: "Arjun Sharma", email: "arjun@college.edu",
    skills: ["React", "Node.js", "MongoDB", "Algorithms", "System Design"],
    gpa: 8.9, matchScore: 87, probability: 91, aptitude: 82,
    status: "High", lastActive: "2026-04-09T10:00:00Z",
    interviewsCompleted: 3, projects: 6,
    applications: [
      { companyName: "Google", companyId: 1, status: "Interview", appliedDate: "2026-04-01" },
      { companyName: "Meta", companyId: 4, status: "Applied", appliedDate: "2026-04-05" },
      { companyName: "Flipkart", companyId: 5, status: "Selected", appliedDate: "2026-03-20" },
    ]
  },
  {
    id: 2, name: "Priya Patel", email: "priya@college.edu",
    skills: ["Python", "Machine Learning", "TensorFlow", "Data Structures", "SQL"],
    gpa: 9.2, matchScore: 92, probability: 95, aptitude: 90,
    status: "High", lastActive: "2026-04-09T14:00:00Z",
    interviewsCompleted: 5, projects: 8,
    applications: [
      { companyName: "Google", companyId: 1, status: "Interview", appliedDate: "2026-04-02" },
      { companyName: "Zepto", companyId: 8, status: "Selected", appliedDate: "2026-03-25" },
      { companyName: "Amazon", companyId: 3, status: "Applied", appliedDate: "2026-04-07" },
    ]
  },
  {
    id: 3, name: "Rohit Kumar", email: "rohit@college.edu",
    skills: ["Java", "Spring"],
    gpa: 7.1, matchScore: 54, probability: 48, aptitude: 45,
    status: "Low", lastActive: "2026-04-03T09:00:00Z",
    interviewsCompleted: 0, projects: 1,
    applications: [
      { companyName: "Flipkart", companyId: 5, status: "Rejected", appliedDate: "2026-03-15" },
    ]
  },
  {
    id: 4, name: "Neha Singh", email: "neha@college.edu",
    skills: ["JavaScript", "CSS", "React", "Node.js"],
    gpa: 8.3, matchScore: 73, probability: 77, aptitude: 68,
    status: "Medium", lastActive: "2026-04-08T16:00:00Z",
    interviewsCompleted: 2, projects: 4,
    applications: [
      { companyName: "Meta", companyId: 4, status: "Interview", appliedDate: "2026-04-03" },
      { companyName: "Razorpay", companyId: 6, status: "Applied", appliedDate: "2026-04-06" },
    ]
  },
  {
    id: 5, name: "Abhishek Jain", email: "abhi@college.edu",
    skills: ["C++", "Algorithms", "Data Structures"],
    gpa: 8.7, matchScore: 68, probability: 72, aptitude: 75,
    status: "Medium", lastActive: "2026-04-07T11:00:00Z",
    interviewsCompleted: 1, projects: 3,
    applications: [
      { companyName: "Amazon", companyId: 3, status: "Applied", appliedDate: "2026-04-04" },
    ]
  },
  {
    id: 6, name: "Kavya Reddy", email: "kavya@college.edu",
    skills: ["Python", "Django", "SQL"],
    gpa: 8.0, matchScore: 61, probability: 63, aptitude: 60,
    status: "Medium", lastActive: "2026-04-06T08:00:00Z",
    interviewsCompleted: 1, projects: 3,
    applications: [
      { companyName: "Razorpay", companyId: 6, status: "Applied", appliedDate: "2026-04-02" },
    ]
  },
  {
    id: 7, name: "Vivek Gupta", email: "vivek@college.edu",
    skills: ["PHP", "MySQL"],
    gpa: 6.5, matchScore: 32, probability: 28, aptitude: 30,
    status: "Low", lastActive: "2026-03-28T10:00:00Z",
    interviewsCompleted: 0, projects: 0,
    applications: []
  },
  {
    id: 8, name: "Ananya Bose", email: "ananya@college.edu",
    skills: ["React", "TypeScript", "AWS", "System Design", "Algorithms", "Data Structures"],
    gpa: 9.5, matchScore: 95, probability: 97, aptitude: 95,
    status: "High", lastActive: "2026-04-09T18:00:00Z",
    interviewsCompleted: 6, projects: 10,
    applications: [
      { companyName: "Google", companyId: 1, status: "Selected", appliedDate: "2026-03-10" },
      { companyName: "Microsoft", companyId: 2, status: "Interview", appliedDate: "2026-04-01" },
      { companyName: "Amazon", companyId: 3, status: "Applied", appliedDate: "2026-04-08" },
    ]
  },
];

export const allSkills = [
  "JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Angular",
  "Node.js", "Python", "Java", "C++", "C#", "Go", "Rust",
  "MongoDB", "MySQL", "PostgreSQL", "Redis", "Firebase",
  "AWS", "Azure", "GCP", "Docker", "Kubernetes",
  "Machine Learning", "TensorFlow", "PyTorch", "Data Science",
  "Algorithms", "Data Structures", "System Design",
  "GraphQL", "REST APIs", "Microservices",
  "React Native", "Flutter",
  "CSS", "Tailwind", "SASS",
  "Git", "CI/CD", "DevOps",
  "SQL", "NoSQL", "Cloud", "Security",
  "Redux", "APIs", "Statistics"
];

export const testimonials = [
  { name: "Riya Mehta", role: "SDE at Google", college: "IIT Bombay", avatar: "RM", color: "#4285f4", text: "OptiHire predicted my placement at Google 3 months before the actual interview. The skill gap analysis was spot on!", rating: 5 },
  { name: "Karthik N.", role: "Software Engineer at Amazon", college: "NIT Trichy", avatar: "KN", color: "#ff9900", text: "The mock interview feature is mind-blowing. Practiced 50+ questions and walked into Amazon feeling fully prepared.", rating: 5 },
  { name: "Shruti Agarwal", role: "ML Engineer at Meta", college: "BITS Pilani", avatar: "SA", color: "#0668e1", text: "I was struggling with skills direction. OptiHire's AI told me to focus on System Design — and that's what Meta asked!", rating: 5 },
  { name: "Pranav Joshi", role: "Full Stack Dev at Razorpay", college: "VIT Vellore", avatar: "PJ", color: "#0c6cf2", text: "From 40% match to getting placed — OptiHire's weekly tasks and company match system transformed my preparation.", rating: 5 },
  { name: "Deepika Ram", role: "SDE-2 at Flipkart", college: "IIIT Hyderabad", avatar: "DR", color: "#2874f0", text: "Best placement prep tool I've used. The probability prediction is eerily accurate!", rating: 5 },
];

export const faqs = [
  { q: "How does the Agentic AI work?", a: "Our agent autonomously monitors your profile, detects skill gaps, flags high-opportunity companies, warns about deadlines, and detects inactivity — all without you asking. It observes, decides, and acts on its own." },
  { q: "How does OptiHire calculate my selection probability?", a: "We use the PS1 formula: Skills Match (50%) + Projects (20%) + Past Performance (20%) + Aptitude (10%). This gives a weighted prediction of your placement chances." },
  { q: "What is the Student Journey Tracker?", a: "It's a visual pipeline that shows your entire placement lifecycle: Resume Uploaded → Applied → Interview → Selected. Track every company application in real-time." },
  { q: "How accurate is the mock interview scoring?", a: "Our keyword-based evaluation system is trained on thousands of real interview Q&As. It scores you on key concept coverage, not exact phrasing." },
  { q: "What does the TPC Admin dashboard show?", a: "Training & Placement Coordinators get a risk-classified view of all students (GREEN/YELLOW/RED), placement pipeline analytics, and the agent's autonomous action feed." },
];
