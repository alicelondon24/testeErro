import { CanActivate, ExecutionContext, Inject, Injectable, forwardRef } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { UsuarioService } from "../../usuario/usuario.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly usuarioService: UsuarioService
    ) { }

    /**
     * Determina se o usuário está autenticado e possui permissão para acessar o recurso.
     * @param {ExecutionContext} context - Contexto de execução da requisição.
     * @returns {Promise<boolean>} Promessa que resolve para true se o usuário estiver autenticado e tiver permissão, caso contrário, false.
     */
    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;
        try {
            const data = this.authService.checkToken((authorization ?? '').split(' ')[1]);

            request.tokenPayload = data;

            request.user = await this.usuarioService.findById(data.id);

            return true;

        } catch (error) {
            return false;
        }
    }

}