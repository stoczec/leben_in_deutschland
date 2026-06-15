import { Image } from 'antd';
import { forwardRef } from 'react';
import { styled, css, keyframes } from 'styled-components';
import { useLanguage } from '../providers/LanguageProvider';
import { useProgress } from '../providers/ProgressProvider';
import { shared } from '../assets/styles/themes';

const imgAltLabels = {
  de: (id) => `Abbildung zu Frage ${id}`,
  en: (id) => `Illustration for question ${id}`,
  ua: (id) => `Ілюстрація до запитання ${id}`,
  ru: (id) => `Иллюстрация к вопросу ${id}`,
  ar: (id) => `صورة توضيحية للسؤال ${id}`,
};

const answersLabels = {
  de: 'Antwortmöglichkeiten',
  en: 'Answer options',
  ua: 'Варіанти відповідей',
  ru: 'Варианты ответов',
  ar: 'خيارات الإجابة',
};

const CheckIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M5 10.5L8.5 14L15 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CrossIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M6 6L14 14M14 6L6 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill={filled ? 'currentColor' : 'none'} aria-hidden="true">
    <path
      d="M8 1.8l1.76 3.57 3.94.57-2.85 2.78.67 3.92L8 10.96l-3.52 1.86.67-3.92-2.85-2.78 3.94-.57z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  </svg>
);

const favLabels = {
  de: 'Merken',
  en: 'Bookmark',
  ua: 'У збережені',
  ru: 'В избранное',
  ar: 'حفظ',
};

const Card = forwardRef(
  (
    {
      id,
      questionDe,
      answerFirstDe,
      answerSecondDe,
      answerThirdDe,
      answerFourthDe,
      question,
      answerFirst,
      answerSecond,
      answerThird,
      answerFourth,
      ansKey,
      image,
      variant = 'grid',
      selectedValue,
      onSelect,
      mode = 'practice',
    },
    ref
  ) => {
    const { language } = useLanguage();
    const { answers, recordAnswer, favorites, toggleFavorite } = useProgress();
    const isFav = favorites.has(id);
    const favLabel = favLabels[language] || favLabels.de;
    const selected = selectedValue != null ? selectedValue : answers[id] ?? 0;
    const interactive = mode !== 'review';
    const choose = onSelect || ((idx) => recordAnswer(id, idx));

    const answersDe = [answerFirstDe, answerSecondDe, answerThirdDe, answerFourthDe];
    const answersTr = [answerFirst, answerSecond, answerThird, answerFourth];
    const showTranslation = language !== 'de';
    const idStr = String(id).padStart(3, '0');

    const stateOf = (idx) => {
      if (mode === 'exam') return selected !== 0 && idx === selected ? 'selected' : 'idle';
      const shouldReveal = mode === 'review' || selected !== 0;
      if (!shouldReveal) return 'idle';
      if (idx === ansKey) return 'correct';
      if (selected !== 0 && idx === selected) return 'wrong';
      return 'idle';
    };

    const handleSelect = (idx) => () => choose(idx);
    const handleKey = (idx) => (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        choose(idx);
      }
    };

    return (
      <Article ref={ref} $variant={variant}>
        {image && (
          <ImageWrap $variant={variant}>
            <ImageInner $variant={variant}>
              <Image
                src={image}
                alt={(imgAltLabels[language] || imgAltLabels.de)(id)}
                loading="lazy"
                decoding="async"
              />
            </ImageInner>
          </ImageWrap>
        )}
        <Body $variant={variant}>
          <MetaRow>
            <IdBadge>{idStr}</IdBadge>
            <MetaRight>
              <Counter>{id} / 310</Counter>
              {mode !== 'exam' && (
                <FavButton
                  type="button"
                  onClick={() => toggleFavorite(id)}
                  $active={isFav}
                  aria-pressed={isFav}
                  aria-label={favLabel}
                  title={favLabel}
                  data-testid={`fav-${id}`}
                >
                  <StarIcon filled={isFav} />
                </FavButton>
              )}
            </MetaRight>
          </MetaRow>
          <QuestionBlock>
            <QuestionDe>{questionDe}</QuestionDe>
            {showTranslation && <QuestionTr>{question}</QuestionTr>}
          </QuestionBlock>
          <Answers role="radiogroup" aria-label={answersLabels[language] || answersLabels.de}>
            {answersDe.map((ansDe, i) => {
              const idx = i + 1;
              const state = stateOf(idx);
              const isSelected = selected === idx;
              return (
                <Row
                  key={idx}
                  role="radio"
                  aria-checked={isSelected}
                  aria-disabled={!interactive}
                  tabIndex={interactive ? 0 : -1}
                  onClick={interactive ? handleSelect(idx) : undefined}
                  onKeyDown={interactive ? handleKey(idx) : undefined}
                  $state={state}
                  $interactive={interactive}
                  data-testid={`answer-de-${idx}`}
                >
                  <Badge $state={state}>
                    {state === 'correct' ? (
                      <CheckIcon size={16} />
                    ) : state === 'wrong' ? (
                      <CrossIcon size={16} />
                    ) : (
                      idx
                    )}
                  </Badge>
                  <Text>
                    <TextDe>{ansDe}</TextDe>
                    {showTranslation && <TextTr>{answersTr[i]}</TextTr>}
                  </Text>
                </Row>
              );
            })}
          </Answers>
        </Body>
      </Article>
    );
  }
);

Card.displayName = 'Card';
export default Card;

const stateBg = ({ theme, $state }) =>
  $state === 'correct'
    ? theme.successBg
    : $state === 'wrong'
    ? theme.dangerBg
    : $state === 'selected'
    ? theme.accentBg
    : theme.surface;

const stateBorder = ({ theme, $state }) =>
  $state === 'correct'
    ? theme.successBorder
    : $state === 'wrong'
    ? theme.dangerBorder
    : $state === 'selected'
    ? theme.accentBorder
    : theme.border;

const heroAtWide = (rules) => css`
  @media (min-width: 800px) {
    ${rules}
  }
`;

const heroIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
`;

const Article = styled.article`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 18px;
  box-shadow: ${shared.shadow.md};
  overflow: hidden;
  font-family: ${shared.fontStack.sans};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  height: 100%;

  ${({ $variant }) =>
    $variant === 'hero' &&
    css`
      animation: ${heroIn} 0.4s ease-out both;
    `}

  ${({ $variant }) =>
    $variant === 'hero' &&
    heroAtWide(css`
      display: grid;
      grid-template-columns: 320px 1fr;
      flex-direction: unset;
    `)}
`;

const ImageWrap = styled.div`
  background: ${({ theme }) => theme.surfaceAlt};
  padding: ${shared.space[3]};

  ${({ $variant }) =>
    $variant === 'hero' &&
    heroAtWide(css`
      display: flex;
      align-items: stretch;
    `)}
`;

const ImageInner = styled.div`
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  max-height: 200px;
  display: block;

  .ant-image,
  .ant-image-img,
  .ant-image img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .ant-image-img,
  .ant-image img {
    object-fit: cover;
  }

  ${({ $variant }) =>
    $variant === 'hero' &&
    heroAtWide(css`
      aspect-ratio: auto;
      max-height: none;
      flex: 1;
      align-self: stretch;

      .ant-image,
      .ant-image-img,
      .ant-image img {
        height: 100%;
      }
    `)}
`;

const Body = styled.div`
  padding: ${shared.space[4]} ${shared.space[5]} ${shared.space[5]};
  display: flex;
  flex-direction: column;
  gap: ${shared.space[4]};
  flex: 1;

  @media (max-width: 700px) {
    padding: ${shared.space[4]};
  }

  ${({ $variant }) =>
    $variant === 'hero' &&
    heroAtWide(css`
      padding: ${shared.space[6]} ${shared.space[6]} ${shared.space[6]};
      gap: ${shared.space[5]};
    `)}
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${shared.space[3]};
`;

const MetaRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${shared.space[2]};
`;

const FavButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme, $active }) => ($active ? theme.accent : theme.textSubtle)};
  transition: background ${shared.motion.fast}, color ${shared.motion.fast};

  &:hover {
    background: ${({ theme }) => theme.surfaceAlt};
    color: ${({ theme }) => theme.accent};
  }
`;

const IdBadge = styled.span`
  font-family: ${shared.fontStack.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.textMuted};
  background: ${({ theme }) => theme.surfaceAlt};
  padding: 3px 8px;
  border-radius: ${shared.radius.sm};
  border: 1px solid ${({ theme }) => theme.border};
`;

const Counter = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.textSubtle};
  font-family: ${shared.fontStack.mono};
`;

const QuestionBlock = styled.div``;

const QuestionDe = styled.p`
  font-size: 19px;
  line-height: 28px;
  font-weight: 600;
  letter-spacing: -0.005em;
  text-wrap: pretty;
`;

const QuestionTr = styled.p`
  margin-top: 6px;
  font-size: 14px;
  line-height: 21px;
  color: ${({ theme }) => theme.textMuted};
  text-wrap: pretty;
`;

const Answers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr;
  align-items: center;
  gap: ${shared.space[3]};
  padding: 13px 14px;
  min-height: 56px;
  background: ${stateBg};
  border: 1px solid ${stateBorder};
  border-radius: ${shared.radius.lg};
  cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};
  transition: background ${shared.motion.fast}, border-color ${shared.motion.fast},
    transform ${shared.motion.fast};

  &:hover {
    background: ${({ theme, $state, $interactive }) =>
      $interactive && $state === 'idle' ? theme.surfaceAlt : stateBg({ theme, $state })};
    border-color: ${({ theme, $state, $interactive }) =>
      $interactive && $state === 'idle' ? theme.borderStrong : stateBorder({ theme, $state })};
  }

  &:active {
    transform: ${({ $interactive }) => ($interactive ? 'scale(0.985)' : 'none')};
  }
`;

const badgeBg = ({ theme, $state }) =>
  $state === 'correct'
    ? theme.success
    : $state === 'wrong'
    ? theme.danger
    : $state === 'selected'
    ? theme.accent
    : 'transparent';

const badgeFg = ({ theme, $state }) =>
  $state === 'correct'
    ? theme.successBg
    : $state === 'wrong'
    ? theme.dangerBg
    : $state === 'selected'
    ? theme.accentBg
    : theme.textMuted;

const badgePop = keyframes`
  0% { transform: scale(0.6); }
  60% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const Badge = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: ${shared.fontStack.mono};
  font-size: 13px;
  font-weight: 600;
  background: ${badgeBg};
  color: ${badgeFg};
  border: 1.5px solid
    ${({ theme, $state }) => ($state === 'idle' ? theme.borderStrong : 'transparent')};
  transition: background ${shared.motion.fast}, color ${shared.motion.fast},
    border-color ${shared.motion.fast};

  ${({ $state }) =>
    ($state === 'correct' || $state === 'wrong') &&
    css`
      animation: ${badgePop} 0.3s ease-out;
    `}
`;

const Text = styled.div`
  min-width: 0;
  text-align: start;
`;

const TextDe = styled.div`
  font-size: 15px;
  line-height: 22px;
  font-weight: 500;
`;

const TextTr = styled.div`
  font-size: 13px;
  line-height: 20px;
  color: ${({ theme }) => theme.textMuted};
  margin-top: 2px;
`;

