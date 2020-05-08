import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeHashProvider: FakeHashProvider;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
  });

  it('should be able to create a new user', async () => {
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Thiago Marinho',
      email: 'tgmarinho@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('password');
    expect(user.email).toBe('tgmarinho@gmail.com');
  });

  it('should not be able to create new user with the same email from another', async () => {
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const inputUser = {
      name: 'Thiago Marinho',
      email: 'tgmarinho@gmail.com',
      password: '123456',
    };

    await createUser.execute(inputUser);

    await expect(createUser.execute(inputUser)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
