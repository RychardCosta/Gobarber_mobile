import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import uploadConfig from '../config/upload';
import ensureAuthenticate from '../middlewires/ensureAuthenticate';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });
    delete user.password;
    return response.json(user);
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

usersRoutes.patch(
  '/',
  ensureAuthenticate,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      });

      delete user.password;

      return response.json(user);
    } catch (err) {
      return response.status(err.statusCode).json({ error: err.message });
    }
  },
);

export default usersRoutes;
