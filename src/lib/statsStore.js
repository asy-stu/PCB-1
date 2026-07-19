const VISITS_KEY = "site_stats_visits_log";
const MESSAGES_KEY = "site_stats_messages_log";
const LANG_KEY = "site_stats_lang_usage";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function bumpLog(key) {
  let log = [];
  try {
    log = JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    log = [];
  }
  const today = todayStr();
  const entry = log.find((l) => l.date === today);
  if (entry) entry.count += 1;
  else log.push({ date: today, count: 1 });
  if (log.length > 30) log = log.slice(log.length - 30);
  localStorage.setItem(key, JSON.stringify(log));
  return log;
}

export function recordVisit() {
  const sessionFlag = sessionStorage.getItem("visit_recorded");
  if (sessionFlag) return;
  sessionStorage.setItem("visit_recorded", "1");
  bumpLog(VISITS_KEY);
}

export function recordMessage() {
  bumpLog(MESSAGES_KEY);
}

export function recordLangUsage(lang) {
  let usage = {};
  try {
    usage = JSON.parse(localStorage.getItem(LANG_KEY)) || {};
  } catch {
    usage = {};
  }
  usage[lang] = (usage[lang] || 0) + 1;
  localStorage.setItem(LANG_KEY, JSON.stringify(usage));
}

function getLog(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

export function getStats() {
  const visits = getLog(VISITS_KEY);
  const messages = getLog(MESSAGES_KEY);
  let langUsage = {};
  try {
    langUsage = JSON.parse(localStorage.getItem(LANG_KEY)) || {};
  } catch {
    langUsage = {};
  }
  const totalVisits = visits.reduce((s, v) => s + v.count, 0);
  const totalMessages = messages.reduce((s, v) => s + v.count, 0);
  return { visits, messages, langUsage, totalVisits, totalMessages };
}
