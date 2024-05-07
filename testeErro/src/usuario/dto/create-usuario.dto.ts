import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { Role } from '../../enums/usuario_tipo.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(300)
    usuario_nome: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    usuario_email: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MinLength(11)
    @MaxLength(11)
    usuario_cpf?: string;

    @ApiProperty()
    @IsString()
    @MinLength(14)
    @MaxLength(14)
    usuario_cnpj: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(100)
    usuario_endereco?: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    usuario_status?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(45)
    usuario_cargo?: string;

    @ApiProperty()
    @IsOptional()
    empresa_id: number;
    
    @ApiProperty()
    @IsOptional()
    @IsEnum(Role)
    usuario_tipo?: Role;
}
