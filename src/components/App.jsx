import { useEffect, useState } from 'react';
import {
  ConfigProvider,
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
import styled from 'styled-components';
import linkedin from '../assets/linkedin.svg';
import telegram from '../assets/telegram.svg';
import whatsapp from '../assets/whatsapp.svg';
import dataNew from '../data/dataNew';
import { motion } from 'framer-motion';
import { CaretUpOutlined } from '@ant-design/icons';
import { useLanguage } from '../providers/LanguageProvider';
import { theme } from '../assets/styles/theme';

const { Header, Footer, Content } = Layout;
const { Option } = Select;

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
  const { language } = useLanguage();
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

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
    <ConfigProvider direction={direction}>
      <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
        size={[0, 48]}
      >
        <StyledLayout>
        <StyledHeader initial="hidden" whileInView="visible">
          <CustomTitle custom={1.5} variants={textAnimationY}>
            Leben in Deutschland
          </CustomTitle>
        </StyledHeader>
        <StyledContent>
          <Starfield
            starCount={150}
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
          </MFlex>
          <StyledDivider />
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
          <StyledDivider />
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
          <StyledDivider />
        </StyledContent>
        <StyledFooter>
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
          ©2023–2026 Erstellt von Dmytro Herashchenko
        </StyledFooter>

          <CustomFloatButton icon={<CaretUpOutlined />} />
        </StyledLayout>
      </Space>
    </ConfigProvider>
  );
}
export default App;

const StyledLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const StyledHeader = styled(motion(Header))`
  color: ${theme.colors.text_primary};
  background-color: ${theme.colors.bg_chrome};
  padding: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledContent = styled(Content)`
  text-align: center;
  color: ${theme.colors.text_primary};
  background-color: ${theme.colors.bg_page};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing.lg};
`;

const StyledFooter = styled(Footer)`
  text-align: center;
  color: ${theme.colors.text_secondary};
  background-color: ${theme.colors.bg_chrome};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.lg} 0;
`;

const StyledDivider = styled(Divider)`
  background-color: ${theme.colors.border_strong};
`;

const MFlex = motion(Flex);

const CustomTitle = styled(motion.p)`
  font-size: clamp(20px, 6vw, 30px);
  font-weight: 700;
  text-align: center;
  color: ${theme.colors.text_primary};
  letter-spacing: 0.02em;
`;

const FooterLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.lg};
`;

const CustomImage = styled.img`
  width: 32px;
`;

const CustomFloatButton = styled(FloatButton.BackTop)`
  .ant-float-btn-body {
    background-color: ${theme.colors.bg_select_light} !important;
  }
`;

const Paragraph = styled.p`
  max-width: 150px;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  line-height: 1.3;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.sm};

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xxs};
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.lg};
`;

const Text = styled.p`
  font-weight: 600;
  color: ${theme.colors.text_secondary};
  font-size: 14px;
  line-height: 1.5;
  max-width: 600px;
  margin: 0 auto;
`;
