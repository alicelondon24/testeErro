import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MaxLength, IsOptional, MinLength, IsInt } from "class-validator";


export class CreatePermissionamentoDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    permissionamento_id:   number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(4)
    permissionamento_tipo: string

    @ApiProperty()
    @IsInt()
    projeto_id:            number

    @ApiProperty()
    @IsInt()
    disciplina_id:         number

    @ApiProperty()
    @IsInt()
    grupo_id:              number

    @ApiProperty()
    @IsString()
    arquivo_id:            string

    @ApiProperty()
    @IsInt()
    etapa_id:              number 

    @ApiProperty()
    @IsInt()
    usuario_id:            number
}
