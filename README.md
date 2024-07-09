# PlaywrightWeb-Api-Visual

Este projeto contém testes automatizados utilizando o Playwright. Os testes incluem testes end-to-end (E2E), testes de API GraphQL e testes de regressão visual.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

├── README.md
├── package.json
├── playwright.config.js
├── tests/
│ ├── apiTest/
│ │ ├── getUser.spec.js
│ │ └── getUsersPost.spec.js
│ ├── e2e/
│ │ ├── home.spec.js
│ ├── regressionVisualTest/
│ │ ├── regressionHome.spec.js
│ │ ├── screenshots/
│ │ │ └── homepage.png
│ │ ├── baseline/
│ │ │ └── homepage.png
│ ├── utils/
│ │ └── visual/
│ │ └── visualRegression.js
│ ├── web/
│ │ ├── actions/
│ │ └── Home.js
│ └── index.js
├── .github/
│ └── workflows/
│ └── playwright.yml
│ └── tests.yml

## Instalação

1. Clone o repositório:
   ```sh git clone https://github.com/yurimelo96/PlaywrightWeb-Api-Visual.git

  Navegue até o diretório do projeto:
    cd seu-repositorio

  Instale as dependências:
    npm install


## Executando os Testes

  ###Testes End-to-End (E2E)
Para executar os testes E2E:
  npm run test:e2e

  ###Testes de API GraphQL
Para executar os testes de API GraphQL:
  npm run test:api

  ###Testes de Regressão Visual
Para executar os testes de regressão visual:
  npm run test:visual

## Configuração do Playwright
O arquivo playwright.config.js contém a configuração do Playwright. Aqui estão alguns parâmetros importantes:

trace: Coleta traços de execução dos testes na primeira tentativa de falha.
screenshot: Tira screenshots apenas em falhas.
video: Retém vídeos apenas em falhas.

## GitHub Actions
Este projeto utiliza GitHub Actions para integração contínua. Os workflows estão definidos nos arquivos .github/workflows/playwright.yml e .github/workflows/tests.yml.
