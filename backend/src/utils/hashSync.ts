import bcrypt from 'bcrypt';

const hashSync = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

export default hashSync;
