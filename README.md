# Teste Técnico: API de Favoritos - Rick and Morty

## Resumo do Projeto

Esta é uma API RESTful desenvolvida em Node.js e Express.js. A aplicação serve como um sistema de gerenciamento de personagens favoritos da série Rick and Morty, onde usuários podem se registrar e autenticar para acessar funcionalidades exclusivas.

O sistema consome dados da API pública [The Rick and Morty API](https://rickandmortyapi.com/) e implementa regras de negócio como limite de favoritos e controle de acesso baseado em autenticação.

### Principais Funcionalidades

* **Autenticação de Usuários**: Sistema de cadastro e login com JSON Web Tokens (JWT).
* **Gerenciamento de Favoritos**: Usuários autenticados podem adicionar, remover, listar e atualizar uma lista de até 3 personagens.
* **Análise de Dados**: A API calcula informações relevantes, como o número de episódios em que os personagens favoritos aparecem.
* **Controle de Acesso**: Limite de requisições (Rate Limit) diferenciado para usuários autenticados e não autenticados.

## Como Executar o Projeto

Siga os passos abaixo para baixar e rodar a aplicação localmente.

### 1. Pré-requisitos

* Node.js (versão 18 ou superior)
* npm (geralmente instalado com o Node.js)

### 2. Instalação

Na raiz do projeto, execute o seguinte comando para instalar todas as dependências:

```bash
npm install
```

### 3. Configuração

Crie um arquivo chamado `.env` na raiz do projeto e adicione as seguintes variáveis:

```env
# Porta em que o servidor irá rodar
PORT=3000

# Chave secreta para gerar os tokens JWT.
JWT_SECRET=sua_chave_secreta_aqui
```

### 4. Execução

Para iniciar o servidor, execute o comando:

```bash
npm run dev
```

O terminal exibirá a mensagem `Server is running on port 3000`, e a API estará pronta para ser utilizada.

---
**Tecnologias**: Node.js, Express.js, JWT, Axios.
