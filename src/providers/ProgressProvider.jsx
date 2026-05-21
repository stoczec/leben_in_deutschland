import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import dataNew from '../data/dataNew';

const PROGRESS_KEY = 'progress';
const FAVORITES_KEY = 'favorites';

const ansKeyById = new Map(dataNew.map((q) => [q.id, q.answers.ansKey]));

const readAnswers = () => {
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

const readFavorites = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(FAVORITES_KEY));
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id) => ansKeyById.has(id)));
  } catch {
    return new Set();
  }
};

const ProgressContext = createContext({
  answers: {},
  favorites: new Set(),
  recordAnswer: () => {},
  toggleFavorite: () => {},
  resetProgress: () => {},
  answeredCount: 0,
  correctCount: 0,
  wrongIds: [],
  favoriteIds: [],
});

export const ProgressProvider = ({ children }) => {
  const [answers, setAnswers] = useState(readAnswers);
  const [favorites, setFavorites] = useState(readFavorites);

  const recordAnswer = useCallback((id, idx) => {
    setAnswers((prev) => {
      const next = { ...prev, [id]: idx };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    setAnswers({});
    localStorage.removeItem(PROGRESS_KEY);
  }, []);

  const value = useMemo(() => {
    let correct = 0;
    const wrongIds = [];
    for (const [id, idx] of Object.entries(answers)) {
      if (idx === ansKeyById.get(Number(id))) correct += 1;
      else wrongIds.push(Number(id));
    }
    return {
      answers,
      favorites,
      recordAnswer,
      toggleFavorite,
      resetProgress,
      answeredCount: Object.keys(answers).length,
      correctCount: correct,
      wrongIds,
      favoriteIds: [...favorites],
    };
  }, [answers, favorites, recordAnswer, toggleFavorite, resetProgress]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProgress = () => useContext(ProgressContext);
