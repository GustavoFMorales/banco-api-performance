# 🏦 Banco API Performance Tests

![K6](https://img.shields.io/badge/K6-Load%20Testing-7D64FF?style=for-the-badge&logo=k6&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Performance](https://img.shields.io/badge/Performance-Testing-green?style=for-the-badge)

Projeto de testes de performance para APIs bancárias usando K6, focado na validação de carga e stress de endpoints críticos como login e transferências.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como Executar](#como-executar)
- [Configurações de Teste](#configurações-de-teste)
- [Cenários de Teste](#cenários-de-teste)
- [Relatórios](#relatórios)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Contribuição](#contribuição)

## 🎯 Sobre o Projeto

Este projeto foi desenvolvido para realizar testes de performance e carga em APIs bancárias, garantindo que os sistemas suportem o volume esperado de transações e operações críticas. 

### Funcionalidades Testadas:
- 🔐 **Login de usuários**
- 💸 **Transferências bancárias**
- 📊 **Monitoramento de performance em tempo real**

## 🚀 Tecnologias

- **[K6](https://k6.io/)** - Framework de testes de performance
- **JavaScript (ES6+)** - Linguagem de programação
- **JSON** - Formato de dados para fixtures
- **Git** - Controle de versão

## 📁 Estrutura do Projeto

```
banco-api-performance/
├── config/
│   └── config.local.json          # Configurações locais
├── fixtures/
│   ├── postLogin.json             # Dados para teste de login
│   └── postTransferencia.json     # Dados para teste de transferência
├── helpers/
│   └── autenticacao.js            # Funções de autenticação
├── tests/
│   ├── login.test.js              # Testes de login
│   └── transferencias.test.js     # Testes de transferências
├── utils/
│   └── variaveis.js               # Utilitários e variáveis globais
├── .gitignore
└── README.md
```

## ⚡ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [K6](https://k6.io/docs/get-started/installation/) (versão mais recente)
- [Git](https://git-scm.com/)
- API bancária rodando localmente (padrão: `http://localhost:3000`)

## 🔧 Instalação

1. **Clone o repositório**
   ```bash
   git clone git@github.com:GustavoFMorales/banco-api-performance.git
   cd banco-api-performance
   ```

2. **Configure a API base**
   - Certifique-se de que sua API esteja rodando
   - Ajuste as configurações em `config/config.local.json` se necessário

## 🏃‍♂️ Como Executar

### Testes Básicos

```bash
# Teste de Login
k6 run tests/login.test.js

# Teste de Transferências
k6 run tests/transferencias.test.js

# Teste com URL customizada
k6 run tests/login.test.js -e BASE_URL="http://localhost:3000"
```

### Testes com Dashboard Web

```bash
# Executar com dashboard interativo
k6 run --web-dashboard tests/login.test.js

# Exportar relatório HTML
K6_WEB_DASHBOARD_EXPORT=relatorio.html k6 run --web-dashboard tests/login.test.js
```

### Testes Avançados

```bash
# Teste com múltiplos usuários virtuais
k6 run tests/login.test.js --vus 10 --duration 30s

# Teste com stages personalizados
k6 run tests/transferencias.test.js --stage 5s:5,10s:10,5s:0
```

## ⚙️ Configurações de Teste

### Tipos de Configuração Disponíveis

#### 1. **Testes por Iteração**
```javascript
export const options = {
    iterations: 20,
    thresholds: {
        http_req_duration: ['p(90)<100', 'max<=10'],
        http_req_failed: ['rate<0.01'],
    }
};
```

#### 2. **Testes por Usuários Virtuais**
```javascript
export const options = {
    vus: 10,
    duration: '30s',
    thresholds: {
        http_req_duration: ['p(90)<300', 'max<=200'],
        http_req_failed: ['rate<0.01'],
    }
};
```

#### 3. **Testes com Stages (Rampa de Carga)**
```javascript
export const options = {
    stages: [
        { duration: '30s', target: 20 },
        { duration: '1m30s', target: 10 },
        { duration: '20s', target: 0 }
    ]
};
```

## 📊 Cenários de Teste

### Login Test (`login.test.js`)
- **Objetivo**: Validar autenticação de usuários
- **Validações**:
  - Status HTTP 200
  - Token JWT válido retornado
  - Tempo de resposta < 300ms

### Transferências Test (`transferencias.test.js`)
- **Objetivo**: Testar operações de transferência
- **Validações**:
  - Status HTTP 201
  - Autenticação via Bearer token
  - Validação de payload

## 📈 Relatórios

### Dashboard Web em Tempo Real
- Acesse: `http://127.0.0.1:5665` durante a execução
- Visualização de métricas em tempo real
- Gráficos interativos de performance

### Métricas Principais Monitoradas
- **http_req_duration**: Tempo de resposta das requisições
- **http_req_failed**: Taxa de falhas
- **iterations**: Número de iterações executadas
- **vus**: Usuários virtuais ativos

## 🌍 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|---------|
| `BASE_URL` | URL base da API | `http://localhost:3000` |
| `K6_WEB_DASHBOARD` | Habilita dashboard web | `false` |
| `K6_WEB_DASHBOARD_EXPORT` | Arquivo para exportar relatório | - |

### Exemplos de Uso:
```bash
# Configurar URL diferente
k6 run tests/login.test.js -e BASE_URL="https://api.exemplo.com"

# Habilitar dashboard e exportar relatório
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=resultado.html k6 run tests/login.test.js
```

## 🎯 Thresholds (Limites de Performance)

Os testes incluem thresholds para garantir qualidade:

- **p(90) < 300ms**: 90% das requisições em menos de 300ms
- **max <= 200ms**: Tempo máximo de resposta de 200ms
- **rate < 0.01**: Taxa de falhas menor que 1%

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📋 Roadmap

- [ ] Adicionar testes de saque
- [ ] Implementar testes de extrato
- [ ] Configurar CI/CD
- [ ] Adicionar testes de stress
- [ ] Integração com Grafana

## 👨‍💻 Autor

**Gustavo F. Morales**
- GitHub: [@GustavoFMorales](https://github.com/GustavoFMorales)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

⭐ **Se este projeto te ajudou, não esqueça de dar uma estrela!**