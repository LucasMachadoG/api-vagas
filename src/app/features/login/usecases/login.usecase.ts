import { jwtAdapter } from "../../../shared/util/jwt.adapter";
import { Return } from "../../../shared/util/return.contract";
import { UsuarioRepository } from "../../usuario/database/usuario.repository";

interface loginParams {
    username: string;
    password: string;
}

export class loginUsecase {
    public async execute (data: loginParams): Promise<Return> {
        const repository = new UsuarioRepository()
        const usuario = await repository.getByUsername(data.username, data.password)

        if (!usuario) {
            return {
                ok: false,
                message: "Username/Senha incorretos!",
                code: 403
            }
        }

        const token = jwtAdapter.createToken(usuario)

        return {
            ok: true,
            message: "Login feito com sucesso!",
            data: {
                ...usuario,
                token
            },
            code: 200
        }
    }
}