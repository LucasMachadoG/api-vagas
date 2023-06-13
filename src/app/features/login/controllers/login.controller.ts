import { Request, Response } from "express";
import { apiError } from "../../../shared/errors/api.error";
import { loginUsecase } from "../usecases/login.usecase";

export class loginController {
    public async login (req: Request, res: Response) {
        try {
            const { username, password } = req.body

            const result = await new loginUsecase().execute({
                username, password
            })

            return res.status(result.code).send(result)
        } catch (error: any) {
            return apiError.serverError(res, error)
        }
    }
}