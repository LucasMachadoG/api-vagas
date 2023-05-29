import { v4 as createUuid } from "uuid"

export enum TipoUsuario {
    Admin = 'A',
    Recrutador = 'R',
    Candidato = 'C'
}

// Nos nao vamos usar uma interface para as classes porque nos temos que gerar o ID, e uma classe nao pode ter implementacao
export class Usuario {
    private _id: string

	constructor (
		public nome: string,
		public username: string,
		public password: string,
        public tipo: TipoUsuario,
		public nomeEmpresa?: string
	) {
        this._id = createUuid()
    }

    public get id () {
        return this._id
    }


    public static create (id: string, nome: string, username: string, password: string, tipo: TipoUsuario, nomeEmpresa: string) {
        const usuario = new Usuario (nome, username, password, tipo, nomeEmpresa)

        usuario._id = id

        return usuario
    }
}