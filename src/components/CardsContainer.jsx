import React, { useEffect, useState } from 'react';
import Card from './Card';
import data from '../data/data';
import { useLanguage } from '../providers/LanguageProvider';
import styled from 'styled-components';
import { Flex, Pagination } from 'antd';
import CardNew from './CardNew';
import { motion, useScroll } from 'framer-motion';
import MCardNew from './CardNew';
import dataNew from '../data/dataNew';

const textAnimation = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: (custom) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};

export function CardsContainer({ questionNr }) {
  const { scrollYProgress } = useScroll();
  const { language } = useLanguage();
  const pageSizeOptions = [8, 16, 24, 32];
  const initialPage = localStorage.getItem('currentPage') || 1;
  const [currentPage, setCurrentPage] = useState(Number(initialPage));
  // const [currentPage, setCurrentPage] = useState(1); // номер текущей страницы
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]); // количество отображаемых товаров на странице или размер страницы

  const handlePageChange = (page) => {
    // функция, которая меняет номер текущей стариницы
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setCurrentPage(1); // сбрасываем номер текущей страницы, при изменении размера страницы
    setPageSize(size); // изменяем размер страницы
  };

  const startIndex = (currentPage - 1) * pageSize; // стартовый индекс элемента, с которого должны отображаться элементы на текущей странице.
  const endIndex = startIndex + pageSize; // последний индекс элемента, до которого должны отображаться элементы на текущей странице.

  const productsToShow = dataNew.slice(startIndex, endIndex); // с помощью стартового и последнего элемента, формируем массив элементов
  const question = dataNew.find((q) => q.id === questionNr);
  // Update localStorage whenever currentPage changes
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);
  return (
    <Container>
      {questionNr ? (
        ''
      ) : (
        <ContainerPagination>
          <CustomPagination
            current={currentPage} // текущая страница, передается номер текущей страницы
            total={data.length} // общее количество элементов, используется для вычисления количества страниц
            pageSize={pageSize} // количество элементов на одной странице
            // pageSizeOptions={data} // массив вариантов выбора количества элементов на странице
            showSizeChanger // опция отображения выпадающего списка для выбора количества элементов на странице
            // showQuickJumper // опция отображения поля для быстрого перехода на определенную страницу
            showTotal={(total) => `Total ${total} items`} // функция для отображения общего количества элементов внизу пагинации
            onChange={handlePageChange} // Обработчик события при изменении текущей страницы
            onShowSizeChange={handlePageSizeChange} // Обработчик события при изменении размера страницы
            style={{
              fontWeight: 'bold',
              color: 'white',
            }}
            size="small"
          />
        </ContainerPagination>
      )}
      <ContainerCard>
        {questionNr === 0 ? (
          productsToShow.map((question, index) => (
            // <CardNew
            //   // custom={index + 1}
            //   // variants={textAnimation}
            //   key={question.id}
            //   id={question.id}
            //   questionDe={question.de}
            //   answerDe={question.answers.de}
            //   question={question[language]}
            //   answer={question.answers[language]}
            //   image={question.img}
            // />
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
            />
          ))
        ) : (
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
          />
        )}
      </ContainerCard>
      {questionNr ? (
        ''
      ) : (
        <ContainerPagination>
          <CustomPagination
            current={currentPage} // текущая страница, передается номер текущей страницы
            total={data.length} // общее количество элементов, используется для вычисления количества страниц
            pageSize={pageSize} // количество элементов на одной странице
            // pageSizeOptions={data} // массив вариантов выбора количества элементов на странице
            showSizeChanger // опция отображения выпадающего списка для выбора количества элементов на странице
            // showQuickJumper // опция отображения поля для быстрого перехода на определенную страницу
            showTotal={(total) => `Total ${total} items`} // функция для отображения общего количества элементов внизу пагинации
            onChange={handlePageChange} // Обработчик события при изменении текущей страницы
            onShowSizeChange={handlePageSizeChange} // Обработчик события при изменении размера страницы
            style={{
              fontWeight: 'bold',
              color: 'white',
            }}
            size="small"
          />
        </ContainerPagination>
      )}
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
`;

const ContainerPagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const CustomPagination = styled(Pagination)`
  .ant-pagination-item a {
    color: #1677ff;
  }
  .ant-pagination-item-ellipsis,
  .ant-pagination-item-link {
    color: #1677ff !important;
  }
`;
