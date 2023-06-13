import jwt from "jsonwebtoken";
import { authEnv } from "../../envs/auth.env";

export class jwtAdapter {
    public static createToken (data: any) {
        // Primeiro parametro vai ser os dados que eu quero armazenar
        // E o outro eh uma secret case
        // Esse sign me retorna uma string que eh o token
        return jwt.sign(JSON.stringify(data), authEnv.secret!)
    }

    // Esse checkToken vai me retornar se esse token eh valido ou nao
    public static checkToken (token: string) {
        return jwt.verify(token, authEnv.secret!)
    }
}

