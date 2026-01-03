# banco-api-performance

## 📋 Introdução

Este repositório contém testes de performance e carga para validar o comportamento de APIs bancárias sob diferentes níveis de stress. O projeto utiliza o K6 para simular múltiplos usuários virtuais e medir métricas importantes como tempo de resposta, taxa de sucesso e throughput.

## 🚀 Tecnologias Utilizadas

- **[K6](https://k6.io/)** - Ferramenta de teste de carga e performance
- **JavaScript** - Linguagem de programação para os scripts de teste
- **Node.js** - Runtime JavaScript (para gerenciamento de dependências)
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📁 Estrutura do Repositório

```
banco-api-performance/
│
├── config/                 # Arquivos de configuração
│   └── config.local.json   # Configurações locais do projeto
│
├── fixtures/               # Dados de teste (payloads)
│   ├── postLogin.json      # Payload para testes de login
│   └── postTransferencias.json # Payload para testes de transferências
│
├── helpers/                # Funções auxiliares
│   └── autenticacao.js     # Helper para autenticação
│
├── tests/                  # Scripts de teste
│   ├── login.test.js       # Testes de performance de login
│   ├── meuPrimeiroTeste.test.js # Exemplo de teste básico
│   └── transferencias.test.js   # Testes de performance de transferências
│
├── utils/                  # Utilitários
│   └── variaveis.js        # Gerenciamento de variáveis e configurações
│
├── .gitignore              # Arquivos ignorados pelo Git
├── html-report.html        # Relatório HTML gerado pelos testes
├── package.json            # Dependências e configurações do projeto
└── README.md               # Documentação do projeto
```

## 🎯 Objetivo de Cada Grupo de Arquivos

### **config/**
Armazena arquivos de configuração do projeto, permitindo parametrizar diferentes ambientes (local, homologação, produção) sem alterar o código dos testes.

### **fixtures/**
Contém os dados de teste (payloads) em formato JSON que serão utilizados nas requisições HTTP. Facilita a manutenção e reutilização de dados de teste.

### **helpers/**
Funções auxiliares que podem ser reutilizadas em múltiplos testes, como autenticação, geração de tokens, validações, etc.

### **tests/**
Scripts de teste do K6 que definem os cenários de teste de performance, incluindo configuração de usuários virtuais, duração, thresholds e validações.

### **utils/**
Utilitários gerais do projeto, como funções para manipulação de variáveis de ambiente, formatação de dados, entre outros.

## 📦 Modo de Instalação

### Pré-requisitos

1. **Node.js e npm** instalados
2. **K6** instalado - [Instruções de instalação](https://k6.io/docs/get-started/installation/)

### Instalação do K6 (Windows)

```powershell
# Usando Chocolatey
choco install k6

# Ou usando winget
winget install k6
```

### Instalação das dependências do projeto

```bash
npm install
```

## ▶️ Execução do Projeto

### Configuração da Variável de Ambiente

Antes de executar os testes, é necessário definir a variável de ambiente `BASE_URL` com a URL da API que será testada:

```powershell
$env:BASE_URL = "https://sua-api.com.br"
```

### Execução Simples

Para executar um teste específico:

```powershell
k6 run tests/login.test.js
```

### Execução com Dashboard em Tempo Real e Exportação de Relatório

Para executar os testes com acompanhamento em tempo real através do dashboard web e exportar o relatório em HTML:

```powershell
$env:K6_WEB_DASHBOARD="true"; $env:K6_WEB_DASHBOARD_EXPORT="html-report.html"; k6 run tests/login.test.js
```

**Explicação dos parâmetros:**
- `K6_WEB_DASHBOARD="true"` - Habilita o dashboard web em tempo real
- `K6_WEB_DASHBOARD_EXPORT="html-report.html"` - Define o arquivo de exportação do relatório HTML
- O dashboard estará disponível em `http://localhost:5665` durante a execução

### Executando Todos os Testes

```powershell
# Login
$env:K6_WEB_DASHBOARD="true"; $env:K6_WEB_DASHBOARD_EXPORT="html-report.html"; k6 run tests/login.test.js

# Transferências
$env:K6_WEB_DASHBOARD="true"; $env:K6_WEB_DASHBOARD_EXPORT="html-report.html"; k6 run tests/transferencias.test.js
```

### Configurando Variáveis de Ambiente de Forma Permanente (Opcional)

Para não precisar definir as variáveis a cada execução, você pode configurá-las permanentemente:

```powershell
# Definir variáveis para a sessão atual
$env:BASE_URL = "https://sua-api.com.br"
$env:K6_WEB_DASHBOARD = "true"
$env:K6_WEB_DASHBOARD_EXPORT = "html-report.html"

# Depois executar normalmente
k6 run tests/login.test.js
```

## 📊 Interpretando os Resultados

Após a execução, você poderá visualizar:

- **No terminal**: Métricas resumidas (requisições por segundo, tempo de resposta, etc.)
- **No dashboard (localhost:5665)**: Gráficos e métricas em tempo real
- **No arquivo html-report.html**: Relatório completo e detalhado que pode ser aberto em qualquer navegador

---

**Repositório:** [https://github.com/GustavoFMorales/banco-api-performance](https://github.com/GustavoFMorales/banco-api-performance)
