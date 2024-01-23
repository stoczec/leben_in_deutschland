import React, { useState } from 'react';
import {
  FloatButton,
  Layout,
  Space,
  Flex,
  Divider,
  Select,
  Button,
  InputNumber,
} from 'antd';
import { LanguageSelector } from './LanguageSelector';
import { CardsContainer } from './CardsContainer';
import Starfield from 'react-starfield';
import styled, { keyframes } from 'styled-components';
import linkedin from '../assets/linkedin.svg';
import telegram from '../assets/telegram.svg';
import whatsapp from '../assets/whatsapp.svg';
import MyTable from './MyTable';
import data from '../data/data';
import dataNew from '../data/dataNew';
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
    y: -50,
    opacity: 0,
  },
  visible: (custom) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};
function App() {
  const [question, setQuestion] = useState(0);

  const handleChange = (value) => {
    value === null ? (value = 0) : value;
    setQuestion(value);
  };

  const handleReset = () => {
    setQuestion(0);
  };

  const handlePlus = () => {
    setQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleMinus = () => {
    setQuestion((prevQuestion) => prevQuestion - 1);
  };

  const handleRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 310) + 1;
    setQuestion(randomNumber);
  };
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
            {/* <FragenParagraph custom={2} variants={textAnimation}>
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
            </FragenParagraph> */}
          </MFlex>
          <Divider style={{ backgroundColor: '#d8d8d8' }} />
          <SelectContainer>
            <FilterSection>
              <FilterContainer>
                <Paragraph>Wählen Sie eine Aufgabennummer</Paragraph>
                <Select
                  value="Nummer"
                  onChange={handleChange}
                  size="small"
                  style={{ width: '100px' }}
                >
                  {dataNew.map((question) => (
                    <Option key={question.id} value={question.id}>
                      {question.id}
                    </Option>
                  ))}
                </Select>
              </FilterContainer>
              <FilterContainer>
                <Paragraph>Geben Sie eine Aufgabennummer ein</Paragraph>
                <InputNumber
                  size="small"
                  min={1}
                  max={310}
                  defaultValue={155}
                  onChange={handleChange}
                  style={{ width: '100px' }}
                />
              </FilterContainer>
            </FilterSection>
            <FilterSection>
              <FilterContainer>
                <Paragraph>Zeige eine zufällige Aufgabennummer</Paragraph>
                <Button
                  type="primary"
                  onClick={handleRandomNumber}
                  size="small"
                  style={{ width: '100px' }}
                >
                  Zufällige
                </Button>
              </FilterContainer>
              <FilterContainer>
                <Paragraph>Alle Aufgabennummer anzeigen</Paragraph>
                <Button
                  type="primary"
                  onClick={handleReset}
                  size="small"
                  disabled={!question}
                  style={{ width: '100px' }}
                >
                  Alle
                </Button>
              </FilterContainer>
            </FilterSection>
          </SelectContainer>
          <Divider style={{ backgroundColor: '#d8d8d8' }} />
          <CardsContainer questionNr={question} />
          {question ? (
            <ButtonsContainer>
              {question === 1 ? (
                ''
              ) : (
                <Button type="primary" onClick={handleMinus}>
                  vorherige Aufgabe
                </Button>
              )}
              {question === 310 ? (
                ''
              ) : (
                <Button type="primary" onClick={handlePlus}>
                  nächste Aufgabe
                </Button>
              )}
            </ButtonsContainer>
          ) : (
            ''
          )}
          <Divider style={{ backgroundColor: '#d8d8d8' }} />
          {/* <MyTable /> */}
        </Content>
        <Footer style={footerStyle}>
          <Text>
            Schreiben Sie mir, wenn Sie einen Fehler gefunden haben oder
            irgendwelche Meinungen oder Vorschläge haben.
          </Text>
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

const Paragraph = styled.p`
  width: 100px;
  font-size: 9px;
  font-weight: bold;
`;

const SelectContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Text = styled.p`
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
