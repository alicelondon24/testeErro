import { PartialType } from '@nestjs/swagger';
import { CreatePermissionamentoDto } from './create-permissionamento.dto';

export class UpdatePermissionamentoDto extends PartialType(CreatePermissionamentoDto) {}
