/**
 * Interview Evaluator — Keyword-based scoring
 */

export function evaluateAnswer(question, userAnswer) {
  if (!userAnswer || userAnswer.trim().length < 10) {
    return { score: 0, feedback: "Answer too short. Please provide a detailed response." };
  }

  const answerLower = userAnswer.toLowerCase();
  const keywords = question.keywords || [];
  
  let matchedKeywords = [];
  let missedKeywords = [];

  for (const kw of keywords) {
    if (answerLower.includes(kw.toLowerCase())) {
      matchedKeywords.push(kw);
    } else {
      missedKeywords.push(kw);
    }
  }

  // Base score from keywords
  const keywordScore = keywords.length > 0 
    ? (matchedKeywords.length / keywords.length) * 100 
    : 50;

  // Length bonus (detailed answers get bonus)
  const wordCount = userAnswer.trim().split(/\s+/).length;
  const lengthBonus = wordCount >= 80 ? 10 : wordCount >= 40 ? 5 : 0;

  // Structure bonus (contains examples, "for example", "such as", "I built", etc.)
  const structureKeywords = ["example", "for instance", "such as", "built", "implemented", "used", "when i", "my project"];
  const hasStructure = structureKeywords.some(k => answerLower.includes(k));
  const structureBonus = hasStructure ? 5 : 0;

  const finalScore = Math.min(Math.round(keywordScore + lengthBonus + structureBonus), 100);

  let feedback = [];
  if (matchedKeywords.length > 0) {
    feedback.push(`✅ Covered: ${matchedKeywords.join(", ")}`);
  }
  if (missedKeywords.length > 0) {
    feedback.push(`❌ Could improve: ${missedKeywords.join(", ")}`);
  }
  if (wordCount < 40) {
    feedback.push("💡 Try to give more detailed answers (40+ words)");
  }
  if (!hasStructure) {
    feedback.push("💡 Use examples from your projects to strengthen your answer");
  }
  if (finalScore >= 80) {
    feedback.push("🌟 Excellent answer! Well-structured and comprehensive.");
  } else if (finalScore >= 60) {
    feedback.push("👍 Good answer! A few more specifics would make it stronger.");
  }

  return {
    score: finalScore,
    matchedKeywords,
    missedKeywords,
    wordCount,
    feedback: feedback.join("\n"),
    grade: finalScore >= 80 ? "A" : finalScore >= 60 ? "B" : finalScore >= 40 ? "C" : "D"
  };
}

export function calculateOverallInterviewScore(evaluations) {
  if (!evaluations || evaluations.length === 0) return 0;
  const total = evaluations.reduce((sum, e) => sum + (e.score || 0), 0);
  return Math.round(total / evaluations.length);
}

export function getInterviewFeedback(overallScore) {
  if (overallScore >= 85) return { 
    grade: "Excellent", color: "#22c55e",
    message: "Outstanding performance! You're ready for top-tier company interviews.",
    tips: ["Apply to top companies now", "Focus on negotiation skills", "Practice one more system design round"]
  };
  if (overallScore >= 70) return {
    grade: "Good", color: "#4f7dff",
    message: "Strong performance with some areas to polish.",
    tips: ["Deepen technical explanations", "Add more concrete examples", "Practice behavioral questions"]
  };
  if (overallScore >= 50) return {
    grade: "Average", color: "#f59e0b",
    message: "Decent start, but needs more structured preparation.",
    tips: ["Review and re-answer the weak questions", "Study core CS concepts", "Practice daily mock interviews"]
  };
  return {
    grade: "Needs Work", color: "#ef4444",
    message: "Keep practicing! Every expert was once a beginner.",
    tips: ["Start with fundamental CS concepts", "Practice explaining your thoughts out loud", "Read interview experiences on InterviewBit"]
  };
}
