import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { OWNERSHIP_MODEL_TOKEN } from '../../server.constants';
import { IOwnership } from './interfaces/ownership.interface';

@Injectable()
export class OwnershipService {

  constructor(
    @Inject(OWNERSHIP_MODEL_TOKEN) private readonly ownershipModel: Model<IOwnership>
  ) {}

  /**
   * Отдает все элементы собственности
   */
  public async findAllOwnershipElement() {
    return await this.ownershipModel.find({}, '-_id -updateAt -createAt -__v -grade._id');
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
}
