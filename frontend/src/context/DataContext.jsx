import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { companies as defaultCompanies } from '../data/dummyData';
import { matchUserToCompanies } from '../utils/matchEngine';
import { calculateSelectionProbability } from '../utils/probabilityEngine';
import { runAgentCycle } from '../utils/agentEngine';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [notifications, setNotifications] = useState([]);           // Toast notifications
  const [persistentNotifs, setPersistentNotifs] = useState([]);     // Bell icon notifications
  const [matchedCompanies, setMatchedCompanies] = useState([]);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [applications, setApplications] = useState([]);             // Student's company applications
  const [agentLogs, setAgentLogs] = useState([]);                   // Autonomous agent action logs
  const [agentRunning, setAgentRunning] = useState(false);          // Agent active indicator

  // ===== PROFILE MANAGEMENT =====

  const loadUserProfile = useCallback((user) => {
    if (!user) return;
    const stored = localStorage.getItem(`optihire_profile_${user.id}`);
    if (stored) {
      const profile = JSON.parse(stored);
      setUserProfile(profile);

      // Load applications
      const storedApps = localStorage.getItem(`optihire_apps_${user.id}`);
      const apps = storedApps ? JSON.parse(storedApps) : [];
      setApplications(apps);

      // Load persistent notifications
      const storedNotifs = localStorage.getItem(`optihire_notifs_${user.id}`);
      if (storedNotifs) setPersistentNotifs(JSON.parse(storedNotifs));

      recalculate(profile, apps);
    }
  }, []);

  const saveProfile = (user, profileData) => {
    const profile = { ...profileData, userId: user.id, updatedAt: new Date().toISOString() };
    localStorage.setItem(`optihire_profile_${user.id}`, JSON.stringify(profile));
    setUserProfile(profile);
    recalculate(profile, applications);
    addNotification("🎉 Profile updated! Matches recalculated.", "success");
    return profile;
  };

  // ===== MATCHING + PROBABILITY =====

  const recalculate = (profile, apps = []) => {
    if (!profile) return;
    const skills = profile.skills || [];
    const matched = matchUserToCompanies(skills, defaultCompanies);
    const withProbability = matched.map(c => ({
      ...c,
      probability: calculateSelectionProbability({
        matchScore: c.matchScore,
        gpa: profile.gpa || 7,
        projects: profile.projects || 0,
        resume: !!profile.resume,
        aptitude: profile.aptitude || 60,
        interviewsCompleted: profile.interviewsCompleted || 0,
      }),
      // Flag if student has applied
      applicationStatus: apps.find(a => a.companyId === c.id)?.status || null,
      hasApplied: apps.some(a => a.companyId === c.id),
    }));
    setMatchedCompanies(withProbability);

    // Generate daily tasks
    const tasks = [
      { id: 1, task: "Solve 3 LeetCode problems", type: "Coding", xp: 30, done: false, icon: "💻" },
      { id: 2, task: "Read 1 System Design article", type: "Learning", xp: 20, done: false, icon: "📖" },
      { id: 3, task: "Practice 15 min mock interview", type: "Interview", xp: 25, done: false, icon: "🎤" },
      { id: 4, task: "Update LinkedIn profile", type: "Networking", xp: 15, done: false, icon: "🌐" },
      { id: 5, task: "Watch 1 tech talk video", type: "Learning", xp: 10, done: false, icon: "▶️" },
    ];
    const storedTasks = localStorage.getItem(`optihire_tasks_${profile.userId}`);
    setDailyTasks(storedTasks ? JSON.parse(storedTasks) : tasks);

    // Run agent cycle autonomously after recalculation
    runAgent(profile, skills, apps, withProbability);
  };

  // ===== AGENTIC AI ENGINE =====

  const runAgent = (profile, skills, apps, matched) => {
    setAgentRunning(true);

    // Simulate agent "thinking" delay for realistic feel
    setTimeout(() => {
      const logs = runAgentCycle({
        student: profile,
        skills,
        applications: apps,
        matchedCompanies: matched,
      });

      // Only add NEW logs (deduplicate by rule+action)
      setAgentLogs(prev => {
        const existingKeys = new Set(prev.map(l => `${l.rule.id}_${l.action}`));
        const newLogs = logs.filter(l => !existingKeys.has(`${l.rule.id}_${l.action}`));
        const merged = [...newLogs, ...prev].slice(0, 50); // Keep last 50

        // Store in localStorage
        if (profile?.userId) {
          localStorage.setItem(`optihire_agent_${profile.userId}`, JSON.stringify(merged));
        }
        return merged;
      });

      // Convert critical/warning agent logs to persistent notifications
      const alertLogs = logs.filter(l => l.severity === 'critical' || l.severity === 'warning');
      if (alertLogs.length > 0) {
        setPersistentNotifs(prev => {
          const existingMsgs = new Set(prev.map(n => n.message));
          const newNotifs = alertLogs
            .filter(l => !existingMsgs.has(l.message))
            .map(l => ({
              id: l.id,
              message: l.message,
              type: l.severity === 'critical' ? 'deadline' : 'agent',
              icon: l.rule.icon,
              timestamp: l.timestamp,
              read: false,
            }));
          const merged = [...newNotifs, ...prev].slice(0, 20);
          if (profile?.userId) {
            localStorage.setItem(`optihire_notifs_${profile.userId}`, JSON.stringify(merged));
          }
          return merged;
        });
      }

      setAgentRunning(false);
    }, 800); // Agent processes for 800ms
  };

  // ===== APPLICATION TRACKING =====

  const applyToCompany = (companyId, userId) => {
    const company = defaultCompanies.find(c => c.id === companyId);
    if (!company) return;
    
    // Check if already applied
    if (applications.some(a => a.companyId === companyId)) {
      addNotification(`⚠️ Already applied to ${company.name}`, "warning");
      return;
    }

    const newApp = {
      id: `app_${Date.now()}`,
      companyId,
      companyName: company.name,
      status: "Applied",
      appliedDate: new Date().toISOString().split('T')[0],
    };

    const updated = [...applications, newApp];
    setApplications(updated);
    localStorage.setItem(`optihire_apps_${userId}`, JSON.stringify(updated));
    
    addNotification(`✅ Applied to ${company.name}! Track your journey.`, "success");

    // Recalculate to update application status on company cards
    if (userProfile) recalculate(userProfile, updated);
  };

  const updateApplicationStatus = (appId, newStatus, userId) => {
    const updated = applications.map(a =>
      a.id === appId ? { ...a, status: newStatus } : a
    );
    setApplications(updated);
    localStorage.setItem(`optihire_apps_${userId}`, JSON.stringify(updated));
    
    const app = updated.find(a => a.id === appId);
    if (app) {
      addNotification(`📋 ${app.companyName} status → ${newStatus}`, "info");
    }
  };

  // ===== TASK MANAGEMENT =====

  const toggleTask = (taskId) => {
    setDailyTasks(prev => {
      const updated = prev.map(t => t.id === taskId ? { ...t, done: !t.done } : t);
      if (userProfile) localStorage.setItem(`optihire_tasks_${userProfile.userId}`, JSON.stringify(updated));
      return updated;
    });
  };

  // ===== NOTIFICATION SYSTEM =====

  const addNotification = (message, type = "info") => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type, timestamp: new Date() }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markNotifRead = (id) => {
    setPersistentNotifs(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      if (userProfile) {
        localStorage.setItem(`optihire_notifs_${userProfile.userId}`, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const clearAllNotifs = () => {
    setPersistentNotifs([]);
    if (userProfile) {
      localStorage.setItem(`optihire_notifs_${userProfile.userId}`, JSON.stringify([]));
    }
  };

  // Simulate real-time notifications on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification("🤖 Agent analyzing your profile...", "info");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DataContext.Provider value={{
      // Existing
      notifications, matchedCompanies, dailyTasks, userProfile,
      loadUserProfile, saveProfile, toggleTask, addNotification, dismissNotification,
      companies: defaultCompanies,
      // New: Application tracking
      applications, applyToCompany, updateApplicationStatus,
      // New: Agent system
      agentLogs, agentRunning,
      // New: Persistent notifications (bell)
      persistentNotifs, markNotifRead, clearAllNotifs,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
