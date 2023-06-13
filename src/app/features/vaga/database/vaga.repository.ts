import { typeormConnection } from "../../../../main/database/typeorm.connection";
import { Recrutador } from "../../../models/recrutador.model";
import { Vaga } from "../../../models/vagas.model";
import { VagaEntity } from "../../../shared/database/entities/vaga.entity";
import { UsuarioRepository } from "../../usuario/database/usuario.repository";

export class vagaRepository {
    private repository = typeormConnection.connection.getRepository(VagaEntity)

    public async create (vaga: Vaga) {
        const vagaEntity = this.repository.create({
            id: vaga.id,
            descricao: vaga.descricao,
            nomeEmpresa: vaga.nomeEmpresa,
            dtLimite: vaga.dtLimite,
            idRecrutador: vaga.recrutador.id,
            indAtivo: vaga.indAtivo,
            maxCandidatos: vaga.maxCandidatos
        })

        await this.repository.save(vagaEntity)
    }

    public async list () {
        const result = await this.repository.find({
            relations: ["recrutador"]
        })

        return result.map ((item) => this.mapEntityToModel(item))
    }

    private mapEntityToModel (entity: VagaEntity): Vaga {
        const recrutador = UsuarioRepository.mapEntittyToModel(entity.recrutador) as Recrutador
    
        const vaga = Vaga.create(
            entity.id,
            entity.descricao,
            entity.nomeEmpresa,
            entity.dtLimite,
            entity.indAtivo,
            recrutador,
            entity.maxCandidatos
        )

        return vaga
    }
}