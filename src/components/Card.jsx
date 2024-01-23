import { Badge, Image, Radio, Divider } from 'antd';
import React, { forwardRef, useState } from 'react';
import { styled } from 'styled-components';
import { useLanguage } from '../providers/LanguageProvider';
import { motion } from 'framer-motion';

const CardNew = forwardRef(
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
    const [value, setValue] = useState(0);

    const onChange = (e) => {
      setValue(e.target.value);
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
      <CustomBadge
        text={id < 10 ? `00${id}` : id < 100 ? `0${id}` : id}
        color="#d8d8d8"
        style={{ fontSize: '16px', color: '#d8d8d8', fontWeight: 'bold' }}
        placement="start"
      >
        <Card ref={ref}>
          <StyledImage src={image} alt="Image" width={'100%'} />
          <TitleQuestion>{frageTOggle()}</TitleQuestion>
          <QuestionDe>{questionDe}</QuestionDe>
          {language !== 'de' && <Question>{question}</Question>}
          <Divider
            style={{
              backgroundColor: '#d8d8d8',
              margin: '0',
              fontSize: '30px',
            }}
          />
          <TitleAnswer>{antwortTOggle()}</TitleAnswer>

          <Radio.Group
            onChange={onChange}
            value={value}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '8px',
              // justifyContent: 'flex-start',
            }}
          >
            <CustomRadio value={1}>
              <AnswerDe value={1} hasValue={value} ansKey={ansKey}>
                {answerFirstDe}
              </AnswerDe>
              {language !== 'de' && (
                <Answer value={1} hasValue={value} ansKey={ansKey}>
                  {answerFirst}
                </Answer>
              )}
            </CustomRadio>
            <CustomRadio value={2}>
              <AnswerDe value={2} hasValue={value} ansKey={ansKey}>
                {answerSecondDe}
              </AnswerDe>
              {language !== 'de' && (
                <Answer value={2} hasValue={value} ansKey={ansKey}>
                  {answerSecond}
                </Answer>
              )}
            </CustomRadio>
            <CustomRadio value={3}>
              <AnswerDe value={3} hasValue={value} ansKey={ansKey}>
                {answerThirdDe}
              </AnswerDe>
              {language !== 'de' && (
                <Answer value={3} hasValue={value} ansKey={ansKey}>
                  {answerThird}
                </Answer>
              )}
            </CustomRadio>
            <CustomRadio value={4}>
              <AnswerDe value={4} hasValue={value} ansKey={ansKey}>
                {answerFourthDe}
              </AnswerDe>
              {language !== 'de' && (
                <Answer value={4} hasValue={value} ansKey={ansKey}>
                  {answerFourth}
                </Answer>
              )}
            </CustomRadio>
          </Radio.Group>
        </Card>
      </CustomBadge>
    );
  }
);

// SCC ========== STYLED COMPONENTS ========== //

const CustomBadge = styled(Badge.Ribbon)`
  .ant-ribbon-text {
    color: #262626;
  }
`;

const Card = styled.article`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  border: 3px #d8d8d8 solid;
  border-radius: 10px;
  border-bottom-right-radius: 10px;
  padding-bottom: 20px;
`;

const StyledImage = styled(Image)`
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
  &:hover.ant-image-mask {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
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

  background-color: ${({ value, hasValue, ansKey }) =>
    hasValue === 0 || value !== hasValue
      ? '#87b8ec'
      : (hasValue === ansKey) & (value === hasValue)
      ? '#1bc51c'
      : '#e61a1a'};

  color: black;
  padding: 5px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 10px 10px 0 0;
  border-bottom: 3px #d8d8d8 solid;
`;

const Answer = styled.p`
  width: 100%;

  background-color: ${({ value, hasValue, ansKey }) =>
    hasValue === 0 || value !== hasValue
      ? '#94831f'
      : (hasValue === ansKey) & (value === hasValue)
      ? '#1bc51c'
      : '#e61a1a'};

  color: black;
  padding: 5px;
  cursor: pointer;
  border-radius: 0 0 10px 10px;
`;

const CustomRadio = styled(Radio)`
  width: 100%;
  padding-left: 8px;

  span:has(p) {
    width: 100%;
  }
`;

const MCardNew = motion(CardNew);
export default MCardNew;
