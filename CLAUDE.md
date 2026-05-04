# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built bundle locally
- `npm run lint` — ESLint on `.js`/`.jsx` with `--max-warnings 0` (zero-warning policy; CI-equivalent locally)
- `npm run e2e` — full Playwright suite
- `npm run e2e:smoke` — `@smoke` tagged subset
- `npm run e2e:critical` — `@critical` tagged subset
- `npm run e2e:ui` — interactive Playwright runner
- `npm run e2e:report` — open last HTML report

## Architecture

Vite + React 18 (JavaScript, not TS) single-page app for the German "Leben in Deutschland" integration test — 310 multiple-choice questions translated into 5 languages (de/en/ua/ru/ar). Deployed at https://leben-in-deutschland-nine.vercel.app/.

### Data model — the central concept

There are **two parallel question datasets** in [src/data/](src/data/):

- [src/data/dataNew.js](src/data/dataNew.js) — the **active** dataset. Each entry: `{ id, de, en, ua, ru, ar, img, answers: { ansKey, 1: {de,en,ua,ru,ar}, 2: {...}, 3: {...}, 4: {...} } }`. `ansKey` is the index (1–4) of the correct answer. Used by [CardsContainer.jsx](src/components/CardsContainer.jsx) for the question-number `Select` and for rendering every `Card`.
- [src/data/data.js](src/data/data.js) — older schema with a single `answers` object (no multiple choice). [App.jsx](src/components/App.jsx) and [CardsContainer.jsx](src/components/CardsContainer.jsx) still import it solely for `data.length` in the pagination `total`. Keep `data.length === dataNew.length` when adding questions, or pagination breaks.

Recent commit history (`add 291-310`, `add 276-290`, …) shows the dominant ongoing task is **incrementally adding questions in batches**. When adding a question with id N:

1. Drop `N.jpg` into [src/assets/images/](src/assets/images/).
2. Append `import imgN from './N.jpg';` and re-export in [src/assets/images/images.js](src/assets/images/images.js).
3. Append the question object to **both** `dataNew.js` (full 4-answer form) and `data.js` (single-answer form) referencing `images.imgN`.

### Component flow

- [src/main.jsx](src/main.jsx) wraps `<App>` in `LanguageProvider` and `GlobalStyle`.
- [providers/LanguageProvider.jsx](src/providers/LanguageProvider.jsx) — React Context holding the current UI language (`'de' | 'en' | 'ua' | 'ru' | 'ar'`). Consumed via `useLanguage()`. The selected language is persisted to `localStorage` by [LanguageSelector.jsx](src/components/LanguageSelector.jsx) (key: `language`).
- [components/App.jsx](src/components/App.jsx) — top-level layout, filter controls (jump to question by `Select` / `InputNumber`, random, reset, prev/next), and starfield background. Holds the `question` (current question id) state; `0` = show all (paginated), non-zero = show that single question.
- [components/CardsContainer.jsx](src/components/CardsContainer.jsx) — paginated list when `questionNr === 0`, single card otherwise. Pagination's `currentPage` is also persisted to `localStorage` (key: `currentPage`).
- [components/Card.jsx](src/components/Card.jsx) — **the rendered question card**. Always shows the German question + 4 German answers; if the active language ≠ `de`, also shows translations beneath each. Clicking a `Radio` colors the chosen answer green if `value === ansKey`, red otherwise (logic inline in styled-components in `Card.jsx`).
- [components/CardNew.jsx](src/components/CardNew.jsx) — an earlier single-answer variant matching the `data.js` schema. Currently **not rendered** (the `CardNew` JSX in `CardsContainer.jsx` is commented out). Don't mistake it for the live component.

### Styling and UI

- **antd** is tree-shaken at build time via `babel-plugin-import` configured in [.babelrc](.babelrc) — keep using named imports `import { X } from 'antd'`.
- **styled-components** for everything else; shared theme tokens in [src/assets/styles/](src/assets/styles/) (`theme.js`, `colors.js`, `fonts.js`, `mixins.js`), applied through [GlobalStyle.js](src/assets/styles/GlobalStyle.js).
- **framer-motion** wraps several antd/layout primitives (`motion(Header)`, `motion(Flex)`, `motion(CardNew)`, etc.) for entrance animations driven by `initial="hidden"` / `whileInView="visible"` variants defined per file.

---

## INVARIANTS

1. **Never `git commit` / `git push` without explicit user command.** This rule is absolute. Auto mode, `run_in_background`, tool batching, pre-push skill, end-of-task cleanup, ANY other context — none of them override it. Permission is single-use: one explicit "commit and push" → one commit + one push. Next time ask again. Silence = no. Tests passing = no. Task looking done = no. The user types the command or nothing happens.
2. **Comments: 2 lines hard cap, every Edit/Write.** Before submitting any Edit or Write tool call: count comment lines in `new_string`/`content`. Any `/* */` block, JSDoc, or consecutive `//` run > 2 lines → rewrite before submit. The count is mechanical: if 3 lines exist, the rule is broken regardless of how essential the content felt. Auto mode, "complex topic", "important nuance", "old comment was longer" — none are exceptions. Trim to ≤2 lines, or delete entirely. Old code is not grandfathered — touching a function with a 5-line comment means trimming it in the same edit.
3. **Data parity invariant.** `data.js.length === dataNew.js.length`. Every new question goes into BOTH files. Pagination breaks otherwise.

`.claude/`, `CLAUDE.md` are tooling — never staged, never committed unless user explicitly requests.

---

## Communication

- Chat and plans: Russian. Code comments, skills, descriptions: English.
- Comments explain *why*, not *what*. No redundant comments.
- No preamble, no trailing summaries. Lead with the answer.
- Flag speculation: `SPECULATION: ...`

## Development Process

- **Objectivity.** Call out problems directly, even when contradicting user assumptions. Quality over comfort.
- **SOH** = Sonnet + Opus + Haiku (parallel agents): trigger on "SOH", "аудит", "перекрестный анализ". Split by concern: `model: "opus"` for deep reasoning, `model: "sonnet"` for breadth, `model: "haiku"` for fast lookups.
- **No hacks. Root cause first.** Trace the cause fully before fixing. Never patch symptoms.
- **Revert before retry.** When a change breaks: revert first, then rethink. Never layer fixes on broken code.
- **Escalate after 3 failures.** Spawn parallel agent with full context + all failed attempts.
- Prefer minimal diffs. Suggest solutions proactively.

## Code Quality

- **styled-components + antd only.** Don't introduce Tailwind, CSS modules, or new styling solutions without discussion.
- **No `console.log` in production.** Remove after debugging.
- **No commented-out code.** No copy-paste (3+ patterns -> extract utility).
- **Comments — see INVARIANT 2.** Default: no comment. Add only when *why* is non-obvious. No file headers, no function preambles. Never explain *what* — identifiers and the diff already do.
- **Lint is zero-warning.** `npm run lint` must be clean. Don't disable rules to silence warnings — fix the underlying code.

## Git Rules

- **Commit & push require explicit user command** — see INVARIANT 1. Analysis tasks ("проанализируй", "оцени", "SOH") never imply commit. Request to implement ("сделай", "применю", "фикс") implies WRITE TO FILES, nothing more — commit/push is a separate act that needs its own explicit command. If unsure, stop and ask. Never assume.
- Do NOT add `CLAUDE.md`, `.claude/`, `.playwright-mcp/` to `.gitignore`.
- **Never stage `.claude/`, `.playwright-mcp/`.** They're tooling, not source. Stage files explicitly by name, never `git add -A`/`.`.
- **Commit messages:** factual, what changed. No chat references. Show in chat after committing.
- **Privacy:** commits, PRs, code comments — ONLY technical facts about the code. Never include: model/agent names, people's names, screenshots, chat context, internal tooling (SOH, skills), debugging session details, Co-Authored-By AI lines. If it's not about the diff — it doesn't belong.
- Before every push: follow the pre-push skill.

## Testing

### Playwright E2E (UX, regressions)
Commands: `npm run e2e` (full), `npm run e2e:smoke` (tagged), `npm run e2e:critical`, `npm run e2e:ui` (interactive), `npm run e2e:report`.

**Red→green workflow.** Every bug fix lands as: (1) write a failing E2E spec that captures the bug, (2) ship the fix, (3) spec turns green. Both in the same PR.

**When to write E2E** — UX behavior bugs, fixed regressions, golden-path flows (language switch, question navigation, answer feedback). NOT pure utility logic, NOT visual tweaks.

**Before claiming done** on any task that touched runtime behavior: `npm run e2e` green. If a spec needs an in-flight fix from another branch, note the dependency in PR description — never `test.fixme` to silence it.

**Adding a spec** — follow `add-e2e-spec` skill. Always import `test`/`expect` from `e2e/fixtures.ts`.

**Selector priority** (top to bottom): `getByRole`/`getByText`/`getByLabel` → `[data-testid="..."]` (only if you add it) → CSS classes (last resort, antd classes are autogenerated and brittle). Never XPath, never `:nth-child`, never raw `.ant-*` classes.

**Quarantine** — flaky test → `test.fixme(...)` with reason and tracked issue. No naked `test.fixme` allowed. Fix or remove within one cycle.

**Suite size cap** — target ~15 specs. Past ~50, solo maintenance breaks without dedicated effort. Each new spec must justify itself: closes a bug or covers a critical golden path.

## Skills

| Trigger | Skill | File |
|---------|-------|------|
| start/new/create branch | branch-start | @.claude/skills/branch-start.md |
| git push / push to remote | pre-push | @.claude/skills/pre-push.md |
| create PR / pull request | create-pr | @.claude/skills/create-pr.md |
| review code / review PR | code-review | @.claude/skills/code-review.md |
| CSS overflow, layout bug | debug-layout | @.claude/skills/debug-layout.md |
| АРХ, архревью, оцени решение | arch-review | @.claude/skills/arch-review.md |
| create/new skill | create-skill | @.claude/skills/create-skill.md |
| прогони e2e / запусти e2e / run e2e | run-e2e | @.claude/skills/run-e2e.md |
| add e2e spec / regression test / напиши тест | add-e2e-spec | @.claude/skills/add-e2e-spec.md |
| worklog / журнал | worklog-update | @.claude/skills/worklog-update.md |

## Branch Context

Track in `.claude/changes/<branch-name>/STATUS.md`. Read at session start, update as work progresses. Delete folder when branch is merged.

## Temporary Files

Delete immediately after use. Windows junk (delete on sight): `nul`, `bash.exe.stackdump`, `_test__.*`.
