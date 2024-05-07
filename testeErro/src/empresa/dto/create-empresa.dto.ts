import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MaxLength, IsOptional, MinLength } from "class-validator";

export class CreateEmpresaDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(300)
    empresa_nome: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MinLength(14)
    @MaxLength(14)
    empresa_cnpj?: string;
}
