import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { verify } from 'jsonwebtoken';

import { SERVER_CONFIG, OWNERSHIP_MODEL_TOKEN, USER_MODEL_TOKEN } from '../../server.constants';
import { IOwnership } from './interfaces/ownership.interface';
import { IUser } from '../user/interfaces/user.interface';
import { JWT } from '../../modules/auth/interfaces/jwtToken.interface';

import { LoggerService } from '../logger/logger.service';

@Injectable()
export class OwnershipService {

  constructor(
    @Inject(OWNERSHIP_MODEL_TOKEN) private readonly ownershipModel: Model<IOwnership>,
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>,
    private readonly loggerService: LoggerService
  ) {}

  /**
   * Отдает все элементы собственности
   */
  public async findAllOwnershipElement() {
    return await this.ownershipModel.find({}, '-_id -updateAt -createAt -__v');
  }

  /**
   * Создает новые экземляр элемента собстенности
   *
   * @param data
   */
  public async createOwnershipElement(data: IOwnership): Promise<IOwnership> {
    const ownership: IOwnership = new this.ownershipModel({...data});
    await ownership.save();
    return ownership;
  }

  /**
   * Обновляет модель экземляра элеметов собственности
   *
   * @param id
   * @param data
   */
  public async updateOwnershipElement(id: number, data: IOwnership): Promise<IOwnership> {
    const ownership = await this.ownershipModel.update(
      { id },
      { $set: {...data} }
    ).exec();
    return ownership;
  }

  /**
   * Покупает владение для пользователя. Если идет докупка, то снимаем созданую прибыль
   *
   * @param id
   * @param token
   */
  public async purchaiseOwnershipElement(id: number, token: string): Promise<any> {
    const { sub } = this.validateToken(token) as JWT;
    const ownerships = await this.ownershipModel.findOne({ id });
    const user = await this.userModel.findOne({ _id: sub });
    if (!ownerships) {
      return false;
    }
    // if (ownerships.price > user.balance.current) {
    //   return { message: 'Not enough money' };
    // }

    const ownership = await this.userModel.findOne({
      '_id': user._id,
      'ownerships._id': ownerships._id
    }, 'ownerships')
    .exec();

    try {
      if (!ownership) {
        await this.loggerService.logOwnershipPurchase(user._id, ownerships.title);

        await this.userModel.update(
          { _id: sub },
          { $push: {
            ownerships: {
              _id: ownerships._id
            }
          }}
        ).exec();
      } else {
        const { count, lastHarvest } = ownership.ownerships.filter((elem: IOwnership) => {
          if (elem._id.toString() === ownerships._id.toString()) {
            return elem;
          }
        }).reduce((prev, key) => key, {});

        const { gainPerHour } = ownerships;

        const now = Date.now(),
              pointPerMinute = gainPerHour / 60;

        const difference = Math.round( ( now - lastHarvest ) / ( 1000 * 60 ) );
        const plenty = Math.round( difference * pointPerMinute );

        if (plenty > 1) {
          await this.userModel.update(
            { _id : user._id },
            { $set : {
              'balance.current': user.balance.current + plenty
            }}
          ).exec();

          const data = {
            income: plenty,
            name: ownerships.title
          };

          await this.loggerService.logOwnershipIncome(user._id, data);
        }

        await this.loggerService.logOwnershipPurchase(user._id, ownerships.title);

        await this.userModel.update(
          { '_id': user._id,
            'ownerships._id': ownerships._id
          }, { $inc: {
            'ownerships.$.count': 1
          }, $set: {
            'ownerships.$.lastHarvest': +Date.now()
          }}
        );
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**
   * Валидирует jwt токен из заголовка
   */
  private validateToken(token: string) {
    return verify(token, SERVER_CONFIG.jwtSecret);
  }
}
