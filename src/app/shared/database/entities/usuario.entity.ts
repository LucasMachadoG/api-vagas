import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { TipoUsuario } from "../../../models/usuario.model";

@Entity ("usuario")
export class UsuarioEntity {
    @PrimaryColumn()
    id: string

    @Column()
    nome: string

    @Column({
        unique: true
    })
    username: string

    // Esse select false evita que esse campo seja retornado quando nos fizer um find
    @Column({
        select: false
    })
    password: string

    // Aquele enum vai permitir receber so os valores que nos definimos no nosso TipoUsuario
    @Column({
        type: "varchar",
        length: 1,
        enum: TipoUsuario
    })
    tipo: TipoUsuario

    @Column({
        nullable: true,
        name: "nome_empresa"
    })
    nomeEmpresa: string

    @CreateDateColumn({
        name: "dthr_cadastro"
    })
    dthrCadastro: Date
}