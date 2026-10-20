# Design System: Gestão Inteligente de Treinamentos Internos de RH

Este documento define os padrões visuais, tokens de estilo e convenções de interface utilizados na plataforma de Frontend com React e Ant Design (antd).

---

## 1. Princípios de Design
- **Clareza e Densidade Corporativa:** Telas limpas, com foco em legibilidade de dados, tabelas escaneáveis e cartões de métricas bem espaçados.
- **Consistência Ant Design:** Uso padronizado dos componentes fundamentais do Ant Design via `ConfigProvider` para manter coerência visual em todos os módulos.
- **Feedback Imediato:** Toda ação do usuário deve conter estados claros de carregamento (`Spin`, `Skeleton`), sucesso (`message`, `Alert`), erro e estado vazio (`Empty`).
- **Acessibilidade e Contraste:** Relação de contraste adequada para leitura prolongada em ambientes corporativos.

---

## 2. Paleta de Cores e Tokens

### Cores Principais
| Token | Cor Hex | Uso |
| :--- | :--- | :--- |
| `colorPrimary` | `#1E40AF` / `#2563EB` | Ações primárias, links ativos, botões de destaque e navegação |
| `colorSuccess` | `#10B981` / `#52C41A` | Presenças confirmadas, treinamentos concluídos e certificados válidos |
| `colorWarning` | `#F59E0B` / `#FAAD14` | Vagas limitadas, treinamentos pendentes de confirmação ou alertas |
| `colorError` | `#EF4444` / `#FF4D4F` | Faltas, certificados inválidos e erros de validação |
| `colorInfo` | `#0284C7` / `#1677FF` | Avisos informativos e comunicados do RH |

### Superfícies e Neutros
- **Fundo da Aplicação (`colorBgLayout`):** `#F8FAFC` (Slate 50)
- **Fundo de Cards e Contêineres (`colorBgContainer`):** `#FFFFFF`
- **Bordas sutis (`colorBorderSecondary`):** `#E2E8F0`
- **Texto Principal (`colorText`):** `#0F172A` (Slate 900)
- **Texto Secundário (`colorTextSecondary`):** `#64748B` (Slate 500)

---

## 3. Tipografia
- **Família Tipográfica:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
- **Escala de Tamanhos:**
  - `Display / Títulos Maiores (H1)`: 28px - 32px (Semi-bold / Bold)
  - `Subtítulos e Seções (H2, H3)`: 20px - 24px (Semi-bold)
  - `Títulos de Cards e Modais (H4)`: 16px - 18px (Medium / Semi-bold)
  - `Corpo de Texto (Body)`: 14px (Regular)
  - `Legendas e Metadados (Caption)`: 12px (Regular)

---

## 4. Estrutura de Layout e Componentes Padrão

### Shell da Aplicação
- **Header Superior:** Identidade visual da plataforma, seletor de perfil/visão ativa e ações rápidas.
- **Sider Navegação Lateral:** Menus colapsáveis com ícones semânticos `@ant-design/icons` para cada um dos 5 módulos.
- **Área de Conteúdo (`Content`):** Padding padrão de `24px`, com `Card` estruturados e cantos arredondados (`borderRadius: 8px`).

### Componentes Chave por Módulo
1. **Cards de KPI:** `Statistic` do antd estilizados com prefixos/sufixos de ícones e percentuais de variação.
2. **Listagens:** `Table` responsiva com paginação, filtros e tags coloridas (`Tag`) para os status dos treinamentos.
3. **Formulários:** `Form` com validação de campos obrigatórios, labels claros e seletores dinâmicos.
4. **Chamada e Câmera:** Contêiner com moldura de câmera (visual viewport) com overlay de enquadramento facial simulado e botões de ação rápida (Confirmar / Pular).
5. **Certificados Digitais:** Moldura vetorial com layout formal, selo visual e dados de autenticação em destaque.

---

## 5. Estados e Tratamento de Exceções
- **Carregamento:** Indicadores `Skeleton` para tabelas e cards; spinners para ações pontuais.
- **Ausência de Dados:** Componente `Empty` customizado com orientações para o usuário criar ou filtrar registros.
- **Mensagens Rápidas:** Feedback via `message.success()` ou `message.error()` para operações de salvar/reservar.
