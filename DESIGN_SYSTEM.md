# Design System: Lins Agroindustrial — Gestão de Treinamentos RH

Este documento define os padrões visuais, tokens e convenções de interface baseados na identidade corporativa clean da **Lins Agroindustrial** ([linsagro.com.br](https://linsagro.com.br/)).

---

## 1. Princípios de Design
- **Clean e Espaçoso:** Layout arejado com fundo neutro suave (`#F8FBFD`), cartões brancos com sombras sutis e alta legibilidade.
- **Identidade da Agroindústria Moderna:** O azul nobre institucional (`#0032A0`) reflete solidez corporativa, complementado pelos tons de ciano/teal (`#00B5AD` e `#0D9690`) associados à sustentabilidade, bioenergia e etanol.
- **Tipografia Noto Sans:** Tipografia geométrica, moderna e altamente legível para dados corporativos, tabelas e diplomas técnicos.
- **Consistência Ant Design:** Uso customizado de Design Tokens do Ant Design via `ConfigProvider` para manter coerência visual em todos os módulos.

---

## 2. Paleta de Cores e Tokens Oficiais

### Cores Principais da Marca
| Token | Cor Hex | Significado / Aplicação |
| :--- | :--- | :--- |
| `colorPrimary` | `#0032A0` | Azul Real Lins Agroindustrial (Ações primárias, títulos, cabeçalho) |
| `colorAccent` | `#00B5AD` | Ciano Sustentabilidade & Bioenergia (Badges de destaque, selos de aprovação) |
| `colorSuccess` | `#0D9690` | Verde-água profundo (Presenças confirmadas, certificados válidos) |
| `colorWarning` | `#F59E0B` | Âmbar corporativo (Vagas limitadas, justificativas de ausência) |
| `colorError` | `#DC2626` | Vermelho técnico (Faltas e certificados revogados/não encontrados) |
| `colorInfo` | `#3063D6` | Azul suave (Avisos operacionais e NRs) |

### Superfícies e Neutros
- **Fundo da Aplicação (`colorBgLayout`):** `#F8FBFD` (Cinza-azulado ultra suave e arejado)
- **Fundo de Cards e Contêineres:** `#FFFFFF` puro
- **Bordas sutis:** `#E7E7E7` e `#F2F5F7`
- **Texto Principal (`colorText`):** `#3D3D3D` (Cinza carvão para leitura confortável)
- **Texto Secundário (`colorTextSecondary`):** `#54595F`
- **Cabeçalhos de Tabela e Menus:** `#184080` e `#F2F5F7`

---

## 3. Tipografia
- **Família Tipográfica Primária:** `'Noto Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
- **Escala de Tamanhos:**
  - `Títulos de Seção (H2)`: 24px (Bold, cor `#0032A0`)
  - `Subtítulos e Categorias`: 13px - 14px (Medium, cor `#54595F` ou `#00B5AD`)
  - `Texto Principal (Body)`: 14px (Regular, `#3D3D3D`)
  - `Legendas e Metadados`: 12px (Regular)

---

## 4. Componentes e Padrões de Interface

### Shell da Aplicação
- **Header:** Logotipo oficial da Lins Agroindustrial, subtítulo "Universidade Corporativa", badge da Safra 2026/27 e tag da unidade de Lins/SP.
- **Sider:** Barra lateral branca limpa com borda `#E7E7E7`, itens com cantos arredondados (6px) e seleção em azul suave (`#EBF2FF`).
- **Cards:** Bordas limpas (`#E7E7E7`), raio de borda de 8px e elevação suave ao passar o mouse.
- **Certificados:** Moldura formal em azul `#0032A0`, selo de autenticidade `#00B5AD` e logotipo em alta resolução.
