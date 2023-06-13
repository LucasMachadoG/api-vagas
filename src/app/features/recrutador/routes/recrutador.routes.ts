import { Router } from "express"
import { RecrutadorController } from "../controller/recrutador.controller"
import { checkLoginValidator } from "../../login/validators/check.login.validator"
import { checkLoginRecrutadorValidatorr } from "../validators/check.login.recrutador.validator"

export const recrutadorRoutes = () => {
    const router = Router()

    router.get("/", [checkLoginValidator, checkLoginRecrutadorValidatorr], new RecrutadorController().list)
    router.post("/", new RecrutadorController().create)

    return router
}