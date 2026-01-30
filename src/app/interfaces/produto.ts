import { CategoriProduto } from "../enum/categori-produto";

export interface ProdutoReponse {
    imgs: string;
    produto: ProdutoDto
}

export interface ProdutoDto {
    id?: number;
    nome: string;
    qtd: number;
    precoUni: number;
    descricao: string;
    categoria: CategoriProduto;
    imagens?: ImagemProdutoDTO[];
}

export interface ImagemProdutoDTO {
    id: number;
    path: string;
    caminhoArquivo?: string;
    tipoArquivo?: string;
    tamanhoArquivo?: number;
}