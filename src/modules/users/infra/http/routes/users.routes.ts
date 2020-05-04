import { Router, request } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
//import { getRepository } from 'typeorm'; usar somente se for listar os usuarios
// import User from '@modules/users/infra/typeorm/entities/User';

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

/*usersRouter.get('/', async (request, response) => {
  const usersRepository = getRepository(User);

  const users = await usersRepository.find();



  return response.json(users);
});*/

usersRouter.post('/', async (request, response) => {

  const {name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name, email, password
  })

  delete user.password;

  return response.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {

  const updateUserAvatar = new UpdateUserAvatarService();

  const user = await updateUserAvatar.execute({
    user_id: request.user.id,
    avatarFilename: request.file.filename
  });
  return response.json(user);
});
export default usersRouter;
