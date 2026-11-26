import type { SiteContent } from "@/lib/content-types";

export const defaultSiteContent: SiteContent = {
  version: 1,
  updatedAt: "2026-08-25T00:00:00.000Z",
  articles: [
    {
      id: "reading-toc-perinatal",
      kind: "reading",
      slug: "toc-perinatal-pensamentos-intrusivos-pos-parto",
      title:
        "TOC perinatal: como identificar e lidar com os pensamentos intrusivos no pós-parto",
      description:
        "Entenda quando pensamentos indesejados durante a gravidez e o pós-parto podem indicar TOC perinatal e por que o acompanhamento adequado é importante.",
      body: "",
      source: "Portal Drauzio Varella",
      author: "Samantha Cerquetani",
      publishedAt: "2026-07-29",
      category: "Saúde mental perinatal",
      href: "https://drauziovarella.uol.com.br/saude-mental/toc-perinatal-como-identificar-e-lidar-com-os-pensamentos-intrusivos-no-pos-parto/amp/",
      imageUrl: "/images/news/gestacao_e_pos_parto.jpeg",
      imageAlt: "Mãe acolhendo seu bebê no período pós-parto",
      featured: true,
      published: true,
    },
  ],
  publications: [
    {
      id: "publication-psicologia-perinatal",
      title: "Psicologia Perinatal: Por outros caminhos",
      subtitle: "Obra coletiva organizada por Natália Aguilar",
      meta: "Com Danielle Vincenzo entre as coautoras",
      description:
        "Uma obra que convida profissionais e leitores a percorrer novos caminhos de escuta, acolhimento e cuidado dentro da psicologia perinatal.",
      imageUrl: "/capa-psicologia-perinatal-outros-caminhos.jpg",
      imageAlt: "Capa do livro Psicologia Perinatal: Por outros caminhos",
      href: "https://hotmart.com/pt-br/marketplace/produtos/psicologia-perinatal-por-outros-caminhos/K105257042M",
      cta: "Conhecer na Hotmart",
      featured: true,
      published: true,
    },
    {
      id: "publication-reconecta",
      title: "E-book Reconecta",
      subtitle: "Atendimento de Pacientes sem Comunicação Verbal",
      meta: "Editora Manole, 2021",
      description:
        "Obra que orienta profissionais da saúde no atendimento de pacientes com dificuldades de comunicação verbal, reunindo experiência clínica e conhecimento científico.",
      imageUrl: "/capa_livro_danielle_robertis.png",
      imageAlt:
        "Capa do livro Reconecta: Atendimento de Pacientes sem Comunicação Verbal",
      href: "https://www.manole.com.br/estimulacao-cognitiva-de-idosos-1-edicao/p",
      cta: "Ver na Editora Manole",
      featured: false,
      published: true,
    },
  ],
  services: [
    {
      id: "service-saude-mental-mulher",
      title: "Atendimento Especializado em Saúde Mental da Mulher",
      description:
        "Atenção psicológica voltada à saúde mental da mulher, com foco em autoconhecimento e equilíbrio emocional.",
      icon: "venus",
      imageUrl: "/images/services/saude-mental-mulher.jpg",
      imageAlt: "Mulher em sessão de terapia conversando com psicóloga",
      published: true,
    },
    {
      id: "service-psicoterapia-adultos",
      title: "Atendimento de Psicoterapia para Adultos",
      description:
        "Atendimento individual para adultos que buscam compreender suas emoções e construir mais equilíbrio e bem-estar.",
      icon: "user-round",
      imageUrl: "/images/news/psicoterapia-adultos.jpg",
      imageAlt: "Adulto sentado em sofá durante sessão de psicoterapia",
      published: true,
    },
    {
      id: "service-perinatalidade",
      title: "Perinatalidade e Planejamento Familiar",
      description:
        "Acompanhamento de mulheres e casais em processos de gestação, adoção e parentalidade.",
      icon: "heart",
      imageUrl: "/images/news/pariental.jpg",
      imageAlt: "Mulher grávida com mãos apoiadas na barriga",
      published: true,
    },
    {
      id: "service-gestacao-pos-parto",
      title: "Gestação e Pós-Parto (Puerpério)",
      description:
        "Experiências em demandas emocionais relacionadas à gravidez, identidade materna e adaptação à maternidade.",
      icon: "baby",
      imageUrl: "/images/news/gestacao_e_pos_parto.jpeg",
      imageAlt: "Família com recém-nascido no colo",
      published: true,
    },
    {
      id: "service-mae-bebe",
      title: "Relação Mãe-Bebê e Vínculo Afetivo",
      description:
        "Estudos e práticas voltadas à construção de vínculos seguros nos primeiros anos de vida.",
      icon: "heart",
      imageUrl: "/images/news/mae_bebe.jpg",
      imageAlt: "Mãe e bebê em contato afetuoso",
      published: true,
    },
    {
      id: "service-luto-perinatal",
      title: "Luto Perinatal",
      description:
        "Experiência em acolhimento de perdas gestacionais e neonatais.",
      icon: "leaf",
      imageUrl: "/images/news/luto.jpg",
      imageAlt: "Flor branca representando delicadeza",
      published: true,
    },
    {
      id: "service-desenvolvimento-infantil",
      title: "Desenvolvimento Infantil nos Primeiros Anos",
      description:
        "Atuação e docência voltadas ao sono, rotina saudável e neurodesenvolvimento infantil.",
      icon: "book-open",
      imageUrl: "/images/services/desenvolvimento-infantil.jpg",
      imageAlt: "Bebê dormindo tranquilamente",
      published: true,
    },
    {
      id: "service-apoio-paternidade",
      title: "Apoio à Paternidade",
      description:
        "Acompanhamento de pais em seus desafios emocionais e familiares.",
      icon: "users",
      imageUrl: "/images/news/apoio_paternidade.jpeg",
      imageAlt: "Pai com bebê no colo",
      published: true,
    },
    {
      id: "service-orientacao-parental",
      title: "Orientação Parental",
      description:
        "Experiência em processos de organização e fortalecimento das relações familiares.",
      icon: "users",
      imageUrl: "/images/news/parental.jpg",
      imageAlt: "Pais com criança pequena em ambiente acolhedor",
      published: true,
    },
    {
      id: "service-adolescencia",
      title: "Adolescência",
      description:
        "Vivência clínica no suporte a questões emocionais, de identidade e de relacionamentos.",
      icon: "user",
      imageUrl: "/images/news/adolescencia.jpg",
      imageAlt: "Adolescente em retrato",
      published: true,
    },
    {
      id: "service-psiquiatria",
      title: "Pacientes em Tratamento Psiquiátrico",
      description:
        "Parceria de acompanhamento em interface com a psiquiatria, favorecendo adesão e bem‑estar.",
      icon: "brain",
      imageUrl: "/images/news/psiquiatria.jpg",
      imageAlt: "Sala de atendimento terapêutico acolhedora",
      published: true,
    },
  ],
  testimonials: [
    {
      id: "testimonial-karina",
      name: "Karina Almeida",
      date: "21 de abr. de 2024",
      text: "Excelente profissional, indico sem medo. Muito qualificada, atualizada e trabalha com muito amor. Adoro o fato dela também ser mãe, isso faz total diferença.",
      published: true,
    },
    {
      id: "testimonial-rafael",
      name: "Rafael Santos",
      date: "15 de mar. de 2024",
      text: "A Dra. Danielle é uma profissional excepcional! Sua abordagem me ajudou a superar questões que eu carregava há anos. Recomendo de olhos fechados.",
      published: true,
    },
    {
      id: "testimonial-juliana",
      name: "Juliana Costa",
      date: "02 de mai. de 2024",
      text: "Encontrei na Danielle o apoio que precisava em um momento muito difícil. Sua empatia e conhecimento fazem toda diferença nas sessões.",
      published: true,
    },
    {
      id: "testimonial-pedro",
      name: "Pedro Oliveira",
      date: "18 de abr. de 2024",
      text: "Minha experiência tem sido transformadora! A forma como ela conduz as sessões me ajuda a ter insights valiosos sobre padrões que eu nem percebia.",
      published: true,
    },
    {
      id: "testimonial-amanda",
      name: "Amanda Silva",
      date: "28 de mar. de 2024",
      text: "Agradeço todos os dias por ter encontrado a Danielle. Sua sensibilidade e profissionalismo me ajudaram a lidar com minha ansiedade de forma incrível.",
      published: true,
    },
    {
      id: "testimonial-lucas",
      name: "Lucas Mendes",
      date: "10 de mai. de 2024",
      text: "Profissional atualizada e humana. Consigo me abrir e falar sobre assuntos difíceis com muita tranquilidade. Recomendo para todos!",
      published: true,
    },
    {
      id: "testimonial-beatriz",
      name: "Beatriz Lima",
      date: "05 de abr. de 2024",
      text: "As sessões com a Danielle têm sido um verdadeiro presente na minha vida. Ela me ajuda a enxergar soluções onde eu só via problemas.",
      published: true,
    },
    {
      id: "testimonial-marcos",
      name: "Marcos Pereira",
      date: "22 de mar. de 2024",
      text: "Sou paciente há quase um ano e posso dizer que minha qualidade de vida melhorou significativamente. Obrigado por todo o suporte!",
      published: true,
    },
  ],
  settings: {
    hero: {
      badge: "Psicologia clínica com escuta acolhedora",
      title: "Psicóloga em São Paulo para cuidar da sua saúde emocional",
      subtitle:
        "Um espaço seguro para mulheres, adolescentes, adultos e famílias construírem vínculos mais saudáveis e uma relação mais gentil com suas emoções, com atenção especial à saúde mental perinatal.",
      imageUrl: "/images/hero/opcao_capa_1.jpg",
    },
    about: {
      title: "Sobre a psicóloga Danielle Robertis",
      intro:
        "Experiência clínica, acadêmica e humana reunidas em uma escuta próxima e cuidadosa.",
      photoUrl: "/danielle-robertis-psicologa-sobre.jpeg",
      photoAlt: "Psicóloga Danielle Robertis de Vincenzo",
      body: [
        "Sou **Danielle Robertis de Vincenzo** (CRP 06/134354), psicóloga clínica com sólida formação e experiência acadêmica e profissional.",
        "Atuo como psicóloga no ambulatório de gestantes e puérperas do Instituto de Psiquiatria do Hospital das Clínicas da FMUSP (IPq‑FMUSP), onde desenvolvo experiência em saúde mental, psicopatologia e acompanhamento de demandas emocionais relacionadas à maternidade, parentalidade e adoção.",
        "Tenho trajetória de 4 anos como docente na Pós‑Graduação da Faculdade de Medicina da Universidade de São Paulo (FMUSP), nas áreas de vínculo materno, adoção e desenvolvimento infantojuvenil, contribuindo para a formação de profissionais e a produção de conhecimento científico nessas áreas.",
        "Minha experiência reúne a prática clínica, o ensino, a pesquisa e a produção científica, sempre com foco na promoção do bem‑estar emocional, na saúde mental perinatal, na saúde da mulher e no fortalecimento dos vínculos familiares.",
      ].join("\n\n"),
      personalNote:
        "Sou mãe do Davi e acredito que a experiência da maternidade me trouxe uma compreensão ainda mais profunda sobre os desafios e as transformações dessa jornada.",
      education: [
        {
          title: "Especialização em Psicopatologia e Saúde Mental",
          institution:
            "Instituto de Psiquiatria da Faculdade de Medicina da USP (IPq‑FMUSP)",
        },
        {
          title: "Formação em Saúde da Mulher e Psicologia Perinatal",
          institution: "Faculdade de Medicina da USP (FMUSP)",
        },
      ],
    },
    contact: {
      phone: "(11) 96455-6323",
      email: "danielle.robertis.psicologa@gmail.com",
      instagram: "@danielle.psicologia",
      addressLine1: "R. Nove de Julho, 72 — Conjunto 141, Torre Norte",
      addressLine2: "Alto da Boa Vista, São Paulo — SP · CEP 05716-150",
    },
  },
};

