import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './user.model';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    addUser: jest.fn((user: User) => {
      return {
        id: Date.now(),
        ...user,
      };
    }),
    getUserById: jest.fn((id: string) => {
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
    const user: User = { name: 'John Doe', email: 'johndoe@example.com', phone: '1234567890' } as User;
    expect(await controller.addUser(user)).toEqual({
      id: expect.any(Number),
      ...user,
    });

    expect(service.addUser).toHaveBeenCalledWith(user);
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
