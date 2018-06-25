import { Controller, UseGuards, Get, Post, Param, Req, Body, UsePipes, ValidationPipe, Inject } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import { Model } from 'mongoose';

import { DialogExistGuard } from './guards/dialog-exist.guard';
import { MessageDto } from './dto/message.dto';
import { DialogsService } from './dialogs.service';
import { AuthGuard } from '../../guards/auth.guard';
import { IDialog, IMessage } from './interfaces/dialog.interface';
import { DIALOGS_MODEL_TOKEN } from '../../server.constants';

@Controller('api/messages')
@UseGuards(new AuthGuard())
export class DialogsController {
  constructor(
    @Inject(DIALOGS_MODEL_TOKEN) private readonly dialogsModel: Model<IDialog>,
    private readonly dialogsService: DialogsService
  ) {}

  @Get('dialogs')
  async findAllPrivateDialogs(@Req() req: Request) {
    const { headers: { authorization }} = req;
    return await this.dialogsService.findAllPrivateDialogs(authorization as string);
  }

  @Get('dialog/:id')
  @UseGuards(DialogExistGuard)
  async findPrivateDialog(@Param('id') id: string, @Req() req: Request) {
    return await this.dialogsService.findPrivateDialog(id);
  }

  @Post('dialog')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createDialog(@Body() MessageDto: MessageDto ) {
    return await this.dialogsService.createDialog(MessageDto as IMessage);
  }

  @Post('dialog/:id')
  @UseGuards(DialogExistGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateDialog(@Param('id') id: string, @Body() MessageDto: MessageDto ) {
    return await this.dialogsService.updateDialog(MessageDto as IMessage, id);
  }

  @Post('block/:id')
  async blockDialog(@Param('id') id: string, @Req() req: Request) {
    const { headers: { authorization }} = req;
    return await this.dialogsService.blockDialog(id, authorization as string);
  }

  @Post('unblock/:id')
  async unblockDialog(@Param('id') id: string, @Req() req: Request) {
    const { headers: { authorization }} = req;
    return await this.dialogsService.unblockDialog(id, authorization as string);
  }
}
