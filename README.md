# High Fidelity - Sistema de Gerenciamento

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)
![License](https://img.shields.io/badge/License-MIT-green)

Um sistema completo para gerenciamento de loja, catálogo de produtos, cadastro de clientes e controle de vendas com emissão de notas fiscais.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Componentes](#componentes)
- [API e Dados](#api-e-dados)
- [Deploy](#deploy)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Visão Geral

O **High Fidelify** é uma aplicação web moderna desenvolvida em React que permite gerenciar todo o ciclo de uma loja de discos: desde o cadastro de produtos e clientes até a venda com emissão de nota fiscal.

### 🎨 Preview

![Dashboard Preview]()

## ✨ Funcionalidades

### 📀 Módulo de Catálogo
- ✅ **Cadastro completo de discos** com título, artista, ano, preço e capa
- 🖼️ **Upload de imagens** via URL com placeholder automático
- 🔍 **Sistema de busca** por título ou artista
- ✏️ **Edição em tempo real** dos discos cadastrados
- 🗑️ **Exclusão segura** com confirmação
- 📊 **Estatísticas** de valor total e preço médio
- 🎵 **Discos de exemplo** pré-cadastrados

### 👥 Módulo de Clientes
- 👤 **Cadastro completo** com dados pessoais
- 📞 **Telefone e CPF** com formatação automática
- 📧 **Validação de e-mail**
- 🎂 **Data de nascimento**
- 📍 **Endereço completo**
- 🔍 **Busca avançada** por nome, e-mail ou CPF
- 📊 **Dashboard** com métricas de cadastro

### 💰 Módulo de Vendas
- 🧾 **Sistema completo de vendas** com seleção de cliente e disco
- 💳 **Múltiplas formas de pagamento** (dinheiro, cartão, PIX, transferência)
- 📦 **Controle de quantidade** e preço customizável
- 🧾 **Emissão de nota fiscal** com dados fiscais
- 🖨️ **Recibo imprimível** com layout profissional
- 📈 **Estatísticas em tempo real** (vendas, faturamento, ticket médio)
- 🔄 **Cancelamento de vendas** com confirmação

##  Tecnologias

- **Frontend:** React 18.2.0, Tailwind CSS
- **Gerenciamento de Estado:** useState, useEffect
- **Ícones:** Emojis nativos (performance otimizada)
- **Formatação:** Intl (moeda, datas)
- **Build Tool:** Vite (recomendado)

## Instalação

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Passo a passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/discoteca-manager.git
cd discoteca-manager
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Execute o projeto**
```bash
npm run dev
# ou
yarn dev
```

4. **Acesse a aplicação**
```
http://localhost:3000
```

### Build para produção
```bash
npm run build
npm run preview
```

## 📖 Uso

### Primeiros Passos

1. **Inicialização**
   - Ao abrir o sistema, você verá discos e clientes de exemplo
   - Use os botões de navegação no topo para alternar entre módulos

2. **Gerenciando o Catálogo**
   - Adicione novos discos com capa, preço e informações
   - Edite discos existentes com um clique
   - Use a busca para encontrar discos rapidamente

3. **Cadastrando Clientes**
   - Preencha informações completas para melhor controle
   - CPF e telefone são formatados automaticamente
   - Todos os campos exceto nome e e-mail são opcionais

4. **Realizando Vendas**
   - Selecione cliente e disco nos dropdowns
   - Escolha a forma de pagamento
   - Ajuste quantidade se necessário
   - Emita a nota fiscal com um clique

### 📊 Dashboard e Estatísticas

Cada módulo inclui um dashboard com métricas importantes:

- **Catálogo:** Total de discos, valor total, preço médio
- **Clientes:** Total cadastrado, com telefone, com CPF
- **Vendas:** Vendas realizadas, faturamento, ticket médio

## 🏗 Estrutura do Projeto

```
discoteca-manager/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Catalog.jsx
│   │   ├── Clients.jsx
│   │   └── Sales.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── tailwind.config.js
```

## 🔧 Componentes

### App.jsx
Componente principal que gerencia o estado global e navegação.

### Catalog.jsx
```jsx
// Funcionalidades principais:
- Gerenciamento completo do catálogo
- Upload e exibição de capas
- Sistema de busca e filtros
- Edição e exclusão de discos
```

### Clients.jsx
```jsx
// Funcionalidades principais:
- Cadastro completo de clientes
- Formatação automática de CPF/telefone
- Validação de dados
- Busca avançada
```

### Sales.jsx
```jsx
// Funcionalidades principais:
- Processo completo de venda
- Emissão de nota fiscal
- Múltiplas formas de pagamento
- Estatísticas em tempo real
```

## 💾 API e Dados

### Estrutura de Dados

**Disco:**
```json
{
  "id": 1,
  "title": "Thriller",
  "artist": "Michael Jackson",
  "cover": "url-da-capa",
  "year": 1982,
  "price": 89.90
}
```

**Cliente:**
```json
{
  "id": 1,
  "name": "Ana Silva",
  "email": "ana.silva@email.com",
  "phone": "(11) 99999-1234",
  "address": "Rua das Flores, 123 - São Paulo, SP",
  "cpf": "123.456.789-00",
  "birthDate": "1990-05-15"
}
```

**Venda:**
```json
{
  "id": 1,
  "clientId": 1,
  "client": "Ana Silva",
  "diskId": 1,
  "disk": "Thriller",
  "quantity": 1,
  "unitPrice": 89.90,
  "totalPrice": 89.90,
  "paymentMethod": "cartao_credito",
  "date": "2024-01-15T10:30:00.000Z"
}
```

## Personalização

### Cores e Tema
O sistema usa Tailwind CSS. Para customizar:

```css
/* No arquivo tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      colors: {
        'discoteca': {
          primary: '#your-color',
          secondary: '#your-color'
        }
      }
    }
  }
}
```

### Adicionando Novas Formas de Pagamento
```jsx
// Em Sales.jsx, atualize o array de paymentMethods
const paymentMethods = [
  { value: 'dinheiro', label: '💵 Dinheiro' },
  { value: 'novo_metodo', label: '🆕 Novo Método' }
];
```

##  Responsividade

O sistema é totalmente responsivo e funciona em:
-  **Mobile** (320px+)
- **Tablet** (768px+)
- **Desktop** (1024px+)

##  Deploy

### Netlify
```bash
npm run build
# Upload da pasta dist/ para Netlify
```


### 📋 Padrões de Código
- Use ESLint e Prettier
- Siga as convenções do React
- Mantenha a responsividade
- Adicione comentários para funções complexas

## 🐛 Troubleshooting

### Problemas Comuns

**Discos não aparecem nas vendas:**
- Verifique se os discos estão cadastrados no catálogo
- Confirme se há dados no estado `catalog`

**Erro de formatação de CPF:**
- O sistema aceita CPF com ou sem formatação
- A formatação é aplicada automaticamente

**Imagens não carregam:**
- Verifique se a URL da imagem é válida
- O sistema usa placeholder para imagens quebradas

**Problemas de responsividade:**
- Verifique se o viewport está configurado corretamente
- Teste em diferentes tamanhos de tela

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

##  Desenvolvedor

Criado por Murilo Feliciano Vieira

- 📧 Email: Felicianovieiramurilo@gmail.com
- 🌐 Website: https://portfolio-murilofeliciano.netlify.app/

## 🆕 Changelog

### v1.0.0 (2024-01-15)
- ✅ Sistema completo de catálogo
- ✅ Cadastro avançado de clientes  
- ✅ Módulo de vendas com nota fiscal
- ✅ Dashboard com estatísticas
- ✅ Design responsivo

---

** Se curtiu o projeto, deixe uma estrela no repositório!**

---

<div align="center">

**High Fidelity** - Um projeto de Murilo Feliciano 

</div>
