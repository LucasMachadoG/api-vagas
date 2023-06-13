import { Recrutador } from "../../../models/recrutador.model"
import { Return } from "../../../shared/util/return.contract"
import { UsuarioRepository } from "../../usuario/database/usuario.repository"

interface createRecrutadoParams {
    nome: string,
    username: string,
    password: string
    nomeEmpresa: string
}

export class createRecrutadorUsecase {
    public async execute (data: createRecrutadoParams): Promise<Return> {
        const repository = new UsuarioRepository()
        const usuario = await repository.getByUsername(data.username)

        if (usuario !== null) {
            return {
                ok: false, 
                message: "Usuario ja existe", 
                code: 400
            }
        }

        const recrutador = new Recrutador (data.nome, data.username, data.password, data.nomeEmpresa)

        const result = await repository.create(recrutador)

        return {
            ok: true,
            code: 201,
            message: "Usuario criado com sucesso",
            data: result
        }

    }
}