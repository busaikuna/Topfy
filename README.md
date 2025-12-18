# Topfy - Sistema de Recomendação de Músicas

Sistema completo de recomendação de músicas desenvolvido em Node.js com Express, implementando todos os conceitos de Programação Orientada a Objetos (POO).

## Conceitos de POO Implementados

### 1. Abstração
- **AbstractMusic**: Classe abstrata base que não pode ser instanciada diretamente
- **AbstractUser**: Classe abstrata para diferentes tipos de usuários

### 2. Encapsulamento
- Propriedades privadas usando `#` (campos privados)
- Getters e setters para controle de acesso
- Validações e proteção de dados sensíveis

### 3. Herança
- **Músicas**: Music e SponsoredMusic herdam de AbstractMusic
- **Usuários**: Listener e Administrator herdam de AbstractUser

### 4. Polimorfismo
- **Music.increasePopularity()**: Aumenta popularidade em +1
- **SponsoredMusic.increasePopularity()**: Aumenta popularidade em +2 (comportamento diferente)
- Método `getDetails()` personalizado para cada tipo de música

## Estrutura do Projeto

```
├── models.js       - Classes de POO (Músicas, Usuários, Biblioteca)
├── controller.js   - Servidor Express e API REST
├── views.js        - Interface HTML/CSS/JS (Dark Theme)
└── package.json    - Dependências do projeto
```

## Como Executar

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor:
```bash
npm start
```

3. Acesse no navegador:
```
http://localhost:3000
```

## Credenciais de Teste

**Administrador:**
- Email: admin@topfy.com
- Senha: admin123

**Ouvinte:**
- Email: joao@email.com
- Senha: 123456

## Funcionalidades

### Para Ouvintes (Listeners):
- Explorar biblioteca de músicas
- Tocar músicas (aumenta popularidade - POLIMORFISMO em ação!)
- Adicionar preferências musicais
- Receber recomendações personalizadas
- Ver histórico de reprodução
- Filtrar músicas por gênero

### Para Administradores:
- Todas as funcionalidades do ouvinte
- Adicionar novas músicas (normais ou patrocinadas)
- Remover músicas do catálogo
- Visualizar estatísticas do sistema
- Gerenciar usuários (criar novos)
- Ver métricas de popularidade

## Diferenciais Técnicos

### Polimorfismo em Ação
O sistema demonstra polimorfismo de forma prática:
- Músicas normais ganham +1 de popularidade por play
- Músicas patrocinadas ganham +2 de popularidade por play
- Ambas usam o mesmo método `increasePopularity()`, mas com comportamentos diferentes

### Sistema de Recomendação
- Recomendações baseadas nas preferências do usuário
- Ordenação por popularidade
- Fallback para músicas mais populares quando não há preferências

### Design Dark Moderno
- Interface totalmente responsiva
- Tema dark com gradientes
- Animações suaves e transições
- Cards interativos com feedback visual

## Tecnologias

- Node.js
- Express
- HTML5
- CSS3 (Design Dark Moderno)
- JavaScript ES6+
- POO (Classes, Herança, Polimorfismo, Encapsulamento, Abstração)

## Arquitetura

O sistema segue uma arquitetura MVC simplificada:
- **Models** (models.js): Lógica de negócio e classes
- **Views** (views.js): Interface do usuário
- **Controller** (controller.js): Rotas e controle de fluxo