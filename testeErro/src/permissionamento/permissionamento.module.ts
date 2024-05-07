import { Module, forwardRef } from '@nestjs/common';
import { PermissionamentoService } from './permissionamento.service';
import { PermissionamentoController } from './permissionamento.controller';
import { PrismaModule } from 'src/configuration/prisma/prisma.module';
import { AuthModule } from 'src/configuration/auth/auth.module';

@Module({
  
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [PermissionamentoController],
  providers: [PermissionamentoService],
  exports: [PermissionamentoService]
})
export class PermissionamentoModule {}
