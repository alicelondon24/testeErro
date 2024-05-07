import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionamentoService } from './permissionamento.service';
import { CreatePermissionamentoDto } from './dto/create-permissionamento.dto';
import { UpdatePermissionamentoDto } from './dto/update-permissionamento.dto';

@Controller('permissionamento')
export class PermissionamentoController {
  constructor(private readonly permissionamentoService: PermissionamentoService) {}

  @Post()
  create(@Body() createPermissionamentoDto: CreatePermissionamentoDto) {
    return this.permissionamentoService.create(createPermissionamentoDto);
  }

  @Get()
  findAll() {
    return this.permissionamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionamentoService.findById(+id);
  }

  @Get(':projeto_usuario_id')
  getProjetosDoUsuario(@Param('projeto_usuario_id') id: string) {
    return this.permissionamentoService.getProjetosDoUsuario(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionamentoDto: UpdatePermissionamentoDto) {
    return this.permissionamentoService.updatePatch(+id, updatePermissionamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionamentoService.delete(+id);
  }
}
