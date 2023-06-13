import { Router } from "express"
import { VagaController } from "../controllers/vagas.controller"
import { checkLoginValidator } from "../../login/validators/check.login.validator"
import { checkLoginRecrutadorValidatorr } from "../../recrutador/validators/check.login.recrutador.validator"

export const vagaRoutes = () => {
    const router = Router()

    router.get("/", new VagaController().list)
    router.post("/", [checkLoginValidator, checkLoginRecrutadorValidatorr], new VagaController().create)

    return router
}