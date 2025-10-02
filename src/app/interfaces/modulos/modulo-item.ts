export interface ModuloItem {
    moduleName: string;
    descricao: string;
    router: string;
    children?: ModuloItem[];
}