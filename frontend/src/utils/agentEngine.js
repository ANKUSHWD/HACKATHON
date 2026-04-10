/**
 * ========================================
 * AGENTIC AI ENGINE — Core Decision System
 * ========================================
 * 
 * This engine runs AUTONOMOUSLY — no user input needed.
 * It observes student data, makes decisions, and triggers actions.
 * 
 * 4 Rules:
 *   RULE 1: Inactivity Detection — no applications in 3+ days
 *   RULE 2: Skill Gap Alert     — weak skill area detected
 *   RULE 3: High Opportunity    — matchScore > 80% flagged
 *   RULE 4: Deadline Warning    — upcoming deadlines within 3 days
 */

// ===== RULE DEFINITIONS =====

const RULES = {
  INACTIVITY: {
    id: 'RULE_INACTIVITY',
    name: 'Inactivity Monitor',
    icon: '⏰',
    severity: 'warning',
    description: 'Detects students who have not applied in 3+ days',
  },
  SKILL_GAP: {
    id: 'RULE_SKILL_GAP',
    name: 'Skill Gap Analyzer',
    icon: '📉',
    severity: 'info',
    description: 'Identifies weak skill areas and suggests improvements',
  },
  HIGH_OPPORTUNITY: {
    id: 'RULE_HIGH_OPPORTUNITY',
    name: 'Opportunity Detector',
    icon: '🎯',
    severity: 'success',
    description: 'Flags companies with >80% match as high opportunities',
  },
  DEADLINE_WARNING: {
    id: 'RULE_DEADLINE',
    name: 'Deadline Watchdog',
    icon: '🚨',
    severity: 'critical',
    description: 'Warns about deadlines within 3 days',
  },
};

// ===== RULE IMPLEMENTATIONS =====

/**
 * RULE 1: Inactivity Detection
 * IF no applications in last 3 days → recommend companies
 */
function checkInactivity(student, applications, matchedCompanies) {
  const logs = [];
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
  
  const recentApps = applications.filter(app => 
    new Date(app.appliedDate) > threeDaysAgo
  );

  if (recentApps.length === 0) {
    // Find top 3 companies to recommend
    const topMatches = matchedCompanies
      .filter(c => !applications.some(a => a.companyId === c.id))
      .slice(0, 3);

    const companyNames = topMatches.map(c => c.name).join(', ');

    logs.push({
      id: `agent_${Date.now()}_inactivity`,
      rule: RULES.INACTIVITY,
      action: 'RECOMMEND_APPLY',
      message: `No applications detected in the last 3 days. Consider applying to: ${companyNames || 'available companies'}.`,
      recommendations: topMatches.map(c => c.name),
      severity: 'warning',
      timestamp: new Date().toISOString(),
      auto: true, // Agent acted autonomously
    });
  }

  return logs;
}

/**
 * RULE 2: Skill Gap Detection
 * IF critical skill missing (DSA, Algorithms, etc.) → suggest improvement
 */
function checkSkillGaps(student, skills, matchedCompanies) {
  const logs = [];
  
  // Critical skills every student should have
  const criticalSkills = ['Algorithms', 'Data Structures', 'System Design'];
  const missingCritical = criticalSkills.filter(
    s => !skills.some(us => us.toLowerCase().includes(s.toLowerCase()))
  );

  if (missingCritical.length > 0) {
    const taskMap = {
      'Algorithms': 'Solve 20 LeetCode medium problems this week',
      'Data Structures': 'Complete a DS course and implement 5 structures from scratch',
      'System Design': 'Study 5 system design case studies (URL shortener, Twitter, etc.)',
    };

    for (const skill of missingCritical) {
      logs.push({
        id: `agent_${Date.now()}_skill_${skill.replace(/\s+/g, '_')}`,
        rule: RULES.SKILL_GAP,
        action: 'SUGGEST_IMPROVEMENT',
        message: `Critical skill gap detected: ${skill} is missing. Task assigned: "${taskMap[skill] || `Learn ${skill} fundamentals`}"`,
        skill,
        assignedTask: taskMap[skill] || `Learn ${skill} fundamentals`,
        severity: 'info',
        timestamp: new Date().toISOString(),
        auto: true,
      });
    }
  }

  // Check if average match is below 50% — general weakness
  const avgMatch = matchedCompanies.length
    ? matchedCompanies.reduce((s, c) => s + c.matchScore, 0) / matchedCompanies.length
    : 0;

  if (avgMatch < 50 && matchedCompanies.length > 0) {
    // Find most-wanted skills across all companies
    const allMissing = matchedCompanies.flatMap(c => c.missingSkills || []);
    const freq = {};
    allMissing.forEach(s => { freq[s] = (freq[s] || 0) + 1; });
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    const topMissing = sorted.slice(0, 3).map(([s]) => s);

    logs.push({
      id: `agent_${Date.now()}_low_avg`,
      rule: RULES.SKILL_GAP,
      action: 'PRIORITY_SKILL_ALERT',
      message: `Average match score is only ${Math.round(avgMatch)}%. Focus on: ${topMissing.join(', ')} — these are required by most companies.`,
      prioritySkills: topMissing,
      severity: 'warning',
      timestamp: new Date().toISOString(),
      auto: true,
    });
  }

  return logs;
}

/**
 * RULE 3: High Opportunity Detection
 * IF matchScore > 80% → flag as HIGH OPPORTUNITY
 */
function checkHighOpportunities(student, matchedCompanies, applications) {
  const logs = [];

  const highMatches = matchedCompanies.filter(c => c.matchScore >= 80);
  const unappliedHigh = highMatches.filter(
    c => !applications.some(a => a.companyId === c.id)
  );

  if (unappliedHigh.length > 0) {
    for (const company of unappliedHigh) {
      logs.push({
        id: `agent_${Date.now()}_opp_${company.id}`,
        rule: RULES.HIGH_OPPORTUNITY,
        action: 'FLAG_HIGH_OPPORTUNITY',
        message: `HIGH OPPORTUNITY: ${company.name} has ${company.matchScore}% match with your profile. Apply now before ${company.deadline || 'the deadline passes'}!`,
        companyId: company.id,
        companyName: company.name,
        matchScore: company.matchScore,
        severity: 'success',
        timestamp: new Date().toISOString(),
        auto: true,
      });
    }
  }

  return logs;
}

/**
 * RULE 4: Deadline Warning
 * IF deadline within 3 days → trigger alert
 */
function checkDeadlines(student, matchedCompanies, applications) {
  const logs = [];
  const now = new Date();
  const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  for (const company of matchedCompanies) {
    if (!company.deadline) continue;
    
    const deadline = new Date(company.deadline);
    const hasApplied = applications.some(a => a.companyId === company.id);

    // Deadline within 3 days and student hasn't applied
    if (deadline > now && deadline <= threeDaysFromNow && !hasApplied) {
      const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
      
      logs.push({
        id: `agent_${Date.now()}_deadline_${company.id}`,
        rule: RULES.DEADLINE_WARNING,
        action: 'DEADLINE_ALERT',
        message: `URGENT: ${company.name} deadline is in ${daysLeft} day${daysLeft === 1 ? '' : 's'}! Match: ${company.matchScore}%. Apply immediately.`,
        companyId: company.id,
        companyName: company.name,
        daysLeft,
        severity: 'critical',
        timestamp: new Date().toISOString(),
        auto: true,
      });
    }
  }

  return logs;
}

// ===== MAIN AGENT CYCLE =====

/**
 * runAgentCycle — The main autonomous agent function
 * 
 * Called automatically on dashboard load.
 * Observes → Decides → Acts
 * 
 * @param {Object} student - User profile data
 * @param {Array} skills - User's skills array
 * @param {Array} applications - User's application entries
 * @param {Array} matchedCompanies - Companies with match scores
 * @returns {Array} agentLogs — Array of autonomous actions taken
 */
export function runAgentCycle({ student, skills, applications, matchedCompanies }) {
  const allLogs = [];

  // OBSERVE → DECIDE → ACT for each rule
  allLogs.push(...checkInactivity(student, applications, matchedCompanies));
  allLogs.push(...checkSkillGaps(student, skills, matchedCompanies));
  allLogs.push(...checkHighOpportunities(student, matchedCompanies, applications));
  allLogs.push(...checkDeadlines(student, matchedCompanies, applications));

  // Sort by severity priority: critical > warning > success > info
  const severityOrder = { critical: 0, warning: 1, success: 2, info: 3 };
  allLogs.sort((a, b) => (severityOrder[a.severity] ?? 4) - (severityOrder[b.severity] ?? 4));

  return allLogs;
}

/**
 * Get risk level for a student (used by admin dashboard)
 * GREEN → ready, YELLOW → moderate, RED → at-risk
 */
export function classifyStudentRisk({ matchScore, probability, applicationsCount, aptitude }) {
  let riskScore = 0;

  // Low match = risk
  if (matchScore < 40) riskScore += 3;
  else if (matchScore < 60) riskScore += 1;

  // Low probability = risk
  if (probability < 40) riskScore += 3;
  else if (probability < 60) riskScore += 1;

  // Few applications = risk
  if (applicationsCount === 0) riskScore += 2;
  else if (applicationsCount < 2) riskScore += 1;

  // Low aptitude = risk
  if ((aptitude || 0) < 40) riskScore += 1;

  if (riskScore >= 5) return { level: 'RED', label: 'At Risk', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' };
  if (riskScore >= 2) return { level: 'YELLOW', label: 'Moderate', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' };
  return { level: 'GREEN', label: 'Ready', color: '#22c55e', bg: 'rgba(34,197,94,0.12)' };
}

export { RULES };
