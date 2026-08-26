import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  ansKeyById,
  EXAM_SIZE,
  GENERAL_COUNT,
  generalIds,
  LANDS,
  PASS_THRESHOLD,
  STATE_COUNT,
  stateIdsByLand,
} from '../data/exam-config';

const EXAM_KEY = 'exam';
const LAND_KEY = 'land';
const DURATION_MS = 60 * 60 * 1000;

const sample = (ids, n) => {
  const pool = [...ids];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, n);
};

const pickIds = (land) => [
  ...sample(generalIds, GENERAL_COUNT),
  ...sample(stateIdsByLand[land] || [], STATE_COUNT),
];

const readLand = () => {
  const saved = localStorage.getItem(LAND_KEY);
  return LANDS.some((l) => l.code === saved) ? saved : LANDS[0]?.code;
};

const readInitial = () => {
  try {
    const s = JSON.parse(localStorage.getItem(EXAM_KEY));
    if (!s || !Array.isArray(s.ids) || s.ids.length !== EXAM_SIZE) return null;
    if (s.status === 'active' && Date.now() >= s.endsAt) return { ...s, status: 'finished' };
    return s;
  } catch {
    return null;
  }
};

const persist = (session) => {
  if (session) localStorage.setItem(EXAM_KEY, JSON.stringify(session));
  else localStorage.removeItem(EXAM_KEY);
};

const ExamContext = createContext(null);

export const ExamProvider = ({ children }) => {
  const [session, setSession] = useState(readInitial);
  const [land, setLandState] = useState(readLand);

  const update = useCallback((next) => {
    setSession(next);
    persist(next);
  }, []);

  const setLand = useCallback((code) => {
    setLandState(code);
    localStorage.setItem(LAND_KEY, code);
  }, []);

  const startExam = useCallback(() => {
    update({ ids: pickIds(land), answers: {}, current: 0, endsAt: Date.now() + DURATION_MS, status: 'active' });
  }, [update, land]);

  const answerExam = useCallback((qId, idx) => {
    setSession((prev) => {
      if (!prev || prev.status !== 'active') return prev;
      const next = { ...prev, answers: { ...prev.answers, [qId]: idx } };
      persist(next);
      return next;
    });
  }, []);

  const goTo = useCallback((index) => {
    setSession((prev) => {
      if (!prev) return prev;
      const clamped = Math.min(Math.max(0, index), EXAM_SIZE - 1);
      const next = { ...prev, current: clamped };
      persist(next);
      return next;
    });
  }, []);

  const submitExam = useCallback(() => {
    setSession((prev) => {
      if (!prev) return prev;
      const next = { ...prev, status: 'finished' };
      persist(next);
      return next;
    });
  }, []);

  const exitExam = useCallback(() => update(null), [update]);

  const value = useMemo(() => {
    let score = 0;
    let answeredCount = 0;
    if (session) {
      for (const qId of session.ids) {
        const picked = session.answers[qId];
        if (picked != null) answeredCount += 1;
        if (picked === ansKeyById.get(qId)) score += 1;
      }
    }
    return {
      session,
      land,
      setLand,
      startExam,
      answerExam,
      goTo,
      submitExam,
      exitExam,
      score,
      answeredCount,
      passed: score >= PASS_THRESHOLD,
    };
  }, [session, land, setLand, startExam, answerExam, goTo, submitExam, exitExam]);

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useExam = () => useContext(ExamContext);
