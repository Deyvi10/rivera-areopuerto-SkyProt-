import { Test, TestingModule } from '@nestjs/testing';
import { AerolineasService } from './aerolineas.service';

describe('AerolineasService', () => {
  let service: AerolineasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AerolineasService],
    }).compile();

    service = module.get<AerolineasService>(AerolineasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
