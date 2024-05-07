import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { Role } from '../enums/usuario_tipo.enum';

import { CreateUsuarioDTO } from "./dto/create-usuario.dto";
import { UpdatePatchUsuarioDTO } from "./dto/update-patch-usuario.dto";
import { UpdatePutUsuarioDTO } from "./dto/update-put-usuario.dto";
import { UsuarioService } from "./usuario.service";
import { ParamId } from "../configuration/decorators/param-id.decorator";
import { Roles } from "../configuration/decorators/roles.decorator";
import { AuthGuard } from "../configuration/guards/auth.guard";
import { RoleGuard } from "../configuration/guards/role.guard";

// @Roles(Role.Admin)
// @UseInterceptors(LogInterceptor)
// @UseGuards(AuthGuard, RoleGuard)
@Controller('usuario')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) { }

    /**
     * Cria um novo usuário.
     * @param {CreateUserDTO} data - Dados para criar um novo usuário.
     * @returns {Promise<any>} Promessa que resolve para o usuário criado.
     */
    // @Roles(Role.Admin)
    @Post()
    async create(@Body() data: CreateUsuarioDTO) {
        return this.usuarioService.create(data);
    }

    /**
     * Obtém todos os usuários.
     * @returns {Promise<any>} Promessa que resolve para uma array de usuários.
     */
    @Roles(Role.Admin, Role.User)
    @Get()
    async getAll() {
        return this.usuarioService.findAll();
    }

    /**
     * Encontra um usuário pelo ID.
     * @param {number} id - ID do usuário.
     * @returns {Promise<any>} Promessa que resolve para o usuário encontrado.
     */
    @Roles(Role.Admin)
    @Get(':id')
    async findById(@ParamId() id: number) {
        console.log({ id });
        return this.usuarioService.findById(id);
    }

    /**
     * Atualiza um usuário usando o método PUT.
     * @param {UpdatePutUserDTO} data - Dados para atualizar o usuário.
     * @param {number} id - ID do usuário.
     * @returns {Promise<any>} Promessa que resolve para o usuário atualizado.
     */
    @Roles(Role.Admin)
    @Put(':id')
    async updatePut(@Body() data: UpdatePutUsuarioDTO, @Param('id', ParseIntPipe) id: number) {

        return this.usuarioService.updatePut(id, data);
    }

    /**
     * Atualiza um usuário usando o método PATCH.
     * @param {UpdatePatchUserDTO} data - Dados para aplicar patch no usuário.
     * @param {number} id - ID do usuário.
     * @returns {Promise<any>} Promessa que resolve para o usuário com patch aplicado.
     */
    @Roles(Role.Admin)
    @Patch(':id')
    async updatePatch(@Body() data: UpdatePatchUsuarioDTO, @Param('id', ParseIntPipe) id: number) {
        return this.usuarioService.updatePatch(id, data);
    }

    /**
     * Exclui um usuário pelo ID.
     * @param {number} id - ID do usuário.
     * @returns {Promise<any>} Promessa que resolve para o usuário excluído.
     */
    @Roles(Role.Admin)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.usuarioService.delete(id);
    }

}