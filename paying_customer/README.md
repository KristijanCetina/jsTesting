# paying_customer

## Project setup

```bash
git clone https://github.com/KristijanCetina/payingCustomer
cd paying_customer
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

### Cypress test

- specific spec test

  ```bash
  npm run cy-run -- --spec "cypress/integration/paying/paying.spec.js"
  ```

- open Test Runner

  ```bash
  npm run cy-test
  ```

### Playwright test

- run all test

  ```bash
  npm run pw-test
  ```

- run specific test

  ```bash
  npm run pw-test playwrightTests/basicSignUp.spec.ts
  ```

- run tests in single thread

  ```bash
  npm run pw-test -- --workers 1
  ```
