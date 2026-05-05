import { lazy, Suspense, useEffect, useRef, useState } from 'react';
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
import styled, { keyframes } from 'styled-components';

const Starfield = lazy(() => import('react-starfield'));
import linkedin from '../assets/linkedin.svg';
import telegram from '../assets/telegram.svg';
import whatsapp from '../assets/whatsapp.svg';
import dataNew from '../data/dataNew';
import { CaretUpOutlined } from '@ant-design/icons';
import { useLanguage } from '../providers/LanguageProvider';
import { theme } from '../assets/styles/theme';

const { Header, Footer, Content } = Layout;
const { Option } = Select;

const navLabels = {
  de: { prev: 'vorherige Aufgabe', next: 'nächste Aufgabe' },
  en: { prev: 'Previous question', next: 'Next question' },
  ua: { prev: 'Попереднє питання', next: 'Наступне питання' },
  ru: { prev: 'Предыдущий вопрос', next: 'Следующий вопрос' },
  ar: { prev: 'السؤال السابق', next: 'السؤال التالي' },
};

const slideDownFadeIn = keyframes`
  from { opacity: 0; transform: translateY(-50px); }
  to { opacity: 1; transform: translateY(0); }
`;

function useInViewOnce(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, options]);
  return [ref, inView];
}
const FOOTER_OBSERVER_OPTS = { threshold: 0.15 };

function App() {
  const [question, setQuestion] = useState(0);
  const { language } = useLanguage();
  const direction = language === 'ar' ? 'rtl' : 'ltr';
  const [footerRef, footerInView] = useInViewOnce(FOOTER_OBSERVER_OPTS);

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
        <StyledHeader>
          <CustomTitle>Leben in Deutschland</CustomTitle>
        </StyledHeader>
        <StyledContent>
          <Suspense fallback={null}>
            <Starfield
              starCount={150}
              starColor={[216, 216, 216]}
              speedFactor={0.05}
              backgroundColor="black"
            />
          </Suspense>
          <Flex gap={15} vertical align="center">
            <LanguageSelector />
          </Flex>
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
                  {(navLabels[language] || navLabels.de).prev}
                </Button>
              )}
              {question === 310 ? (
                ''
              ) : (
                <Button type="primary" onClick={handlePlus}>
                  {(navLabels[language] || navLabels.de).next}
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
          <FooterLinks ref={footerRef} className={footerInView ? 'in-view' : ''}>
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

const StyledHeader = styled(Header)`
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

const CustomTitle = styled.p`
  font-size: clamp(20px, 6vw, 30px);
  font-weight: 700;
  text-align: center;
  color: ${theme.colors.text_primary};
  letter-spacing: 0.02em;
  animation: ${slideDownFadeIn} 0.6s ease 0.3s both;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.lg};

  & > a {
    opacity: 0;
  }
  &.in-view > a {
    animation: ${slideDownFadeIn} 0.5s ease both;
  }
  &.in-view > a:nth-child(1) { animation-delay: 0.05s; }
  &.in-view > a:nth-child(2) { animation-delay: 0.2s; }
  &.in-view > a:nth-child(3) { animation-delay: 0.35s; }
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
