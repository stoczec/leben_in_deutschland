import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import dataNew from '../data/dataNew';
import { useLanguage } from '../providers/LanguageProvider';
import { useExam, EXAM_SIZE, PASS_THRESHOLD } from '../providers/ExamProvider';
import Card from './Card';
import { shared } from '../assets/styles/themes';

const questionById = new Map(dataNew.map((q) => [q.id, q]));

const L = {
  de: { question: 'Frage', answered: 'beantwortet', submit: 'Abgeben', prev: 'Zurück', next: 'Weiter', exit: 'Beenden', exitConfirm: 'Prüfung verlassen? Der Fortschritt geht verloren.', submitConfirm: (n) => `Noch ${n} unbeantwortet. Trotzdem abgeben?`, passed: 'Bestanden', failed: 'Nicht bestanden', correct: 'Richtig', wrong: 'Falsch', unanswered: 'Ohne Antwort', threshold: (n) => `${n} richtig zum Bestehen`, review: 'Antworten ansehen', hideReview: 'Ergebnis', newExam: 'Neue Prüfung' },
  en: { question: 'Question', answered: 'answered', submit: 'Submit', prev: 'Back', next: 'Next', exit: 'Quit', exitConfirm: 'Leave the exam? Progress will be lost.', submitConfirm: (n) => `${n} still unanswered. Submit anyway?`, passed: 'Passed', failed: 'Not passed', correct: 'Correct', wrong: 'Wrong', unanswered: 'Unanswered', threshold: (n) => `${n} correct to pass`, review: 'Review answers', hideReview: 'Result', newExam: 'New exam' },
  ua: { question: 'Питання', answered: 'відповіли', submit: 'Завершити', prev: 'Назад', next: 'Далі', exit: 'Вийти', exitConfirm: 'Вийти з іспиту? Прогрес буде втрачено.', submitConfirm: (n) => `Ще ${n} без відповіді. Завершити все одно?`, passed: 'Складено', failed: 'Не складено', correct: 'Правильно', wrong: 'Неправильно', unanswered: 'Без відповіді', threshold: (n) => `${n} правильних для складання`, review: 'Переглянути відповіді', hideReview: 'Результат', newExam: 'Новий іспит' },
  ru: { question: 'Вопрос', answered: 'отвечено', submit: 'Завершить', prev: 'Назад', next: 'Далее', exit: 'Выйти', exitConfirm: 'Выйти из экзамена? Прогресс будет потерян.', submitConfirm: (n) => `Ещё ${n} без ответа. Всё равно завершить?`, passed: 'Сдано', failed: 'Не сдано', correct: 'Верно', wrong: 'Неверно', unanswered: 'Без ответа', threshold: (n) => `${n} верных для сдачи`, review: 'Разбор ответов', hideReview: 'Результат', newExam: 'Новый экзамен' },
  ar: { question: 'سؤال', answered: 'تمت الإجابة', submit: 'إنهاء', prev: 'رجوع', next: 'التالي', exit: 'خروج', exitConfirm: 'مغادرة الاختبار؟ سيُفقد التقدم.', submitConfirm: (n) => `${n} بلا إجابة. الإنهاء على أي حال؟`, passed: 'ناجح', failed: 'غير ناجح', correct: 'صحيح', wrong: 'خطأ', unanswered: 'بلا إجابة', threshold: (n) => `${n} صحيحة للنجاح`, review: 'مراجعة الإجابات', hideReview: 'النتيجة', newExam: 'اختبار جديد' },
};

const cardProps = (q, language) => ({
  id: q.id,
  questionDe: q.de,
  answerFirstDe: q.answers[1].de,
  answerSecondDe: q.answers[2].de,
  answerThirdDe: q.answers[3].de,
  answerFourthDe: q.answers[4].de,
  question: q[language],
  answerFirst: q.answers[1][language],
  answerSecond: q.answers[2][language],
  answerThird: q.answers[3][language],
  answerFourth: q.answers[4][language],
  ansKey: q.answers.ansKey,
  image: q.img,
});

const format = (ms) => {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = String(Math.floor(total / 60)).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  return `${m}:${s}`;
};

function Timer({ endsAt, onExpire }) {
  const [remaining, setRemaining] = useState(() => endsAt - Date.now());
  useEffect(() => {
    const tick = () => {
      const left = endsAt - Date.now();
      setRemaining(left);
      if (left <= 0) onExpire();
    };
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [endsAt, onExpire]);
  return (
    <TimeBadge $danger={remaining <= 5 * 60 * 1000} data-testid="exam-timer">
      <ClockIcon />
      {format(remaining)}
    </TimeBadge>
  );
}

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function ScoreRing({ score, total, passed }) {
  const radius = 56;
  const circ = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circ);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOffset(circ * (1 - score / total)));
    return () => cancelAnimationFrame(id);
  }, [circ, score, total]);
  return (
    <RingWrap>
      <svg width="148" height="148" viewBox="0 0 148 148" aria-hidden="true">
        <RingTrack cx="74" cy="74" r={radius} fill="none" strokeWidth="11" />
        <RingProgress
          cx="74"
          cy="74"
          r={radius}
          fill="none"
          strokeWidth="11"
          strokeLinecap="round"
          $passed={passed}
          style={{ strokeDasharray: circ, strokeDashoffset: offset }}
        />
      </svg>
      <RingLabel>
        <RingScore>{score}</RingScore>
        <RingTotal>/ {total}</RingTotal>
      </RingLabel>
    </RingWrap>
  );
}

function ExamRunner({ labels }) {
  const { language } = useLanguage();
  const { session, answerExam, goTo, submitExam, exitExam, answeredCount } = useExam();
  const { ids, current, answers, endsAt } = session;
  const id = ids[current];
  const q = questionById.get(id);

  const handleSubmit = () => {
    const left = EXAM_SIZE - answeredCount;
    if (left > 0 && !window.confirm(labels.submitConfirm(left))) return;
    submitExam();
  };
  const handleExit = () => {
    if (window.confirm(labels.exitConfirm)) exitExam();
  };

  return (
    <Wrap>
      <RunnerBar>
        <Timer endsAt={endsAt} onExpire={submitExam} />
        <Progress data-testid="exam-progress">
          {labels.question} {current + 1} / {EXAM_SIZE}
        </Progress>
        <Counted>
          {answeredCount}/{EXAM_SIZE} {labels.answered}
        </Counted>
        <Spacer />
        <Button type="text" onClick={handleExit}>
          {labels.exit}
        </Button>
      </RunnerBar>

      <Navigator role="navigation">
        {ids.map((qId, i) => (
          <NavCell
            key={qId}
            $current={i === current}
            $answered={answers[qId] != null}
            onClick={() => goTo(i)}
            aria-label={`${labels.question} ${i + 1}`}
            aria-current={i === current}
          >
            {i + 1}
          </NavCell>
        ))}
      </Navigator>

      <Single>
        <Card
          key={id}
          {...cardProps(q, language)}
          variant="hero"
          mode="exam"
          selectedValue={answers[id] ?? 0}
          onSelect={(idx) => answerExam(id, idx)}
        />
      </Single>

      <NavButtons>
        <Button onClick={() => goTo(current - 1)} disabled={current === 0}>
          {labels.prev}
        </Button>
        {current === EXAM_SIZE - 1 ? (
          <Button type="primary" onClick={handleSubmit} data-testid="exam-submit">
            {labels.submit}
          </Button>
        ) : (
          <Button type="primary" onClick={() => goTo(current + 1)}>
            {labels.next}
          </Button>
        )}
      </NavButtons>

      <SubmitRow>
        <Button type="primary" ghost onClick={handleSubmit}>
          {labels.submit}
        </Button>
      </SubmitRow>
    </Wrap>
  );
}

function ExamResult({ labels }) {
  const { language } = useLanguage();
  const { session, score, answeredCount, passed, startExam, exitExam } = useExam();
  const [review, setReview] = useState(false);
  const wrong = answeredCount - score;
  const unanswered = EXAM_SIZE - answeredCount;

  return (
    <Wrap>
      <Banner $passed={passed} data-testid="exam-result">
        <BannerTitle>{passed ? labels.passed : labels.failed}</BannerTitle>
        <ScoreRing score={score} total={EXAM_SIZE} passed={passed} />
        <BannerNote>{labels.threshold(PASS_THRESHOLD)}</BannerNote>
      </Banner>

      <Stats>
        <StatBox $tone="success">
          <b>{score}</b>
          {labels.correct}
        </StatBox>
        <StatBox $tone="danger">
          <b>{wrong}</b>
          {labels.wrong}
        </StatBox>
        <StatBox>
          <b>{unanswered}</b>
          {labels.unanswered}
        </StatBox>
      </Stats>

      <ResultButtons>
        <Button onClick={() => setReview((r) => !r)}>
          {review ? labels.hideReview : labels.review}
        </Button>
        <Button type="primary" onClick={startExam}>
          {labels.newExam}
        </Button>
        <Button type="text" onClick={exitExam}>
          {labels.exit}
        </Button>
      </ResultButtons>

      {review && (
        <ReviewList>
          {session.ids.map((qId) => (
            <Card
              key={qId}
              {...cardProps(questionById.get(qId), language)}
              mode="review"
              selectedValue={session.answers[qId] ?? 0}
            />
          ))}
        </ReviewList>
      )}
    </Wrap>
  );
}

export default function ExamView() {
  const { language } = useLanguage();
  const { session } = useExam();
  const labels = L[language] || L.de;
  if (!session) return null;
  return session.status === 'finished' ? (
    <ExamResult labels={labels} />
  ) : (
    <ExamRunner labels={labels} />
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${shared.space[5]};
`;

const RunnerBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${shared.space[3]};
  flex-wrap: wrap;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: ${shared.space[2]} ${shared.space[3]};
  box-shadow: ${shared.shadow.sm};
`;

const Spacer = styled.div`
  flex: 1 1 auto;
`;

const TimeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: ${shared.fontStack.mono};
  font-size: 15px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: ${shared.radius.sm};
  color: ${({ theme, $danger }) => ($danger ? theme.danger : theme.text)};
  background: ${({ theme, $danger }) => ($danger ? theme.dangerBg : theme.surfaceAlt)};
`;

const Progress = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Counted = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.textMuted};
  font-family: ${shared.fontStack.mono};
`;

const Navigator = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(36px, 1fr));
  gap: 6px;
`;

const NavCell = styled.button`
  aspect-ratio: 1;
  min-height: 36px;
  border-radius: ${shared.radius.sm};
  font-family: ${shared.fontStack.mono};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid
    ${({ theme, $current, $answered }) =>
      $current ? theme.accent : $answered ? theme.accentBorder : theme.border};
  background: ${({ theme, $answered }) => ($answered ? theme.accentBg : theme.surface)};
  color: ${({ theme, $answered }) => ($answered ? theme.accent : theme.textMuted)};
  box-shadow: ${({ theme, $current }) => ($current ? `0 0 0 2px ${theme.accent}` : 'none')};
  transition: background ${shared.motion.fast}, border-color ${shared.motion.fast};
`;

const Single = styled.div`
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
`;

const NavButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${shared.space[4]};
`;

const SubmitRow = styled.div`
  display: flex;
  justify-content: center;
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${shared.space[3]};
  text-align: center;
  border-radius: ${shared.radius.xl};
  padding: ${shared.space[8]} ${shared.space[5]};
  border: 1px solid ${({ theme, $passed }) => ($passed ? theme.successBorder : theme.dangerBorder)};
  background: ${({ theme, $passed }) =>
    `linear-gradient(160deg, ${$passed ? theme.successBg : theme.dangerBg} 0%, ${theme.surface} 75%)`};
  color: ${({ theme, $passed }) => ($passed ? theme.success : theme.danger)};
`;

const BannerTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const RingWrap = styled.div`
  position: relative;
  width: 148px;
  height: 148px;
`;

const RingTrack = styled.circle`
  stroke: ${({ theme }) => theme.surfaceAlt};
`;

const RingProgress = styled.circle`
  stroke: ${({ theme, $passed }) => ($passed ? theme.success : theme.danger)};
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.9s ease-out;
`;

const RingLabel = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: ${shared.fontStack.mono};
`;

const RingScore = styled.div`
  font-size: 40px;
  font-weight: 700;
  line-height: 1;
`;

const RingTotal = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textMuted};
  margin-top: 4px;
`;

const BannerNote = styled.div`
  font-size: 13px;
  opacity: 0.85;
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: ${shared.space[3]};
  flex-wrap: wrap;
`;

const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 96px;
  padding: ${shared.space[3]} ${shared.space[4]};
  border-radius: ${shared.radius.md};
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  font-size: 13px;
  color: ${({ theme }) => theme.textMuted};

  & b {
    font-size: 24px;
    font-family: ${shared.fontStack.mono};
    color: ${({ theme, $tone }) =>
      $tone === 'success' ? theme.success : $tone === 'danger' ? theme.danger : theme.text};
  }
`;

const ResultButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${shared.space[3]};
  flex-wrap: wrap;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${shared.space[5]};
  max-width: 860px;
  width: 100%;
  margin: 0 auto;
`;
