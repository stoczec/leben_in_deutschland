import React from 'react';
import { FloatButton, Layout, Space, Flex, Divider } from 'antd';
import { LanguageSelector } from './LanguageSelector';
import { CardsContainer } from './CardsContainer';
import Starfield from 'react-starfield';
import styled, { keyframes } from 'styled-components';
import linkedin from '../assets/linkedin.svg';
import telegram from '../assets/telegram.svg';
import whatsapp from '../assets/whatsapp.svg';
import MyTable from './MyTable';
import data from '../data/data';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { CaretUpOutlined } from '@ant-design/icons';

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
  // lineHeight: '120px',
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
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '20px 0',
};

const textAnimation = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: (custom) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};

const textAnimationY = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: (custom) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
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
        <MHeader style={headerStyle} initial="hidden" whileInView="visible">
          <CustomTitle custom={1.5} variants={textAnimationY}>
            Leben in Deutschland
          </CustomTitle>
        </MHeader>
        <Content style={contentStyle}>
          <Starfield
            starCount={500}
            starColor={[216, 216, 216]}
            speedFactor={0.05}
            backgroundColor="black"
          />
          <MFlex
            gap={15}
            vertical
            align="center"
            initial="hidden"
            whileInView="visible"
          >
            <LanguageSelector />
            <FragenParagraph custom={2} variants={textAnimation}>
              Hinzugefügt{' '}
              <motion.span
                style={{ color: 'green' }}
                custom={3}
                variants={textAnimation}
              >
                {data.length}
              </motion.span>{' '}
              von{' '}
              <motion.span
                style={{ color: 'red' }}
                custom={4}
                variants={textAnimation}
              >
                310
              </motion.span>{' '}
              Fragen.
            </FragenParagraph>
          </MFlex>
          <Divider style={{ backgroundColor: '#d8d8d8' }} />
          <CardsContainer />
          <Divider style={{ backgroundColor: '#d8d8d8' }} />
          <MyTable />
        </Content>
        <Footer style={footerStyle}>
          <FooterLinks initial="hidden" whileInView="visible">
            <motion.a
              href="https://t.me/DmytroHerashchenko"
              target="_blank"
              rel="noopener noreferrer"
              custom={1}
              variants={textAnimationY}
            >
              <CustomImage src={telegram} alt="telegram" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/herashchenko-dmytro/"
              target="_blank"
              rel="noopener noreferrer"
              custom={2}
              variants={textAnimationY}
            >
              <CustomImage src={linkedin} alt="linkedin" />
            </motion.a>
            <motion.a
              href="https://wa.me/+4915120495620"
              target="_blank"
              rel="noopener noreferrer"
              custom={3}
              variants={textAnimationY}
            >
              <CustomImage src={whatsapp} alt="whatsapp" />
            </motion.a>
          </FooterLinks>
          ©2023 Erstellt von Dmytro Herashchenko
        </Footer>

        <CustomFloatButton icon={<CaretUpOutlined />} />
      </Layout>
    </Space>
  );
}
export default App;

const MHeader = motion(Header);
const MFlex = motion(Flex);

const CustomTitle = styled(motion.p)`
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

const FooterLinks = styled(motion.div)`
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

const FragenParagraph = styled(motion.p)`
  font-size: 24px;
  font-weight: bold;
  margin-top: 25px;
`;
