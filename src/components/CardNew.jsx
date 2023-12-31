import { Image } from 'antd';
import React, { forwardRef, useState } from 'react';
import { styled } from 'styled-components';
import { useLanguage } from '../providers/LanguageProvider';
import { motion } from 'framer-motion';

const CardNew = forwardRef(
  ({ id, questionDe, answerDe, question, answer, image }, ref) => {
    const { language } = useLanguage();
    const [isBlur, setIsBlur] = useState(true);

    const handleToggleBlur = () => {
      setIsBlur(!isBlur);
    };

    const frageTOggle = () => {
      switch (language) {
        case 'de':
          return 'Frage';
        case 'en':
          return 'Frage / Question';
        case 'ru':
          return 'Frage / Вопрос';
        case 'ua':
          return 'Frage / Питання';
        case 'ar':
          return 'Frage / سؤال';

        default:
          return '';
      }
    };
    const antwortTOggle = () => {
      switch (language) {
        case 'de':
          return 'Antwort';
        case 'en':
          return 'Antwort / Answer';
        case 'ru':
          return 'Antwort / Ответ';
        case 'ua':
          return 'Antwort / Відповідь';
        case 'ar':
          return 'Antwort / إجابة';

        default:
          return '';
      }
    };

    return (
      <Card ref={ref}>
        <StyledImage src={image} alt="Image" width={'100%'} />
        <TitleQuestion>{frageTOggle()}</TitleQuestion>
        <QuestionDe>{questionDe}</QuestionDe>
        {language !== 'de' && <Question>{question}</Question>}
        <TitleAnswer>{antwortTOggle()}</TitleAnswer>
        <AnswerDe isBlur={isBlur} onClick={handleToggleBlur}>
          {answerDe}
        </AnswerDe>
        {language !== 'de' && (
          <Answer isBlur={isBlur} onClick={handleToggleBlur}>
            {answer}
          </Answer>
        )}
      </Card>
    );
  }
);

// SCC ========== STYLED COMPONENTS ========== //
const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  border: 1px white solid;
  border-radius: 15px;
  border-bottom-right-radius: 15px;
  padding-bottom: 20px;
`;

const StyledImage = styled(Image)`
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  &:hover.ant-image-mask {
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
  }
`;

const TitleQuestion = styled.p`
  font-size: 18px;
  color: #e61a1a;
`;

const TitleAnswer = styled.p`
  font-size: 18px;
  color: #1bc51c;
`;

const QuestionDe = styled.p`
  width: 100%;

  background-color: #87b8ec;
  color: black;
  padding: 5px;
  font-weight: bold;
`;

const Question = styled.p`
  width: 100%;

  background-color: #94831f;
  color: black;
  padding: 5px;
`;

const AnswerDe = styled.p`
  width: 100%;

  background-color: #87b8ec;
  color: black;
  padding: 5px;
  cursor: pointer;
  font-weight: bold;

  ${({ isBlur }) =>
    isBlur &&
    `
    filter: blur(5px);
  `}
`;

const Answer = styled.p`
  width: 100%;
  background-color: #94831f;
  color: black;
  padding: 5px;
  cursor: pointer;

  ${({ isBlur }) =>
    isBlur &&
    `
    filter: blur(5px);
  `}
`;

const MCardNew = motion(CardNew);
export default MCardNew;
