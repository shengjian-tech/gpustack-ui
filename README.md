# AI Computing Power Cloud Platform UI

UI for [AI Computing Power Cloud Platform](https://fedimoss.com/).

## Installation

1. [Node.js](https://nodejs.org/en) 22 (see `.nvmrc`, includes NPM)

If you're on Mac

```
brew install node
```

2. [pnpm](https://pnpm.io/installation#using-npm)

```
npm install -g pnpm
```

3. Setup

```
git clone https://fedimoss.com/
```

4. Install dependencies

```
cd your-project
pnpm install
```

## Usage

1. Run development server (at http://localhost:9000)

```
npm run dev
```

2. build release

```
npm run build
```

## Testing

Run all Node.js tests, or select files and directories relative to the project root:

```sh
pnpm test
pnpm test src/pages/llmodels
pnpm test src/pages/llmodels/forms/__tests__/pd-backend-change.test.mts
```

Tests named `*.test.ts`, `*.test.tsx`, `*.test.mts`, or `*.test.mjs` under `src/` and `scripts/` are discovered automatically. Adding a test does not require changing `package.json`. PR CI runs the full suite with the same `pnpm test` command after the build, regardless of which modules changed.

UI interaction tests in this suite use React and JSDOM, with mocked dependencies and APIs. They run inside Node.js without starting a browser, frontend server, or live backend.

The runner enables import conditions and module mocking only for `*.test.mts`, so ordinary tests keep their default dependency resolution. Any failing test or unmatched input path causes a nonzero exit code.

## Bugs & Issues

- Please submit [bugs and issues](https://fedimoss.com/) with a label `ui`

## Links

- Official website: https://fedimoss.com/
- Documents: https://fedimoss.com/
