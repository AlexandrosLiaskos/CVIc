# Contributing

Contributions are welcome through pull requests into the branch `master`. A pull request is merged when
its checks have passed.

## Licence

Contributions are accepted under the licence of CVIc, the [MIT License](LICENSE).

## Setting up

The project needs Git, [Node.js](https://nodejs.org/) 18.18 or later, and npm.

```bash
git clone https://github.com/AlexandrosLiaskos/CVIc.git
cd CVIc
npm ci
npm run dev
```

The last command serves the application at <http://localhost:3000/CVIc/> and shows each saved change at
once. The application runs in the browser only; it has no server part.

## Checks

Run the checks before opening a pull request. The workflow `Checks` runs the same commands on every push
and every pull request.

```bash
npm run lint
npm run type-check
npm test
npm run build
```

| Command | What it checks |
|---|---|
| `npm run lint` | ESLint, with the settings in `.eslintrc.json`. A warning counts as an error. |
| `npm run type-check` | The TypeScript compiler in strict mode, with the settings in `tsconfig.json`. |
| `npm test` | The unit tests, run with Vitest in Node.js. |
| `npm run build` | The production build with Vite, written to `dist/`. |

## Code

- TypeScript is compiled in strict mode. ESLint reports every use of the type `any` outside the files that
  `.eslintrc.json` exempts.
- The definition of an index stands in its own folder under `src/indices/`: its parameters with their
  ranking tables, its validation rules and its formulas. The formulas are computed in `src/calculators/`.
- A new function that computes a result comes with a test.

## Tests

The file of a test stands beside the file that it tests and ends in `.test.ts`. The tests run without a
browser. A test that needs the storage of the browser replaces `src/services/indexedDBService.ts` with
`vi.mock`.

The expected value of a test comes from the definition of the formula, not from the output of the function
that is tested. Work the value out by hand and show the arithmetic in a comment above the assertion.

A test that shows a defect of the application is not changed to pass. Fix the defect in the same pull
request, or mark the test with `it.fails` and describe the defect in a comment above it. `it.fails` reports
an error as soon as the defect is fixed, and the mark is then removed.

## Proposing a change

1. Open an issue that describes the defect or the proposal, unless the change is small.
2. Create a branch from `master` in your fork.
3. Make the change, add or update its tests, and record it under `Unreleased` in
   [CHANGELOG.md](CHANGELOG.md).
4. Run the checks.
5. Open a pull request into `master`. State what the change does, how it was tested, and the source of
   every formula, class limit or ranking table that it adds or changes.

## Commits

Commit subjects follow [Conventional Commits](https://www.conventionalcommits.org/), as the
[README](README.md#commit-convention) shows. Describe one change in each commit.

## Deployment

A push to `master` builds the application and publishes it at <https://alexandrosliaskos.github.io/CVIc/>
through the workflow `Deploy static content to Pages`. A merged pull request therefore changes the public
site.

## Citation

When the version in `package.json` changes, change the version in [CITATION.cff](CITATION.cff) as well.
