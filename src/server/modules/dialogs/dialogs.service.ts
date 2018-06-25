import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { verify } from 'jsonwebtoken';

import { SERVER_CONFIG, DIALOGS_MODEL_TOKEN, USER_MODEL_TOKEN } from '../../server.constants';
import { IUser } from '../user/interfaces/user.interface';
import { IDialog, IMessage } from './interfaces/dialog.interface';
import { JWT } from '../../modules/auth/interfaces/jwtToken.interface';
import { generateSalt, generateDialogHash } from '../../utilities/encryption';

@Injectable()
export class DialogsService {
  constructor(
    @Inject(DIALOGS_MODEL_TOKEN) private readonly dialogsModel: Model<IDialog>,
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>
  ) {}

  /**
   * Возращает все диалоги юзера
   *
   * @param token
   */
  public async findAllPrivateDialogs(token: string) {
    const { sub } = this.validateToken(token) as JWT;
    return await this.dialogsModel.find({ ids: sub }, '-_id -updateAt -createAt -__v');
  }

  /**
   * Отдает определенный диалог
   *
   * @param id
   */
  public async findPrivateDialog(_id: string) {
    return await this.dialogsModel.findOne({ _id }, '-_id -updateAt -createAt -__v');
  }

  /**
   * Создает диалог
   *
   * @param data
   */
  public async createDialog(data: IMessage) {
    const dialog = await this.dialogsModel.find({ ids: [data.owner, data.receiver] }).exec();
    console.log(dialog);
    if (dialog.length) {
      return this.updateDialog(data);
    } else {
      const salt = generateSalt();
      const dialog = await new this.dialogsModel({
        chat: generateDialogHash(salt, data.owner),
        ids: [data.owner, data.receiver],
        messages: [data]
      }).save();

      await this.userModel.updateMany(
        { $or: [ { _id: data.owner }, {  _id: data.receiver } ] },
        { $push: {
          dialogs: dialog._id
        }}
      ).exec();

      return dialog;
    }
  }

  /**
   * Обновляет диалог
   *
   * @param data
   * @param id
   */
  public async updateDialog(data: IMessage, id?: string) {
    const searchBox: any = {};
    searchBox.ids = [data.owner, data.receiver];
    if (id) {
      searchBox.chat = id;
    }

    const dialog = await this.dialogsModel.update(
      searchBox,
      { $push: {
        messages: data
      }}
    ).exec();

    return dialog;
  }

  /**
   * Добавляет пользователя в черный список
   *
   * @param id
   * @param authorization
   */
  public async blockDialog(id: string, token: string) {
    const { sub } = this.validateToken(token) as JWT;
    await this.userModel.update(
      { _id: sub },
      { $addToSet: {
        banUser: id
      }}
    ).exec();

    return { message: `user ${id} banned` };
  }

  /**
   * Убирает пользователя из черного списока
   *
   * @param id
   * @param authorization
   */
  public async unblockDialog(id: string, token: string) {
    const { sub } = this.validateToken(token) as JWT;
    await this.userModel.update(
      { _id: sub },
      { $pull: {
        banUser: id
      }}
    ).exec();

    return { message: `user ${id} unbanned` };
  }

  /**
   * Валидирует jwt токен из заголовка
   */
  private validateToken(token: string) {
    return verify(token, SERVER_CONFIG.jwtSecret);
  }
}
