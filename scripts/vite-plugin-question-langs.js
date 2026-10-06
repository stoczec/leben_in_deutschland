const DATA_FILE = /\/src\/data\/dataNew\.js$/;
const TRANSLATED = ['en', 'ua', 'ru', 'ar'];

const keyOf = (prop) => (prop.key.type === 'Identifier' ? prop.key.name : String(prop.key.value));
const propsOf = (obj) => Object.fromEntries(obj.properties.map((p) => [keyOf(p), p]));
const questionsOf = (ast) =>
  ast.body
    .flatMap((node) => (node.type === 'VariableDeclaration' ? node.declarations : []))
    .find((d) => d.init?.type === 'ArrayExpression').init.elements;

const cut = (code, ranges) => {
  const parts = [];
  let at = 0;
  for (const [start, end] of ranges.sort((a, b) => a[0] - b[0])) {
    parts.push(code.slice(at, start));
    at = end;
  }
  return parts.join('') + code.slice(at);
};

// The catalogue without translations: ids, German text, answer keys, images.
export function baseModule(code, ast) {
  const translatedProps = (obj) => obj.properties.filter((p) => TRANSLATED.includes(keyOf(p)));
  const ranges = questionsOf(ast).flatMap((q) => {
    const answers = Object.values(propsOf(propsOf(q).answers.value))
      .filter((p) => p.value.type === 'ObjectExpression')
      .flatMap((p) => translatedProps(p.value));
    return [...translatedProps(q), ...answers];
  });
  return cut(code, ranges.map((p) => [p.start, code[p.end] === ',' ? p.end + 1 : p.end]));
}

// One language as { id: [question, answer1, answer2, answer3, answer4] }.
export function langModule(code, ast, lang) {
  const text = (obj) => {
    const prop = propsOf(obj)[lang];
    return prop ? code.slice(prop.value.start, prop.value.end) : 'null';
  };
  const entries = questionsOf(ast).map((q) => {
    const props = propsOf(q);
    const answers = propsOf(props.answers.value);
    const texts = [q, ...[1, 2, 3, 4].map((n) => answers[n].value)].map(text);
    return `${code.slice(props.id.value.start, props.id.value.end)}:[${texts.join(',')}]`;
  });
  return `export default {${entries.join(',\n')}};\n`;
}

// `dataNew.js?base` loads eagerly; `dataNew.js?lang=xx` becomes a lazy per-language chunk.
export default function questionLangs() {
  let isBuild = false;
  return {
    name: 'question-langs',
    configResolved(config) {
      isBuild = config.command === 'build';
    },
    transform(code, id, options) {
      const [file, query = ''] = id.split('?');
      if (!DATA_FILE.test(file)) return;
      const params = new URLSearchParams(query);
      if (params.has('base')) return { code: baseModule(code, this.parse(code)), map: null };
      if (params.has('lang')) return { code: langModule(code, this.parse(code), params.get('lang')), map: null };
      if (isBuild && !options?.ssr) this.error('Import dataNew.js?base or loadTranslations(), not the full catalogue.');
    },
  };
}
