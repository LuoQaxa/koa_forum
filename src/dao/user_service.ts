import { getRepository, getConnection, getManager } from 'typeorm';
import { User_Entity } from '../entity/user';

interface user {
  name: string,
  password: string
}

const find_user = async (user: user) => {
  const userRepository = getRepository(User_Entity);
  const result = await userRepository.findOne({ name: user.name });
  return result;
}

const add_new_user = async (user: user) => {
  const userRepository = getRepository(User_Entity);
  await userRepository.save(user);
  let newUser = await userRepository.findOne({ name: user.name });
  return newUser;
}

export default {
  add_new_user,
  find_user
}