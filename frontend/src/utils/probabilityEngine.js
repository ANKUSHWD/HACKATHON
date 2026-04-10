/**
 * ================================================
 * SELECTION PROBABILITY ENGINE — PS1 Formula
 * ================================================
 * 
 * Score = (Skills Match × 0.5)
 *       + (Projects × 0.2)
 *       + (Past Performance × 0.2)
 *       + (Aptitude × 0.1)
 * 
 * Returns percentage (capped at 99%)
 */

/**
 * PS1 Selection Probability Calculator
 * @param {Object} student - Full student profile
 * @returns {number} Probability percentage (0-99)
 */
export function calculateSelectionProbability({ matchScore, projects, gpa, aptitude, interviewsCompleted, resume }) {
  // Normalize each factor to 0-100 scale
  const skillsScore = Math.min(matchScore || 0, 100);
  const projectScore = Math.min((projects || 0) * 12.5, 100);  // 8 projects = 100%
  const performanceScore = Math.min(((gpa || 7) / 10) * 100, 100);
  const aptitudeScore = Math.min(aptitude || 50, 100);

  // PS1 weighted formula
  const probability = Math.round(
    (skillsScore * 0.50) +
    (projectScore * 0.20) +
    (performanceScore * 0.20) +
    (aptitudeScore * 0.10)
  );

  // Resume bonus: +3% if resume uploaded
  const bonus = resume ? 3 : 0;

  return Math.min(probability + bonus, 99); // Cap at 99%
}

/**
 * Legacy wrapper — keeps backward compatibility with existing DataContext
 */
export function calculateProbability({ matchScore, gpa, projects, resume }) {
  return calculateSelectionProbability({
    matchScore,
    gpa,
    projects,
    resume,
    aptitude: 60, // Default aptitude for existing users
    interviewsCompleted: 0,
  });
}

/**
 * Get probability label, color, and style metadata
 */
export function getProbabilityMeta(probability) {
  if (probability >= 70) return { label: "Excellent", color: "#22c55e", bg: "rgba(34,197,94,0.15)", border: "rgba(34,197,94,0.3)" };
  if (probability >= 40) return { label: "Fair", color: "#f59e0b", bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.3)" };
  return { label: "Needs Work", color: "#ef4444", bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.3)" };
}

/**
 * Get overall skill strength score
 */
export function getSkillStrength(userSkills) {
  const skillWeights = {
    'System Design': 15, 'Algorithms': 12, 'Data Structures': 12,
    'Machine Learning': 10, 'AWS': 8, 'Azure': 8, 'GCP': 8,
    'React': 7, 'Node.js': 7, 'Python': 7, 'Java': 7,
    'Docker': 6, 'Kubernetes': 6, 'default': 4
  };
  let total = 0;
  for (const skill of userSkills) {
    total += skillWeights[skill] || skillWeights['default'];
  }
  return Math.min(total, 100);
}
