import { TipoUsuario } from "../../../models/usuario.model";
import { Return } from "../../../shared/util/return.contract";
import { UsuarioRepository } from "../../usuario/database/usuario.repository";

export class listRecrutadorUsecase {
    public async execute (): Promise<Return> {
        const repository = new UsuarioRepository()
        const result = await repository.list(TipoUsuario.Recrutador)

        return {
            ok: true, 
            code: 200,
            message: "Recrutadores listados com sucesso", 
            data: result
        }
    }
}