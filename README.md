# Lumi Frontend

Aplicação frontend para gerenciamento de faturas, desenvolvida com Next.js e seguindo o padrão MVVM.

## 🚀 Tecnologias

- **Framework**: Next.js 14
- **Linguagem**: TypeScript
- **Estilização**: Material-UI (MUI)
- **Gerenciamento de Estado**: React Query
- **Formulários**: React Hook Form
- **Linting**: ESLint
- **Formatação**: Prettier

## 📸 Screenshots

### Dashboard
<img width="1674" alt="Captura de Tela 2025-04-05 às 18 00 43" src="https://github.com/user-attachments/assets/f8e97cba-b69b-41eb-9dc6-4ba3fd5488dd" />

### Biblioteca de Faturas
<img width="1674" alt="Captura de Tela 2025-04-05 às 18 00 27" src="https://github.com/user-attachments/assets/0772efd1-3292-4884-a172-7f2c83fbcd54" />

### Modal de Upload
<img width="1672" alt="Captura de Tela 2025-04-05 às 18 01 05" src="https://github.com/user-attachments/assets/b6bdbbf8-efc0-43e5-8609-44c9f7eaf6fb" />

## 🛠️ Como Rodar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Variáveis de ambiente configuradas (ver `.env.example`)

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/lumi-frontend.git

# Entre no diretório
cd lumi-frontend

# Instale as dependências
npm install
# ou
yarn install
```

### Desenvolvimento
```bash
# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

### Build
```bash
# Crie uma build de produção
npm run build
# ou
yarn build
```

### Testes
```bash
# Execute os testes
npm run test
# ou
yarn test
```


## 📁 Filtros/SSR
Filtros implementados 
Implementado o uso de SSR (Server-Side Rendering) na renderização de páginas usando o servidor, melhorando performance e SEO. Filtros passados na URL são processados pelo backend para consultar a API com precisão, deizando a frontend sem a responsabilidade de fazer mapeamento e filtragem de dados.
<img width="1328" alt="Captura de Tela 2025-04-05 às 18 01 53" src="https://github.com/user-attachments/assets/1cecf395-b57f-4a1c-a4c1-9deb1229478d" />

## 📁 Estrutura de Pastas

```
src/
├── components/         # Componentes reutilizáveis
├── configs/           # Configurações da aplicação
├── contexts/          # Contextos do React
├── hooks/             # Hooks personalizados
├── services/          # Serviços de API
├── templates/         # Templates de páginas
│   └── library/       # Template da biblioteca
│       ├── components/ # Componentes específicos
│       │   ├── filter/ # Exemplo de componente com MVVM
│       │   │   ├── filter.model.ts      # Lógica de negócio e estado
│       │   │   ├── filter.view.tsx      # Interface do usuário
│       │   │   ├── filter.viewmodel.ts  # Lógica de apresentação
│       │   │   ├── filter.types.ts      # Definições de tipos que são usados em lugares diferentes
│       │   │   └── index.ts             # Exportação do componente
│       │   └── upload-invoice-modal/    # Outro exemplo de componente
│       │       ├── upload-invoice.model.ts
│       │       ├── upload-invoice.view.tsx
│       │       ├── upload-invoice.viewmodel.ts
│       │       ├── upload-invoice.types.ts
│       │       └── index.ts
├── types/             # Definições de tipos
└── utils/             # Funções utilitárias
```

## 🏗️ Arquitetura MVVM

A aplicação segue o padrão Model-View-ViewModel (MVVM) para melhor organização e manutenção do código.

### Model
- Representa os dados e a lógica de negócios
- Localizado pela declaração `.model`
- Gerencia o estado e as regras de negócio
- Exemplo: `filter.model.ts`

### View
- Interface do usuário
- Localizado pela declaração `.view`
- Componentes puramente visuais
- Exemplo: `filter.view.tsx`

### ViewModel
- Ponte entre Model e View
- Localizado pela declaração `.view-model`
- Gerencia a lógica de apresentação
- Transforma dados do Model para a View
- Exemplo: `filter.viewmodel.ts`

## 🏗️ Exemplo de .env
NEXT_PUBLIC_API_URL=http://localhost:3001
