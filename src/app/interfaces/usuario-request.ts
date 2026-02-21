export interface UsuarioResponse {
    id: number;
    nome: String;
    email?: String;
    role: string;
}

export interface LoginResponse {
    token: String;
    usuarioDto?: UsuarioResponse;
    googleUsuario?: GoogleUsuario;
}

export interface Authority {
    authority: string;
}

export interface GoogleUsuario {
    email: string;
    name: string;
}