import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './create-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    addUser: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    getUserById: jest.fn(id => {
      return {
        id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '1234567890',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = { name: 'John Doe', email: 'johndoe@example.com', phone: '1234567890' };
    expect(await controller.addUser(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });

    expect(service.addUser).toHaveBeenCalledWith(dto);
  });

  it('should get a user by ID', async () => {
    const result = await controller.getUser('1');
    expect(result).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '1234567890',
    });

    expect(service.getUserById).toHaveBeenCalledWith('1');
  });
});
