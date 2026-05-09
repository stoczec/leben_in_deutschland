import { themes } from './themes';

const t = themes.product.dark;

export const colors = {
  clr_black: '#000000',
  clr_white: '#ffffff',
  clr_accent: '#339933',
  clr_sale: '#ff33a1',

  bg_page: t.bg,
  bg_chrome: t.surface,
  bg_surface: t.surfaceAlt,
  bg_translation_muted: t.surfaceAlt,
  bg_question_de: t.accentBg,
  bg_select_light: t.surfaceAlt,

  border_subtle: t.border,
  border_strong: t.borderStrong,

  text_primary: t.text,
  text_secondary: t.textMuted,
  text_muted: t.textMuted,
  text_on_light: '#1c1b1a',
  text_on_blue: '#ffffff',

  state_success: t.success,
  state_danger: t.danger,
  state_question_title: t.danger,
  state_answer_title: t.success,
  state_focus_ring: t.accent,
};
