# Diretrizes para Agentes de IA: Frontend Gestão de Treinamentos RH

Este arquivo contém instruções mandatórias e permanentes para qualquer agente que atue neste repositório.

---

## 1. Escopo Estrito de Atuação (Limite de Responsabilidade)

> **ATENÇÃO ABSOLUTA: NÃO DESENVOLVA O BACKEND.**
> Outros membros da equipe são responsáveis pelo backend. Seu trabalho restringe-se EXCLUSIVAMENTE ao frontend e ao consumo da API client-side.

### O que NUNCA fazer ou criar:
- ❌ NÃO crie servidores Node.js, Express, Fastify, NestJS ou similares.
- ❌ NÃO crie endpoints, controllers, rotas de servidor ou middlewares de backend.
- ❌ NÃO crie tabelas, bancos de dados (SQLite, PostgreSQL, MongoDB, Prisma, TypeORM, migrations).
- ❌ NÃO implemente autenticação ou autorização no servidor (JWT sign, hashing de senhas, sessões de servidor).
- ❌ NÃO invente regras de negócio de backend ou queries em arquivos de frontend.
- ❌ NÃO modifique ou altere pastas/arquivos destinados ao backend.

### O que você DEVE fazer:
- ✅ Desenvolver a interface visual com React + Vite + TypeScript + Ant Design (`antd`).
- ✅ Criar serviços client-side tipados (`src/services/`) para requisições HTTP (ex: `fetch` / client HTTP).
- ✅ Manter dados simulados isolados em `src/mocks/` apenas para permitir o desenvolvimento e testes visuais enquanto a API real não estiver disponível.
- ✅ Respeitar a tipagem estrita com TypeScript em todos os componentes e serviços.

---

## 2. Tecnologias Obrigatórias
- **Framework de Aplicação:** React 19+ com Vite
- **Linguagem:** TypeScript (modo estrito)
- **Biblioteca de Componentes:** Ant Design (`antd`) e `@ant-design/icons`
- **Roteamento:** React Router DOM
- **Estilização:** Ant Design Design Tokens (`ConfigProvider`) + Vanilla CSS para personalizações pontuais. (Não utilize TailwindCSS a menos que explicitamente solicitado).

---

## 3. Diretrizes de UX / UI e Qualidade
1. **Componentes Ant Design:** Sempre utilize componentes oficiais do Ant Design (`Table`, `Card`, `Form`, `Modal`, `Statistic`, `Tag`, `Badge`, `Button`, `Spin`, `Alert`, `Empty`) em vez de recriar elementos HTML brutos.
2. **Estados da Interface:** Toda tela e componente com carregamento de dados deve contemplar obrigatoriamente:
   - Estado de carregamento (`loading` / `Spin` / `Skeleton`)
   - Estado de dados vazios (`Empty`)
   - Estado de erro com feedback amigável
   - Estado de sucesso com feedback (`message`, `notification`)
3. **Captura Facial Client-Side:**
   - A interface com a webcam para chamada é estritamente um auxílio visual para o instrutor.
   - **NÃO apresente nem anuncie reconhecimento facial simulado como biometria real ou pericial.** Deve ser tratado como assistência visual/conferência de presença.
4. **Responsividade:** Garanta que os layouts se adaptem bem a telas desktop (RH, instrutor em sala) e telas menores/tablets.

---

## 4. Integração com a API
- Não invente URLs de produção, portas arbitrárias de banco ou estruturas de resposta complexas sem consultar os contratos do backend.
- Centralize a URL base e configurações de API em variáveis de ambiente (`.env` / `import.meta.env.VITE_API_BASE_URL`).
- Quando a equipe de backend disponibilizar um endpoint, substitua o mock no respectivo arquivo em `src/services/` de forma limpa.

---

## 5. Comandos de Verificação
Antes de concluir qualquer tarefa, certifique-se de executar:
- `npm.cmd run build` (ou `tsc -b && vite build`) para garantir ausência de erros de compilação TypeScript.
- `npm.cmd run lint` para checar conformidade de código.
