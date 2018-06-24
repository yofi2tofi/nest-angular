import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { verify } from 'jsonwebtoken';

import { SERVER_CONFIG, CONTRIBUTION_MODEL_TOKEN, CONTRIBUTIONLOGS_MODEL_TOKEN, USER_MODEL_TOKEN } from '../../server.constants';
import { IUser } from '../user/interfaces/user.interface';
import { JWT } from '../../modules/auth/interfaces/jwtToken.interface';

import { IContribution } from './interfaces/contribution.interface';
import { IContributionLog } from './interfaces/contribution.log.interface';

@Injectable()
export class ContributionService {

  constructor(
    @Inject(CONTRIBUTIONLOGS_MODEL_TOKEN) private readonly contributionLogModel: Model<IContributionLog<IContribution>>,
    @Inject(CONTRIBUTION_MODEL_TOKEN) private readonly contributionModel: Model<IContribution>,
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>
  ) {}

  /**
   * Получаем все данные о планах
   */
  async findAllContributionPlan(): Promise<IContribution[]> {
    return await this.contributionModel.find({}, '-_id -updateAt -createAt -__v');
  }

  /**
   * Создает новый план
   *
   * @param data
   */
  async createContributionElement(data: IContribution): Promise<IContribution | BadRequestException> {
    if (data.min >= data.max) {
      return new BadRequestException('min could be much then max');
    }
    const contribution: IContribution = new this.contributionModel({...data});
    await contribution.save();
    return contribution;
  }

  /**
   * Обновляет модель документа план
   *
   * @param id
   * @param data
   */
  public async updateContributionElement(id: number, data: IContribution): Promise<IContribution | BadRequestException> {
    if (data.min >= data.max) {
      return new BadRequestException('min could be much then max');
    }
    await this.contributionModel.update(
      { id },
      { $set: {...data} }
    ).exec();

    const contribution = this.contributionModel.findOne({ id }, '-_id -updateAt -createAt -__v');

    return contribution;
  }

  /**
   * Покупает план для пользователя. Если идет докупка, то добавляем
   *
   * @param id
   * @param token
   */
  public async purchaiseContributionElement(value: number, token: string): Promise<IUser | BadRequestException> {
    const { sub } = this.validateToken(token) as JWT;
    const contribution = await this.contributionModel.findOne({
      min: { $lte: value },
      max: { $gte: value }
    });
    const user = await this.userModel.findOne({ _id: sub });
    if (user.balance.current <= value) {
      return new BadRequestException('Not have much resource');
    }

    const contributionLog = await new this.contributionLogModel({
      сontribution: contribution._id,
      foundation: value,
      takeTime: Date.now(),
      closeTime: Date.now() + contribution.duration,
      isActive: true
    }).save();

    await this.userModel.update(
      { _id: sub },
      { $push: {
        сontributions: {
          _id: contributionLog._id
        }
      }, $set: {
        'balance.current': user.balance.current - value
      }}
    ).exec();

    return await this.userModel.findOne({ _id: sub }).populate({ path: 'сontributions', model: 'ContributionLog' }).exec();
  }

  /**
   * Закрывает план пользователя, начисляет ресурсы
   *
   * @TODO отправлить с модуль почты, оповещать о закрытии плана
   */
  public async cronContributionElement(): Promise<any> {
    const contributionLogs = await this.contributionLogModel.find({
      isActive: true,
      closeTime: { $lte: Date.now() }
    }).populate({ path: 'сontribution', model: 'Contribution' }).exec();

    contributionLogs.forEach( async (elem: IContributionLog<IContribution>) => {
      const income = elem.foundation / 100 * elem.сontribution.accruals;
      await this.userModel.update(
        { сontributions: elem._id},
        { $inc: {
          'balance.current': income
        }}
      ).exec();

      await this.contributionLogModel.update(
        { _id: elem._id },
        { $set: {
          isActive: false
        }}
      ).exec();
    });
  }

  /**
   * Валидирует jwt токен из заголовка
   */
  private validateToken(token: string) {
    return verify(token, SERVER_CONFIG.jwtSecret);
  }
}
