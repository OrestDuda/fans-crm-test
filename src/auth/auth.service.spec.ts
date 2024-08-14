import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockJwtToken'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a valid JWT token', async () => {
    const result = await service.login({ username: 'testuser', userId: '123' });
    expect(result.access_token).toBe('mockJwtToken');
    expect(jwtService.sign).toHaveBeenCalledWith({ username: 'testuser', sub: '123' });
  });

  it('should validate the user', async () => {
    const payload = { username: 'testuser', sub: '123' };
    const result = await service.validateUser(payload);
    expect(result).toEqual({ userId: '123', username: 'testuser' });
  });
});
