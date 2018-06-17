import { Controller, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('api/users')
@UseGuards(new AuthGuard())
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}
}
