import { AnalysisResponse } from '@/types/analysis';

export interface PresetItem {
  id: string;
  badge: string;
  title: string;
  url: string;
  niche: string;
  description: string;
  data: AnalysisResponse;
}

export const PRESET_ANALYSES: PresetItem[] = [
  {
    id: 'saas-financeiro',
    badge: 'B2B FINTECH',
    title: 'FinFlow — Conciliação e Fluxo de Caixa Preditivo',
    url: 'https://finflow.io/enterprise-cashflow',
    niche: 'SaaS B2B / Fintech',
    description: 'Landing page para diretores financeiros e controllers de médias empresas.',
    data: {
      report: {
        url: 'https://finflow.io/enterprise-cashflow',
        niche: 'SaaS B2B / Fintech',
        overallScore: 68,
        radarMetrics: {
          clarityScore: 78,
          urgencyScore: 54,
          socialProofScore: 72,
          objectionHandlingScore: 60,
          ctaSimplicityScore: 76,
        },
        criticalBottleneck:
          'A precificação exige preenchimento de formulário longo de 9 campos com agendamento forçado de demo, repelindo CFOs e controllers que buscam autoatendimento inicial.',
        executiveSummary:
          'A landing page da FinFlow possui autoridade visual e logos de clientes confiáveis. No entanto, a omissão de detalhes sobre compatibilidade bancária nacional (Open Finance) e a obrigatoriedade de falar com SDR criam uma barreira de saída de quase 45% dos visitantes qualificados.',
        copyOptimizations: [
          {
            element: 'Headline Principal',
            originalText: 'A plataforma inteligente de gestão e inteligência financeira',
            suggestedText: 'Feche seu fluxo de caixa em 12 minutos diários com conciliação bancária 100% automatizada',
            rationale: 'Substitui um slogan abstrato ("plataforma inteligente") por um ganho de tempo mensurável e específico.',
          },
          {
            element: 'Subheadline',
            originalText: 'Transforme a tomada de decisão da sua empresa com relatórios preditivos avançados.',
            suggestedText: 'Conecte mais de 25 bancos e ERPs via Open Finance em 3 cliques. Sem necessidade de desenvolvedor.',
            rationale: 'Quebra na hora a objeção de integração e esforço de TI que paralisa a decisão do CFO e do Tech Lead.',
          },
          {
            element: 'Botão CTA',
            originalText: 'Agende uma Demonstração com Especialista',
            suggestedText: 'Ver Demonstração Interativa de 3 Minutos →',
            rationale: 'Reduz o compromisso social de falar com um vendedor insistente antes de ver o software funcionando.',
          },
        ],
        personas: [
          {
            personaId: 'cfo-skeptic',
            code: 'CFO-01',
            initials: 'CM',
            personaName: 'Carlos Mendes',
            role: 'Chief Financial Officer',
            conversionScore: 58,
            emotionalState: 'Cético',
            firstImpression: 'A página é corporativa e séria, mas esconde completamente os planos de preço.',
            frictionPoints: [
              'Obrigatoriedade de agendar demo sem nem saber a faixa de investimento inicial.',
              'Não fica claro se há cobrança por volume de notas fiscais ou transações processadas.',
              'Falta uma calculadora de ROI interativa para justificar a contratação.',
            ],
            unansweredQuestions: [
              'Qual é o custo mínimo de implantação para uma empresa com 50 funcionários?',
              'O contrato tem fidelidade anual ou posso cancelar a qualquer mês?',
            ],
            verdictQuote: 'Não vou colocar meu e-mail e telefone para um vendedor me ligar se nem sei se cabe no meu budget.',
          },
          {
            personaId: 'dev-senior',
            code: 'DEV-02',
            initials: 'HV',
            personaName: 'Henrique Vaz',
            role: 'Principal Staff Engineer',
            conversionScore: 72,
            emotionalState: 'Curioso',
            firstImpression: 'O design é polido, mas faltam detalhes sobre a API e latência da sincronização.',
            frictionPoints: [
              'Não há link para a documentação técnica no menu.',
              'Não menciona compatibilidade com webhooks ou formatos de exportação (JSON/CSV).',
            ],
            unansweredQuestions: [
              'A sincronização com os bancos é em tempo real ou roda apenas em lote noturno?',
              'Os dados sensíveis passam por criptografia ponta a ponta?',
            ],
            verdictQuote: 'Se o time de produto liberar acesso a um sandbox de API aberto, eu aprovo o teste.',
          },
          {
            personaId: 'busy-smb',
            code: 'SMB-03',
            initials: 'PR',
            personaName: 'Patrícia Rocha',
            role: 'Founder & Operações',
            conversionScore: 74,
            emotionalState: 'Pronto para Comprar',
            firstImpression: 'Os gráficos do dashboard parecem limpos e resolveriam meu caos com planilhas.',
            frictionPoints: [
              'Receio de que a configuração inicial seja muito complexa para mim.',
              'O formulário pede muitas informações antes de me deixar ver a tela.',
            ],
            unansweredQuestions: [
              'Tenho suporte humanizado por WhatsApp ou só tickets por e-mail?',
            ],
            verdictQuote: 'Se eu pudesse criar uma conta de teste agora em 1 minuto sem falar com ninguém, já estaria usando.',
          },
        ],
      },
      telemetry: {
        scrapeTimeMs: 420,
        parallelPersonasTimeMs: 1840,
        consolidationTimeMs: 910,
        totalExecutionTimeMs: 3170,
        rawCharCount: 8450,
        estimatedTokensUsed: 2110,
        modelUsed: 'gemini-2.0-flash (Google AI SDK)',
        scrapedMarkdownPreview: '# FinFlow Enterprise - Gestão Financeira Preditiva\n\n## A plataforma inteligente de gestão e inteligência financeira para empresas que crescem rápido.\n\n### CTAs detectados:\n- "Agende uma Demonstração com Especialista"\n- "Fale com o time de vendas"\n\n### Provas sociais:\n- "Mais de 1.200 empresas confiam na FinFlow"\n- Logos: Totvs, Omie, ContaAzul, Nubank PJ, Itaú Empresas...',
      },
    },
  },
  {
    id: 'curso-tech',
    badge: 'DEV EDUCATION',
    title: 'Full-Stack AI Architect Masterclass',
    url: 'https://architect-ai.academy/masterclass',
    niche: 'Educação / Tecnologia',
    description: 'Formação em agentes autônomos e arquiteturas de LLM para desenvolvedores experientes.',
    data: {
      report: {
        url: 'https://architect-ai.academy/masterclass',
        niche: 'Educação / Tecnologia',
        overallScore: 81,
        radarMetrics: {
          clarityScore: 88,
          urgencyScore: 79,
          socialProofScore: 84,
          objectionHandlingScore: 72,
          ctaSimplicityScore: 82,
        },
        criticalBottleneck:
          'A página usa gatilhos de escassez agressivos ("Restam apenas 4 vagas com bônus"), despertando o ceticismo de engenheiros sêniores acostumados a repudiar marketing infoproduto.',
        executiveSummary:
          'Especificação da grade curricular é impecável. A autoridade de ex-alunos trabalhando em Big Techs passa solidez. O maior ganho de conversão consiste em suavizar clichês de marketing e demonstrar repositórios reais com testes e benchmarks.',
        copyOptimizations: [
          {
            element: 'Headline Principal',
            originalText: 'Torne-se um Engenheiro de IA de Elite e multiplique seu salário em 6 meses',
            suggestedText: 'Domine Arquitetura de Agentes Autônomos, MCPs e RAG de Baixa Latência em Produção',
            rationale: 'Engenheiros sêniores ignoram promessas salariais vazias; compram profundidade técnica de ponta.',
          },
          {
            element: 'Subheadline',
            originalText: 'Aprenda os segredos que as grandes empresas de tecnologia não querem que você saiba.',
            suggestedText: 'Construa 4 sistemas autônomos prontos para produção com Next.js, Vercel AI SDK e LangGraph. Código aberto para o seu portfólio.',
            rationale: 'Declara a stack exata e entrega valor tangível (código para portfólio e projetos completos).',
          },
        ],
        personas: [
          {
            personaId: 'dev-senior',
            code: 'DEV-02',
            initials: 'HV',
            personaName: 'Henrique Vaz',
            role: 'Principal Staff Engineer',
            conversionScore: 84,
            emotionalState: 'Pronto para Comprar',
            firstImpression: 'A ementa técnica é muito sólida. Trata de MCP servers, tool-use e structured outputs.',
            frictionPoints: [
              'Algumas chamadas parecem promessas de cursinho barato de marketing digital.',
              'Gostaria de ver o repositório de um dos projetos de exemplo antes de pagar.',
            ],
            unansweredQuestions: [
              'O acesso à comunidade técnica e às atualizações arquiteturais é contínuo?',
            ],
            verdictQuote: 'Se o autor realmente for quem implementou a arquitetura mostrada, o conteúdo se paga.',
          },
          {
            personaId: 'bargain-hunter',
            code: 'RSK-04',
            initials: 'RL',
            personaName: 'Rodrigo Lima',
            role: 'Comprador Analítico',
            conversionScore: 78,
            emotionalState: 'Curioso',
            firstImpression: 'Garantia de 7 dias é o mínimo legal; um programa desse nível deveria ter 15 dias.',
            frictionPoints: [
              'Preço parcelado tem juros de operadora que deveriam estar transparentes desde o início.',
            ],
            unansweredQuestions: [
              'Se o conteúdo não for adequado ao meu nível, a devolução é automática em 1 clique?',
            ],
            verdictQuote: 'Vou pagar no cartão corporativo porque a garantia protege, mas quero ver o primeiro módulo hoje.',
          },
        ],
      },
      telemetry: {
        scrapeTimeMs: 380,
        parallelPersonasTimeMs: 1620,
        consolidationTimeMs: 810,
        totalExecutionTimeMs: 2810,
        rawCharCount: 11200,
        estimatedTokensUsed: 2800,
        modelUsed: 'gemini-2.0-flash (Google AI SDK)',
        scrapedMarkdownPreview: '# Full-Stack AI Architect Masterclass\n\n## Domine o desenvolvimento de agentes com MCP e LLMs de alta velocidade.\n\n### Módulos:\n1. Fundamentos de Arquiteturas Reativas com Zod\n2. Tool Calling e MCP Integration\n3. RAG Vetorial Avançado...',
      },
    },
  },
  {
    id: 'app-delivery',
    badge: 'LOGÍSTICA & E-COM',
    title: 'FlashDrop — Entregas Rápidas no Mesmo Dia',
    url: 'https://flashdrop.delivery/merchants',
    niche: 'Logística / E-commerce',
    description: 'Serviço de entregas same-day para pequenos e médios varejistas locais.',
    data: {
      report: {
        url: 'https://flashdrop.delivery/merchants',
        niche: 'Logística / E-commerce',
        overallScore: 61,
        radarMetrics: {
          clarityScore: 72,
          urgencyScore: 68,
          socialProofScore: 50,
          objectionHandlingScore: 48,
          ctaSimplicityScore: 70,
        },
        criticalBottleneck:
          'Não há verificador de cobertura por CEP na primeira dobra. O lojista não sabe se a sua região é atendida antes de se cadastrar.',
        executiveSummary:
          'A promessa de entrega em 2 horas é atrativa, mas o receio de extravio de mercadorias e a falta de clareza sobre raio de atendimento e apólice de seguro criam atrito paralisante.',
        copyOptimizations: [
          {
            element: 'Headline Principal',
            originalText: 'A revolução da entrega rápida para a sua loja',
            suggestedText: 'Ofereça entrega em até 2 horas na sua cidade e aumente em 35% suas vendas locais',
            rationale: 'Foca no crescimento de faturamento do lojista em vez de um slogan de marketing genérico.',
          },
          {
            element: 'Garantia / Risco',
            originalText: 'Garantimos segurança em todas as rotas.',
            suggestedText: 'Seguro integral de 100% da carga contra avarias e extravios, com ressarcimento em até 48 horas.',
            rationale: 'Remove o medo de prejuízo do lojista ao confiar mercadorias a terceiros.',
          },
        ],
        personas: [
          {
            personaId: 'busy-smb',
            code: 'SMB-03',
            initials: 'PR',
            personaName: 'Patrícia Rocha',
            role: 'Founder & Operações',
            conversionScore: 64,
            emotionalState: 'Confuso',
            firstImpression: 'Quero oferecer entrega no mesmo dia, mas não encontrei onde checar meu bairro.',
            frictionPoints: [
              'Tive que rolar a página inteira e não encontrei um verificador rápido de CEP.',
              'Não explica a logística de coleta no meu endereço.',
            ],
            unansweredQuestions: [
              'Existe mensalidade fixa ou pago apenas sob demanda por entrega realizada?',
            ],
            verdictQuote: 'Não vou iniciar um cadastro para só depois descobrir que meu polo não é atendido.',
          },
          {
            personaId: 'bargain-hunter',
            code: 'RSK-04',
            initials: 'RL',
            personaName: 'Rodrigo Lima',
            role: 'Comprador Analítico',
            conversionScore: 58,
            emotionalState: 'Frustrado',
            firstImpression: 'Se uma encomenda frágil quebrar na moto, quem assume o custo?',
            frictionPoints: [
              'Falta menção explícita à seguradora parceira ou política formal de indenização.',
            ],
            unansweredQuestions: [
              'Qual o procedimento caso o destinatário não esteja no local da entrega?',
            ],
            verdictQuote: 'Sem seguro explícito em contrato, não arrisco enviar produtos de alto ticket.',
          },
        ],
      },
      telemetry: {
        scrapeTimeMs: 310,
        parallelPersonasTimeMs: 1450,
        consolidationTimeMs: 760,
        totalExecutionTimeMs: 2520,
        rawCharCount: 6200,
        estimatedTokensUsed: 1550,
        modelUsed: 'gemini-2.0-flash (Google AI SDK)',
        scrapedMarkdownPreview: '# FlashDrop Logística Expressa\n\n## Conecte sua loja a centenas de entregadores e entregue no mesmo dia.\n\n### Planos e Tarifas por corrida...',
      },
    },
  },
];
