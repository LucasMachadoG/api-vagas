import { Request, Response } from "express";
import { apiError } from "../../../shared/errors/api.error";
import { listRecrutadorUsecase } from "../usecase/list.recrutadores.usecase";
import { createRecrutadorUsecase } from "../usecase/create.recrutador.usecase";

export class RecrutadorController {
    public async list (req: Request, res: Response) {
        try {
            const result = await new listRecrutadorUsecase().execute()

            return res.status(200).send(result)
        } catch (error: any) {
            return apiError.serverError(res, error)
        }
    }

    public async create (req: Request, res: Response) {
        try {
            const { nome, username, password, nomeEmpresa } = req.body

            const result = await new createRecrutadorUsecase().execute(req.body)

            return res.status(result.code).send(result)
        } catch (error: any) {
            return apiError.serverError(res, error)
        }
    }
}