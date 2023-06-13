import { NextFunction, Request, Response } from "express";
import { apiError } from "../../../shared/errors/api.error";
import { jwtAdapter } from "../../../shared/util/jwt.adapter";

export const checkLoginValidator = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Cabecalhos da requisicao
        const token = req.headers["authorization"]
        req.headers ["usuario"] = ""

        if (!token) {
            return res.status(401).send({
                ok: false,
                message: "O token nao foi informado"
            })
        }

        const usuario = jwtAdapter.checkToken(token)
        req.headers["usuario"] = JSON.stringify(usuario)

        return next()
    } catch (error: any) {
        return apiError.serverError(res, error)
    }
}