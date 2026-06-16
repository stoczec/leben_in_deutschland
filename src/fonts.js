import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';

let arabicLoaded = false;
// Arabic font (~340 KB) is loaded on demand only when the user picks Arabic.
export const loadArabicFonts = () => {
  if (arabicLoaded) return;
  arabicLoaded = true;
  import('@fontsource/noto-naskh-arabic/400.css');
  import('@fontsource/noto-naskh-arabic/500.css');
  import('@fontsource/noto-naskh-arabic/600.css');
  import('@fontsource/noto-naskh-arabic/700.css');
};
