import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../infra/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../infra/dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
