import { Controller,
  Get,
  Post,
  Req,
  Body,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
  UseGuards,
  UsePipes,
  ValidationPipe } from '@nestjs/common';
import { Request } from 'express';

import { UploadConfig } from './config/file.config';
import { UserService } from './user.service';
import { AuthGuard } from '../../guards/auth.guard';
import { SettingsDto } from './dto/settings.dto';
import { ISettingsDto } from './interfaces/settings.interface';

@Controller('api/users')
@UseGuards(new AuthGuard())
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file', UploadConfig))
  async uploadAvatarFile(@UploadedFile() file: any, @Req() req: Request) {
    const { headers: { authorization }} = req;
    return await this.userService.uploadAvatarFile(authorization as string, file);
  }

  @Post('settings')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateSettings(@Body() SettingsDto: SettingsDto, @Req() req: Request) {
    const { headers: { authorization }} = req;
    return await this.userService.updateSettings(authorization as string, SettingsDto as ISettingsDto);
  }
}
