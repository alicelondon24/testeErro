import { Test, TestingModule } from '@nestjs/testing';
import { PermissionamentoController } from './permissionamento.controller';
import { PermissionamentoService } from './permissionamento.service';

describe('PermissionamentoController', () => {
  let controller: PermissionamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionamentoController],
      providers: [PermissionamentoService],
    }).compile();

    controller = module.get<PermissionamentoController>(PermissionamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
