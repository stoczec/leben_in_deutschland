import styled from 'styled-components';

const backLabels = { de: 'Zurück', en: 'Back', ua: 'Назад', ru: 'Назад', ar: 'رجوع' };

export default function LegalPage({ page = 'datenschutz', language = 'de', onBack }) {
  const back = backLabels[language] || backLabels.de;
  return (
    <Wrap>
      <BackButton onClick={onBack}>← {back}</BackButton>
      {page === 'impressum' ? <Impressum /> : <Datenschutz />}
    </Wrap>
  );
}

function Address() {
  return (
    <>
      Dmytro Herashchenko
      <br />
      c/o IP-Management #12307
      <br />
      Ludwig-Erhard-Str. 18
      <br />
      20459 Hamburg
      <br />
      Deutschland
    </>
  );
}

function Impressum() {
  return (
    <Doc>
      <Title>Impressum</Title>

      <H2>Angaben gemäß § 5 DDG</H2>
      <P>
        <Address />
      </P>

      <H2>Kontakt</H2>
      <P>
        E-Mail: dmytro.herashchenko.de@gmail.com
        <br />
        Telegram: @DmytroHerashchenko
      </P>
    </Doc>
  );
}

function Datenschutz() {
  return (
    <Doc>
      <Title>Datenschutzerklärung</Title>

      <H2>1. Verantwortlicher</H2>
      <P>
        <Address />
        <br />
        E-Mail: dmytro.herashchenko.de@gmail.com
      </P>

      <H2>2. Hosting (Vercel)</H2>
      <P>
        Diese Website wird bei der Vercel Inc. (USA) gehostet. Beim Aufruf werden technisch
        notwendige Daten (insbesondere IP-Adresse, Datum und Uhrzeit, aufgerufene Seite,
        User-Agent) in Server-Logfiles verarbeitet (Art. 6 Abs. 1 lit. f DSGVO; berechtigtes
        Interesse am sicheren und stabilen Betrieb). Die Speicherung erfolgt kurzzeitig.
        Die Übermittlung in die USA stützt sich auf den Angemessenheitsbeschluss der
        EU-Kommission (EU-US Data Privacy Framework, Art. 45 DSGVO); Vercel ist zertifiziert.
        Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung.
      </P>

      <H2>3. Keine Cookies, kein Tracking</H2>
      <P>
        Diese Website setzt keine Cookies zu Analyse- oder Werbezwecken und nutzt kein
        Tracking. Es werden keine personenbezogenen Daten zu Werbezwecken an Dritte
        weitergegeben.
      </P>

      <H2>4. Lokale Speicherung (localStorage)</H2>
      <P>
        Zur Speicherung deiner Einstellungen und deines Lernfortschritts (Sprache, Design,
        Fortschritt, Favoriten, Prüfungsstand) wird der localStorage deines Browsers
        genutzt. Diese Daten verbleiben ausschließlich auf deinem Gerät und werden nicht an
        uns oder Dritte übertragen. Du kannst sie jederzeit über die Einstellungen deines
        Browsers oder die Reset-Funktion der App löschen. Rechtsgrundlage: § 25 Abs. 2
        TDDDG (technisch erforderlich).
      </P>

      <H2>5. Schriften</H2>
      <P>
        Schriftarten werden lokal von diesem Server geladen (self-hosted). Es findet keine
        Verbindung zu Google Fonts oder anderen Drittanbietern statt; dabei werden keine
        Daten an Dritte übermittelt.
      </P>

      <H2>6. Deine Rechte</H2>
      <P>
        Du hast das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
        Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und
        Widerspruch (Art. 21 DSGVO). Wende dich dazu an den oben genannten Verantwortlichen.
        Du hast außerdem das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
      </P>

      <H2>7. Keine automatisierte Entscheidungsfindung</H2>
      <P>Es findet kein Profiling und keine automatisierte Entscheidungsfindung (Art. 22 DSGVO) statt.</P>

      <Stand>Stand: Oktober 2026</Stand>
    </Doc>
  );
}

const Wrap = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 24px 4px 48px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.accent};
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 0;
  margin-bottom: 8px;
`;

const Doc = styled.article`
  color: ${({ theme }) => theme.text};
  line-height: 1.65;
  text-align: start;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  margin: 8px 0 20px;
`;

const H2 = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin: 22px 0 6px;
`;

const P = styled.p`
  margin: 0 0 4px;
  color: ${({ theme }) => theme.textMuted};
`;

const Stand = styled.p`
  margin-top: 28px;
  color: ${({ theme }) => theme.textMuted};
  font-size: 13px;
`;
