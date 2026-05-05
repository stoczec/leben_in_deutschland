import { useEffect } from 'react';
import { Badge, Flex, Select } from 'antd';
import { useLanguage } from '../providers/LanguageProvider';
import styled, { keyframes } from 'styled-components';

const { Option } = Select;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();

  const handleChange = (value) => {
    localStorage.setItem('language', value);
    changeLanguage(value);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      changeLanguage(savedLanguage);
    }
  }, [changeLanguage]);

  return (
    <Container align="center" gap={10} vertical>
      <StyledBadge text={language}>
        <StyledSelect
          value="Wählen Sie Ihre Muttersprache"
          onChange={handleChange}
          size="middle"
        >
          <Option value="de">Deutsch</Option>
          <Option value="en">English</Option>
          <Option value="ua">Українська</Option>
          <Option value="ru">Русский</Option>
          <Option value="ar">العربية</Option>
        </StyledSelect>
      </StyledBadge>
      <Hint>
        Wählen Sie Deutsch, wenn Sie Frage und Antwort nur auf Deutsch sehen möchten.
      </Hint>
    </Container>
  );
}

const Container = styled(Flex)`
  position: relative;
  margin-top: 20px;
`;

const StyledBadge = styled(Badge.Ribbon)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  position: absolute;
  top: -30%;
  transform: translateY(-50%);
  right: 0;
  font-size: 20px;
  font-weight: bolder;
  .ant-ribbon-text {
    padding-bottom: 4px;
  }
`;

const StyledSelect = styled(Select)`
  * {
    background-color: #d8d8d8 !important;
  }

  .ant-select-selection-item {
    font-size: 15px;
    font-weight: bolder;
  }
`;

const Hint = styled.p`
  font-size: 10px;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease 0.3s forwards;
`;
