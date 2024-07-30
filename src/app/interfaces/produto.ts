import { CategoriProduto } from "../enum/categori-produto";

export interface Produto {
    matricula: number,
    nome: string,
    preco: number,
    setor: CategoriProduto,
    entradaEstoque: number
}
