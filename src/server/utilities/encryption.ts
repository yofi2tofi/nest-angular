import { randomBytes, createHmac } from 'crypto';

const generateSalt: () => string = () => {
  return randomBytes(128).toString('base64');
};

const generateHashedPassword: (salt: string, password: string) => string = (salt, password) => {
  return createHmac('sha256', salt).update(password).digest('hex');
};

const generateHashedRefUrl: (salt: string, email: string) => string = (salt, email) => {
  return createHmac('sha256', salt).update(email).digest('hex');
};

const generateHashedResetUrl: (salt: string, id: string) => string = (salt, id) => {
  const date = (+new Date()).toString();
  const hmac = createHmac('sha256', salt).update(id).digest('hex');
  return createHmac('sha256', hmac).update(date).digest('hex');
};

export {
  generateSalt,
  generateHashedPassword,
  generateHashedRefUrl,
  generateHashedResetUrl
};
