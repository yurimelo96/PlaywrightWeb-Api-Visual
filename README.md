# PlaywrightWeb-Api-Visual

Este projeto contém testes automatizados utilizando o Playwright. Os testes incluem testes end-to-end (E2E), testes de API GraphQL e testes de regressão visual.

## Instalação

1. Clone o repositório:
   git clone https://github.com/yurimelo96/PlaywrightWeb-Api-Visual.git

  Navegue até o diretório do projeto:
    cd seu-repositorio

  Instale as dependências:
    npm install


## Executando os Testes

  ##Testes End-to-End (E2E)
Para executar os testes E2E:
  npm run test:e2e

  ##Testes de API GraphQL
Para executar os testes de API GraphQL:
  npm run test:api

  ##Testes de Regressão Visual
Para executar os testes de regressão visual:
  npm run test:visual

## Configuração do Playwright
O arquivo playwright.config.js contém a configuração do Playwright. Aqui estão alguns parâmetros importantes:

trace: Coleta traços de execução dos testes na primeira tentativa de falha.
screenshot: Tira screenshots apenas em falhas.
video: Retém vídeos apenas em falhas.

## GitHub Actions
Este projeto utiliza GitHub Actions para integração contínua. Os workflows estão definidos nos arquivos .github/workflows/playwright.yml e .github/workflows/tests.yml.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

![image](https://github.com/yurimelo96/PlaywrightWeb-Api-Visual/assets/54452187/f3490349-07d9-4715-aeaf-b3fbc1ba1e7c)


### Descrição dos Arquivos

- **README.md**: Este arquivo contém a documentação do projeto, incluindo instruções de instalação, execução de testes e contribuição.

- **package.json**: Este arquivo lista as dependências do projeto, scripts de execução e metadados do projeto.

- **playwright.config.js**: Este arquivo contém a configuração do Playwright, como diretório de testes, configurações de paralelismo, opções de repetição e configuração de projetos para diferentes navegadores.

### Diretório `tests/`

- **apiTest/**: Contém testes para a API GraphQL.
  - **getUser.spec.js**: Testa a query `user` para buscar os dados de um usuário específico.
  - **getUsersPost.spec.js**: Testa a query `user` para buscar os posts de um usuário específico e valida o status de retorno 200.

- **e2e/**: Contém testes end-to-end.
  - **home.spec.js**: Testa a existência dos principais elementos da página principal da Wikipedia e busca por "Brasil", validando os principais blocos de conteúdo da página resultante.

- **regressionVisualTest/**: Contém testes de regressão visual.
  - **regressionHome.spec.js**: Realiza testes visuais na página inicial da Wikipedia, comparando a captura de tela atual com uma imagem de referência para detectar diferenças visuais.
  - **screenshots/**: Diretório para armazenar capturas de tela atuais e imagens de diferença.
  - **baseline/**: Diretório para armazenar capturas de tela de referência (baseline).

- **utils/**: Contém utilitários de apoio para os testes.
  - **visual/**: Diretório para utilitários de regressão visual.
    - **visualRegression.js**: Contém a função `compareScreenshots` para comparar capturas de tela utilizando a biblioteca `pixelmatch`.

- **web/**: Contém ações relacionadas à web.
  - **actions/**: Diretório para classes de páginas e métodos de ações.
    - **Home.js**: Classe que define ações e validações para a página inicial da Wikipedia.
    - **index.js**: Extensão do Playwright para incluir a classe `HomePage` no contexto dos testes.

### Diretório `.github/workflows/`

- **playwright.yml**: Define um workflow do GitHub Actions para executar testes em push e pull requests nas branches `main` e `master`. Inclui etapas para checkout do código, configuração do Node.js, instalação das dependências, instalação dos navegadores do Playwright e execução dos testes.

- **tests.yml**: Define um workflow do GitHub Actions que pode ser acionado manualmente via `workflow_dispatch` ou automaticamente em push para a branch `main`. Inclui etapas para checkout do código, configuração do Node.js, instalação das dependências e execução dos testes E2E, testes de API e testes de regressão visual.
