
import { Category } from './types';

export const MAF_CATEGORIES: Category[] = [
  {
    id: 'maf-1',
    title: 'Categoria 1: Alinhamento Setorial e NDC',
    weight: 0.10,
    questions: [
      { id: 'm1q1', text: 'Em que medida o projeto está implementado em um dos seguintes setores: energia, transporte ou indústria?' },
      { id: 'm1q2', text: 'Qual o grau de alinhamento explícito com as prioridades climáticas nacionais da Contribuição Nacionalmente Determinada (NDC)?' },
      { id: 'm1q3', text: 'Em que medida o projeto se apoia em planos existentes do NDC Partnership?' }
    ]
  },
  {
    id: 'maf-2',
    title: 'Categoria 2: Descarbonização',
    weight: 0.15,
    questions: [
      { id: 'm2q1', text: 'Qual o grau de robustez do perfil de redução de emissões do projeto?' },
      { id: 'm2q2', text: 'Qual a redução anual estimada de Gases de Efeito Estufa (GEE) em tCO₂e/ano?' },
      { id: 'm2q3', text: 'Em que medida a redução de emissões é mensurável e verificável?' },
      { id: 'm2q4', text: 'Qual o grau de contribuição do projeto para trajetórias de desenvolvimento carbono-neutro?' }
    ]
  },
  {
    id: 'maf-3',
    title: 'Categoria 3: Country-Driven',
    weight: 0.10,
    questions: [
      { id: 'm3q1', text: 'Em que medida o projeto está incorporado em estratégias e planos nacionais de desenvolvimento?' },
      { id: 'm3q2', text: 'Qual o grau de apoio institucional governamental ao projeto?' }
    ]
  },
  {
    id: 'maf-4',
    title: 'Categoria 4: Cooperação Financeira',
    weight: 0.10,
    questions: [
      { id: 'm4q1', text: 'Em que medida o projeto combina reformas políticas/regulatórias com mecanismos financeiros?' },
      { id: 'm4q2', text: 'Em que medida há alavancagem de capital público e/ou privado?' }
    ]
  },
  {
    id: 'maf-5',
    title: 'Categoria 5: Alavancagem Financeira',
    weight: 0.10,
    questions: [
      { id: 'm5q1', text: 'Qual o grau de clareza e consistência da estratégia de phase-out (saída gradual) do apoio MAF?' },
      { id: 'm5q2', text: 'Em que medida há previsão de financiamento nacional para garantir a sustentabilidade de longo prazo do projeto?' },
      { id: 'm5q3', text: 'Qual o grau em que o projeto atrai investimento privado adicional além do apoio MAF?' }
    ]
  },
  {
    id: 'maf-6',
    title: 'Categoria 6: Desenvolvimento Sustentável',
    weight: 0.05,
    questions: [
      { id: 'm6q1', text: 'Em que medida o projeto promove desenvolvimento sustentável no país de implementação?' },
      { id: 'm6q2', text: 'Qual o grau de evidência de impactos sociais e ambientais positivos significativos?' }
    ]
  },
  {
    id: 'maf-7',
    title: 'Categoria 7: Prontidão',
    weight: 0.10,
    questions: [
      { id: 'm7q1', text: 'Qual o grau de prontidão do projeto para ser implementado após uma fase curta de preparação?' },
      { id: 'm7q2', text: 'Qual o grau de viabilidade prática do escopo e da escala planejados?' }
    ]
  },
  {
    id: 'maf-8',
    title: 'Categoria 8: Igualdade de Gênero e Inclusão Social',
    weight: 0.05,
    questions: [
      { id: 'm8q1', text: 'Qual o grau de presença de medidas concretas para superar desigualdades de gênero e sociais?' },
      { id: 'm8q2', text: 'Em que medida a abordagem é gender-responsive e inclusiva?' }
    ]
  },
  {
    id: 'maf-9',
    title: 'Categoria 9: Ambição',
    weight: 0.15,
    questions: [
      { id: 'm9q1', text: 'Em que medida o projeto tem potencial para criar efeito de demonstração e induzir mudança sistêmica?' },
      { id: 'm9q2', text: 'Qual o grau de plausibilidade e fundamentação das premissas e cálculos sobre o potencial de mitigação de GEE?' }
    ]
  },
  {
    id: 'maf-10',
    title: 'Categoria 10: Viabilidade',
    weight: 0.10,
    questions: [
      { id: 'm10q1', text: 'Em que medida os parceiros do projeto têm capacidade técnica e legitimidade para liderar a implementação?' },
      { id: 'm10q2', text: 'Qual o grau de robustez da análise de riscos, incluindo impactos ambientais, sociais, direitos humanos e igualdade de gênero/inclusão social (GESI)?' }
    ]
  }
];

export const IKI_CATEGORIES: Category[] = [
  {
    id: 'iki-1',
    title: 'Categoria 1: Alinhamento Temático',
    weight: 0.10,
    questions: [
      { id: 'i1q1', text: 'Qual o grau de alinhamento explícito com alguma das prioridades temáticas do IKI?' },
      { id: 'i1q2', text: 'Em que medida o projeto é tecnicamente adequado para atingir os objetivos da prioridade temática?' }
    ]
  },
  {
    id: 'iki-2',
    title: 'Categoria 2: Alinhamento Político',
    weight: 0.15,
    questions: [
      { id: 'i2q1', text: 'Em que medida o projeto contribui para a implementação das NDCs, dos NAPs e das NBSAPs do país de implementação?' },
      { id: 'i2q2', text: 'Qual o grau de alinhamento com prioridades políticas do país de implementação?' },
      { id: 'i2q3', text: 'Em que medida há indicação clara de apoio institucional do governo do país de implementação?' }
    ]
  },
  {
    id: 'iki-3',
    title: 'Categoria 3: Alinhamento com ODSs',
    weight: 0.10,
    questions: [
      { id: 'i3q1', text: 'Em que medida o projeto segue uma abordagem integrada da Agenda 2030?' },
      { id: 'i3q2', text: 'Em que medida os Objetivos de Desenvolvimento Sustentável (ODS) aplicáveis são considerados e integrados no desenho e nos resultados do projeto?' }
    ]
  },
  {
    id: 'iki-4',
    title: 'Categoria 4: Ambição e Mensurabilidade',
    weight: 0.10,
    questions: [
      { id: 'i4q1', text: 'Em que medida as metas do projeto são ambiciosas e proporcionais ao contexto e potencial de impacto?' },
      { id: 'i4q2', text: 'Qual o grau de clareza e robustez do desenho para garantir resultados mensuráveis e verificáveis?' }
    ]
  },
  {
    id: 'iki-5',
    title: 'Categoria 5: Transformação',
    weight: 0.10,
    questions: [
      { id: 'i5q1', text: 'Em que medida o projeto visa e viabiliza mudanças sistêmicas?' },
      { id: 'i5q2', text: 'Qual o grau de inovação da solução proposta para a região específica?' }
    ]
  },
  {
    id: 'iki-6',
    title: 'Categoria 6: Riscos e Salvaguardas',
    weight: 0.05,
    questions: [
      { id: 'i6q1', text: 'Em que medida os riscos ambientais e sociais são apresentados de forma compreensível e completa?' },
      { id: 'i6q2', text: 'Qual o grau de adequação e suficiência das medidas de salvaguarda propostas?' }
    ]
  },
  {
    id: 'iki-7',
    title: 'Categoria 7: Promoção de Justiça de Gênero',
    weight: 0.10,
    questions: [
      { id: 'i7q1', text: 'Em que medida o projeto apresenta ações específicas para enfrentar papéis, relações e normas desiguais de gênero?' },
      { id: 'i7q2', text: 'Qual o grau de plausibilidade e integração de uma abordagem gender-responsive no projeto?' }
    ]
  },
  {
    id: 'iki-8',
    title: 'Categoria 8: Participação',
    weight: 0.05,
    questions: [
      { id: 'i8q1', text: 'Em que medida os grupos-alvo são incluídos no design do projeto?' },
      { id: 'i8q2', text: 'Qual o grau de efetividade da transferência de conhecimento aos grupos-alvo para apoiar sua participação e resultados?' }
    ]
  },
  {
    id: 'iki-9',
    title: 'Categoria 9: Estratégia de Saída',
    weight: 0.05,
    questions: [
      { id: 'i9q1', text: 'Em que medida o projeto apresenta um plano consistente para continuidade das atividades após o término do financiamento IKI?' },
      { id: 'i9q2', text: 'Qual o grau de plausibilidade e robustez da estratégia de sustentabilidade, incluindo mecanismos institucionais e financeiros?' }
    ]
  },
  {
    id: 'iki-10',
    title: 'Categoria 10: Replicabilidade',
    weight: 0.10,
    questions: [
      { id: 'i10q1', text: 'Em que medida o projeto pode ser replicado em outros países/regiões?' },
      { id: 'i10q2', text: 'Qual o grau de replicabilidade em outros setores?' }
    ]
  }
];

export const SCORING_LABELS = [
  { value: 0, label: 'N/A' },
  { value: 1, label: 'M. Baixo' },
  { value: 2, label: 'Baixo' },
  { value: 3, label: 'Médio' },
  { value: 4, label: 'Alto' },
  { value: 5, label: 'M. Alto' }
];

export const PERFORMANCE_CONFIG = [
  { min: 80, label: 'Forte' as const, color: 'text-performance-green', bg: 'bg-performance-green' },
  { min: 60, label: 'Viável' as const, color: 'text-performance-yellow', bg: 'bg-performance-yellow' },
  { min: 40, label: 'Fraco' as const, color: 'text-performance-orange', bg: 'bg-performance-orange' },
  { min: 0, label: 'Inadequado' as const, color: 'text-performance-red', bg: 'bg-performance-red' },
];

export const LOGO_URL = "https://c5gwmsmjx1.execute-api.us-east-1.amazonaws.com/prod/dados_processo_seletivo/logo_empresa/143675/LOGO_POSITIVO_HORIZONTAL_REDUZIDO.png";
