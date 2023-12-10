import React from 'react';
import { LanguageSelector } from './LanguageSelector';
import Card from './Card';
import data from '../data/data';
import { useLanguage } from '../providers/LanguageProvider';
import styled from 'styled-components';
import { Flex } from 'antd';

export function CardsContainer() {
  const { language } = useLanguage();

  return (
    <Container gap="small" vertical justify="center" align="start">
      {data.map((question, index) => (
        <Card
          key={question.id}
          id={question.id}
          questionDe={question.de}
          answerDe={question.answers.de}
          question={question[language]}
          answer={question.answers[language]}
          image={`../assets/images/${question.id}.jpg`}
        />
      ))}
    </Container>
  );
}

const Container = styled(Flex)`
  width: 90%;
`;
