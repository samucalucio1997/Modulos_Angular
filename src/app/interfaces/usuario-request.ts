export interface UsuarioResponse {
    id: number;
    nome: String;
    email?: String;
    authorities?: Authority[];
}

export interface LoginResponse {
    token: String;
    user: UsuarioResponse;
}

export interface Authority {
    authority: string;
}