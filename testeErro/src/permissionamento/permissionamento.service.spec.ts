import { Test, TestingModule } from '@nestjs/testing';
import { PermissionamentoService } from './permissionamento.service';

describe('PermissionamentoService', () => {
  let service: PermissionamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionamentoService],
    }).compile();

    service = module.get<PermissionamentoService>(PermissionamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
