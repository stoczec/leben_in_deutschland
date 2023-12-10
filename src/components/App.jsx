import React, { useEffect, useRef } from 'react';
import { FloatButton, Layout, Space, Typography } from 'antd';
import { LanguageSelector } from './LanguageSelector';
import { CardsContainer } from './CardsContainer';
import Starfield from 'react-starfield';
import styled from 'styled-components';

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

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
  // fontFamaly: 'Roboto',
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
  color: '#fff',
  backgroundColor: '#D2B48C',
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
            starCount={2000}
            starColor={[255, 255, 255]}
            speedFactor={0.05}
            backgroundColor="black"
          />
          <LanguageSelector />
          <CardsContainer />
        </Content>
        <Footer style={footerStyle}>
          ©2023 Created by Dmytro Herashchenko
        </Footer>
        <FloatButton.BackTop visibilityHeight={0} />
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
  /* text-fill-color: transparent; */
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
