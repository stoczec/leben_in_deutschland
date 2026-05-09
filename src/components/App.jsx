import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import {
  ConfigProvider,
  FloatButton,
  Layout,
  Space,
  Select,
  Button,
  InputNumber,
} from 'antd';
import { CardsContainer } from './CardsContainer';
import styled, { keyframes } from 'styled-components';
import linkedin from '../assets/linkedin.svg';
import telegram from '../assets/telegram.svg';
import whatsapp from '../assets/whatsapp.svg';
import dataNew from '../data/dataNew';
import { CaretUpOutlined } from '@ant-design/icons';
import { useLanguage } from '../providers/LanguageProvider';
import { themes, shared } from '../assets/styles/themes';
import { theme } from '../assets/styles/theme';

const t = themes.product.dark;
const Starfield = lazy(() => import('react-starfield'));
const { Header, Footer, Content } = Layout;
const { Option } = Select;

const navLabels = {
  de: { prev: 'vorherige Aufgabe', next: 'nächste Aufgabe' },
  en: { prev: 'Previous question', next: 'Next question' },
  ua: { prev: 'Попереднє питання', next: 'Наступне питання' },
  ru: { prev: 'Предыдущий вопрос', next: 'Следующий вопрос' },
  ar: { prev: 'السؤال السابق', next: 'السؤال التالي' },
};

const footerTexts = {
  de: 'Schreiben Sie mir, wenn Sie einen Fehler gefunden haben oder irgendwelche Meinungen oder Vorschläge haben.',
  en: 'Message me if you found a bug or have any thoughts or suggestions.',
  ua: 'Напишіть мені, якщо знайшли помилку або маєте якісь зауваження чи пропозиції.',
  ru: 'Напишите мне, если нашли ошибку или у вас есть какие-либо замечания или предложения.',
  ar: 'راسلني إذا وجدت خطأ أو كانت لديك أي ملاحظات أو اقتراحات.',
};

const LANG_CODES = ['de', 'en', 'ua', 'ru', 'ar'];

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

const DiceIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="5.5" cy="5.5" r="1" fill="currentColor" />
    <circle cx="10.5" cy="10.5" r="1" fill="currentColor" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
  </svg>
);

const GridIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

function App() {
  const [question, setQuestion] = useState(0);
  const { language, changeLanguage } = useLanguage();
  const direction = language === 'ar' ? 'rtl' : 'ltr';
  const [footerRef, footerInView] = useInViewOnce(FOOTER_OBSERVER_OPTS);

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  const handleChange = (value) => {
    setQuestion(value === null ? 0 : value);
  };

  const handleReset = () => setQuestion(0);
  const handlePlus = () => setQuestion((q) => q + 1);
  const handleMinus = () => setQuestion((q) => q - 1);
  const handleRandomNumber = () =>
    setQuestion(Math.floor(Math.random() * 310) + 1);

  return (
    <ConfigProvider direction={direction}>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 0]}>
        <StyledLayout>
          <StyledHeader>
            <Brand>
              <Logo>LiD</Logo>
              <BrandText>
                <BrandTitle>Leben in Deutschland</BrandTitle>
                <BrandSub>Einbürgerungstest · 310 Fragen</BrandSub>
              </BrandText>
            </Brand>
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
            <ContentInner>
              <ToolbarBar>
                <ToolbarFilters>
                  <Select
                    value={question || undefined}
                    placeholder="Frage"
                    onChange={handleChange}
                    size="small"
                    style={{ width: 110 }}
                    showSearch
                    filterOption={(input, option) =>
                      String(option.value).startsWith(input)
                    }
                  >
                    {dataNew.map((q) => (
                      <Option key={q.id} value={q.id}>
                        {q.id}
                      </Option>
                    ))}
                  </Select>
                  <InputNumber
                    size="small"
                    min={1}
                    max={310}
                    value={question || undefined}
                    placeholder="#"
                    onChange={handleChange}
                    style={{ width: 80 }}
                  />
                  <ToolbarButton onClick={handleRandomNumber} type="text">
                    <DiceIcon /> Zufällig
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={handleReset}
                    type="text"
                    disabled={!question}
                  >
                    <GridIcon /> Alle 310
                  </ToolbarButton>
                </ToolbarFilters>
                <Spacer />
                <LangPill>
                  {LANG_CODES.map((code) => (
                    <LangOption
                      key={code}
                      $active={code === language}
                      onClick={() => changeLanguage(code)}
                      data-testid={`lang-${code}`}
                    >
                      {code.toUpperCase()}
                    </LangOption>
                  ))}
                </LangPill>
              </ToolbarBar>
              <CardsContainer questionNr={question} />
              {question ? (
                <ButtonsContainer>
                  {question === 1 ? null : (
                    <Button type="primary" onClick={handleMinus}>
                      {(navLabels[language] || navLabels.de).prev}
                    </Button>
                  )}
                  {question === 310 ? null : (
                    <Button type="primary" onClick={handlePlus}>
                      {(navLabels[language] || navLabels.de).next}
                    </Button>
                  )}
                </ButtonsContainer>
              ) : null}
            </ContentInner>
          </StyledContent>
          <StyledFooter>
            <FooterText>{footerTexts[language] || footerTexts.de}</FooterText>
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
            <Copyright>©2023–2026 Erstellt von Dmytro Herashchenko</Copyright>
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
  background-color: ${t.surface};
  border-bottom: 1px solid ${t.border};
  padding: 0 ${shared.space[5]};
  display: flex;
  align-items: center;
  height: 64px;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${shared.space[3]};
  animation: ${slideDownFadeIn} 0.6s ease 0.2s both;
`;

const Logo = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: ${t.accent};
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const BrandText = styled.div`
  text-align: start;
  line-height: 1.2;
`;

const BrandTitle = styled.div`
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: ${t.text};
`;

const BrandSub = styled.div`
  font-size: 12px;
  color: ${t.textMuted};
  margin-top: 2px;
`;

const StyledContent = styled(Content)`
  position: relative;
  color: ${t.text};
  background-color: ${t.bg};
  padding: ${shared.space[5]} ${shared.space[5]} ${shared.space[7]};
`;

const ContentInner = styled.div`
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${shared.space[5]};
`;

const ToolbarBar = styled.div`
  background: ${t.surface};
  border: 1px solid ${t.border};
  border-radius: 12px;
  padding: ${shared.space[2]};
  box-shadow: ${shared.shadow.sm};
  display: flex;
  align-items: center;
  gap: ${shared.space[2]};
  flex-wrap: wrap;
`;

const ToolbarFilters = styled.div`
  display: flex;
  align-items: center;
  gap: ${shared.space[2]};
  flex-wrap: wrap;
`;

const Spacer = styled.div`
  flex: 1 1 auto;
`;

const ToolbarButton = styled(Button)`
  &.ant-btn {
    height: 32px;
    padding: 0 12px;
    border: 1px solid ${t.border};
    background: ${t.surface};
    color: ${t.text};
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
    border-radius: 8px;
  }
  &.ant-btn:hover:not(:disabled) {
    background: ${t.surfaceAlt};
    color: ${t.text};
    border-color: ${t.borderStrong};
  }
  &.ant-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  & svg {
    color: ${t.accent};
  }
`;

const LangPill = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  background: ${t.surfaceAlt};
  border: 1px solid ${t.border};
  padding: 3px;
  border-radius: 999px;
`;

const LangOption = styled.button`
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  font-family: inherit;
  border: none;
  cursor: pointer;
  transition: background ${shared.motion.fast}, color ${shared.motion.fast};
  background: ${({ $active }) => ($active ? t.surface : 'transparent')};
  color: ${({ $active }) => ($active ? t.accent : t.textMuted)};
  box-shadow: ${({ $active }) => ($active ? shared.shadow.sm : 'none')};

  &:hover {
    color: ${({ $active }) => ($active ? t.accent : t.text)};
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${shared.space[4]};
  margin-top: ${shared.space[3]};
`;

const StyledFooter = styled(Footer)`
  text-align: center;
  color: ${t.textMuted};
  background-color: ${t.surface};
  border-top: 1px solid ${t.border};
  display: flex;
  flex-direction: column;
  gap: ${shared.space[3]};
  padding: ${shared.space[5]} 0 ${shared.space[4]};
`;

const FooterText = styled.p`
  font-weight: 500;
  color: ${t.textMuted};
  font-size: 14px;
  line-height: 1.5;
  max-width: 600px;
  margin: 0 auto;
`;

const Copyright = styled.div`
  color: ${t.textSubtle};
  font-size: 12px;
  font-family: ${shared.fontStack.mono};
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${shared.space[5]};

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
  width: 28px;
  height: 28px;
`;

const CustomFloatButton = styled(FloatButton.BackTop)`
  .ant-float-btn-body {
    background-color: ${theme.colors.bg_select_light} !important;
  }
`;
