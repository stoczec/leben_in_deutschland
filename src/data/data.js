import * as images from '../assets/images/images.js';

const data = [
  {
    id: 1,
    de: 'In Deutschland dürfen Menschen offen etwas gegen die Regierung sagen, weil...',
    en: 'In Germany, people are allowed to openly speak against the government because...',
    ua: 'У Німеччині люди можуть відкрито висловлюватися проти уряду, тому що...',
    ru: 'В Германии люди могут открыто высказываться против правительства, потому что...',
    ar: 'في ألمانيا، يُسمح للناس بالتحدث علانية ضد الحكومة لأن',
    img: images.img1,
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
    img: images.img2,
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
    img: images.img3,
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
    img: images.img4,
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
    img: images.img5,
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
    img: images.img6,
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
    img: images.img7,
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
    img: images.img8,
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
    img: images.img9,
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
    img: images.img10,
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
    img: images.img11,
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
    img: images.img12,
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
    img: images.img13,
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
    img: images.img14,
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
    img: images.img15,
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
    img: images.img16,
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
    img: images.img17,
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
    img: images.img18,
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
    img: images.img19,
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
    img: images.img20,
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
    img: images.img21,
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
    img: images.img22,
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
    img: images.img23,
    answers: {
      ansKey: 4,
      de: 'bei einer Firma oder Behörde beschäftigt.',
      en: 'employed by a company or authority.',
      ua: 'працюють на підприємстві або в установі.',
      ru: 'работают в компании или ведомстве.',
      ar: 'يعملون في شركة أو سلطة.',
    },
  },
  {
    id: 24,
    de: 'Wie viele Bundesländer hat die Bundesrepublik Deutschland?',
    en: 'How many federal states does the Federal Republic of Germany have?',
    ua: 'Скільки федеральних земель має Федеративна Республіка Німеччина?',
    ru: 'Сколько федеральных земель имеет Федеративная Республика Германия?',
    ar: 'كم عدد الولايات الفيدرالية في جمهورية ألمانيا الاتحادية؟',
    img: images.img24,
    answers: {
      ansKey: 3,
      de: '16',
      en: '16',
      ua: '16',
      ru: '16',
      ar: '16',
    },
  },
  {
    id: 25,
    de: 'Was ist kein Bundesland der Bundesrepublik Deutschland?',
    en: 'What is not a federal state of the Federal Republic of Germany?',
    ua: 'Що не є федеральною землею Федеративної Республіки Німеччина?',
    ru: 'Что не является федеральной землей Федеративной Республики Германия?',
    ar: 'ما الذي ليس ولاية فيدرالية في جمهورية ألمانيا الاتحادية؟',
    img: images.img25,
    answers: {
      ansKey: 1,
      de: 'Elsass-Lothringen',
      en: 'Alsace-Lorraine',
      ua: 'Ельзас-Лотарингія',
      ru: 'Эльзас-Лотарингия',
      ar: 'الألزاس-لورين',
    },
  },
  {
    id: 26,
    de: 'Deutschland ist …',
    en: 'Germany is …',
    ua: 'Німеччина це …',
    ru: 'Германия это …',
    ar: 'ألمانيا هي …',
    img: images.img26,
    answers: {
      ansKey: 2,
      de: 'ein demokratischer und sozialer Bundesstaat',
      en: 'a democratic and social federal state',
      ua: 'демократична та соціальна федеративна держава',
      ru: 'демократическое и социальное федеративное государство',
      ar: 'دولة اتحادية ديمقراطية واجتماعية',
    },
  },
  {
    id: 27,
    de: 'Deutschland ist …',
    en: 'Germany is …',
    ua: 'Німеччина це …',
    ru: 'Германия это …',
    ar: 'ألمانيا هي …',
    img: images.img27,
    answers: {
      ansKey: 2,
      de: 'ein Bundesstaat',
      en: 'a federal state',
      ua: 'федеративна держава',
      ru: 'федеративное государство',
      ar: 'دولة اتحادية',
    },
  },
  {
    id: 28,
    de: 'Wer wählt in Deutschland die Abgeordneten zum Bundestag?',
    en: 'Who elects the members of the Bundestag in Germany?',
    ua: 'Хто обирає депутатів до Бундестагу в Німеччині?',
    ru: 'Кто выбирает депутатов в Бундестаг в Германии?',
    ar: 'من ينتخب أعضاء البوندستاغ في ألمانيا؟',
    img: images.img28,
    answers: {
      ansKey: 3,
      de: 'das wahlberechtigte Volk',
      en: 'the electorate',
      ua: 'виборці',
      ru: 'избирательное население',
      ar: 'الناخبين',
    },
  },
  {
    id: 29,
    de: 'Welches Tier ist das Wappentier der Bundesrepublik Deutschland?',
    en: 'What is the national animal of the Federal Republic of Germany?',
    ua: 'Яка тварина є символом Федеративної Республіки Німеччина?',
    ru: 'Какое животное является символом Федеративной Республики Германия?',
    ar: 'ما هو الحيوان الوطني لجمهورية ألمانيا الاتحادية؟',
    img: images.img29,
    answers: {
      ansKey: 2,
      de: 'Adler',
      en: 'Eagle',
      ua: 'Орел',
      ru: 'Орел',
      ar: 'النسر',
    },
  },
  {
    id: 30,
    de: 'Was ist kein Merkmal unserer Demokratie?',
    en: 'What is not a characteristic of our democracy?',
    ua: 'Що не є ознакою нашої демократії?',
    ru: 'Что не является признаком нашей демократии?',
    ar: 'ما الذي ليس من سمات ديمقراطيتنا؟',
    img: images.img30,
    answers: {
      ansKey: 2,
      de: 'Pressezensur',
      en: 'Censorship of the press',
      ua: 'Цензура преси',
      ru: 'Цензура прессы',
      ar: 'الرقابة على الصحافة',
    },
  },
  {
    id: 31,
    de: 'Die Zusammenarbeit von Parteien zur Bildung einer Regierung nennt man in Deutschland …',
    en: 'The cooperation of parties to form a government in Germany is called …',
    ua: 'Співпрацю партій для формування уряду в Німеччині називають …',
    ru: 'Сотрудничество партий для формирования правительства в Германии называют …',
    ar: 'يُطلق على تعاون الأحزاب لتشكيل حكومة في ألمانيا …',
    img: images.img31,
    answers: {
      ansKey: 2,
      de: 'Koalition',
      en: 'Coalition',
      ua: 'Коаліція',
      ru: 'Коалиция',
      ar: 'ائتلاف',
    },
  },
  {
    id: 32,
    de: 'Was ist keine staatliche Gewalt in Deutschland?',
    en: 'What is not a state power in Germany?',
    ua: 'Що не є державною владою в Німеччині?',
    ru: 'Что не является государственной властью в Германии?',
    ar: 'ما الذي ليس سلطة دولية في ألمانيا؟',
    img: images.img32,
    answers: {
      ansKey: 3,
      de: 'Presse',
      en: 'Press',
      ua: 'Преса',
      ru: 'Пресса',
      ar: 'الصحافة',
    },
  },
  {
    id: 33,
    de: 'Welche Aussage ist richtig? In Deutschland …',
    en: 'Which statement is correct? In Germany …',
    ua: 'Яке твердження є правильним? В Німеччині …',
    ru: 'Какое утверждение верно? В Германии …',
    ar: 'أي العبارات صحيحة؟ في ألمانيا …',
    img: images.img33,
    answers: {
      ansKey: 1,
      de: 'sind Staat und Religionsgemeinschaften voneinander getrennt',
      en: 'State and religious communities are separated',
      ua: 'Держава і релігійні спільноти розділені',
      ru: 'Государство и религиозные общины разделены',
      ar: 'الدولة والمجتمعات الدينية منفصلة',
    },
  },
  {
    id: 34,
    de: 'Was ist Deutschland nicht?',
    en: 'What is Germany not?',
    ua: 'Чим Німеччина не є?',
    ru: 'Чем Германия не является?',
    ar: 'ما الذي ليست ألمانيا؟',
    img: images.img34,
    answers: {
      ansKey: 3,
      de: 'eine Monarchie',
      en: 'a Monarchy',
      ua: 'Монархією',
      ru: 'Монархией',
      ar: 'ملكية',
    },
  },
  {
    id: 35,
    de: 'Womit finanziert der deutsche Staat die Sozialversicherung?',
    en: 'How does the German state finance social security?',
    ua: 'Як німецька держава фінансує соціальне страхування?',
    ru: 'Как германское государство финансирует социальное страхование?',
    ar: 'كيف تمول الدولة الألمانية التأمين الاجتماعي؟',
    img: images.img35,
    answers: {
      ansKey: 2,
      de: 'Sozialabgaben',
      en: 'Social contributions',
      ua: 'Соціальні внески',
      ru: 'Социальные взносы',
      ar: 'المساهمات الاجتماعية',
    },
  },
  {
    id: 36,
    de: 'Welche Maßnahme schafft in Deutschland soziale Sicherheit?',
    en: 'What measure provides social security in Germany?',
    ua: 'Який захід забезпечує соціальну безпеку в Німеччині?',
    ru: 'Какая мера обеспечивает социальную защиту в Германии?',
    ar: 'ما هي الإجراءات التي توفر الأمان الاجتماعي في ألمانيا؟',
    img: images.img36,
    answers: {
      ansKey: 1,
      de: 'die Krankenversicherung',
      en: 'Health insurance',
      ua: 'Медичне страхування',
      ru: 'Медицинская страховка',
      ar: 'التأمين الصحي',
    },
  },
  {
    id: 37,
    de: 'Wie werden die Regierungschefs / Regierungschefinnen der meisten Bundesländer in Deutschland genannt?',
    en: 'What are the heads of government in most federal states in Germany called?',
    ua: 'Як називають голови урядів більшості федеральних земель в Німеччині?',
    ru: 'Как называют глав государств большинства федеральных земель в Германии?',
    ar: 'ماذا يطلق على رؤساء الحكومة في معظم الولايات الفيدرالية في ألمانيا؟',
    img: images.img37,
    answers: {
      ansKey: 4,
      de: 'Ministerpräsident',
      en: 'Minister President',
      ua: 'Міністр-президент',
      ru: 'Министр-президент',
      ar: 'رئيس الوزراء',
    },
  },
  {
    id: 38,
    de: 'Die Bundesrepublik Deutschland ist ein demokratischer und sozialer …',
    en: 'The Federal Republic of Germany is a democratic and social …',
    ua: 'Федеративна Республіка Німеччина є демократичною та соціальною …',
    ru: 'Федеративная Республика Германия - это демократическое и социальное …',
    ar: 'الجمهورية الاتحادية الألمانية هي ديمقراطية واجتماعية …',
    img: images.img38,
    answers: {
      ansKey: 2,
      de: 'Bundesstaat.',
      en: 'Federal state.',
      ua: 'Федеративна держава.',
      ru: 'Федеративное государство.',
      ar: 'دولة اتحادية.',
    },
  },
  {
    id: 39,
    de: 'Was hat jedes deutsche Bundesland?',
    en: 'What does every German federal state have?',
    ua: 'Що є у кожній федеральній землі Німеччини?',
    ru: 'Что есть у каждой федеральной земли Германии?',
    ar: 'ماذا يملك كل ولاية اتحادية في ألمانيا؟',
    img: images.img39,
    answers: {
      ansKey: 4,
      de: 'eine eigene Regierung',
      en: 'its own government',
      ua: 'власний уряд',
      ru: 'свое правительство',
      ar: 'حكومتها الخاصة',
    },
  },
  {
    id: 40,
    de: 'Mit welchen Worten beginnt die deutsche Nationalhymne?',
    en: 'With what words does the German national anthem begin?',
    ua: 'З якими словами починається німецький національний гімн?',
    ru: 'С какими словами начинается немецкий национальный гимн?',
    ar: 'بأي كلمات يبدأ النشيد الوطني الألماني؟',
    img: images.img40,
    answers: {
      ansKey: 2,
      de: 'Einigkeit und Recht und Freiheit …',
      en: 'Unity and justice and freedom …',
      ua: 'Єдність і правосуддя і свобода …',
      ru: 'Единство и справедливость и свобода …',
      ar: 'الوحدة والعدالة والحرية …',
    },
  },
  {
    id: 41,
    de: 'Warum gibt es in einer Demokratie mehr als eine Partei?',
    en: 'Why is there more than one party in a democracy?',
    ua: 'Чому в демократії є більше однієї партії?',
    ru: 'Почему в демократии есть более одной партии?',
    ar: 'لماذا هناك أكثر من حزب واحد في الديمقراطية؟',
    img: images.img41,
    answers: {
      ansKey: 1,
      de: 'weil dadurch die unterschiedlichen Meinungen der Bürger und Bürgerinnen vertreten werden',
      en: 'because it represents the different opinions of the citizens',
      ua: 'тому що це представляє різні думки громадян',
      ru: 'потому что это представляет разные мнения граждан',
      ar: 'لأنه يمثل الآراء المختلفة للمواطنين',
    },
  },
  {
    id: 42,
    de: 'Wer beschließt in Deutschland ein neues Gesetz?',
    en: 'Who decides on a new law in Germany?',
    ua: 'Хто приймає рішення про новий закон в Німеччині?',
    ru: 'Кто принимает решение о новом законе в Германии?',
    ar: 'من يقرر قانونًا جديدًا في ألمانيا؟',
    img: images.img42,
    answers: {
      ansKey: 2,
      de: 'das Parlament',
      en: 'the Parliament',
      ua: 'Парламент',
      ru: 'Парламент',
      ar: 'البرلمان',
    },
  },
  {
    id: 43,
    de: 'Wann kann in Deutschland eine Partei verboten werden?',
    en: 'When can a party be banned in Germany?',
    ua: 'Коли в Німеччині можна заборонити партію?',
    ru: 'Когда в Германии можно запретить партию?',
    ar: 'متى يمكن حظر حزب في ألمانيا؟',
    img: images.img43,
    answers: {
      ansKey: 2,
      de: 'wenn sie gegen die Verfassung kämpft',
      en: 'when it fights against the constitution',
      ua: 'коли вона бореться проти конституції',
      ru: 'когда она борется против конституции',
      ar: 'عندما يقاتل ضد الدستور',
    },
  },
  {
    id: 44,
    de: 'Wen kann man als Bürger / Bürgerin in Deutschland nicht direkt wählen?',
    en: "Who can't be directly elected by citizens in Germany?",
    ua: 'Кого не можна прямо обрати громадянами в Німеччині?',
    ru: 'Кого нельзя прямо выбирать гражданами в Германии?',
    ar: 'من لا يمكن انتخابه مباشرة من قبل المواطنين في ألمانيا؟',
    img: images.img44,
    answers: {
      ansKey: 2,
      de: 'den Bundespräsidenten / die Bundespräsidentin',
      en: 'the Federal President',
      ua: 'Федерального президента',
      ru: 'Федерального президента',
      ar: 'الرئيس الاتحادي',
    },
  },
  {
    id: 45,
    de: 'Zu welcher Versicherung gehört die Pflegeversicherung?',
    en: 'To which insurance does the long-term care insurance belong?',
    ua: 'До якого страхування належить страхування на довготривале догляд?',
    ru: 'К какой страховке относится страхование долгосрочного ухода?',
    ar: 'إلى أي تأمين ينتمي التأمين على الرعاية طويلة الأجل؟',
    img: images.img45,
    answers: {
      ansKey: 1,
      de: 'Sozialversicherung',
      en: 'Social Insurance',
      ua: 'Соціальне страхування',
      ru: 'Социальное страхование',
      ar: 'التأمين الاجتماعي',
    },
  },
  {
    id: 46,
    de: 'Der deutsche Staat hat viele Aufgaben. Welche Aufgabe gehört dazu?',
    en: 'The German state has many tasks. Which task is one of them?',
    ua: 'Німецька держава має багато завдань. Яке завдання є одним з них?',
    ru: 'У немецкого государства много задач. Какая задача является одной из них?',
    ar: 'لدى الدولة الألمانية العديد من المهام. أي مهمة من بينها؟',
    img: images.img46,
    answers: {
      ansKey: 1,
      de: 'Er baut Straßen und Schulen.',
      en: 'It builds roads and schools.',
      ua: 'Він будує дороги та школи.',
      ru: 'Он строит дороги и школы.',
      ar: 'يقوم ببناء الطرق والمدارس.',
    },
  },
  {
    id: 47,
    de: 'Der deutsche Staat hat viele Aufgaben. Welche Aufgabe gehört nicht dazu?',
    en: 'The German state has many tasks. Which task is not one of them?',
    ua: 'Німецька держава має багато завдань. Яке завдання не є одним з них?',
    ru: 'У немецкого государства много задач. Какая задача не является одной из них?',
    ar: 'لدى الدولة الألمانية العديد من المهام. أي مهمة ليست من بينها؟',
    img: images.img47,
    answers: {
      ansKey: 1,
      de: 'Er bezahlt für alle Staatsangehörigen Urlaubsreisen.',
      en: "It pays for all nationals' vacation trips.",
      ua: 'Він оплачує відпустки для всіх громадян.',
      ru: 'Он оплачивает отпуска для всех граждан.',
      ar: 'يدفع لرحلات العطلات لجميع الجنسيات.',
    },
  },
  {
    id: 48,
    de: 'Welches Organ gehört nicht zu den Verfassungsorganen Deutschlands?',
    en: 'Which organ is not one of the constitutional organs of Germany?',
    ua: 'Який орган не є одним з конституційних органів Німеччини?',
    ru: 'Какой орган не является одним из конституционных органов Германии?',
    ar: 'أي جهاز ليس واحدًا من الأجهزة الدستورية في ألمانيا؟',
    img: images.img48,
    answers: {
      ansKey: 3,
      de: 'die Bürgerversammlung',
      en: "the citizens' assembly",
      ua: 'збори громадян',
      ru: 'собрание граждан',
      ar: 'الجمعية العامة للمواطنين',
    },
  },
  {
    id: 49,
    de: 'Wer bestimmt in Deutschland die Schulpolitik?',
    en: 'Who determines the school policy in Germany?',
    ua: 'Хто визначає шкільну політику в Німеччині?',
    ru: 'Кто определяет школьную политику в Германии?',
    ar: 'من يحدد سياسة المدرسة في ألمانيا؟',
    img: images.img49,
    answers: {
      ansKey: 2,
      de: 'die Bundesländer',
      en: 'the federal states',
      ua: 'федеральні землі',
      ru: 'федеральные земли',
      ar: 'الدول الفيدرالية',
    },
  },
  {
    id: 50,
    de: 'Die Wirtschaftsform in Deutschland nennt man …',
    en: 'The economic system in Germany is called ...',
    ua: 'Економічну систему в Німеччині називають ...',
    ru: 'Экономическую систему в Германии называют ...',
    ar: 'يطلق على النظام الاقتصادي في ألمانيا ...',
    img: images.img50,
    answers: {
      ansKey: 2,
      de: 'soziale Marktwirtschaft.',
      en: 'social market economy.',
      ua: 'соціальна ринкова економіка.',
      ru: 'социальная рыночная экономика.',
      ar: 'الاقتصاد السوقي الاجتماعي.',
    },
  },
  // {
  //   id: 51,
  //   de: '',
  //   en: '',
  //   ua: '',
  //   ru: '',
  //   ar: '',
  //   // img: images.img51,
  //   answers: {
  //     ansKey: 3,
  //     de: '',
  //     en: '',
  //     ua: '',
  //     ru: '',
  //     ar: '',
  //   },
  // },
];

export default data;
