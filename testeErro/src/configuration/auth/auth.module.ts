import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "../prisma/prisma.module";
import { UsuarioModule } from "../../usuario/usuario.module";
import { FileModule } from "../../file/file.module";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET
        }), forwardRef(() => UsuarioModule),
        PrismaModule,
        FileModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule { }