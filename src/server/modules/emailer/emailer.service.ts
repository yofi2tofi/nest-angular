import { Injectable, Inject } from '@nestjs/common';

import { MailOptions } from './interfaces/mail.options.interface';
import { MAILER_CONFIG_TOKEN } from '../../server.constants';

@Injectable()
export class EmailerService {
  constructor(
    @Inject(MAILER_CONFIG_TOKEN) private readonly nodemailer: any
  ) {}

  async sendResetMail(email: string, url: string) {
    const mailOptions: MailOptions = {
      to: email,
      subject: 'Сброс пароля',
      text: 'link на ресет пароля'
    };

    this.nodemailer.sendMail(mailOptions, (error: any, response: any) => {
      if (error) {
        console.log(error);
      }
      if (response) {
        console.log('res', response);
      }
    });
  }
}
