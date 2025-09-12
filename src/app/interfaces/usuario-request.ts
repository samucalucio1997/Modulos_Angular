export interface UsuarioResponse {
    id: number;
    nome: String;
    email?: String;
    authorities?: Map<string, string>;
}

export interface LoginResponse {
    token: String;
    usuario: UsuarioResponse;
}