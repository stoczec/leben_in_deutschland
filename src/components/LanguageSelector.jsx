// LanguageSelector.jsx
import React, { useEffect } from 'react';
import { Badge, Flex, Select } from 'antd';
import { useLanguage } from '../providers/LanguageProvider';
import styled from 'styled-components';

const { Option } = Select;

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
    <Container align="center" gap={10}>
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
    </Container>
  );
}

const Container = styled(Flex)`
  position: relative;
`;

const StyledBadge = styled(Badge.Ribbon)`
  width: 20%;
  position: absolute;
  top: 20%;
  transform: translateY(-50%);
  right: 0;
  font-size: 20px;
  font-weight: bolder;
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
