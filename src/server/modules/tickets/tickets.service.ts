import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { verify } from 'jsonwebtoken';

import { SERVER_CONFIG, TICKETS_MODEL_TOKEN, USER_MODEL_TOKEN } from '../../server.constants';
import { IUser } from '../user/interfaces/user.interface';
import { ITicket, IMessage } from './interfaces/ticket.interface';
import { JWT } from '../../modules/auth/interfaces/jwtToken.interface';

@Injectable()
export class TicketsService {
  constructor(
    @Inject(TICKETS_MODEL_TOKEN) private readonly ticketsModel: Model<ITicket>,
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>
  ) {}

  /**
   * Возвращает все тикеты для админа
   */
  async getAllTickets() {
    return await this.ticketsModel.find().exec();
  }

  /**
   * Возвращает все тикеты для определенного пользователя
   *
   * @param token
   */
  async getTickets(token: string) {
    const { sub } = this.validateToken(token) as JWT;
    return await this.ticketsModel.find({ userId: sub }).exec();
  }

  /**
   * Создает новый тикет
   *
   * @param token
   * @param data
   */
  async createTicket(token: string, data: ITicket) {
    const { sub } = this.validateToken(token) as JWT;
    data.messages[0].owner = sub;
    data.userId = sub;
    await new this.ticketsModel(data).save();
    return { status: true };
  }

  /**
   * Обновляет тред тикера
   *
   * @param token
   * @param id
   * @param data
   */
  async updateTicket(token: string, id: number, data: IMessage) {
    const { sub } = this.validateToken(token) as JWT;
    data.owner = sub;
    await this.ticketsModel.update({
      tickerId: id,
      userId: sub
    }, { $push: {
      owner: sub,
      messages: data
    }}).exec();
    return { status: true };
  }

  /**
   * Валидирует jwt токен из заголовка
   */
  private validateToken(token: string) {
    return verify(token, SERVER_CONFIG.jwtSecret);
  }
}
