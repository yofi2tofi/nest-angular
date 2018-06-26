import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './user.service';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('api/users')
@UseGuards(new AuthGuard())
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}
}
