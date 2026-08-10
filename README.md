# 🎲 Dice Roller

**Objetivo:** possibilitar que um dado gere um valor aleatório ao ser jogado (clique de botão).

---

# 📋 Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- Vite (ferramenta de build)
- React 19 (biblioteca JS)
- Typescript
- ESLint

---

# 📥 Instalação

Clone o repositório do projeto:

```bash
git clone https://github.com/filipesilveira-dev/dice-roller
```

Instale as dependências:

```bash
npm install
```

---

# ▶️ Executando o projeto



---

# 🧪 Qualidade de Código

Executar a análise estática do código:

```bash
npm run lint
```

---

# História do projeto

A ideia do projeto vem após revisitar repositórios antigos em me deparar com o "Jogo do Bruxo" <https://github.com/filipesilveira-dev/Jogo-do-Bruxo> que consite em um jogo de adivinhação. É gerado um número aleatório o qual o usuário, podendo dar até 10 palpites, tenta adivinhar qual é. ´Trata-se de uma aplicação simples, mas que traz uma lógica em JavaScript de tratamento de inputs do usuário, geração de números aleátorios e retorno visual (UI) interesstante.
Partindo da premissa de geração aleatória de números, veio a ideia de pensar em algo que tivesse um potencial maior de impanto prático para o usuário. Amante de jogos de tabuleiro, decidi transformar em um "Dice Roller (Jogador de dados)" que pode ser utilizado em jogos de tabuleiro em geral. Inicialmente, trata-se de apenas um dados de seis faces. Porém, a ideia é **construir a aplicação de maneira escalonável**, visando a **amplição do número de dados utilizados ao mesmo tempo**, gerando um número aleatório em cada, bem como **ampliação da quantidade de faces que cada um deve ter**, aumentando a aplicabilidade do projeto para amantes de RPG (Role-Playing Game).

# 📌 Objetivo do projeto

Este projeto demonstrar conhecimento ou noções sobre as tecnologias utilizadas no projeto, contemplando:

- React 
- Typescript
- ESLint
- Motion

# Aprendizados

- **Versionamento semântico:** convenção formal para atribuição de números de versão a softwares, bibliotecas e APIs
- **useRef():** (rerorço) hook do React que permite manter um valor entre renderizações sem provocar uma nova renderização quando esse valor muda. Utilizado em "pendingResult" para "guardar" o novo valor do dado durante a animação. A UI só atualiza ao final.
- **União de literais:** utilizado para tipar as faces dos dados aceitos na aplicação. Estabelece um conjunto exato de valores específicos, como uma lista restrita de opções permitidas.
- **crypto.randomUUID():** (reforço) API fornecida pelo navegador utilizada para gerar identificadores únicos.

---

## Captura de tela

# 👨‍💻 Autor

**Filipe P. Silveira**