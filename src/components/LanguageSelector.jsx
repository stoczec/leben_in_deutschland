// LanguageSelector.jsx
import React from 'react';
import { Badge, Flex, Select, Typography } from 'antd';
import { useLanguage } from '../providers/LanguageProvider';
import styled from 'styled-components';

const { Option } = Select;

export function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();

  const handleChange = (value) => {
    changeLanguage(value);
  };

  return (
    <Container align="center" gap={10}>
      <StyledBadge text={language}>
        <Select
          value="Wählen Sie Ihre Muttersprache"
          style={{ width: '100%' }}
          onChange={handleChange}
        >
          <Option value="de">Deutsch</Option>
          <Option value="en">English</Option>
          <Option value="ua">Українська</Option>
          <Option value="ru">Русский</Option>
          <Option value="ar">العربية</Option>
        </Select>
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
  top: 30%; // Центрирование по вертикали
  transform: translateY(-50%); // Смещение для точного центрирования
  right: 0; // Выравнивание по левому краю контейнера
`;
