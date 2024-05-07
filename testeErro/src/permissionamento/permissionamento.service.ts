import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionamentoDto } from './dto/create-permissionamento.dto';
import { UpdatePermissionamentoDto } from './dto/update-permissionamento.dto';
import { PrismaService } from 'src/configuration/prisma/prisma.service';


@Injectable()
export class PermissionamentoService {
  constructor(private readonly prisma: PrismaService) { }

  async getProjetosDoUsuario(id: number){
    return this.prisma.$queryRaw`SELECT projeto.projeto_id, projeto.projeto_descricao
    FROM permissionamento
    INNER JOIN usuario
    ON permissionamento.usuario_id = usuario.usuario_id
    INNER JOIN projeto
    ON permissionamento.projeto_id = projeto.projeto_id
    LEFT JOIN disciplina
    ON permissionamento.projeto_id = disciplina.disciplina_id
    LEFT JOIN grupo
    ON permissionamento.projeto_id = grupo.grupo_id
    LEFT JOIN arquivo
    ON permissionamento.projeto_id = arquivo.arquivo_id
    LEFT JOIN etapa
    ON permissionamento.projeto_id = etapa.etapa_id
    WHERE usuario.usuario_id = ${id}
    GROUP BY projeto.projeto_id`
  }

  async create(data: CreatePermissionamentoDto) {
      return this.prisma.permissionamento.create({ data }); // Altere 'usuario' para 'permissionamento'
  }

  async findAll() {
      return this.prisma.permissionamento.findMany(); // Altere 'usuario' para 'permissionamento'
  }

  async findById(id: number) {
      await this.exists(id);
      return this.prisma.permissionamento.findUnique({ // Altere 'usuario' para 'permissionamento'
          where: {
              permissionamento_id: id // Altere 'usuario_id' para 'permissionamento_id'
          }
      });
  }

  async updatePut(id: number, data: any) { // Ajuste o tipo de 'data' conforme necessário
      await this.exists(id);
      return this.prisma.permissionamento.update({ // Altere 'usuario' para 'permissionamento'
          data,
          where: {
              permissionamento_id: id // Altere 'usuario_id' para 'permissionamento_id'
          }
      });
  }

  async updatePatch(id: number, data: any) { // Ajuste o tipo de 'data' conforme necessário
      await this.exists(id);
      return this.prisma.permissionamento.update({ // Altere 'usuario' para 'permissionamento'
          data,
          where: {
              permissionamento_id: id // Altere 'usuario_id' para 'permissionamento_id'
          }
      });
  }

  async delete(id: number) {
      await this.exists(id);
      return this.prisma.permissionamento.delete({ // Altere 'usuario' para 'permissionamento'
          where: {
              permissionamento_id: id // Altere 'usuario_id' para 'permissionamento_id'
          }
      });
  }

  async exists(id: number) {
      if (!(await this.prisma.permissionamento.count({
          where: {
              permissionamento_id: id // Altere 'usuario_id' para 'permissionamento_id'
          }
      }))) {
          throw new NotFoundException(`A permissionamento ${id} não existe.`); // Ajuste a mensagem de erro para permissionamento
      }
  }
}
