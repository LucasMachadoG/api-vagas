import { NextFunction, Request, Response } from "express";
import { apiError } from "../../../shared/errors/api.error";
import { TipoUsuario } from "../../../models/usuario.model";

export const checkLoginRecrutadorValidatorr = (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuario = req.headers["usuario"] as string

        if (!usuario) {
            return res.status(401).send({
                ok: false, 
                message: "Usuario nao esta logado"
            })
        }

        const decodedUsuario = JSON.parse(usuario)

        if (decodedUsuario.tipo !== TipoUsuario.Recrutador) {
            return res.status(403).send({
                ok: false,
                message: "Usuario nao possui permissao"
            })
        }

        return next()
    } catch (error: any) {
        return apiError.serverError(res, error)
    }
}