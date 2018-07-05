import { INodeMailer } from '../interfaces/emailer.interface';

export const nodemailerConfig: INodeMailer = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
      user: '@gmail.com',
      pass: ''
  }
};
