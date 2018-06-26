import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import * as moment from 'moment';

import { STATISTICS_MODEL_TOKEN, USER_MODEL_TOKEN } from '../../server.constants';
import { IStatisticsLogSchema } from './interfaces/statistics.interface';
import { IUser } from '../user/interfaces/user.interface';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Injectable()
export class StatisticsService {
  constructor(
    @Inject(STATISTICS_MODEL_TOKEN) private readonly statisticsModel: Model<IStatisticsLogSchema>,
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>
  ) {}

  /**
   * Собирает всю статистику за день когда запускается крон
   */
  public async gatherStatistics() {
    const today = moment.utc( moment(new Date()).startOf('day') ).toISOString();
    const tomorrow = moment.utc( moment(new Date()).add(1, 'days').startOf('day') ).toISOString();
    const statistics = await this.statisticsModel.findOne({
      createdAt: {
        $gte: new Date(today),
        $lt: new Date(tomorrow)
      }
    }).exec();

    if (!statistics) {
      const users = await this.userModel.find({}, '_id balance.current local.email');
      await new this.statisticsModel({
        users
      }).save();
    }
  }

  /**
   * Получаем статистику за день
   */
  public async getStatistics(period: number) {
    const today = moment.utc( moment(new Date()).add(-1, 'days').startOf('day') ).toISOString();
    const tomorrow = moment.utc( moment(new Date()).add(1, 'days').startOf('day') ).toISOString();

    const aimDayStart = moment.utc( moment(new Date()).add(-period, 'days').startOf('day') ).toISOString();
    const aimDayEnd = moment.utc( moment(new Date()).add(-period, 'days').endOf('day') ).toISOString();

    const statisticsFirstBuffer = await this.statisticsModel.aggregate(
      { $match: {
        createdAt: {
          $gte: new Date(today),
          $lt: new Date(tomorrow)
        }
      }},
      { $unwind: '$users'}, {
        $sort: {
          'users.balance.current': -1
        }},
      { $project: {
        id: '$users._id',
        current: '$users.balance.current',
        email: '$users.local.email'
      }
    }).exec();
    const statisticsSecondBuffer = await this.statisticsModel.aggregate(
      { $match: {
        createdAt: {
          $gte: new Date(aimDayStart),
          $lt: new Date(aimDayEnd)
        }
      }}, { $unwind: '$users' },
      { $sort: {
          'users.balance.current': -1
      }},
      { $project: {
        id: '$users._id',
        current: '$users.balance.current',
        email: '$users.local.email'
      }
    }).exec();

    const comparedBuffer: any[] = [];

    statisticsFirstBuffer.forEach((elem: any) => {
      statisticsSecondBuffer.forEach((subelem: any) => {
        if (subelem.id.toString() === elem.id.toString()) {
          const a = +elem.current.toFixed(2);
          const b = +subelem.current.toFixed(2);
          const c = elem.current ? +elem.current.toFixed(2) : 1; // чтобы не делить на ноль
          let compared = 0;
          if (a < b) {
            compared = -((b - a) / c) * 100;
          } else if (a > b) {
            compared = ((a - b) / c) * 100;
          }
          comparedBuffer.push({
            compared,
            email: elem.email
          });
        }
      });
    });

    return comparedBuffer.sort((a, b) => a.compared - b.compared).reverse();
  }
}
