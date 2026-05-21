import { useEffect, useRef, useState } from 'react';
import Card from './Card';
import data from '../data/data';
import { useLanguage } from '../providers/LanguageProvider';
import styled from 'styled-components';
import { Pagination } from 'antd';
import dataNew from '../data/dataNew';

const totalLabels = {
  de: (total) => `Insgesamt ${total} Aufgaben`,
  en: (total) => `Total ${total} questions`,
  ua: (total) => `Всього ${total} запитань`,
  ru: (total) => `Всего ${total} вопросов`,
  ar: (total) => `المجموع: ${total} سؤال`,
};

export function CardsContainer({ questionNr }) {
  const { language } = useLanguage();
  const pageSizeOptions = [8, 16, 24, 32];
  const initialPage = localStorage.getItem('currentPage') || 1;
  const [currentPage, setCurrentPage] = useState(Number(initialPage));
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const isInitialMount = useRef(true);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setCurrentPage(1);
    setPageSize(size);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const productsToShow = dataNew.slice(startIndex, endIndex);
  const question = dataNew.find((q) => q.id === questionNr);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const showTotal = totalLabels[language] || totalLabels.de;

  const renderPagination = () => (
    <ContainerPagination>
      <CustomPagination
        current={currentPage}
        total={data.length}
        pageSize={pageSize}
        showSizeChanger
        showTotal={showTotal}
        onChange={handlePageChange}
        onShowSizeChange={handlePageSizeChange}
        size="small"
      />
    </ContainerPagination>
  );

  return (
    <Container>
      {questionNr ? '' : renderPagination()}
      {questionNr === 0 ? (
        <ContainerCard>
          {productsToShow.map((q) => (
            <Card
              key={q.id}
              id={q.id}
              questionDe={q.de}
              answerFirstDe={q.answers[1].de}
              answerSecondDe={q.answers[2].de}
              answerThirdDe={q.answers[3].de}
              answerFourthDe={q.answers[4].de}
              question={q[language]}
              answerFirst={q.answers[1][language]}
              answerSecond={q.answers[2][language]}
              answerThird={q.answers[3][language]}
              answerFourth={q.answers[4][language]}
              ansKey={q.answers.ansKey}
              image={q.img}
            />
          ))}
        </ContainerCard>
      ) : (
        <SingleCard>
          <Card
            key={question.id}
            id={question.id}
            questionDe={question.de}
            answerFirstDe={question.answers[1].de}
            answerSecondDe={question.answers[2].de}
            answerThirdDe={question.answers[3].de}
            answerFourthDe={question.answers[4].de}
            question={question[language]}
            answerFirst={question.answers[1][language]}
            answerSecond={question.answers[2][language]}
            answerThird={question.answers[3][language]}
            answerFourth={question.answers[4][language]}
            ansKey={question.answers.ansKey}
            image={question.img}
            variant="hero"
          />
        </SingleCard>
      )}
      {questionNr ? '' : renderPagination()}
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ContainerCard = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    clamp(18.75rem, calc(16.25rem + 12.5vw), 31.25rem)
  );
  justify-content: space-evenly;
  row-gap: 45px;
  column-gap: clamp(1.25rem, calc(0.73rem + 1.74vw), 2.81rem);

  & > * {
    content-visibility: auto;
    contain-intrinsic-size: auto 600px;
  }
`;

const SingleCard = styled.div`
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
`;

const ContainerPagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const CustomPagination = styled(Pagination)`
  .ant-pagination-item a {
    color: ${({ theme }) => theme.accent};
  }
  .ant-pagination-item-ellipsis,
  .ant-pagination-item-link {
    color: ${({ theme }) => theme.accent} !important;
  }
  .ant-pagination-total-text {
    color: ${({ theme }) => theme.textMuted};
  }
`;
