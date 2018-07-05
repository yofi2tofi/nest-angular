
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { verify } from 'jsonwebtoken';

import { LOGS_MODEL_TOKEN, SERVER_CONFIG } from '../../server.constants';
import { ILogger } from './interfaces/logger.interface';

@Injectable()
export class LoggerService {
  options = {
    upsert: true,
    multi: false
  };

  constructor(
    @Inject(LOGS_MODEL_TOKEN) private readonly loggerModel: Model<ILogger>,
  ) {}

  /**
   * Лог регистрации
   *
   * @param userId
   */
  public async logRegistration(userId: string): Promise<any> {
    const data = {
      info: `Пройденна регистрация`
    };
    await this.updater(userId, data);
  }

  /**
   * Логируем вход
   *
   * @param userId
   */
  public async logAuth(userId: string): Promise<any> {
    const data = {
      info: `Вход в личный кабинет`
    };
    await this.updater(userId, data);
  }

  /**
   * Лог изменения пароля
   *
   * @param userId
   */
  public async logChangePass(userId: string): Promise<any> {
    const data = {
      info: `Смена пароля`
    };
    await this.updater(userId, data);
  }

  /**
   * Лог сброса пароля
   *
   * @param userId
   */
  public async logResetPass(userId: string): Promise<any> {
    const data = {
      info: `Сброс пароля`
    };
    await this.updater(userId, data);
  }

  /**
   * Подтверждение почты
   *
   * @param userId
   */
  public async logConfirmEmail(userId: string): Promise<any> {
    const data = {
      info: `Подтверждение почты`
    };
    await this.updater(userId, data);
  }

  /**
   * Обновление аватара
   *
   * @param userId
   */
  public async logAvatar(userId: string): Promise<any> {
    const data = {
      info: `Обновление аватара`
    };
    await this.updater(userId, data);
  }

  /**
   * Обновление настроек
   *
   * @param userId
   */
  public async logChangeSettings(userId: string): Promise<any> {
    const data = {
      info: `Обновление настроек пользователя и кошельков`
    };
    await this.updater(userId, data);
  }

  /**
   * Запрос на ввод
   *
   * @param userId
   */
  public async logTransaction(userId: string): Promise<any> {
    const data = {
      info: `Запрос на ввод`
    };
    await this.updater(userId, data);
  }

  /**
   * Лог успешного зачисления
   *
   * @param {string} userId
   */
  public async logIncomeFund(userId: string, amount: string): Promise<any> {
    const data = {
      info: `Успешно зачисленно ${amount}`
    };
    await this.updater(userId, data);
  }

  /**
   * Зачисление от рефа
   *
   * @param {string} userId
   * @param {string} amount
   */
  public async logIncomeRef(userId: string, amount: number, refId: string): Promise<any> {
    const data = {
      info: `Успешно зачисленно ${amount} от ${refId}`
    };
    await this.updater(userId, data);
  }

  /**
   * Лог вклада
   *
   * @param {string} userId
   */
  public async logContributionOpen(userId: string): Promise<any> {
    const data = {
      info: `Успешно открыт или дополнен вклад`
    };
    await this.updater(userId, data);
  }

  /**
   * Лог закрытия вклада и пополнение
   *
   * @param {string} userId
   * @param {number} income
   */
  public async logContributionIncome(userId: string, income: number): Promise<any> {
    const data = {
      info: `Успешно закрыт вклад, начисленно ${income}`
    };
    await this.updater(userId, data);
  }

  /**
   * Лог зачисления профита
   *
   * @param userId
   * @param info
   */
  public async logOwnershipIncome(userId: string, info: any): Promise<any> {
    const data = {
      info: `Успешно начисленно ${info.income} c элемента ${info.name}`
    };
    await this.updater(userId, data);
  }

  /**
   * Лог приобретения собственности
   *
   * @param userId
   * @param name
   */
  public async logOwnershipPurchase(userId: string, name: string): Promise<any> {
    const data = {
      info: `Приобретенна собственность ${name}`
    };
    await this.updater(userId, data);
  }

  /**
   * Общий апдейтер для документов
   *
   * @param userId
   * @param data
   */
  private async updater(userId: string, data: any): Promise<any> {
    await this.loggerModel.update(
      { userId },
      { $push: {
        logs: data
      }},
      this.options
    ).exec();
  }
}
