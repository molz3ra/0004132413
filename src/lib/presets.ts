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
    badge: 'SaaS B2B',
    title: 'FinFlow — Conciliação e Fluxo de Caixa',
    url: 'https://finflow.io/enterprise-cashflow',
    niche: 'SaaS B2B / Fintech',
    description: 'Landing page voltada para diretores financeiros e controllers de médias empresas.',
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
          'A precificação exige preenchimento de formulário longo de 9 campos com agendamento de demo, o que espanta CFOs e PMEs que buscam autoatendimento inicial.',
        executiveSummary:
          'A landing page da FinFlow possui excelente autoridade visual e logos de clientes confiáveis. No entanto, o atraso em responder sobre compatibilidade bancária nacional (Open Finance) e a obrigatoriedade de agendar reuniões com SDR criam uma barreira de saída de quase 45% dos visitantes qualificados.',
        copyOptimizations: [
          {
            element: 'Headline Principal',
            originalText: 'A plataforma inteligente de gestão e inteligência financeira',
            suggestedText: 'Feche seu fluxo de caixa em 12 minutos diários com conciliação bancária 100% automatizada',
            rationale: 'Foca em um benefício tangível de economia de tempo (12 minutos) em vez de um rótulo abstrato ("plataforma inteligente").',
          },
          {
            element: 'Subheadline',
            originalText: 'Transforme a tomada de decisão da sua empresa com relatórios preditivos avançados.',
            suggestedText: 'Conecte mais de 25 bancos e ERPs via Open Finance em 3 cliques. Sem necessidade de desenvolvedor.',
            rationale: 'Quebra na hora a objeção de integração e esforço de TI que o Tech Lead e o CFO temem.',
          },
          {
            element: 'Botão CTA',
            originalText: 'Agende uma Demonstração com Especialista',
            suggestedText: 'Ver Demonstração Interativa de 3 Minutos →',
            rationale: 'Reduz o compromisso social de falar com um vendedor insistente antes de conhecer o software por dentro.',
          },
        ],
        personas: [
          {
            personaId: 'cfo-skeptic',
            personaName: 'Carlos Mendes',
            role: 'CFO / Diretor Financeiro',
            avatar: '💼',
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
            verdictQuote: 'Não vou colocar meu e-mail e telefone para um vendedor ficar me ligando se nem sei se cabe no meu budget.',
          },
          {
            personaId: 'dev-senior',
            personaName: 'Henrique Vaz',
            role: 'Tech Lead / Engenheiro Sênior',
            avatar: '⚡',
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
            verdictQuote: 'Se o time de produto liberar acesso a um sandbox de API, eu aprovo o teste.',
          },
          {
            personaId: 'busy-smb',
            personaName: 'Patrícia Rocha',
            role: 'Pequena Empresária / Fundadora',
            avatar: '⏳',
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
    badge: 'Infoproduto',
    title: 'Full-Stack AI Architect Masterclass',
    url: 'https://architect-ai.academy/masterclass',
    niche: 'Educação / Tecnologia',
    description: 'Curso avançado de agentes autônomos e arquiteturas de LLM para desenvolvedores experientes.',
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
          'A página usa gatilhos de escassez um pouco agressivos demais ("Restam apenas 4 vagas com bônus"), o que desperta o radar de desconfiança de programadores sêniores.',
        executiveSummary:
          'Excelente especificação da grade curricular e projetos práticos. A prova social de ex-alunos trabalhando em Big Techs passa forte autoridade. O maior ganho de conversão está em suavizar a agressividade do marketing e demonstrar trechos reais de código dos projetos construídos no curso.',
        copyOptimizations: [
          {
            element: 'Headline Principal',
            originalText: 'Torne-se um Engenheiro de IA de Elite e multiplique seu salário em 6 meses',
            suggestedText: 'Domine Arquitetura de Agentes Autônomos, MCPs e RAG de Baixa Latência em Produção',
            rationale: 'Programadores experientes desconfiam de promessas de "multiplicar salário"; eles compram profundidade técnica de ponta.',
          },
          {
            element: 'Subheadline',
            originalText: 'Aprenda os segredos que as grandes empresas de tecnologia não querem que você saiba.',
            suggestedText: 'Construa 4 sistemas autônomos prontos para produção com Next.js, Vercel AI SDK e LangGraph. Código aberto para o seu portfólio.',
            rationale: 'Mostra o stack exato e o benefício real tangível (código para portfólio e projetos completos).',
          },
        ],
        personas: [
          {
            personaId: 'dev-senior',
            personaName: 'Henrique Vaz',
            role: 'Tech Lead / Engenheiro Sênior',
            avatar: '⚡',
            conversionScore: 84,
            emotionalState: 'Pronto para Comprar',
            firstImpression: 'A ementa técnica é muito sólida. Fala de MCP servers, tool-use e structured outputs.',
            frictionPoints: [
              'Algumas chamadas parecem promessas de cursinho barato de marketing digital.',
              'Gostaria de ver o repositório de um dos projetos de exemplo antes de pagar.',
            ],
            unansweredQuestions: [
              'O acesso à comunidade no Discord e às gravações é vitalício?',
            ],
            verdictQuote: 'Se o instrutor realmente for quem construiu a arquitetura mostrada, vale cada centavo.',
          },
          {
            personaId: 'bargain-hunter',
            personaName: 'Rodrigo Lima',
            role: 'Consumidor Precavido',
            avatar: '🛡️',
            conversionScore: 78,
            emotionalState: 'Curioso',
            firstImpression: 'Garantia de 7 dias é o mínimo da lei; gostaria de garantia estendida.',
            frictionPoints: [
              'Preço parcelado tem juros embutidos que não estavam destacados.',
            ],
            unansweredQuestions: [
              'Se eu não gostar do método, a devolução é automática em 1 clique?',
            ],
            verdictQuote: 'Vou pagar no cartão porque a garantia protege, mas quero ver a primeira semana logo.',
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
    badge: 'E-commerce / App',
    title: 'FlashDrop — Entregas Rápidas no Mesmo Dia',
    url: 'https://flashdrop.delivery/merchants',
    niche: 'Logística / E-commerce',
    description: 'Serviço de entregas same-day para lojas locais e pequenos e-commerces competirem com gigantes.',
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
          'Não há mapa interativo de cobertura por CEP. O lojista não sabe se a sua região é atendida antes de se cadastrar.',
        executiveSummary:
          'A promessa de entrega em 2 horas é irresistível para pequenos varejistas, mas o medo de extravio de mercadorias e a falta de clareza sobre raio de atendimento e seguro das cargas geram atrito paralisante.',
        copyOptimizations: [
          {
            element: 'Headline Principal',
            originalText: 'A revolução da entrega rápida para a sua loja',
            suggestedText: 'Ofereça entrega em até 2 horas na sua cidade e aumente em 35% suas vendas locais',
            rationale: 'Foca no benefício de crescimento de vendas do lojista.',
          },
          {
            element: 'Garantia / Risco',
            originalText: 'Garantimos segurança em todas as rotas.',
            suggestedText: 'Seguro integral de 100% da carga contra extravio ou avaria, com ressarcimento em 48h.',
            rationale: 'Elimina o pavor do lojista de ter um produto caro danificado ou perdido pelo entregador.',
          },
        ],
        personas: [
          {
            personaId: 'busy-smb',
            personaName: 'Patrícia Rocha',
            role: 'Pequena Empresária / Fundadora',
            avatar: '⏳',
            conversionScore: 64,
            emotionalState: 'Confuso',
            firstImpression: 'Quero muito oferecer entrega rápida, mas não sei se cobre meu bairro.',
            frictionPoints: [
              'Tive que procurar muito e não achei um campo para digitar meu CEP.',
              'Não explica como os motoboys retiram os pacotes na minha loja.',
            ],
            unansweredQuestions: [
              'Tem mensalidade fixa ou pago apenas por entrega realizada?',
            ],
            verdictQuote: 'Não vou me cadastrar para só depois descobrir que não atendem a minha região.',
          },
          {
            personaId: 'bargain-hunter',
            personaName: 'Rodrigo Lima',
            role: 'Consumidor Precavido',
            avatar: '🛡️',
            conversionScore: 58,
            emotionalState: 'Frustrado',
            firstImpression: 'Se o entregador quebrar meu produto, quem paga a conta?',
            frictionPoints: [
              'Falta menção explícita a seguro ou política de indenização.',
            ],
            unansweredQuestions: [
              'Qual é o procedimento se o cliente final não estiver em casa para receber?',
            ],
            verdictQuote: 'Se não tiver seguro registrado em contrato, eu não arrisco minhas mercadorias.',
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

