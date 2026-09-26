export interface CredentialRepresentation {
    temporary?: boolean;
    type: string;
    value: string;
}

export interface UserRepresentation {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}