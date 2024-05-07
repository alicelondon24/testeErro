import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { usuario } from "@prisma/client";
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from "../prisma/prisma.service";
import { UsuarioService } from "../../usuario/usuario.service";

@Injectable()
export class AuthService {

    private issuer = 'login';
    private audience = 'usuarios';

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly usuarioService: UsuarioService,
        private readonly mailer: MailerService
    ) { }

    /**
     * Cria um token de acesso com base nos dados do usuário.
     * @param {usuario} usuario - Dados do usuário.
     * @returns {Object} Objeto contendo o token de acesso.
     */
    createToken(usuario: usuario) {
        return {
            acessToken: this.jwtService.sign({
                id: usuario.usuario_id,
                name: usuario.usuario_nome,
                email: usuario.usuario_email
            }, {
                expiresIn: '1 days',
                subject: String(usuario.usuario_id),
                issuer: this.issuer,
                audience: this.audience
            })
        }
    }

    /**
     * Verifica a validade de um token.
     * @param {string} token - Token a ser verificado.
     * @returns {Object} Dados do token se for válido.
     * @throws {BadRequestException} Lança uma exceção se o token for inválido.
     */
    checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
                audience: this.audience,
                issuer: this.issuer,
            });
            return data;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    /**
     * Verifica se um token é válido.
     * @param {string} token - Token a ser verificado.
     * @returns {boolean} true se o token for válido, false caso contrário.
     */
    isValidToken(token: string) {
        try {
            this.checkToken(token)
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Autentica um usuário com base no e-mail e senha fornecidos.
     * @param {string} email - E-mail do usuário.
     * @param {string} password - Senha do usuário.
     * @returns {Promise<any>} Promessa que resolve para o token de acesso gerado após a autenticação bem-sucedida.
     * @throws {UnauthorizedException} Exceção se o e-mail ou senha estiverem incorretos.
     */
    async login(email: string, password: string) {
        const usuario = await this.prisma.usuario.findFirst({
            where: {
                usuario_email: email
            }
        });

        if (!usuario) {
            throw new UnauthorizedException("E-mail e/ou senha incorretos.");
        }

        return this.createToken(usuario);
    }

    /**
     * Envia um e-mail para redefinição de senha do usuário.
     * @param {string} email - O endereço de e-mail do usuário solicitando a redefinição de senha.
     * @returns {Promise<boolean>} - Uma Promise indicando se o e-mail de redefinição de senha foi enviado com sucesso.
     */
    async forget(email: string) {
        const usuario = await this.prisma.usuario.findFirst({
            where: {
                usuario_email: email
            }
        });
        if (!usuario) {
            throw new UnauthorizedException("E-mail está incorreto.");
        }

        const token = this.jwtService.sign({
            id: usuario.usuario_id
        }, {
            expiresIn: '30 minutes',
            subject: String(usuario.usuario_id),
            issuer: 'forget',
            audience: 'usuarios',
        });
        await this.mailer.sendMail({
            subject: 'Recuperação de Senha',
            to: 'mackenzie.max.rj@gmail.com',
            template: 'forget',
            context: {
                nome: usuario.usuario_nome,
                token
            }
        });

        return true;
    }

    /**
     * Registra um novo usuário.
     * @param {AuthRegisterDTO} data - Dados do usuário a serem registrados.
     * @returns {Object} Objeto contendo o token de acesso.
     */
    async register(data: AuthRegisterDTO) {
        delete data.usuario_tipo;
        const usuario = await this.usuarioService.create(data);
        return this.createToken(usuario);
    }

}