// LanguageSelector.jsx
import React, { useEffect } from 'react';
import { Badge, Flex, Select } from 'antd';
import { useLanguage } from '../providers/LanguageProvider';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const { Option } = Select;

export function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();

  const handleChange = (value) => {
    localStorage.setItem('language', value);
    changeLanguage(value);
  };

  const textAnimation = {
    hidden: {
      // y: 100,
      opacity: 0,
      delay: 1,
    },
    visible: (custom) => ({
      // y: 0,
      opacity: 1,
      transition: { delay: custom * 0.01 },
    }),
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
      <motion.p
        style={{ fontSize: '10px' }}
        initial="hidden"
        whileInView="visible"
      >
        <motion.span custom={1} variants={textAnimation}>
          Wählen
        </motion.span>{' '}
        <motion.span custom={2} variants={textAnimation}>
          Sie
        </motion.span>{' '}
        <motion.span custom={3} variants={textAnimation}>
          Deutsch
        </motion.span>
        <motion.span custom={4} variants={textAnimation}>
          ,
        </motion.span>{' '}
        <motion.span custom={5} variants={textAnimation}>
          wenn
        </motion.span>{' '}
        <motion.span custom={6} variants={textAnimation}>
          Sie
        </motion.span>{' '}
        <motion.span custom={7} variants={textAnimation}>
          Frage
        </motion.span>{' '}
        <motion.span custom={8} variants={textAnimation}>
          und
        </motion.span>{' '}
        <motion.span custom={9} variants={textAnimation}>
          Antwort
        </motion.span>{' '}
        <motion.span custom={10} variants={textAnimation}>
          nur
        </motion.span>{' '}
        <motion.span custom={11} variants={textAnimation}>
          auf
        </motion.span>{' '}
        <motion.span custom={12} variants={textAnimation}>
          Deutsch
        </motion.span>{' '}
        <motion.span custom={13} variants={textAnimation}>
          sehen
        </motion.span>{' '}
        <motion.span custom={14} variants={textAnimation}>
          möchten
        </motion.span>
        .{' '}
      </motion.p>
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
