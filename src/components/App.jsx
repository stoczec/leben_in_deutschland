import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import {
  ConfigProvider,
  FloatButton,
  Layout,
  Space,
  Select,
  Button,
  InputNumber,
  theme as antdTheme,
} from 'antd';
import { CardsContainer } from './CardsContainer';
import styled, { css, keyframes } from 'styled-components';
import linkedin from '../assets/linkedin.svg';
import telegram from '../assets/telegram.svg';
import dataNew from '../data/dataNew';
import { CaretUpOutlined } from '@ant-design/icons';
import { useLanguage } from '../providers/LanguageProvider';
import { useThemeMode } from '../providers/ThemeProvider';
import { useProgress } from '../providers/ProgressProvider';
import { useExam, LANDS } from '../providers/ExamProvider';
const ExamView = lazy(() => import('./ExamView'));
const LegalPage = lazy(() => import('./LegalPage'));
import { shared } from '../assets/styles/themes';

const { Header, Footer, Content } = Layout;

const searchLabels = {
  de: 'Frage suchen',
  en: 'Search question',
  ua: 'Пошук питання',
  ru: 'Поиск вопроса',
  ar: 'بحث عن سؤال',
};

const navLabels = {
  de: { prev: 'vorherige Aufgabe', next: 'nächste Aufgabe' },
  en: { prev: 'Previous question', next: 'Next question' },
  ua: { prev: 'Попереднє питання', next: 'Наступне питання' },
  ru: { prev: 'Предыдущий вопрос', next: 'Следующий вопрос' },
  ar: { prev: 'السؤال السابق', next: 'السؤال التالي' },
};

const footerLabels = {
  de: { feedback: 'Feedback', questions: 'Fragen', languages: 'Sprachen', free: 'Kostenlos', note: 'Mit Sorgfalt erstellt' },
  en: { feedback: 'Feedback', questions: 'questions', languages: 'languages', free: 'Free', note: 'Made with care' },
  ua: { feedback: 'Зворотний зв’язок', questions: 'питань', languages: 'мов', free: 'Безкоштовно', note: 'Зроблено з турботою' },
  ru: { feedback: 'Обратная связь', questions: 'вопросов', languages: 'языков', free: 'Бесплатно', note: 'Сделано с заботой' },
  ar: { feedback: 'ملاحظات', questions: 'أسئلة', languages: 'لغات', free: 'مجاني', note: 'صُنع بعناية' },
};

const disclaimerTexts = {
  de: 'Privates, nicht-kommerzielles Lernprojekt. Nicht mit dem BAMF verbunden.',
  en: 'Private, non-commercial learning project. Not affiliated with the BAMF.',
  ua: 'Приватний некомерційний навчальний проєкт. Не пов’язаний із BAMF.',
  ru: 'Частный некоммерческий учебный проект. Не связан с BAMF.',
  ar: 'مشروع تعليمي خاص غير تجاري. لا علاقة له بـ BAMF.',
};

const progressLabels = {
  de: { correct: 'richtig', answered: 'beantwortet', reset: 'Fortschritt zurücksetzen', confirm: 'Gesamten Fortschritt löschen?' },
  en: { correct: 'correct', answered: 'answered', reset: 'Reset progress', confirm: 'Clear all progress?' },
  ua: { correct: 'правильно', answered: 'відповіли', reset: 'Скинути прогрес', confirm: 'Очистити весь прогрес?' },
  ru: { correct: 'верно', answered: 'отвечено', reset: 'Сбросить прогресс', confirm: 'Очистить весь прогресс?' },
  ar: { correct: 'صحيح', answered: 'تمت الإجابة', reset: 'إعادة ضبط التقدم', confirm: 'مسح كل التقدم؟' },
};

const filterLabels = {
  de: { wrong: 'Fehler', fav: 'Markiert' },
  en: { wrong: 'Mistakes', fav: 'Saved' },
  ua: { wrong: 'Помилки', fav: 'Збережені' },
  ru: { wrong: 'Ошибки', fav: 'Избранное' },
  ar: { wrong: 'الأخطاء', fav: 'المحفوظة' },
};

const toolsLabels = {
  de: 'Steuerung',
  en: 'Controls',
  ua: 'Керування',
  ru: 'Управление',
  ar: 'الأدوات',
};

const examStartLabels = {
  de: 'Prüfung',
  en: 'Exam',
  ua: 'Іспит',
  ru: 'Экзамен',
  ar: 'الاختبار',
};

const LANG_CODES = ['de', 'en', 'ua', 'ru'];

const LANG_NAMES = {
  de: 'Deutsch',
  en: 'English',
  ua: 'Українська',
  ru: 'Русский',
};

const slideDownFadeIn = keyframes`
  from { opacity: 0; transform: translateY(-50px); }
  to { opacity: 1; transform: translateY(0); }
`;

function useInViewOnce(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, options]);
  return [ref, inView];
}
const FOOTER_OBSERVER_OPTS = { threshold: 0.15 };

const DiceIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="5.5" cy="5.5" r="1" fill="currentColor" />
    <circle cx="10.5" cy="10.5" r="1" fill="currentColor" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
  </svg>
);

const GridIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.5" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
      const r1 = 4.8;
      const r2 = 6.8;
      const x1 = 8 + r1 * Math.cos((a * Math.PI) / 180);
      const y1 = 8 + r1 * Math.sin((a * Math.PI) / 180);
      const x2 = 8 + r2 * Math.cos((a * Math.PI) / 180);
      const y2 = 8 + r2 * Math.sin((a * Math.PI) / 180);
      return (
        <line
          key={a}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      );
    })}
  </svg>
);

const AlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="11" r="0.9" fill="currentColor" />
  </svg>
);

const StarFilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 1.8l1.76 3.57 3.94.57-2.85 2.78.67 3.92L8 10.96l-3.52 1.86.67-3.92-2.85-2.78 3.94-.57z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

const SlidersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="6" cy="4.5" r="1.8" fill="currentColor" />
    <circle cx="10.5" cy="8" r="1.8" fill="currentColor" />
    <circle cx="5" cy="11.5" r="1.8" fill="currentColor" />
  </svg>
);

const ExamIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 2.5h8l2 2v9H3zM11 2.5v2h2M5.5 7.5h5M5.5 10h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M5 9.5a3 3 0 0 0 6 0V3H5zM5 4H3v1.5A2.5 2.5 0 0 0 5 8M11 4h2v1.5A2.5 2.5 0 0 1 11 8M6 13h4M8 12.5v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ResetIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M13 8a5 5 0 1 1-1.46-3.54M13 3v2h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M13 9.5A5.5 5.5 0 0 1 6.5 3a5.5 5.5 0 1 0 6.5 6.5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

function App() {
  const [question, setQuestion] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const n = Number(new URLSearchParams(window.location.search).get('frage'));
    return Number.isInteger(n) && n >= 1 && n <= dataNew.length ? n : 0;
  });
  const [toolsOpen, setToolsOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const { language, changeLanguage } = useLanguage();
  const { mode, toggle, theme } = useThemeMode();
  const { answers, favorites, resetProgress } = useProgress();
  const { session, startExam, land, setLand } = useExam();
  const direction = language === 'ar' ? 'rtl' : 'ltr';
  const pLabels = progressLabels[language] || progressLabels.de;
  const fLabels = filterLabels[language] || filterLabels.de;
  const footL = footerLabels[language] || footerLabels.de;
  const [footerRef, footerInView] = useInViewOnce(FOOTER_OBSERVER_OPTS);
  const [legalPage, setLegalPage] = useState(null);

  const visiblePool = useMemo(() => dataNew.filter((q) => !q.land || q.land === land), [land]);

  const stats = useMemo(() => {
    let answered = 0, correct = 0, wrong = 0, fav = 0;
    for (const q of visiblePool) {
      const picked = answers[q.id];
      if (picked != null) {
        answered += 1;
        if (picked === q.answers.ansKey) correct += 1;
        else wrong += 1;
      }
      if (favorites.has(q.id)) fav += 1;
    }
    return { answered, correct, wrong, fav };
  }, [visiblePool, answers, favorites]);

  const questionOptions = useMemo(
    () =>
      visiblePool.map((q) => ({
        value: q.id,
        label: `${q.id}. ${q.de}`,
        ftext: `${q.id} ${q.de} ${q[language]}`.toLowerCase(),
      })),
    [language, visiblePool]
  );

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  useEffect(() => {
    if (!question || session) return;
    const onKey = (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const t = e.target;
      const role = t.getAttribute?.('role');
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable) return;
      if (role === 'combobox' || role === 'spinbutton') return;
      if (e.key === 'ArrowLeft') setQuestion((q) => Math.max(1, q - 1));
      else setQuestion((q) => Math.min(dataNew.length, q + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [question, session]);

  const handleChange = (value) => {
    if (value === null || value === undefined) {
      setQuestion(0);
      return;
    }
    setQuestion(Math.min(Math.max(1, value), dataNew.length));
  };

  const showAll = () => {
    setFilter('all');
    setQuestion(0);
  };
  const showFilter = (next) => () => {
    setFilter(next);
    setQuestion(0);
  };
  const handlePlus = () => setQuestion((q) => q + 1);
  const handleMinus = () => setQuestion((q) => q - 1);
  const handleRandomNumber = () =>
    setQuestion(visiblePool[Math.floor(Math.random() * visiblePool.length)].id);
  const handleResetProgress = () => {
    if (window.confirm(pLabels.confirm)) resetProgress();
  };

  return (
    <ConfigProvider
      direction={direction}
      theme={{
        algorithm:
          mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: theme.accent,
        },
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 0]}>
        <StyledLayout>
          <StyledHeader>
            <Brand>
              <Logo>LiD</Logo>
              <BrandText>
                <BrandTitle>Leben in Deutschland</BrandTitle>
                <BrandSub>Einbürgerungstest · {visiblePool.length} Fragen</BrandSub>
              </BrandText>
            </Brand>
          </StyledHeader>
          <StyledContent>
            <ContentInner>
              {legalPage ? (
                <Suspense fallback={null}>
                  <LegalPage
                    language={language}
                    onBack={() => setLegalPage(null)}
                  />
                </Suspense>
              ) : session ? (
                <Suspense fallback={null}>
                  <ExamView />
                </Suspense>
              ) : (
                <>
              <ToolbarBar>
                <Group $open={toolsOpen}>
                <ToolbarFilters>
                  <Select
                    value={question || undefined}
                    placeholder={searchLabels[language] || searchLabels.de}
                    onChange={handleChange}
                    size="small"
                    style={{ width: 230 }}
                    showSearch
                    optionFilterProp="ftext"
                    options={questionOptions}
                    data-testid="question-search"
                  />
                  <InputNumber
                    size="small"
                    min={1}
                    max={dataNew.length}
                    value={question || undefined}
                    placeholder="#"
                    onChange={handleChange}
                    style={{ width: 80 }}
                  />
                  <ToolbarButton onClick={handleRandomNumber} type="text">
                    <DiceIcon /> Zufällig
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={showAll}
                    type="text"
                    $active={filter === 'all' && !question}
                  >
                    <GridIcon /> Alle {visiblePool.length}
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={showFilter('wrong')}
                    type="text"
                    $active={filter === 'wrong' && !question}
                    data-testid="filter-wrong"
                  >
                    <AlertIcon /> {fLabels.wrong} {stats.wrong}
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={showFilter('favorites')}
                    type="text"
                    $active={filter === 'favorites' && !question}
                    data-testid="filter-fav"
                  >
                    <StarFilterIcon /> {fLabels.fav} {stats.fav}
                  </ToolbarButton>
                  <Select
                    size="small"
                    value={land}
                    onChange={setLand}
                    options={LANDS.map((l) => ({ value: l.code, label: l.name }))}
                    aria-label="Bundesland"
                    data-testid="exam-land"
                    style={{ minWidth: 168 }}
                  />
                  <ToolbarButton onClick={startExam} type="text" data-testid="start-exam">
                    <ExamIcon /> {examStartLabels[language] || examStartLabels.de}
                  </ToolbarButton>
                </ToolbarFilters>
                </Group>
                <Lead>
                <Spacer />
                <Progress>
                  <Stat
                    $tone="success"
                    data-testid="progress-correct"
                    title={`${stats.correct} ${pLabels.correct}`}
                    aria-label={`${stats.correct} ${pLabels.correct}`}
                  >
                    <TrophyIcon />
                    <Pop key={stats.correct}>{stats.correct}</Pop>
                  </Stat>
                  <Stat
                    data-testid="progress-answered"
                    title={`${stats.answered} ${pLabels.answered}`}
                    aria-label={`${stats.answered} ${pLabels.answered}`}
                  >
                    {stats.answered}
                    <Total>/{visiblePool.length}</Total>
                  </Stat>
                  {stats.answered > 0 && (
                    <ResetButton
                      onClick={handleResetProgress}
                      aria-label={pLabels.reset}
                      title={pLabels.reset}
                    >
                      <ResetIcon />
                    </ResetButton>
                  )}
                </Progress>
                  <MoreButton
                    onClick={() => setToolsOpen((o) => !o)}
                    aria-expanded={toolsOpen}
                    aria-label={toolsLabels[language] || toolsLabels.de}
                    title={toolsLabels[language] || toolsLabels.de}
                  >
                    <SlidersIcon />
                  </MoreButton>
                </Lead>
                <Group $open={toolsOpen}>
                <LangPill>
                  {LANG_CODES.map((code) => (
                    <LangOption
                      key={code}
                      $active={code === language}
                      onClick={() => changeLanguage(code)}
                      data-testid={`lang-${code}`}
                      aria-pressed={code === language}
                      aria-label={LANG_NAMES[code]}
                    >
                      {code.toUpperCase()}
                    </LangOption>
                  ))}
                </LangPill>
                <ThemeToggle
                  onClick={toggle}
                  aria-label="Toggle theme"
                  data-testid="theme-toggle"
                  title={mode === 'dark' ? 'Switch to light' : 'Switch to dark'}
                >
                  {mode === 'dark' ? <SunIcon /> : <MoonIcon />}
                </ThemeToggle>
                </Group>
              </ToolbarBar>
              <CardsContainer questionNr={question} filter={filter} />
              {question ? (
                <ButtonsContainer>
                  {question === 1 ? null : (
                    <NavBtn type="primary" onClick={handleMinus}>
                      {(navLabels[language] || navLabels.de).prev}
                    </NavBtn>
                  )}
                  {question === dataNew.length ? null : (
                    <NavBtn type="primary" onClick={handlePlus}>
                      {(navLabels[language] || navLabels.de).next}
                    </NavBtn>
                  )}
                </ButtonsContainer>
              ) : null}
                </>
              )}
            </ContentInner>
          </StyledContent>
          <StyledFooter>
            <FooterGlow />
            <FooterMain>
              <BrandCol>
                <BrandRow>
                  <Logo>LiD</Logo>
                  <BrandText>
                    <BrandTitle>Leben in Deutschland</BrandTitle>
                    <BrandSub>Einbürgerungstest</BrandSub>
                  </BrandText>
                </BrandRow>
                <Chips>
                  <Chip>{dataNew.length} {footL.questions}</Chip>
                  <Chip>4 {footL.languages}</Chip>
                  <Chip>{footL.free}</Chip>
                </Chips>
                <Disclaimer>{disclaimerTexts[language] || disclaimerTexts.de}</Disclaimer>
              </BrandCol>
              <ContactCol>
                <ContactHeading>{footL.feedback}</ContactHeading>
                <FooterLinks ref={footerRef} className={footerInView ? 'in-view' : ''}>
                  <a
                    href="https://t.me/DmytroHerashchenko"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                  >
                    <CustomImage src={telegram} alt="" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/herashchenko-dmytro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <CustomImage src={linkedin} alt="" />
                  </a>
                </FooterLinks>
              </ContactCol>
            </FooterMain>
            <FooterBottom>
              <Copyright>©2023–2026 · Dmytro Herashchenko</Copyright>
              <LegalLinks>
                <LegalLink onClick={() => setLegalPage('datenschutz')}>Datenschutz</LegalLink>
              </LegalLinks>
              <BottomNote>{footL.note}</BottomNote>
            </FooterBottom>
          </StyledFooter>

          <CustomFloatButton icon={<CaretUpOutlined />} />
        </StyledLayout>
      </Space>
    </ConfigProvider>
  );
}
export default App;

const StyledLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.bg};
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 16px;
`;

const LegalLink = styled.button`
  background: none;
  border: none;
  font: inherit;
  color: ${({ theme }) => theme.textMuted};
  cursor: pointer;
  padding: 0;
  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const StyledHeader = styled(Header)`
  background-color: ${({ theme }) => theme.surface};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 0 ${shared.space[5]};
  display: flex;
  align-items: center;
  height: 64px;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${shared.space[3]};
  animation: ${slideDownFadeIn} 0.6s ease 0.2s both;
`;

const Logo = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const BrandText = styled.div`
  text-align: start;
  line-height: 1.2;
`;

const BrandTitle = styled.div`
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.text};
`;

const BrandSub = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.textMuted};
  margin-top: 2px;
`;

const popIn = keyframes`
  from { transform: scale(0.5); }
  to { transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Pop = styled.span`
  display: inline-block;
  animation: ${popIn} 0.3s ease-out;
`;

const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: ${shared.space[2]};
  flex-shrink: 0;
`;

const Stat = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: ${shared.fontStack.mono};
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme, $tone }) => ($tone === 'success' ? theme.success : theme.textMuted)};

  & svg {
    color: ${({ theme }) => theme.success};
  }
`;

const Total = styled.span`
  color: ${({ theme }) => theme.textSubtle};
  font-weight: 400;
`;

const ResetButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: ${shared.radius.sm};
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.textMuted};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background ${shared.motion.fast}, color ${shared.motion.fast};

  &:hover {
    background: ${({ theme }) => theme.surfaceAlt};
    color: ${({ theme }) => theme.danger};
  }

  @media (pointer: coarse) {
    width: 44px;
    height: 44px;
  }
`;

const StyledContent = styled(Content)`
  position: relative;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
  padding: ${shared.space[5]} ${shared.space[5]} ${shared.space[7]};
`;

const ContentInner = styled.div`
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${shared.space[5]};
`;

const ToolbarBar = styled.div`
  position: sticky;
  top: 8px;
  z-index: 20;
  background: ${({ theme }) => theme.surfaceGlass};
  -webkit-backdrop-filter: blur(14px) saturate(180%);
  backdrop-filter: blur(14px) saturate(180%);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: ${shared.space[2]};
  box-shadow: ${shared.shadow.md};
  display: flex;
  align-items: center;
  gap: ${shared.space[2]};
  flex-wrap: wrap;

  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    background: ${({ theme }) => theme.surface};
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    gap: ${shared.space[3]};
  }
`;

const Group = styled.div`
  display: contents;

  @media (max-width: 640px) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
    gap: ${shared.space[2]};
  }
`;

const Lead = styled.div`
  display: contents;

  @media (max-width: 640px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    order: -1;
  }
`;

const MoreButton = styled.button`
  display: none;

  @media (max-width: 640px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};
    cursor: pointer;
    transition: background ${shared.motion.fast}, color ${shared.motion.fast};
  }

  &[aria-expanded='true'] {
    background: ${({ theme }) => theme.surfaceAlt};
    border-color: ${({ theme }) => theme.borderStrong};
    color: ${({ theme }) => theme.accent};
  }
`;

const ToolbarFilters = styled.div`
  display: flex;
  align-items: center;
  gap: ${shared.space[2]};
  flex-wrap: wrap;
`;

const Spacer = styled.div`
  flex: 1 1 auto;

  @media (max-width: 640px) {
    display: none;
  }
`;

const ToolbarButton = styled(Button)`
  &.ant-btn {
    height: 32px;
    padding: 0 12px;
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
    border-radius: 8px;
  }
  &.ant-btn:hover:not(:disabled) {
    background: ${({ theme }) => theme.surfaceAlt};
    color: ${({ theme }) => theme.text};
    border-color: ${({ theme }) => theme.borderStrong};
  }
  &.ant-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  & svg {
    color: ${({ theme }) => theme.accent};
  }

  ${({ $active, theme }) =>
    $active &&
    css`
      &.ant-btn,
      &.ant-btn:hover:not(:disabled) {
        background: ${theme.accentBg};
        border-color: ${theme.accentBorder};
        color: ${theme.accent};
      }
    `}
`;

const LangPill = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  background: ${({ theme }) => theme.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 3px;
  border-radius: 999px;
`;

const LangOption = styled.button`
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  font-family: inherit;
  border: none;
  cursor: pointer;
  transition: background ${shared.motion.fast}, color ${shared.motion.fast};
  background: ${({ theme, $active }) => ($active ? theme.surface : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.accent : theme.textMuted)};
  box-shadow: ${({ $active }) => ($active ? shared.shadow.sm : 'none')};

  &:hover {
    color: ${({ theme, $active }) => ($active ? theme.accent : theme.text)};
  }

  @media (pointer: coarse) {
    min-height: 44px;
    padding: 5px 14px;
  }
`;

const ThemeToggle = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.textMuted};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background ${shared.motion.fast}, color ${shared.motion.fast};
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.surfaceAlt};
    color: ${({ theme }) => theme.text};
  }

  @media (pointer: coarse) {
    width: 44px;
    height: 44px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${shared.space[4]};
  margin-top: ${shared.space[3]};
`;

const NavBtn = styled(Button)`
  &.ant-btn {
    min-width: 190px;
  }

  @media (max-width: 480px) {
    &.ant-btn {
      min-width: 0;
      flex: 1 1 0;
    }
  }
`;

const StyledFooter = styled(Footer)`
  position: relative;
  color: ${({ theme }) => theme.textMuted};
  background-color: ${({ theme }) => theme.surface};
  border-top: 1px solid ${({ theme }) => theme.border};
  padding: ${shared.space[9]} ${shared.space[5]} ${shared.space[5]};
`;

const FooterGlow = styled.div`
  position: absolute;
  top: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    ${({ theme }) => theme.accent} 50%,
    transparent
  );
  opacity: 0.5;
`;

const FooterMain = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${shared.space[8]};
  flex-wrap: wrap;
`;

const BrandCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${shared.space[4]};
`;

const Disclaimer = styled.p`
  max-width: 320px;
  font-size: 12px;
  line-height: 1.5;
  color: ${({ theme }) => theme.textSubtle};
`;

const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${shared.space[3]};
`;

const Chips = styled.div`
  display: flex;
  gap: ${shared.space[2]};
  flex-wrap: wrap;
`;

const Chip = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.textMuted};
  background: ${({ theme }) => theme.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 4px 10px;
  border-radius: ${shared.radius.pill};
`;

const ContactCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${shared.space[3]};
  max-width: 420px;
`;

const ContactHeading = styled.div`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSubtle};
`;

const FooterBottom = styled.div`
  max-width: 1280px;
  margin: ${shared.space[7]} auto 0;
  padding-top: ${shared.space[4]};
  border-top: 1px solid ${({ theme }) => theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${shared.space[3]};
  flex-wrap: wrap;
`;

const Copyright = styled.div`
  color: ${({ theme }) => theme.textSubtle};
  font-size: 12px;
  font-family: ${shared.fontStack.mono};
`;

const BottomNote = styled.div`
  color: ${({ theme }) => theme.textSubtle};
  font-size: 12px;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: ${shared.space[3]};
  margin-top: ${shared.space[2]};

  & > a {
    width: 42px;
    height: 42px;
    border-radius: 999px;
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.surface};
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: transform ${shared.motion.fast}, border-color ${shared.motion.fast},
      background ${shared.motion.fast};
  }
  &.in-view > a {
    animation: ${fadeIn} 0.5s ease both;
  }
  &.in-view > a:nth-child(1) { animation-delay: 0.05s; }
  &.in-view > a:nth-child(2) { animation-delay: 0.15s; }

  @media (hover: hover) {
    & > a:hover {
      transform: translateY(-2px);
      border-color: ${({ theme }) => theme.borderStrong};
      background: ${({ theme }) => theme.surfaceAlt};
    }
    & > a:hover img {
      filter: none;
      opacity: 1;
    }
  }
`;

const CustomImage = styled.img`
  width: 22px;
  height: 22px;
  filter: grayscale(1);
  opacity: 0.6;
  transition: filter ${shared.motion.fast}, opacity ${shared.motion.fast};
`;

const CustomFloatButton = styled(FloatButton.BackTop)`
  .ant-float-btn-body {
    background-color: ${({ theme }) => theme.surfaceAlt} !important;
  }
`;
