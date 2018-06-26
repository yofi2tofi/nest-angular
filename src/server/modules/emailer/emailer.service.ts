import { Injectable, Inject } from '@nestjs/common';

import { MailOptions } from './interfaces/mail.options.interface';
import { MAILER_CONFIG_TOKEN } from '../../server.constants';

@Injectable()
export class EmailerService {
  constructor(
    @Inject(MAILER_CONFIG_TOKEN) private readonly nodemailer: any
  ) {}

  /**
   * Отправляет письмо с подтверждением почты
   *
   * @param email
   * @param url
   */
  async sendCorfimedMail(email: string, url: string) {
    const mailOptions: MailOptions = {
      to: email,
      subject: 'Подтверждение почты',
      text: 'link на подтверждение почты'
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

  /**
   * Отправляет письми с линком на сброс пароля
   *
   * @param email
   * @param url
   */
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
