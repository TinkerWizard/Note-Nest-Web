import jwt from 'jsonwebtoken';

// const secret = process.env.JWT_SECRET;
const secret = '4b3e57d1b12e9837c9f7e4a2f9b8e6c7d1e5b9f3a4c8d7f6e2b3c4f5';
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
    console.log("JWT_SECRET-----------------", secret);
    throw new Error('JWT_SECRET is not defined');
  }

  try {
    // jwt.verify throws an error if the token is invalid or expired
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};