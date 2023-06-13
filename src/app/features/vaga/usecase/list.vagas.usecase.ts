import { Return } from "../../../shared/util/return.contract";
import { vagaRepository } from "../database/vaga.repository";

export class ListVagasUsecase {
    public async execute(): Promise<Return> {
        const repository = new vagaRepository()
        const result = await repository.list()

        return {
            ok: true,
            code: 200,
            message: "Vagas listadas com sucesso",
            data: result
        }
    }
}