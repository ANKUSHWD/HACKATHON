/**
 * AI Recommender — Rule-based recommendation system
 * Input: skills, matchScore, probability
 * Output: action, tasks, priority areas
 */

const actionThresholds = {
  APPLY: 75,
  IMPROVE: 40,
  WAIT: 0
};

const skillsRoadmap = {
  "JavaScript": ["Build 3 real-world JS projects", "Master async/await patterns", "Study event loop deeply"],
  "Python": ["Complete Python for DS course", "Build a REST API with FastAPI", "Learn pandas + numpy"],
  "React": ["Build a full-stack React app", "Master hooks & context", "Learn React Query"],
  "Algorithms": ["Solve 50 LeetCode medium problems", "Study sorting & searching", "Practice competitive programming"],
  "Data Structures": ["Master linked lists, trees, graphs", "Implement DS from scratch", "Solve 30 DS problems"],
  "System Design": ["Study 10 system design case studies", "Practice high-level architecture", "Learn CAP theorem"],
  "Machine Learning": ["Complete Andrew Ng's ML course", "Build 2 ML projects", "Study feature engineering"],
  "AWS": ["Get AWS Cloud Practitioner cert", "Deploy 2 apps on AWS", "Learn EC2, S3, Lambda"],
  "Node.js": ["Build a REST API with Node.js", "Study event-driven architecture", "Learn Express middleware"],
  "SQL": ["Complete SQL masterclass", "Practice complex JOINs", "Learn query optimization"],
};

const defaultTasks = [
  "Complete your profile with all skills",
  "Upload your latest resume",
  "Practice 5 LeetCode problems this week",
  "Research top 3 target companies",
  "Connect with seniors from target companies"
];

export function getAIRecommendation({ skills = [], matchScore = 0, probability = 0, missingSkills = [] }) {
  let action, actionColor, actionIcon, description;

  if (probability >= actionThresholds.APPLY) {
    action = "Apply Now";
    actionColor = "#22c55e";
    actionIcon = "🚀";
    description = "Your profile is strong! You're ready to apply. Focus on interview preparation now.";
  } else if (probability >= actionThresholds.IMPROVE) {
    action = "Improve Skills";
    actionColor = "#f59e0b";
    actionIcon = "📈";
    description = "You're on the right track! Strengthen your weak areas to boost your match score.";
  } else {
    action = "Build Foundation";
    actionColor = "#ef4444";
    actionIcon = "🔨";
    description = "Start with fundamentals. Focus on core CS skills before applying to top companies.";
  }

  // Generate personalized tasks
  const tasks = [];

  // Add tasks based on missing skills
  for (const skill of missingSkills.slice(0, 3)) {
    const roadmap = skillsRoadmap[skill];
    if (roadmap) {
      tasks.push({ task: roadmap[0], skill, priority: "high" });
    } else {
      tasks.push({ task: `Learn ${skill} fundamentals and build a project`, skill, priority: "medium" });
    }
  }

  // Add general tasks based on probability
  if (probability < 50) {
    tasks.push({ task: "Solve 10 LeetCode problems this week", skill: "Algorithms", priority: "high" });
    tasks.push({ task: "Build a full-stack portfolio project", skill: "Development", priority: "high" });
  } else if (probability < 75) {
    tasks.push({ task: "Practice mock interviews daily", skill: "Communication", priority: "medium" });
    tasks.push({ task: "Study System Design concepts", skill: "System Design", priority: "high" });
  } else {
    tasks.push({ task: "Apply to 5 companies this week", skill: "Application", priority: "high" });
    tasks.push({ task: "Prepare STAR-format behavioral stories", skill: "Interview Prep", priority: "medium" });
  }

  // Fill remaining with defaults
  while (tasks.length < 5) {
    const remaining = defaultTasks.filter(t => !tasks.some(task => task.task === t));
    if (remaining.length > 0) {
      tasks.push({ task: remaining[0], skill: "General", priority: "low" });
    } else break;
  }

  // Priority skills to focus on
  const prioritySkills = missingSkills.slice(0, 4).length > 0
    ? missingSkills.slice(0, 4)
    : ["System Design", "Algorithms"].filter(s => !skills.includes(s)).slice(0, 2);

  return {
    action,
    actionColor,
    actionIcon,
    description,
    tasks: tasks.slice(0, 5),
    prioritySkills,
    weeklyGoal: probability >= 75 ? "Apply to 3+ companies" : `Improve score by ${Math.min(10, 100 - probability)}%`
  };
}

export function getDailyTasks(skills) {
  const tasks = [
    { id: 1, task: "Solve 3 LeetCode problems", type: "Coding", xp: 30, done: false },
    { id: 2, task: "Read 1 System Design article", type: "Learning", xp: 20, done: false },
    { id: 3, task: "Practice 15 min mock interview", type: "Interview", xp: 25, done: false },
    { id: 4, task: "Update your LinkedIn profile", type: "Networking", xp: 15, done: false },
    { id: 5, task: "Watch 1 tech talk on YouTube", type: "Learning", xp: 10, done: false },
  ];
  return tasks;
}
