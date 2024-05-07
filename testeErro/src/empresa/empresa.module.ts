import { Module, forwardRef } from '@nestjs/common';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';
import { AuthModule } from '../configuration/auth/auth.module';
import { PrismaModule } from '../configuration/prisma/prisma.module';


@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [EmpresaController],
  providers: [EmpresaService],
  exports: [EmpresaService]
})
export class EmpresaModule { }
