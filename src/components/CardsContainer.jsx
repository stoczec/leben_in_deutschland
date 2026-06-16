import { useEffect, useMemo, useRef, useState } from 'react';
import Card from './Card';
import { useLanguage } from '../providers/LanguageProvider';
import { useProgress } from '../providers/ProgressProvider';
import styled, { keyframes } from 'styled-components';
import { Empty, Pagination } from 'antd';
import dataNew from '../data/dataNew';
import { useExam } from '../providers/ExamProvider';
import { shared } from '../assets/styles/themes';

const totalLabels = {
  de: (total) => `Insgesamt ${total} Aufgaben`,
  en: (total) => `Total ${total} questions`,
  ua: (total) => `Всього ${total} запитань`,
  ru: (total) => `Всего ${total} вопросов`,
  ar: (total) => `المجموع: ${total} سؤال`,
};

const emptyLabels = {
  de: { wrong: 'Noch keine falsch beantworteten Fragen.', favorites: 'Noch keine gemerkten Fragen.' },
  en: { wrong: 'No incorrectly answered questions yet.', favorites: 'No bookmarked questions yet.' },
  ua: { wrong: 'Ще немає запитань з помилками.', favorites: 'Ще немає збережених запитань.' },
  ru: { wrong: 'Пока нет вопросов с ошибками.', favorites: 'Пока нет избранных вопросов.' },
  ar: { wrong: 'لا توجد أسئلة مُجاب عنها بشكل خاطئ بعد.', favorites: 'لا توجد أسئلة محفوظة بعد.' },
};

const pageSizeOptions = [8, 16, 24, 32];

const cardProps = (q, language) => ({
  id: q.id,
  land: q.land,
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

const readInitialPage = () => {
  const raw = Number(localStorage.getItem('currentPage'));
  const maxPage = Math.ceil(dataNew.length / pageSizeOptions[0]);
  if (!Number.isInteger(raw) || raw < 1 || raw > maxPage) return 1;
  return raw;
};

export function CardsContainer({ questionNr, filter = 'all' }) {
  const { language } = useLanguage();
  const { answers, favorites } = useProgress();
  const { land } = useExam();
  const [currentPage, setCurrentPage] = useState(readInitialPage);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const isInitialMount = useRef(true);
  const prevKey = useRef(`${filter}:${land}`);

  const pool = useMemo(() => dataNew.filter((q) => !q.land || q.land === land), [land]);
  const list = useMemo(() => {
    if (filter === 'wrong')
      return pool.filter((q) => answers[q.id] != null && answers[q.id] !== q.answers.ansKey);
    if (filter === 'favorites') return pool.filter((q) => favorites.has(q.id));
    return pool;
  }, [filter, answers, favorites, pool]);

  useEffect(() => {
    const key = `${filter}:${land}`;
    if (prevKey.current !== key) {
      prevKey.current = key;
      setCurrentPage(1);
    }
  }, [filter, land]);

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePageSizeChange = (current, size) => {
    setCurrentPage(1);
    setPageSize(size);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const productsToShow = list.slice(startIndex, startIndex + pageSize);
  const question = dataNew.find((q) => q.id === questionNr);

  useEffect(() => {
    if (filter === 'all') localStorage.setItem('currentPage', currentPage);
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [currentPage, filter]);

  const showTotal = totalLabels[language] || totalLabels.de;
  const showGrid = questionNr === 0 || !question;
  const isEmpty = showGrid && list.length === 0;

  const renderPagination = () => (
    <ContainerPagination>
      <CustomPagination
        current={currentPage}
        total={list.length}
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
      {showGrid && !isEmpty ? renderPagination() : ''}
      {showGrid ? (
        isEmpty ? (
          <EmptyWrap>
            <Empty description={(emptyLabels[language] || emptyLabels.de)[filter]} />
          </EmptyWrap>
        ) : (
          <ContainerCard>
            {productsToShow.map((q) => (
              <Card key={q.id} {...cardProps(q, language)} total={pool.length} />
            ))}
          </ContainerCard>
        )
      ) : (
        <SingleCard>
          <Card key={question.id} {...cardProps(question, language)} variant="hero" total={pool.length} />
        </SingleCard>
      )}
      {showGrid && !isEmpty ? renderPagination() : ''}
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const cardIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
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
    animation: ${cardIn} 0.45s ease-out both;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  & > *:nth-child(2) { animation-delay: 0.04s; }
  & > *:nth-child(3) { animation-delay: 0.08s; }
  & > *:nth-child(4) { animation-delay: 0.12s; }
  & > *:nth-child(5) { animation-delay: 0.16s; }
  & > *:nth-child(6) { animation-delay: 0.2s; }
  & > *:nth-child(7) { animation-delay: 0.24s; }
  & > *:nth-child(8) { animation-delay: 0.28s; }

  @media (hover: hover) {
    & > *:hover {
      transform: translateY(-4px);
      box-shadow: ${shared.shadow.lg};
    }
  }
`;

const SingleCard = styled.div`
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
`;

const EmptyWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.space[10]} 0;
  color: ${({ theme }) => theme.textMuted};
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
