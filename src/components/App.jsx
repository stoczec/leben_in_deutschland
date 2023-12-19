import React from 'react';
import {
  FloatButton,
  Layout,
  Space,
  Typography,
  Flex,
  Divider,
  Card,
} from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { LanguageSelector } from './LanguageSelector';
import { CardsContainer } from './CardsContainer';
import Starfield from 'react-starfield';
import styled, { keyframes } from 'styled-components';
import linkedin from '../assets/linkedin.svg';
import telegram from '../assets/telegram.svg';
import whatsapp from '../assets/whatsapp.svg';
import Table from './MyTable';
import MyTable from './MyTable';

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
`;

const { Header, Footer, Content } = Layout;

const layoutStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const headerStyle = {
  color: '#fff',
  backgroundColor: '#262626',
  padding: '10px ',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const contentStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#242323',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
};

const footerStyle = {
  textAlign: 'center',
  color: '#d8d8d8',
  backgroundColor: '#262626',
  padding: '10px 0',
};
function App() {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
      size={[0, 48]}
    >
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <CustomTitle>Leben in Deutschland</CustomTitle>
        </Header>
        <Content style={contentStyle}>
          <Starfield
            starCount={500}
            starColor={[216, 216, 216]}
            speedFactor={0.05}
            backgroundColor="black"
          />
          <Flex gap={10}>
            {/* <AnimatedRightIcon /> */}
            <LanguageSelector />
            {/* <AnimatedLeftIcon /> */}
          </Flex>
          <Divider style={{ backgroundColor: '#d8d8d8' }} />
          <CardsContainer />
          <Divider style={{ backgroundColor: '#d8d8d8' }} />
          <MyTable />
        </Content>
        <Footer style={footerStyle}>
          <FooterLinks>
            <a
              href="https://t.me/DmytroHerashchenko"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CustomImage src={telegram} alt="telegram" />
            </a>
            <a
              href="https://www.linkedin.com/in/herashchenko-dmytro/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CustomImage src={linkedin} alt="linkedin" />
            </a>
            <a
              href="https://wa.me/+4915120495620"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CustomImage src={whatsapp} alt="whatsapp" />
            </a>
          </FooterLinks>
          ©2023 Created by Dmytro Herashchenko
        </Footer>
        <CustomFloatButton />
      </Layout>
    </Space>
  );
}
export default App;

const CustomTitle = styled.p`
  font-size: 30px;
  font-weight: bolder;
  background: linear-gradient(45deg, #000000, #ff0000, #ffff00, #000000);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 150% auto;
  animation: textShine 5s ease-in-out infinite alternate;

  @keyframes textShine {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
`;

const AnimatedRightIcon = styled(ArrowRightOutlined)`
  animation: ${pulseAnimation} 1s infinite;
  font-weight: bolder;
  font-size: 20px;
  color: #f00;
`;

const AnimatedLeftIcon = styled(ArrowLeftOutlined)`
  animation: ${pulseAnimation} 1s infinite;
  font-weight: bolder;
  font-size: 20px;
  color: #f00;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const CustomImage = styled.img`
  width: 32px;
`;

const CustomFloatButton = styled(FloatButton.BackTop)`
  .ant-float-btn-body {
    background-color: #d8d8d8 !important;
  }
`;
