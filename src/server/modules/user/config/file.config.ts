const multer = require('multer');

import { Request } from 'express';
import { verify } from 'jsonwebtoken';

import { SERVER_CONFIG } from '../../../server.constants';
import { JWT } from '../../auth/interfaces/jwtToken.interface';
import { generateSalt, generateHash } from '../../../utilities/encryption';

export const UploadConfig = {
  storage: multer.diskStorage({
    destination: (req: Request, file: any, cb: Function) => {
      cb(null, './assets/img');
    },
    filename: (req: Request, file: any, cb: Function) => {
      const { headers: { authorization }} = req;
      const { sub } = verify(authorization as string, SERVER_CONFIG.jwtSecret) as JWT;
      const url = generateHash(generateSalt(), sub);

      cb(null, url + '.jpg');
    }
  }),
  limits: {
    fileSize: 1048576
  },
  fileFilter: (req: Request, file: any, cb: Function) => {
    if (file.mimetype !== 'image/jpeg') {
      cb(new Error('Wrong mimetype'));
    }

    cb(null, true);
  },
  preservePath: true
};
