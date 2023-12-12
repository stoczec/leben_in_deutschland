import React from 'react';
import { Collapse, Flex, Image, Typography, Badge } from 'antd';
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useLanguage } from '../providers/LanguageProvider';
import styled from 'styled-components';

const CustomExpandIcon = ({ isActive }) =>
  isActive ? (
    <CaretDownOutlined style={{ fontSize: '16px', color: '#FFFFFF' }} />
  ) : (
    <CaretRightOutlined style={{ fontSize: '16px', color: '#FFFFFF' }} />
  );

const Card = ({ id, questionDe, answerDe, question, answer, image }) => {
  const { language } = useLanguage();

  const itemsNest = [
    {
      key: id,
      label: (
        <StyledTextHeader>
          <StyledBadge text={language} size="small" />
          {question}
        </StyledTextHeader>
      ),
      children: <StyledLabelText>{answer}</StyledLabelText>,
    },
  ];
  const items = [
    {
      key: id,
      label: (
        <Flex gap={10}>
          <Badge
            count={id}
            style={{
              backgroundColor: '#52c41a',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
            overflowCount={999}
          />{' '}
          <StyledTextHeaderDe>{questionDe}</StyledTextHeaderDe>
        </Flex>
      ),
      children: [
        <Container vertical align="center" gap={10}>
          <StyledImage width={150} src={image} alt="Image" />
          <StyledLabelTextDe>{answerDe}</StyledLabelTextDe>
        </Container>,
        language !== 'de' && (
          <Collapse
            defaultActiveKey="1"
            items={itemsNest}
            expandIcon={CustomExpandIcon}
            ghost="true"
          />
        ),
      ],
    },
  ];
  const onChange = (key) => {
    // console.log(key);
  };

  return (
    <StyledCollapse
      onChange={onChange}
      items={items}
      size="large"
      expandIcon={CustomExpandIcon}
      // ghost="true"
    />
  );
};
export default Card;

const Container = styled(Flex)`
  padding: 10px;
`;

const StyledCollapse = styled(Collapse)`
  background-color: #242323;
  border-color: #7272713e;
  .ant-collapse-header {
    background-color: #242323;
    padding: 5px !important;
  }

  .ant-collapse-content-box {
    background-color: #7272713e;
    padding: 3px !important;
    border-radius: 5px;
  }
  .ant-collapse-content {
    background-color: #7272713e;
  }
  .ant-collapse-item {
    border-bottom: 1px solid #7272713e !important ;
  }
`;

const StyledImage = styled(Image)`
  border-radius: 8px;
  &:hover.ant-image-mask {
    border-radius: 8px;
  }
`;
const StyledTextHeader = styled.p`
  color: #f0ffff;
  font-size: 14px;
  font-weight: bold;
  font-family: 'Afacad', sans-serif;
  position: relative;
`;

const StyledTextHeaderDe = styled.p`
  color: #f0ffff;
  font-size: 16px;
  font-weight: bold;
  font-family: 'Afacad', sans-serif;
`;

const StyledLabelTextDe = styled(Typography.Text)`
  color: #242323;
  font-size: 16px;
  font-weight: bold;
  background-color: #f0ffff;
  padding-inline: 5px;
  border-radius: 5px;
`;
const StyledLabelText = styled(Typography.Text)`
  color: #242323;
  font-size: 16px;
  font-weight: bold;
  background-color: #f0ffff;
  padding-inline: 5px;
  border-radius: 5px;
`;

const StyledBadge = styled(Badge.Ribbon)`
  /* width: 10%; */
  position: absolute;
  top: -20px;
  /* transform: translateY(-50%); */
  /* right: -50px; */
  /* font-size: 20px; */
  font-weight: bolder;
`;
