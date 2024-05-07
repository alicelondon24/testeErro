import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateUsuarioDTO } from "./dto/create-usuario.dto";
import { UpdatePutUsuarioDTO } from "./dto/update-put-usuario.dto";
import { UpdatePatchUsuarioDTO } from "./dto/update-patch-usuario.dto";
import { PrismaService } from "../configuration/prisma/prisma.service";


@Injectable()
export class UsuarioService {

    /**
     * Construtor do serviço UserService.
     * @param {PrismaService} prisma - Instância do serviço PrismaService.
     */

    constructor(private readonly prisma: PrismaService) { }
    
    async create(data: CreateUsuarioDTO) {
        return this.prisma.usuario.create({ data });
    }


    /**
     * Retorna todos os usuários.
     * @returns {Promise<any[]>} - Uma Promise que resolve com uma matriz de usuários.
     */
    async findAll() {
        return this.prisma.usuario.findMany();
    }

    /**
     * Encontra um usuário pelo ID.
     * @param {number} id - O ID do usuário.
     * @returns {Promise<any>} - Uma Promise que resolve com os dados do usuário encontrado.
     * @throws {NotFoundException} - Lança NotFoundException se o usuário não for encontrado.
     */
    async findById(id: number) {

        await this.exists(id);
        return this.prisma.usuario.findUnique({
            where: {
                usuario_id: id
            }
        });
    }

    /**
     * Atualiza um usuário usando o método PUT.
     * @param {number} id - O ID do usuário.
     * @param {UpdatePutUsuarioDTO} userData - Dados do usuário a serem atualizados.
     * @returns {Promise<any>} - Uma Promise que resolve com os dados do usuário atualizado.
     * @throws {NotFoundException} - Lança NotFoundException se o usuário não for encontrado.
     */
    async updatePut(id: number, { usuario_email, usuario_nome, usuario_tipo,
        usuario_cpf, usuario_cnpj, usuario_endereco, usuario_status, usuario_cargo }: UpdatePutUsuarioDTO) {
        await this.exists(id);

        return this.prisma.usuario.update({
            data: {
                usuario_email, usuario_nome, usuario_tipo,
                usuario_cpf, usuario_cnpj, usuario_endereco, usuario_status, usuario_cargo
            },
            where: {
                usuario_id: id
            }
        });
    }

    /**
     * Atualiza parcialmente um usuário com base no ID e nos dados fornecidos.
     * @param {number} id - ID do usuário a ser atualizado.
     * @param {UpdatePatchUsuarioDTO} data - Dados do usuário a serem atualizados.
     * @returns {Promise<any>} Promessa que resolve para o usuário atualizado parcialmente.
     */
    async updatePatch(id: number, { usuario_email, usuario_nome, usuario_tipo,
        usuario_cpf, usuario_cnpj, usuario_endereco, usuario_status, usuario_cargo }: UpdatePatchUsuarioDTO) {
        await this.exists(id);

        const data: any = {};
        const updateFields = {
            usuario_email, usuario_nome, usuario_tipo,
            usuario_cpf, usuario_cnpj, usuario_endereco, usuario_status, usuario_cargo
        };

        for (const key in updateFields) {
            if (updateFields[key] !== undefined) {
                switch (key) {
                    case 'birthAt':
                        data.birthAt = new Date(updateFields[key]);
                        break;
                    case 'email':
                        data.email = usuario_email;
                        break;
                    case 'name':
                        data.usuario_nome = usuario_nome;
                        break;
                    case 'role':
                        // data.role = usuario_tipo;
                        break;
                    default:
                        break;
                }
            }
        }

        return this.prisma.usuario.update({
            data,
            where: {
                usuario_id: id
            }
        });
    }


    /**
     * Exclui um usuário pelo ID.
     * @param {number} id - O ID do usuário a ser excluído.
     * @returns {Promise<any>} - Uma Promise que resolve com os dados do usuário excluído.
     * @throws {NotFoundException} - Lança NotFoundException se o usuário não for encontrado.
     */
    async delete(id: number) {
        await this.exists(id);
        return this.prisma.usuario.delete({
            where: {
                usuario_id: id
            }
        });
    }

    /**
     * Verifica se um usuário existe pelo ID.
     * @param {number} id - O ID do usuário.
     * @returns {Promise<void>} - Uma Promise vazia.
     * @throws {NotFoundException} - Lança NotFoundException se o usuário não for encontrado.
     */
    async exists(id: number) {
        if (!(await this.prisma.usuario.count({
            where: {
                usuario_id: id
            }
        }))) {
            throw new NotFoundException(`O usuário ${id} não existe.`)
        }
    }

}