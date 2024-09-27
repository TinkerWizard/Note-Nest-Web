import jwt from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET ?? '';
export const generateToken = (user: { id: string; username: string }) => {
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.sign({ id: user.id, username: user.username }, secret, {
    expiresIn: '1h', // Token expires in 1 hour
  });
};

export const verifyToken = (token: string) => {
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  try {
    // jwt.verify throws an error if the token is invalid or expired
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};