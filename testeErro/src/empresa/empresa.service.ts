import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../configuration/prisma/prisma.service";
import { CreateEmpresaDto } from "./dto/create-empresa.dto";


@Injectable()
export class EmpresaService { // Renomeie a classe para EmpresaService

    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateEmpresaDto) {
        return this.prisma.empresa.create({ data }); // Altere 'usuario' para 'empresa'
    }

    async findAll() {
        return this.prisma.empresa.findMany(); // Altere 'usuario' para 'empresa'
    }

    async findById(id: number) {
        await this.exists(id);
        return this.prisma.empresa.findUnique({ // Altere 'usuario' para 'empresa'
            where: {
                empresa_id: id // Altere 'usuario_id' para 'empresa_id'
            }
        });
    }

    async updatePut(id: number, data: any) { // Ajuste o tipo de 'data' conforme necessário
        await this.exists(id);
        return this.prisma.empresa.update({ // Altere 'usuario' para 'empresa'
            data,
            where: {
                empresa_id: id // Altere 'usuario_id' para 'empresa_id'
            }
        });
    }

    async updatePatch(id: number, data: any) { // Ajuste o tipo de 'data' conforme necessário
        await this.exists(id);
        return this.prisma.empresa.update({ // Altere 'usuario' para 'empresa'
            data,
            where: {
                empresa_id: id // Altere 'usuario_id' para 'empresa_id'
            }
        });
    }

    async delete(id: number) {
        await this.exists(id);
        return this.prisma.empresa.delete({ // Altere 'usuario' para 'empresa'
            where: {
                empresa_id: id // Altere 'usuario_id' para 'empresa_id'
            }
        });
    }

    async exists(id: number) {
        if (!(await this.prisma.empresa.count({
            where: {
                empresa_id: id // Altere 'usuario_id' para 'empresa_id'
            }
        }))) {
            throw new NotFoundException(`A empresa ${id} não existe.`); // Ajuste a mensagem de erro para empresa
        }
    }
}
