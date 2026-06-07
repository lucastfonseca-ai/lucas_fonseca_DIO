import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [
    {
      id: 1,
      titulo: 'A Revolução Silenciosa da Inteligência Artificial no Cotidiano',
      subtitulo: 'Como os algoritmos estão reformulando nossas decisões mais banais, sem que percebamos',
      conteudo: `
        <p>Há uma transformação acontecendo nos bastidores da nossa vida diária. Não é anunciada em manchetes dramáticas nem acompanhada de fanfarras tecnológicas. Ela chega sorrateira, embutida nos aplicativos que usamos para pedir comida, nas playlists que parecem ler nossos humores, nas rotas que o GPS sugere sem hesitação.</p>

        <p>A inteligência artificial já não é mais aquela promessa futurista de filmes de ficção científica. É o sistema que decide qual conteúdo aparece primeiro no seu feed de notícias. É o algoritmo que aprova — ou recusa — um empréstimo em milissegundos. É a voz que responde quando você pergunta ao assistente virtual sobre o clima de amanhã.</p>

        <h2>O Invisível que nos Governa</h2>

        <p>O filósofo alemão Byung-Chul Han cunhou o termo "psicopolítica" para descrever como o poder na era digital atua sobre nossas mentes, não sobre nossos corpos. A IA é a ferramenta perfeita dessa psicopolítica contemporânea: ela nos conhece melhor do que nos conhecemos, antecipa nossos desejos antes que os formulemos conscientemente.</p>

        <p>Pesquisadores da Universidade de Cambridge demonstraram que, com apenas 150 curtidas no Facebook, um algoritmo pode descrever sua personalidade com mais precisão do que seu cônjuge. Com 300 curtidas, supera o que seu próprio eu seria capaz de articular sobre si mesmo.</p>

        <h2>Entre a Conveniência e o Controle</h2>

        <p>A questão central não é se a IA é boa ou má — essa dicotomia é simplória demais para dar conta da complexidade do fenômeno. A questão é: quem define os parâmetros? Quem são os humanos por trás das decisões algorítmicas?</p>

        <p>Quando o sistema de recomendação do YouTube decide que, após um vídeo sobre dietas saudáveis, você deve assistir a um conteúdo sobre transtornos alimentares, isso não é acidente. É a maximização do engajamento — que pode ou não coincidir com o seu bem-estar.</p>

        <p>A revolução silenciosa da IA nos convida a uma reflexão urgente: como cidadãos do século XXI, precisamos desenvolver o que alguns chamam de "literacia algorítmica" — a capacidade de compreender, questionar e, quando necessário, resistir às decisões tomadas em nosso nome por sistemas que nunca conheceremos.</p>

        <p>O futuro não será determinado pela tecnologia em si, mas pela nossa capacidade coletiva de direcioná-la. A pergunta não é se a IA vai mudar o mundo. Já está mudando. A pergunta é: para quem?</p>
      `,
      autor: 'Marina Cavalcante',
      autorBio: 'Jornalista e pesquisadora de tecnologia e sociedade. Doutoranda em Comunicação pela USP.',
      categoria: 'Tecnologia',
      tags: ['Inteligência Artificial', 'Sociedade', 'Algoritmos', 'Privacidade'],
      imagem: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
      imagemAlt: 'Visualização abstrata de rede neural com pontos de luz conectados',
      dataPublicacao: '2024-03-15',
      tempoLeitura: 7,
      destaque: true,
      slug: 'revolucao-silenciosa-ia-cotidiano'
    },
    {
      id: 2,
      titulo: 'Cerrado: O Berço das Águas que o Brasil Teima em Ignorar',
      subtitulo: 'O bioma mais ameaçado do país garante os principais rios brasileiros — e desaparece a 1 hectare por minuto',
      conteudo: `
        <p>Existe uma falácia persistente no imaginário brasileiro: a de que o país é essencialmente a Amazônia. Enquanto olhos do mundo e câmeras internacionais se voltam para a floresta equatorial, outro bioma sangra em silêncio — e sua morte ameaça muito mais do que a biodiversidade local.</p>

        <p>O Cerrado, chamado de "berço das águas" pelos cientistas, abriga as nascentes dos principais rios brasileiros: o São Francisco, o Araguaia, o Tocantins, o Xingu e afluentes do Rio da Prata. Destruí-lo não é apenas uma tragédia ecológica localizada. É secar gradualmente o coração hídrico de um continente.</p>

        <h2>Os Números do Silêncio</h2>

        <p>Enquanto a Amazônia preservou cerca de 80% de sua cobertura original, o Cerrado já perdeu mais de 50% — e o desmatamento continua a uma taxa que supera a da floresta tropical. Dos 2 milhões de km² originais, menos de 20% mantêm vegetação nativa intacta, protegida em unidades de conservação.</p>

        <p>A biodiversidade perdida é incalculável: o Cerrado é a savana tropical com maior diversidade de plantas do planeta. São mais de 11 mil espécies de plantas nativas, 199 espécies de répteis, 251 de anfíbios. Boa parte delas, endêmicas — não existem em nenhum outro lugar do mundo.</p>

        <h2>A Soja que Apaga o Futuro</h2>

        <p>A expansão do agronegócio — particularmente da sojicultura — é o principal vetor de destruição. O Matopiba, região que compreende partes do Maranhão, Tocantins, Piauí e Bahia, tornou-se a nova fronteira agrícola. Mas cada hectare de soja plantado é um fragmento de cerrado apagado para sempre.</p>

        <p>A ironia cruel é que o Cerrado que se destrói é o mesmo que garante a água para irrigar as lavouras que o substituem. É uma equação que só funciona no curto prazo — e o Brasil parece determinado a cobrar essa conta das gerações futuras.</p>
      `,
      autor: 'Thiago Drummond',
      autorBio: 'Biólogo e correspondente ambiental. Autor de "Brasil Invisível: Biomas em Extinção".',
      categoria: 'Meio Ambiente',
      tags: ['Cerrado', 'Desmatamento', 'Biodiversidade', 'Recursos Hídricos'],
      imagem: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
      imagemAlt: 'Paisagem de savana com árvores retorcidas ao entardecer',
      dataPublicacao: '2024-03-10',
      tempoLeitura: 8,
      destaque: true,
      slug: 'cerrado-bercas-das-aguas-brasil-ignora'
    },
    {
      id: 3,
      titulo: 'Telas no Berço: O Que a Ciência Diz Sobre Crianças e Tecnologia',
      subtitulo: 'Entre pânicos morais e dados concretos, entendendo o impacto real dos dispositivos digitais no desenvolvimento infantil',
      conteudo: `
        <p>Toda geração cria seus próprios pânicos morais sobre a infância. No século XIX, era a leitura de romances que corromperia a mente das moças. No século XX, foram os quadrinhos, depois a televisão, depois os videogames. Hoje, o alvo são as telas — especificamente, os smartphones e tablets nas mãos de crianças cada vez menores.</p>

        <p>Mas o que a ciência, de fato, nos diz? A resposta é menos apocalíptica — e mais nuançada — do que os alarmistas gostariam.</p>

        <h2>O Que os Estudos Mostram</h2>

        <p>Uma revisão sistemática publicada no JAMA Pediatrics analisou 87 estudos sobre uso de telas por crianças menores de 5 anos. Os achados são claros em um ponto: o que importa não é apenas o tempo de tela, mas a qualidade do conteúdo e, crucialmente, a presença de um adulto mediando a experiência.</p>

        <p>Crianças que assistem a vídeos interativos com um cuidador aprendem vocabulário de forma similar às que interagem diretamente. Crianças expostas ao mesmo conteúdo sozinhas, sem essa mediação, aprendem significativamente menos.</p>

        <h2>A Diferença que Faz Diferença</h2>

        <p>Nem toda tela é igual. Um aplicativo que estimula a criatividade, a resolução de problemas e a interação é fundamentalmente diferente de um stream infinito de vídeos de gratificação imediata. A distinção entre "tecnologia ferramenta" e "tecnologia passatempo" é crucial — e frequentemente ignorada nos debates públicos.</p>

        <p>O pediatra da Universidade de Washington Dimitri Christakis, um dos pesquisadores mais respeitados na área, resume assim: "A questão não é se, mas como." As diretrizes absolutas — zero tela antes dos 2 anos, nunca durante as refeições — são úteis como ponto de partida, mas ignoram a complexidade do desenvolvimento humano real.</p>
      `,
      autor: 'Beatriz Nogueira',
      autorBio: 'Psicóloga clínica especializada em desenvolvimento infantil. Colunista de saúde mental.',
      categoria: 'Educação',
      tags: ['Infância', 'Tecnologia', 'Desenvolvimento', 'Saúde Mental'],
      imagem: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
      imagemAlt: 'Criança usando tablet com expressão curiosa',
      dataPublicacao: '2024-03-05',
      tempoLeitura: 6,
      destaque: false,
      slug: 'telas-no-berco-ciencia-criancas-tecnologia'
    },
    {
      id: 4,
      titulo: 'O Renascimento do Vinil: Nostalgia ou Revolução da Escuta?',
      subtitulo: 'As vendas de discos de vinil superam CDs pela primeira vez em décadas. O que esse dado nos diz sobre nossa relação com a música?',
      conteudo: `
        <p>Em 2023, pela primeira vez desde 1987, as vendas de discos de vinil superaram as de CDs nos Estados Unidos. O fenômeno, antes interpretado como nicho de entusiastas e audiófilos, consolidou-se como tendência de mercado. Mas por quê?</p>

        <p>A explicação fácil é a nostalgia. Mas essa leitura é insuficiente — e provavelmente incorreta para boa parte do público que impulsiona as vendas. Pesquisas mostram que a maioria dos compradores de vinil tem menos de 35 anos: são pessoas que nunca tiveram uma relação cotidiana com o formato.</p>

        <h2>A Economia da Atenção e o Disco como Resistência</h2>

        <p>Vivemos na era do streaming infinito, em que 100 milhões de músicas estão a um clique de distância — e justamente por isso, talvez, ouvir nenhuma delas com atenção plena. O vinil impõe fricção deliberada: você precisa escolher o disco, tirá-lo da capa, posicioná-lo com cuidado, virar o lado A no B.</p>

        <p>Essa fricção não é um bug do formato — é seu principal feature em 2024. Em um mundo de hiperconectividade e gratificação instantânea, o ritual de ouvir um disco pode ser uma das poucas formas de atenção contemplativa que nos restam.</p>

        <h2>O Som como Objeto</h2>

        <p>Há também a dimensão física. A geração que cresceu com a música como arquivo intangível — primeiro o MP3, depois o stream — redescobre o prazer de possuir algo concreto. Um disco tem peso, tem arte gráfica, tem história. Não pode ser deletado por uma decisão corporativa de uma plataforma.</p>

        <p>O vinil, nesse sentido, é menos sobre o som e mais sobre uma relação diferente com a música: mais intencional, mais ritualística, mais presente.</p>
      `,
      autor: 'Rafael Sena',
      autorBio: 'Crítico musical e produtor fonográfico. Colaborador de publicações de música e cultura.',
      categoria: 'Cultura',
      tags: ['Música', 'Vinil', 'Cultura Digital', 'Consumo'],
      imagem: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&q=80',
      imagemAlt: 'Close de disco de vinil girando em toca-discos vintage',
      dataPublicacao: '2024-02-28',
      tempoLeitura: 5,
      destaque: false,
      slug: 'renascimento-vinil-nostalgia-revolucao-escuta'
    },
    {
      id: 5,
      titulo: 'Cidades de 15 Minutos: Utopia Urbanística ou Solução Real?',
      subtitulo: 'O conceito que propõe repensar como vivemos no espaço urbano — e por que está sendo distorcido por teorias conspiratórias',
      conteudo: `
        <p>A ideia é simples e sedutora: imagine uma cidade onde tudo o que você precisa para o dia a dia — trabalho, escola, mercado, parque, médico — está a 15 minutos de caminhada ou bicicleta da sua casa. Sem dependência do carro. Sem horas perdidas em congestionamento. Mais tempo para viver.</p>

        <p>O conceito da "cidade de 15 minutos", popularizado pela urbanista francesa Anne Hidalgo em Paris e pelo pesquisador Carlos Moreno da Universidade Sorbonne, tornou-se uma das ideias mais influentes do urbanismo contemporâneo. E também, estranhamente, um dos alvos preferidos de teorias conspiratórias.</p>

        <h2>O Que o Conceito Realmente Propõe</h2>

        <p>Ao contrário do que circula em grupos radicais online — que alegam ser um plano para "prender as pessoas em zonas" e controlar sua movimentação —, o conceito não prevê restrições à mobilidade. É precisamente o oposto: propõe criar condições para que as pessoas precisem se deslocar menos porque tudo está acessível.</p>

        <p>Paris reorganizou suas ruas para criar ciclovias, expandiu mercados de bairro, transformou estacionamentos em praças. O resultado: aumento da qualidade de vida, redução da poluição e, contrariando os céticos, não houve colapso econômico.</p>

        <h2>O Desafio Brasileiro</h2>

        <p>No Brasil, o conceito encontra obstáculos estruturais formidáveis. Décadas de urbanização orientada pelo automóvel criaram cidades espraiadas, onde as camadas mais pobres moram nas periferias e precisam percorrer horas para acessar serviços concentrados nos centros.</p>

        <p>Implementar a cidade de 15 minutos aqui não é só questão de vontade política — exige enfrentar desigualdades históricas profundas. Mas talvez seja exatamente por isso que a discussão vale a pena: porque o que está em jogo é o direito à cidade.</p>
      `,
      autor: 'Camila Ferraz',
      autorBio: 'Urbanista e pesquisadora de mobilidade urbana. Professora de planejamento urbano na UFMG.',
      categoria: 'Urbanismo',
      tags: ['Cidades', 'Mobilidade', 'Planejamento Urbano', 'Sustentabilidade'],
      imagem: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
      imagemAlt: 'Rua de cidade europeia com ciclistas e pedestres',
      dataPublicacao: '2024-02-20',
      tempoLeitura: 7,
      destaque: false,
      slug: 'cidades-15-minutos-utopia-urbanistica-solucao-real'
    },
    {
      id: 6,
      titulo: 'O Paradoxo da Solitude: Por Que Estar Só Nunca Foi Tão Difícil',
      subtitulo: 'Na era da hiperconectividade, a solidão voluntária tornou-se uma habilidade rara — e necessária',
      conteudo: `
        <p>Blaise Pascal escreveu no século XVII que "todos os problemas da humanidade decorrem da incapacidade do homem de sentar-se quieto numa sala sozinho." Três séculos depois, a frase nunca foi tão pertinente — nem tão impossível de cumprir.</p>

        <p>Vivemos o paradoxo da solitude: nunca estivemos tão conectados, nunca nos sentimos tão sós — e nunca foi tão difícil simplesmente estar com nós mesmos sem preencher o silêncio com estímulos externos.</p>

        <h2>O Custo do Barulho Permanente</h2>

        <p>Pesquisadores da Universidade de Virginia conduziram um experimento revelador: pediram a participantes que ficassem sentados sozinhos, em silêncio, por 15 minutos — ou que se autoadministrassem um leve choque elétrico. Uma parcela significativa preferiu o choque à própria companhia.</p>

        <p>O desconforto com a quietude não é fraqueza de caráter: é o resultado de condicionamento sistemático. Nossos cérebros foram moldados pela evolução para a estimulação constante — e a economia de atenção do capitalismo digital soube explorar isso com maestria.</p>

        <h2>A Solidão como Prática</h2>

        <p>A distinção entre solidão imposta e solidão escolhida é fundamental. A primeira — o isolamento não desejado, a ausência de conexão significativa — é prejudicial à saúde de formas documentadas: aumenta a pressão arterial, compromete o sistema imunológico, está associada ao declínio cognitivo.</p>

        <p>Mas a solitude voluntária — o recolhimento intencional, o tempo a sós com seus próprios pensamentos — tem efeitos opostos. É o espaço onde a criatividade emerge, onde o autoconhecimento se aprofunda, onde o barulho do mundo externo para o tempo suficiente para ouvir o que está acontecendo dentro.</p>

        <p>Aprender a estar sozinho, em um mundo que conspira contra isso, pode ser um dos atos mais radicais — e necessários — do nosso tempo.</p>
      `,
      autor: 'Ana Lúcia Pimentel',
      autorBio: 'Filósofa e ensaísta. Autora de "Ruídos do Silêncio: Ensaios sobre Introspecção Contemporânea".',
      categoria: 'Filosofia',
      tags: ['Bem-estar', 'Filosofia', 'Saúde Mental', 'Tecnologia'],
      imagem: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80',
      imagemAlt: 'Pessoa sentada sozinha à beira de um lago ao entardecer',
      dataPublicacao: '2024-02-14',
      tempoLeitura: 6,
      destaque: false,
      slug: 'paradoxo-solitude-estar-so-dificil'
    }
  ];

  constructor() { }

  getTodosOsPosts(): Post[] {
    return this.posts;
  }

  getPostsEmDestaque(): Post[] {
    return this.posts.filter(post => post.destaque);
  }

  getPostsPorCategoria(categoria: string): Post[] {
    return this.posts.filter(post =>
      post.categoria.toLowerCase() === categoria.toLowerCase()
    );
  }

  getPostPorSlug(slug: string): Post | undefined {
    return this.posts.find(post => post.slug === slug);
  }

  getCategorias(): string[] {
    const categorias = this.posts.map(post => post.categoria);
    return [...new Set(categorias)];
  }

  getPostsRecentes(limite: number = 4): Post[] {
    return [...this.posts]
      .sort((a, b) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime())
      .slice(0, limite);
  }
}
