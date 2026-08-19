# 🎲 Dice Roller

Aplicação web para simulação de rolagem de dados de RPG e jogos de tabuleiro.

O projeto permite adicionar múltiplos dados, configurar a quantidade de faces de cada um e realizar rolagens individuais ou simultâneas, com animações e interface responsiva.

🔗 Aplicação: https://filipesilveira-dev.github.io/dice-roller/
🔗 Repositório: https://github.com/filipesilveira-dev/dice-roller

---

# 📋 Tecnologias utilizadas
- **React 19** — construção da interface e composição de componentes
- **TypeScript** — tipagem estática e maior segurança durante o desenvolvimento
- **Vite** — ferramenta de desenvolvimento e build
- **CSS** — estilização e responsividade
- **Zustand** — gerenciamento de estado global
- **Motion** — animações das rolagens
- **Jest** — testes automatizados
- **React Testing Library** — testes de componentes e interação do usuário
- **ESLint** — análise estática e padronização do código
- **Git / GitHub** — versionamento e hospedagem do código
- **GitHub Actions** — integração e automação do processo de build e deploy
- **GitHub Pages** — hospedagem da aplicação

---

# ✨ Funcionalidades

Atualmente, a aplicação permite:

- Adicionar múltiplos dados
- Remover dados individualmente
- Escolher entre dados **D4, D6, D8, D10, D12 e D20**
- Configurar individualmente a quantidade de faces de cada dado
- Representar visualmente os resultados do D4 e D6
- Representar numericamente os demais dados
- Rolar cada dado individualmente
- Rolar todos os dados simultaneamente
- Executar animações durante as rolagens
- Bloquear novas interações enquanto uma rolagem está em andamento
- Persistir os dados configurados no localStorage
- Manter a aplicação responsiva em diferentes tamanhos de tela

**Próxima evolução**: implementar a soma dos resultados dos dados e a exibição do total da rolagem.

---

# 📥 Instalação

Clone o repositório:

```bash
git clone https://github.com/filipesilveira-dev/dice-roller.git
```

Acesse a pasta do projeto:

```bash
cd dice-roller
```

Instale as dependências:

```bash
npm install
```

---

# ▶️ Executando o projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

Após executar o comando, acesse a URL disponibilizada pelo Vite no terminal.

Para gerar a versão de produção:

```bash
npm run build
```

Para visualizar localmente a versão de produção:

```bash
npm run preview
```

---

# 🧪 Testes

O projeto utiliza Jest e React Testing Library para testes automatizados.

Executar os testes:

```bash
npm test
```

Executar os testes em modo de observação:

```bash
npm run test:watch
```

Atualmente, os testes contemplam a função responsável pela geração dos resultados dos dados e o componente reutilizável Button.

---

# 🧪 Qualidade de Código

O projeto utiliza ESLint para análise estática do código.

Executar o lint:

```bash
npm run lint
```

O processo de desenvolvimento também utiliza **Prettier** para manter a formatação do código consistente.

---

# 🚀 Deploy

O projeto é hospedado utilizando GitHub Pages.

O processo de build e deploy é automatizado por meio do GitHub Actions. Alterações publicadas na branch main podem disparar o workflow responsável por gerar a aplicação de produção e disponibilizá-la no GitHub Pages.

## Pipeline

O processo automatizado contempla, entre outras etapas:

1. Checkout do código
2. Configuração do ambiente Node.js
3. Instalação das dependências
4. Build da aplicação
5. Publicação dos arquivos gerados no GitHub Pages

---

# História do projeto

A ideia do projeto surgiu após revisitar repositórios antigos e me deparar novamente com o **Jogo do Bruxo**, uma aplicação simples de adivinhação desenvolvida anteriormente.

No jogo, um número aleatório é gerado e o usuário possui até 10 tentativas para tentar descobrir qual é o número escolhido. Apesar de simples, o projeto trabalha conceitos importantes de JavaScript, como tratamento de entradas do usuário, geração de números aleatórios e atualização da interface de acordo com as interações.

A partir dessa ideia de geração aleatória de números, surgiu a proposta de desenvolver uma aplicação com uma utilização mais prática.

Como entusiasta de jogos de tabuleiro, a ideia foi transformar esse conceito em um Dice Roller, capaz de ser utilizado durante partidas de jogos de tabuleiro e, posteriormente, em sistemas de RPG.

A primeira versão da aplicação tinha como objetivo simular apenas um dado de seis faces. A partir daí, o projeto foi desenvolvido de forma incremental, buscando uma arquitetura mais escalável e a aplicação de boas práticas de desenvolvimento Front-end.

O projeto evoluiu para permitir múltiplos dados simultaneamente, diferentes quantidades de faces, rolagens individuais e coletivas, animações, gerenciamento de estado e persistência das configurações.

A proposta é continuar evoluindo a aplicação conforme novos conceitos de desenvolvimento são estudados e incorporados ao projeto.

---

# 📌 Objetivo do projeto

Além de construir uma aplicação funcional, o projeto tem como objetivo servir como projeto de estudo e portfólio, demonstrando conhecimentos práticos em desenvolvimento Front-end moderno.

Entre os principais conceitos trabalhados estão:

- **React**
- **TypeScript**
- **Componentização**
- **React Hooks**
- **Gerenciamento de estado com Zustand**
- **Animações com Motion**
- **Testes automatizados**
- **ESLint**
- **Persistência de estado**
- **Git e GitHub**
- **CI/CD com GitHub Actions**
- **Deploy com GitHub Pages**
- **Organização e escalabilidade de código**

---

# 📚 Aprendizados

Durante o desenvolvimento do projeto, diversos conceitos foram estudados e aplicados na prática.

## Versionamento semântico

Compreensão da convenção formal utilizada para atribuição de números de versão a softwares, bibliotecas e APIs, seguindo o conceito de Semantic Versioning (SemVer).

## useRef()

O hook `useRef()` permite manter um valor entre renderizações sem provocar uma nova renderização quando esse valor é alterado.

No projeto, foi utilizado para armazenar o resultado pendente de uma rolagem durante a animação. Dessa forma, o resultado visual do dado somente é atualizado após a conclusão da animação.

## União de literais

As uniões de literais do TypeScript foram utilizadas para restringir os valores possíveis para a quantidade de faces dos dados.

Isso permite representar, por meio da tipagem, exatamente os dados aceitos pela aplicação:

type DiceFaces = 4 | 6 | 8 | 10 | 12 | 20;

## crypto.randomUUID()

A API `crypto.randomUUID()` foi utilizada para gerar identificadores únicos para os dados adicionados à aplicação.

## Key Reset Trick

A propriedade `key` do React foi utilizada de forma intencional para provocar a remontagem do componente `Dice quando a configuração do dado é alterada.

key={`${d.id}-${d.faces}`}

Essa abordagem evita que o estado interno de um dado permaneça incompatível com sua nova quantidade de faces.

Por exemplo, caso um D20 apresente o resultado `17` e seja posteriormente alterado para um D6, a remontagem do componente garante que seu estado inicial seja restabelecido.

## Middleware `persist` do Zustand

O middleware `persist` do Zustand foi utilizado para implementar a persistência das configurações dos dados.

Por meio de `partialize`, foi definido quais informações do estado global deveriam ser persistidas.

Atualmente, o projeto armazena no `localStorage` o array de dados configurados, contendo seus respectivos `id` e quantidade de faces.

Os resultados das rolagens não são persistidos. Essa decisão mantém separadas as configurações permanentes dos dados e os resultados temporários das rolagens.

## Testes automatizados

A utilização de **Jest** e **React Testing Library** permitiu introduzir testes automatizados ao projeto, verificando tanto funções de lógica quanto comportamentos de componentes React.

## CI/CD

A configuração de **GitHub Actions** permitiu automatizar o processo de build e publicação da aplicação no GitHub Pages, tornando o deploy mais previsível e reproduzível.

---

# Captura de tela

![Tela inicial da aplicação Dice Roller.](/public/diceRollerScreen.png "Tela inicial do Dice Roller.")

---

# 👨‍💻 Autor

**Filipe P. Silveira**