export interface Post {
  id: number;
  titulo: string;
  subtitulo: string;
  conteudo: string;
  autor: string;
  autorBio: string;
  categoria: string;
  tags: string[];
  imagem: string;
  imagemAlt: string;
  dataPublicacao: string;
  tempoLeitura: number;
  destaque: boolean;
  slug: string;
}
