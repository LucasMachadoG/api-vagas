import { Recrutador } from "../../../models/recrutador.model";
import { Vaga } from "../../../models/vagas.model";
import { Return } from "../../../shared/util/return.contract";
import { UsuarioRepository } from "../../usuario/database/usuario.repository";
import { vagaRepository } from "../database/vaga.repository";

interface createVagaParams {
    descricao: string
    nomeEmpresa: string
    dtLimite: Date
    idRecrutador: string
    maxCandidatos?: number
    indAtivo?: boolean
}

export class CreateVagaUsecase {
    public async execute (data: createVagaParams): Promise<Return> {
        if (data.dtLimite < new Date()) {
            return {
                ok: false,
                message: "A data deve ser superior a data atual",
                code: 400
            }
        }

        if (data.indAtivo === undefined) {
            data.indAtivo = true
        }

        const usuarioRepository = new UsuarioRepository()
        const recrutador = await usuarioRepository.getById(data.idRecrutador) as Recrutador

        if (!recrutador) {
            return {
                ok: false,
                message: "Esse recrutador nao existe",
                code: 400
            }
        }

        const vaga = new Vaga (data.descricao, data.nomeEmpresa, data.dtLimite, data.indAtivo, recrutador, data.maxCandidatos)

        const repository = new vagaRepository()
        await repository.create(vaga)

        return {
            ok: true,
            message: "Vaga criada com sucesso!",
            code: 201,
            data: vaga
        }
    }
}