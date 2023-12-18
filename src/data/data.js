import img1 from '../assets/images/1.jpg';
import img2 from '../assets/images/2.jpg';
import img3 from '../assets/images/3.jpg';
import img4 from '../assets/images/4.jpg';
import img5 from '../assets/images/5.jpg';
import img6 from '../assets/images/6.jpg';
import img7 from '../assets/images/7.jpg';
import img8 from '../assets/images/8.jpg';
import img9 from '../assets/images/9.jpg';
import img10 from '../assets/images/10.jpg';
import img11 from '../assets/images/11.jpg';
import img12 from '../assets/images/12.jpg';
import img13 from '../assets/images/13.jpg';
import img14 from '../assets/images/14.jpg';
import img15 from '../assets/images/15.jpg';
import img16 from '../assets/images/16.jpg';
import img17 from '../assets/images/17.jpg';
import img18 from '../assets/images/18.jpg';
import img19 from '../assets/images/19.jpg';
import img20 from '../assets/images/20.jpg';
import img21 from '../assets/images/21.jpg';
import img22 from '../assets/images/22.jpg';
import img23 from '../assets/images/23.jpg';

const data = [
  {
    id: 1,
    de: 'In Deutschland dürfen Menschen offen etwas gegen die Regierung sagen, weil...',
    en: 'In Germany, people are allowed to openly speak against the government because...',
    ua: 'У Німеччині люди можуть відкрито висловлюватися проти уряду, тому що...',
    ru: 'В Германии люди могут открыто высказываться против правительства, потому что...',
    ar: 'في ألمانيا، يُسمح للناس بالتحدث علانية ضد الحكومة لأن',
    img: img1,
    answers: {
      ansKey: 4,
      de: 'hier Meinungsfreiheit gilt',
      en: 'here freedom of speech applies',
      ua: 'тут існує свобода слова',
      ru: 'здесь существует свобода слова',
      ar: 'هناك حرية الرأي',
    },
  },
  {
    id: 2,
    de: 'In Deutschland können Eltern bis zum 14. Lebensjahr ihres Kindes entscheiden, ob es in der Schule am…',
    en: 'In Germany, parents can decide until their child’s 14th year of age whether he or she will participate in school in…',
    ua: 'У Німеччині батьки можуть вирішувати до 14 років своєї дитини, чи буде вона брати участь у школі на…',
    ru: 'В Германии родители могут решать до 14 лет своего ребенка, будет ли он участвовать в школе на…',
    ar: 'في ألمانيا، يُسمح للناس بالتحدث علانية ضد الحكومة لأنفي ألمانيا، يمكن للوالدين أن يقرروا حتى السنة الرابعة عشر من عمر طفلهم ما إذا كان سيشارك في المدرسة في…',
    img: img2,
    answers: {
      ansKey: 2,
      de: 'Religionsunterricht teilnimmt.',
      en: 'participation in religious education.',
      ua: 'участь у релігійному навчанні.',
      ru: 'участие в религиозном образовании.',
      ar: 'هناك حرية الرأيالمشاركة في التعليم الديني.',
    },
  },
  {
    id: 3,
    de: 'Deutschland ist ein Rechtsstaat. Was ist damit gemeint?',
    en: 'Germany is a constitutional state. What does that mean?',
    ua: 'Німеччина - це правова держава. Що це означає?',
    ru: 'Германия - это правовое государство. Что это значит?',
    ar: 'ألمانيا هي دولة قانون. ماذا يعني ذلك؟',
    img: img3,
    answers: {
      ansKey: 1,
      de: 'Alle Einwohner und Einwohnerinnen und der Staat müssen sich an die Gesetze halten.',
      en: 'All residents and the state itself must abide by the laws.',
      ua: 'Усі мешканці та сама держава повинні дотримуватися законів.',
      ru: 'Все жители и само государство должны соблюдать законы.',
      ar: 'جميع السكان والدولة نفسها يجب أن تلتزم بالقوانين.',
    },
  },
  {
    id: 4,
    de: 'Welches Recht gehört zu den Grundrechten in Deutschland?',
    en: 'Which right is one of the fundamental rights in Germany?',
    ua: 'Яке право належить до основних прав в Німеччині?',
    ru: 'Какое право относится к основным правам в Германии?',
    ar: 'ما هو الحق الذي يعتبر من الحقوق الأساسية في ألمانيا؟',
    img: img4,
    answers: {
      ansKey: 3,
      de: 'Meinungsfreiheit',
      en: 'Freedom of speech',
      ua: 'Свобода слова',
      ru: 'Свобода слова',
      ar: 'حرية التعبير',
    },
  },
  {
    id: 5,
    de: 'Wahlen in Deutschland sind frei. Was bedeutet das?',
    en: 'Elections in Germany are free. What does that mean?',
    ua: 'Вибори в Німеччині є вільними. Що це означає?',
    ru: 'Выборы в Германии свободны. Что это значит?',
    ar: 'الانتخابات في ألمانيا حرة. ماذا يعني ذلك؟',
    img: img5,
    answers: {
      ansKey: 3,
      de: 'Der Wähler darf bei der Wahl weder beeinflusst noch zu einer bestimmten Stimmabgabe gezwungen werden und keine Nachteile durch die Wahl haben.',
      en: 'The voter must not be influenced or forced to vote in a certain way and must not suffer any disadvantages from voting.',
      ua: 'Виборець не повинен бути впливований або змушений голосувати певним чином і не повинен мати жодних недоліків від голосування.',
      ru: 'Избиратель не должен подвергаться влиянию или быть вынужденным голосовать определенным образом и не должен испытывать никаких недостатков от голосования.',
      ar: 'يجب ألا يتأثر الناخب أو يُجبر على التصويت بطريقة معينة وألا يعاني من أي عوائق بسبب التصويت.',
    },
  },
  {
    id: 6,
    de: 'Wie heißt die deutsche Verfassung?',
    en: 'What is the name of the German constitution?',
    ua: 'Як називається німецька конституція?',
    ru: 'Как называется немецкая конституция?',
    ar: 'ما اسم الدستور الألماني؟',
    img: img6,
    answers: {
      ansKey: 4,
      de: 'Grundgesetz',
      en: 'Basic Law',
      ua: 'Основний Закон',
      ru: 'Основной закон',
      ar: 'القانون الأساسي',
    },
  },
  {
    id: 7,
    de: 'Welches Recht gehört zu den Grundrechten, die nach der deutschen Verfassung garantiert werden? Das Recht auf ...',
    en: 'Which right is one of the fundamental rights guaranteed by the German constitution? The right to …',
    ua: 'Яке право є одним з основних прав, гарантованих німецькою конституцією? Право на …',
    ru: 'Какое право является одним из основных прав, гарантированных немецкой конституцией? Право на …',
    ar: 'ما هو الحق الذي يعتبر من الحقوق الأساسية المضمونة بموجب الدستور الألماني؟ الحق في …',
    img: img7,
    answers: {
      ansKey: 1,
      de: 'Glaubens- und Gewissensfreiheit.',
      en: 'Freedom of belief and conscience.',
      ua: 'Свободу віросповідання та совісті.',
      ru: 'Свободу вероисповедания и совести.',
      ar: 'حرية الدين والضمير.',
    },
  },
  {
    id: 8,
    de: 'Was steht nicht im Grundgesetz von Deutschland?',
    en: 'What is not stated in the Basic Law of Germany?',
    ua: 'Що не зазначено в Основному Законі Німеччини?',
    ru: 'Что не указано в Основном законе Германии?',
    ar: 'ما الذي لا يُذكر في القانون الأساسي لألمانيا؟',
    img: img8,
    answers: {
      ansKey: 2,
      de: 'Alle sollen gleich viel Geld haben.',
      en: 'Everyone should have the same amount of money.',
      ua: 'Усі повинні мати однакову кількість грошей.',
      ru: 'Все должны иметь одинаковое количество денег.',
      ar: 'يجب أن يكون لدى الجميع نفس المبلغ من المال.',
    },
  },
  {
    id: 9,
    de: 'Welches Grundrecht gilt in Deutschland nur für Ausländer /Ausländerinnen? Das Grundrecht auf…',
    en: 'Which fundamental right in Germany applies only to foreigners? The fundamental right to…',
    ua: 'Яке основне право в Німеччині застосовується тільки до іноземців? Основне право на…',
    ru: 'Какое основное право в Германии применяется только к иностранцам? Основное право на…',
    ar: 'ما هو الحق الأساسي في ألمانيا الذي ينطبق فقط على الأجانب؟ الحق الأساسي في…',
    img: img9,
    answers: {
      ansKey: 3,
      de: 'Asyl',
      en: 'Asylum',
      ua: 'Політичний притулок',
      ru: 'Убежище',
      ar: 'اللجوء',
    },
  },
  {
    id: 10,
    de: 'Was ist mit dem deutschen Grundgesetz vereinbar?',
    en: 'What is compatible with the German Basic Law?',
    ua: 'Що сумісно з Основним Законом Німеччини?',
    ru: 'Что совместимо с Основным законом Германии?',
    ar: 'ما الذي يتوافق مع القانون الأساسي الألماني؟',
    img: img10,
    answers: {
      ansKey: 4,
      de: 'die Geldstrafe',
      en: 'the fine',
      ua: 'штраф',
      ru: 'штраф',
      ar: 'الغرامة المالية',
    },
  },
  {
    id: 11,
    de: 'Wie wird die Verfassung der Bundesrepublik Deutschland genannt?',
    en: 'What is the constitution of the Federal Republic of Germany called?',
    ua: 'Як називається конституція Федеративної Республіки Німеччина?',
    ru: 'Как называется конституция Федеративной Республики Германия?',
    ar: 'ما اسم دستور جمهورية ألمانيا الاتحادية؟',
    img: img11,
    answers: {
      ansKey: 1,
      de: 'Grundgesetz',
      en: 'Basic Law',
      ua: 'Основний Закон',
      ru: 'Основной закон',
      ar: 'القانون الأساسي',
    },
  },
  {
    id: 12,
    de: 'Eine Partei im Deutschen Bundestag will die Pressefreiheit abschaffen. Ist das möglich?',
    en: 'A party in the German Bundestag wants to abolish press freedom. Is that possible?',
    ua: 'Партія в Німецькому Бундестазі хоче скасувати свободу преси. Чи це можливо?',
    ru: 'Партия в Немецком Бундестаге хочет отменить свободу прессы. Возможно ли это?',
    ar: 'تريد حزب في البوندستاغ الألماني إلغاء حرية الصحافة. هل هذا ممكن؟',
    img: img12,
    answers: {
      ansKey: 3,
      de: 'Nein, denn die Pressefreiheit ist ein Grundrecht. Sie kann nicht abgeschafft werden.',
      en: 'No, because press freedom is a fundamental right. It cannot be abolished.',
      ua: 'Ні, оскільки свобода преси є основним правом. Її не можна скасувати.',
      ru: 'Нет, потому что свобода прессы является основным правом. Ее нельзя отменить.',
      ar: 'لا، لأن حرية الصحافة هي حق أساسي. لا يمكن إلغاؤها.',
    },
  },
  {
    id: 13,
    de: 'Im Parlament steht der Begriff “Opposition” für…',
    en: 'In the parliament, the term “opposition” stands for…',
    ua: 'У парламенті термін “опозиція” означає…',
    ru: 'В парламенте термин “оппозиция” означает…',
    ar: 'في البرلمان، يشير مصطلح “المعارضة” إلى…',
    img: img13,
    answers: {
      ansKey: 4,
      de: 'alle Abgeordneten, die nicht zu der Regierungspartei/den Regierungsparteien gehören.',
      en: 'all members who do not belong to the governing party/parties.',
      ua: 'всіх депутатів, які не належать до партії/партій, що правлять.',
      ru: 'всех депутатов, которые не принадлежат к правящей партии/партиям.',
      ar: 'جميع الأعضاء الذين لا ينتمون إلى الحزب/الأحزاب الحاكمة.',
    },
  },
  {
    id: 14,
    de: 'Meinungsfreiheit in Deutschland heißt, dass ich ...',
    en: 'Freedom of speech in Germany means that I …',
    ua: 'Свобода слова в Німеччині означає, що я …',
    ru: 'Свобода слова в Германии означает, что я …',
    ar: 'حرية التعبير في ألمانيا تعني أنني …',
    img: img14,
    answers: {
      ansKey: 2,
      de: 'meine Meinung in Leserbriefen äußern kann.',
      en: 'can express my opinion in letters to the editor.',
      ua: 'можу висловлювати свою думку в листах до редакції.',
      ru: 'могу выражать свое мнение в письмах в редакцию.',
      ar: 'يمكنني التعبير عن رأيي في رسائل إلى المحرر.',
    },
  },
  {
    id: 15,
    de: 'Was verbietet das deutsche Grundgesetz?',
    en: 'What does the German Basic Law prohibit?',
    ua: 'Що забороняє Основний Закон Німеччини?',
    ru: 'Что запрещает Основной закон Германии?',
    ar: 'ماذا يحظر القانون الأساسي الألماني؟',
    img: img15,
    answers: {
      ansKey: 2,
      de: 'Zwangsarbeit',
      en: 'Forced labor',
      ua: 'Примусова праця',
      ru: 'Принудительный труд',
      ar: 'العمل القسري',
    },
  },
  {
    id: 16,
    de: 'Wann ist die Meinungsfreiheit in Deutschland eingeschränkt?',
    en: 'When is freedom of speech restricted in Germany?',
    ua: 'Коли обмежується свобода слова в Німеччині?',
    ru: 'Когда в Германии ограничивается свобода слова?',
    ar: 'متى تكون حرية التعبير مقيدة في ألمانيا؟',
    img: img16,
    answers: {
      ansKey: 1,
      de: 'bei der öffentlichen Verbreitung falscher Behauptungen über einzelne Personen',
      en: 'when false claims about individuals are spread publicly',
      ua: 'при публічному поширенні неправдивих тверджень про окремих осіб',
      ru: 'при публичном распространении ложных утверждений о конкретных лицах',
      ar: 'عند نشر ادعاءات كاذبة عن أفراد بشكل عام',
    },
  },
  {
    id: 17,
    de: 'Die deutschen Gesetze verbieten …',
    en: 'German laws prohibit …',
    ua: 'Німецькі закони забороняють …',
    ru: 'Немецкие законы запрещают …',
    ar: 'القوانين الألمانية تحظر …',
    img: img17,
    answers: {
      ansKey: 4,
      de: 'Ungleichbehandlung der Bürger und Bürgerinnen durch den Staat.',
      en: 'Unequal treatment of citizens by the state.',
      ua: 'Нерівне ставлення до громадян з боку держави.',
      ru: 'Неравное обращение с гражданами со стороны государства.',
      ar: 'المعاملة غير المتساوية للمواطنين من قبل الدولة.',
    },
  },
  {
    id: 18,
    de: 'Welches Grundrecht ist in Artikel 1 des Grundgesetzes der Bundesrepublik Deutschland garantiert?',
    en: 'Which fundamental right is guaranteed in Article 1 of the Basic Law of the Federal Republic of Germany?',
    ua: 'Яке основне право гарантується в першій статі конституції Німеччини?',
    ru: 'Какое основное право гарантируется в статье 1 Основного закона Федеративной Республики Германия?',
    ar: 'ما هو الحق الأساسي الذي يكفله المادة 1 من القانون الأساسي لجمهورية ألمانيا الاتحادية؟',
    img: img18,
    answers: {
      ansKey: 1,
      de: 'Die Unantastbarkeit der Menschenwürde',
      en: 'The inviolability of human dignity',
      ua: 'Недоторканість людської гідності',
      ru: 'Неприкосновенность человеческого достоинства',
      ar: 'الحرمة الغير قابلة للمساس لكرامة الإنسان',
    },
  },
  {
    id: 19,
    de: 'Was versteht man unter dem Recht der „Freizügigkeit“ in Deutschland?',
    en: 'What is meant by the right of “freedom of movement” in Germany?',
    ua: 'Що розуміють під правом на “вільне пересування” в Німеччині?',
    ru: 'Что понимают под правом на “свободу передвижения” в Германии?',
    ar: 'ماذا يعني حق “حرية التنقل” في ألمانيا؟',
    img: img19,
    answers: {
      ansKey: 1,
      de: 'Man darf sich seinen Wohnort selbst aussuchen.',
      en: 'One is allowed to choose one’s own place of residence.',
      ua: 'Кожен може сам вибрати місце свого проживання.',
      ru: 'Каждый может сам выбрать место своего проживания.',
      ar: 'يُسمح للشخص باختيار مكان إقامته بنفسه.',
    },
  },
  {
    id: 20,
    de: 'Eine Partei in Deutschland verfolgt das Ziel, eine Diktatur zu errichten. Sie ist dann …',
    en: 'A party in Germany aims to establish a dictatorship. It is then …',
    ua: 'Партія в Німеччині має на меті встановити диктатуру. Вона тоді …',
    ru: 'Партия в Германии стремится установить диктатуру. Тогда она …',
    ar: 'حزب في ألمانيا يهدف إلى إقامة ديكتاتورية. إذاً هو …',
    img: img20,
    answers: {
      ansKey: 4,
      de: 'verfassungswidrig',
      en: 'unconstitutional',
      ua: 'антиконституційна',
      ru: 'антиконституционна',
      ar: 'غير دستوري',
    },
  },
  {
    id: 21,
    de: 'Welches ist das Wappen der Bundesrepublik Deutschland?',
    en: 'Which is the coat of arms of the Federal Republic of Germany?',
    ua: 'Який є гербом Федеративної Республіки Німеччина?',
    ru: 'Какой является гербом Федеративной Республики Германия?',
    ar: 'ما هو شعار جمهورية ألمانيا الاتحادية؟',
    img: img21,
    answers: {
      ansKey: 1,
      de: 'erste (1)',
      en: 'first (1)',
      ua: 'перший (1)',
      ru: 'первый (1)',
      ar: 'الأول (1)',
    },
  },
  {
    id: 22,
    de: 'Was für eine Staatsform hat Deutschland?',
    en: 'What type of government does Germany have?',
    ua: 'Яка форма правління в Німеччині?',
    ru: 'Какая форма правления в Германии?',
    ar: 'ما هو نوع الحكومة في ألمانيا؟',
    img: img22,
    answers: {
      ansKey: 3,
      de: 'Republik',
      en: 'Republic',
      ua: 'Республіка',
      ru: 'Республика',
      ar: 'الجمهورية',
    },
  },
  {
    id: 23,
    de: 'In Deutschland sind die meisten Erwerbstätigen …',
    en: 'In Germany, most employed people are …',
    ua: 'В Німеччині більшість працівників …',
    ru: 'В Германии большинство работников …',
    ar: 'في ألمانيا، معظم الأشخاص العاملين هم …',
    img: img23,
    answers: {
      ansKey: 1,
      de: 'bei einer Firma oder Behörde beschäftigt.',
      en: 'employed by a company or authority.',
      ua: 'працюють на підприємстві або в установі.',
      ru: 'работают в компании или ведомстве.',
      ar: 'يعملون في شركة أو سلطة.',
    },
  },
  // {
  //   id: 24,
  //   de: '',
  //   en: '',
  //   ua: '',
  //   ru: '',
  //   ar: '',
  //   // img: img24,
  //   answers: {
  //     ansKey: 1,
  //     de: '',
  //     en: '',
  //     ua: '',
  //     ru: '',
  //     ar: '',
  //   },
  // },
];

export default data;
