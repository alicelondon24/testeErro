import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { EmpresaService } from "./empresa.service"; // Importe o serviço da empresa
import { ParamId } from "../configuration/decorators/param-id.decorator";
import { Roles } from "../configuration/decorators/roles.decorator";
import { RoleGuard } from "../configuration/guards/role.guard";
import { CreateEmpresaDto } from "./dto/create-empresa.dto";

@Controller('empresa') // Altere o caminho para 'empresas'
export class EmpresaController { // Renomeie a classe para EmpresaController

  constructor(private empresaService: EmpresaService) { } // Altere o serviço para EmpresaService

  @Post()
  async create(@Body() data: CreateEmpresaDto) { // Altere o DTO para CreateEmpresaDTO
    return this.empresaService.create(data); // Altere o serviço para empresaService
  }

  @Get()
  async getAll() {
    return this.empresaService.findAll(); // Altere o serviço para empresaService
  }

  @Get(':id')
  async findById(@ParamId() id: number) {
    return this.empresaService.findById(id); // Altere o serviço para empresaService
  }

  @Put(':id')
  async updatePut(@Body() data: any, @Param('id', ParseIntPipe) id: number) { // Ajuste o tipo de 'data' conforme necessário
    return this.empresaService.updatePut(id, data); // Altere o serviço para empresaService
  }

  @Patch(':id')
  async updatePatch(@Body() data: any, @Param('id', ParseIntPipe) id: number) { // Ajuste o tipo de 'data' conforme necessário
    return this.empresaService.updatePatch(id, data); // Altere o serviço para empresaService
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.empresaService.delete(id); // Altere o serviço para empresaService
  }
}
