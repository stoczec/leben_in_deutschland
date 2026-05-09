import { Image } from 'antd';
import { forwardRef, useState } from 'react';
import { styled } from 'styled-components';
import { useLanguage } from '../providers/LanguageProvider';
import { themes, shared } from '../assets/styles/themes';

const t = themes.product.dark;

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
    },
    ref
  ) => {
    const { language } = useLanguage();
    const [selected, setSelected] = useState(0);

    const answersDe = [answerFirstDe, answerSecondDe, answerThirdDe, answerFourthDe];
    const answersTr = [answerFirst, answerSecond, answerThird, answerFourth];
    const showTranslation = language !== 'de';
    const idStr = String(id).padStart(3, '0');

    const stateOf = (idx) => {
      if (selected === 0) return 'idle';
      if (idx === ansKey) return 'correct';
      if (idx === selected) return 'wrong';
      return 'idle';
    };

    const handleSelect = (idx) => () => setSelected(idx);
    const handleKey = (idx) => (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setSelected(idx);
      }
    };

    return (
      <Article ref={ref}>
        <ImageWrap>
          <ImageInner>
            <Image src={image} alt="" loading="lazy" decoding="async" />
          </ImageInner>
        </ImageWrap>
        <Body>
          <MetaRow>
            <IdBadge>{idStr}</IdBadge>
            <Counter>{id} / 310</Counter>
          </MetaRow>
          <QuestionBlock>
            <QuestionDe>{questionDe}</QuestionDe>
            {showTranslation && <QuestionTr>{question}</QuestionTr>}
          </QuestionBlock>
          <Answers role="radiogroup">
            {answersDe.map((ansDe, i) => {
              const idx = i + 1;
              const state = stateOf(idx);
              const isSelected = selected === idx;
              return (
                <Row
                  key={idx}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={handleSelect(idx)}
                  onKeyDown={handleKey(idx)}
                  $state={state}
                  data-testid={`answer-de-${idx}`}
                >
                  <Circle $isSelected={isSelected}>
                    {isSelected && <Dot />}
                  </Circle>
                  <Number>{idx}</Number>
                  <Text>
                    <TextDe>{ansDe}</TextDe>
                    {showTranslation && <TextTr>{answersTr[i]}</TextTr>}
                  </Text>
                  <Status $state={state}>
                    {state === 'correct' && <CheckIcon />}
                    {state === 'wrong' && <CrossIcon />}
                  </Status>
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

const Article = styled.article`
  background: ${t.surface};
  border: 1px solid ${t.border};
  border-radius: ${shared.radius.lg};
  box-shadow: ${shared.shadow.sm};
  overflow: hidden;
  font-family: ${shared.fontStack.sans};
  color: ${t.text};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ImageWrap = styled.div`
  background: ${t.surfaceAlt};
  padding: ${shared.space[3]};
`;

const ImageInner = styled.div`
  width: 100%;
  border-radius: ${shared.radius.md};
  overflow: hidden;
  aspect-ratio: 16 / 10;
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
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${shared.space[3]};
`;

const IdBadge = styled.span`
  font-family: ${shared.fontStack.mono};
  font-size: 12px;
  color: ${t.textMuted};
  background: ${t.surfaceAlt};
  padding: 3px 8px;
  border-radius: ${shared.radius.sm};
  border: 1px solid ${t.border};
`;

const Counter = styled.span`
  font-size: 12px;
  color: ${t.textSubtle};
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
  color: ${t.textMuted};
  text-wrap: pretty;
`;

const Answers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const stateBg = (state) =>
  state === 'correct' ? t.successBg : state === 'wrong' ? t.dangerBg : t.surface;
const stateBorder = (state) =>
  state === 'correct'
    ? t.successBorder
    : state === 'wrong'
    ? t.dangerBorder
    : t.border;

const Row = styled.div`
  display: grid;
  grid-template-columns: 22px auto 1fr 18px;
  align-items: center;
  gap: ${shared.space[3]};
  padding: 12px 14px;
  background: ${({ $state }) => stateBg($state)};
  border: 1px solid ${({ $state }) => stateBorder($state)};
  border-radius: ${shared.radius.md};
  cursor: pointer;
  transition: background ${shared.motion.fast},
    border-color ${shared.motion.fast};

  &:hover {
    background: ${({ $state }) =>
      $state === 'idle' ? t.surfaceAlt : stateBg($state)};
  }
`;

const Circle = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 999px;
  border: 1.5px solid
    ${({ $isSelected }) => ($isSelected ? t.accent : t.borderStrong)};
  background: ${({ $isSelected }) => ($isSelected ? t.accent : 'transparent')};
  position: relative;
`;

const Dot = styled.span`
  position: absolute;
  inset: 5px;
  border-radius: 999px;
  background: ${t.surface};
`;

const Number = styled.span`
  font-size: 11px;
  color: ${t.textSubtle};
  font-family: ${shared.fontStack.mono};
  text-align: center;
  min-width: 14px;
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
  color: ${t.textMuted};
  margin-top: 2px;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $state }) =>
    $state === 'correct'
      ? t.success
      : $state === 'wrong'
      ? t.danger
      : 'transparent'};
`;
