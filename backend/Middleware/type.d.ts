// types.d.ts or a custom type file

import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: any; // Adjust the type based on the shape of your user object
}
