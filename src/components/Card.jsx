import React from 'react';
import { Collapse, Flex, Image, Typography, Badge } from 'antd';
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const CustomExpandIcon = ({ isActive }) =>
  isActive ? (
    <CaretDownOutlined style={{ fontSize: '20px', color: '#FFFFFF' }} />
  ) : (
    <CaretRightOutlined style={{ fontSize: '20px', color: '#FFFFFF' }} />
  );

const Card = ({ id, questionDe, answerDe, question, answer, image }) => {
  const { Text } = Typography;
  const itemsNest = [
    {
      key: id,
      label: <StyledText>{question}</StyledText>,
      children: <StyledLabelText keyboard>{answer}</StyledLabelText>,
    },
  ];
  const items = [
    {
      key: id,
      label: (
        <StyledText>
          <Flex gap={15}>
            <Badge
              count={id}
              style={{
                backgroundColor: '#52c41a',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
              overflowCount={999}
            />{' '}
            {questionDe}
          </Flex>
        </StyledText>
      ),
      children: [
        <Container align="center" gap={15}>
          <StyledImage width={150} src={image} alt="Image" />
          <StyledLabelText keyboard>{answerDe}</StyledLabelText>
        </Container>,
        <Collapse
          defaultActiveKey="1"
          items={itemsNest}
          expandIcon={CustomExpandIcon}
        />,
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
    />
  );
};
export default Card;

const Container = styled(Flex)`
  padding: 10px;
`;

const StyledCollapse = styled(Collapse)`
  .ant-collapse-header {
    background-color: #242323;
  }

  .ant-collapse-content-box {
    background-color: #faebd7;
  }
`;

const StyledImage = styled(Image)`
  border-radius: 8px;
  &:hover.ant-image-mask {
    border-radius: 8px;
  }
`;
const StyledText = styled.p`
  color: #f0ffff;
  font-size: 16px;
  font-weight: bold;
  font-family: 'Afacad', sans-serif;
`;

const StyledLabelText = styled(Typography.Text)`
  color: #242323;
  font-size: 20px;
  font-weight: bold;
`;
