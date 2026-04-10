/**
 * Match Engine
 * Calculates match % between user skills and company required skills
 */

export function calculateMatchScore(userSkills, requiredSkills) {
  if (!requiredSkills || requiredSkills.length === 0) return 0;
  if (!userSkills || userSkills.length === 0) return 0;

  const userSkillsLower = userSkills.map(s => s.toLowerCase().trim());
  const requiredLower = requiredSkills.map(s => s.toLowerCase().trim());

  let matched = 0;
  for (const req of requiredLower) {
    if (userSkillsLower.some(u => u.includes(req) || req.includes(u))) {
      matched++;
    }
  }

  return Math.round((matched / requiredSkills.length) * 100);
}

/**
 * Returns an array with match info for each company
 */
export function matchUserToCompanies(userSkills, companies) {
  return companies.map(company => ({
    ...company,
    matchScore: calculateMatchScore(userSkills, company.requiredSkills),
    matchedSkills: company.requiredSkills.filter(req =>
      userSkills.some(u => u.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(u.toLowerCase()))
    ),
    missingSkills: company.requiredSkills.filter(req =>
      !userSkills.some(u => u.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(u.toLowerCase()))
    )
  })).sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Get top N companies by match
 */
export function getTopMatches(userSkills, companies, n = 5) {
  return matchUserToCompanies(userSkills, companies).slice(0, n);
}
