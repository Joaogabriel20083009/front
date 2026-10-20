# Contexto do Projeto: Gestão Inteligente de Treinamentos Internos de RH

## 1. Visão Geral do Produto
A plataforma **Gestão Inteligente de Treinamentos Internos de RH** é uma solução corporativa desenvolvida no contexto de um hackathon de 24 horas. O objetivo principal é centralizar, modernizar e agilizar o ciclo de vida dos programas de capacitação e desenvolvimento das organizações, desde o planejamento pelo RH até a validação pública de certificados digitais.

A plataforma substitui controles manuais e planilhas descentralizadas por um ecossistema integrado que conecta RH, líderes operacionais, instrutores internos e colaboradores.

---

## 2. Perfis de Usuários (Personas)

| Perfil | Responsabilidades Principais |
| :--- | :--- |
| **Gestor / Analista de RH** | Criação e gestão de programas de treinamento, monitoramento de KPIs e engajamento, alocação de turmas e emissão de certificados. |
| **Líder de Equipe / Gestor Direto** | Consulta ao catálogo de capacitações abertas, indicação/inscrição de colaboradores do seu time e gestão das vagas alocadas. |
| **Instrutor / Facilitador** | Acompanhamento da lista de presença/convocados e realização da chamada em tempo real (com suporte a captura facial client-side para auxílio visual). |
| **Colaborador / Aluno** | Visualização de seus treinamentos, presença e download de certificados de conclusão. |
| **Público Geral / Auditoria** | Consulta e verificação da autenticidade de certificados emitidos através de código validador ou QR Code. |

---

## 3. Escopo Funcional do Frontend

A aplicação frontend é organizada em torno de cinco módulos centrais:

1. **Dashboard do RH**
   - Indicadores estratégicos (KPIs): Total de treinamentos ativos, colaboradores capacitados, taxa média de presença e horas totais de treinamento.
   - Listagem gerencial de treinamentos (status: Em Aberto, Em Andamento, Concluído, Cancelado).
   - Formulário de criação/edição de treinamentos (título, ementa, carga horária, instrutor, capacidade e datas).

2. **Portal do Líder**
   - Catálogo de treinamentos disponíveis para inscrição.
   - Filtros por competência, área e datas.
   - Seleção de colaboradores liderados e reserva de vagas.

3. **Painel do Instrutor**
   - Visão da turma e lista de convocados.
   - Controle de frequência/chamada em tempo real (Presente / Ausente / Justificado).
   - Interface de captura facial com webcam client-side para agilizar a conferência visual de participantes (sem pretensão de biometria pericial ou autenticação bancária).

4. **Certificados**
   - Consulta e visualização gráfica de certificados emitidos.
   - Pré-visualização com dados do curso, carga horária, data de conclusão e código autenticador.
   - Exportação e impressão de certificados.

5. **Validação Pública**
   - Tela pública sem necessidade de login.
   - Busca por código verificador ou leitura de QR Code.
   - Apresentação do status de autenticidade e metadados do certificado.

---

## 4. Limites de Escopo e Diretrizes do Hackathon
- **Frontend Exclusivo:** Todo o desenvolvimento deste repositório restringe-se à camada de apresentação e client-side services.
- **Integração Desacoplada:** A comunicação com o backend (desenvolvido por outros membros da equipe) é feita exclusivamente via contratos HTTP/REST.
- **Mocks Controlados:** Enquanto os endpoints do backend estiverem em desenvolvimento, o frontend utiliza dados simulados estruturados em camadas isoladas (`src/mocks/`), facilitando a substituição transparente pelos serviços reais (`src/services/`).
