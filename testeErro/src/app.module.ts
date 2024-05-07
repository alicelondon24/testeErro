import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailerModule } from "@nestjs-modules/mailer";
import { MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./configuration/auth/auth.module";
import { DisciplinaModule } from "./disciplina/disciplina.module";
import { EmpresaModule } from "./empresa/empresa.module";
import { UsuarioModule } from "./usuario/usuario.module";
import { PermissionamentoModule } from './permissionamento/permissionamento.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 6,
    }]),
    forwardRef(() => UsuarioModule),
    forwardRef(() => EmpresaModule),
    forwardRef(() => AuthModule),
    forwardRef(() => PermissionamentoModule),
    MailerModule.forRoot({
      // https://ethereal.email/create
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'blanche.kuvalis57@ethereal.email',
          pass: 'aeGHbbpg3HFJThTrVx'
        }
      },
      defaults: {
        from: '"Mackenzie" <blanche.kuvalis57@ethereal.email>',
      },
      template: {
        dir: __dirname + "/templates",
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    DisciplinaModule,
    EmpresaModule,
    PermissionamentoModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
  exports: [AppService]
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL
    });
  }
}