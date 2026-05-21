import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import dataNew from '../data/dataNew';

const PROGRESS_KEY = 'progress';

const ansKeyById = new Map(dataNew.map((q) => [q.id, q.answers.ansKey]));

const readInitial = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(PROGRESS_KEY));
    if (!parsed || typeof parsed !== 'object') return {};
    const clean = {};
    for (const [id, idx] of Object.entries(parsed)) {
      if (ansKeyById.has(Number(id)) && idx >= 1 && idx <= 4) clean[id] = idx;
    }
    return clean;
  } catch {
    return {};
  }
};

const ProgressContext = createContext({
  answers: {},
  recordAnswer: () => {},
  resetProgress: () => {},
  answeredCount: 0,
  correctCount: 0,
});

export const ProgressProvider = ({ children }) => {
  const [answers, setAnswers] = useState(readInitial);

  const recordAnswer = useCallback((id, idx) => {
    setAnswers((prev) => {
      const next = { ...prev, [id]: idx };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    setAnswers({});
    localStorage.removeItem(PROGRESS_KEY);
  }, []);

  const value = useMemo(() => {
    const ids = Object.keys(answers);
    let correct = 0;
    for (const id of ids) {
      if (answers[id] === ansKeyById.get(Number(id))) correct += 1;
    }
    return { answers, recordAnswer, resetProgress, answeredCount: ids.length, correctCount: correct };
  }, [answers, recordAnswer, resetProgress]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProgress = () => useContext(ProgressContext);
