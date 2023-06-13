import { typeormConnection } from "../../../../main/database/typeorm.connection";
import { TipoUsuario, Usuario } from "../../../models/usuario.model";
import { UsuarioEntity } from "../../../shared/database/entities/usuario.entity";

export class UsuarioRepository {
    private repository = typeormConnection.connection.getRepository(UsuarioEntity)

    public async getByUsername (username: string, password?: string): Promise<Usuario | null> {
        const result = await this.repository.findOneBy({
            username,
            password
        })

        if (!result) {
            return null
        }

        return UsuarioRepository.mapEntittyToModel(result)
    }

    public async list (tipo?: TipoUsuario) {
        const result = await this.repository.findBy({
            tipo
        })

        return result.map((item) => UsuarioRepository.mapEntittyToModel(item))
    }

    public async create (usuario: Usuario) {
        const usuarioEntity = this.repository.create({
            id: usuario.id,
            nome: usuario.nome,
            username: usuario.username,
            password: usuario.password,
            tipo: usuario.tipo,
            nomeEmpresa: usuario.nomeEmpresa
        })

        const result = await this.repository.save(usuarioEntity)

        return UsuarioRepository.mapEntittyToModel(result)
    }

    public static mapEntittyToModel (entity: UsuarioEntity): Usuario {
        return Usuario.create(
            entity.id,
            entity.nome,
            entity.username,
            entity.password,
            entity.tipo,
            entity.nomeEmpresa
        )
    }

    public async getById(id: string): Promise<Usuario | null> {
        const result = await this.repository.findOneBy({
            id
        })

        if (!result) {
            return null
        }

        return UsuarioRepository.mapEntittyToModel(result)
    }
}