import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

import { IOwnership } from './interfaces/ownership.interface';

@Controller('api/ownership')
export class OwnershipController {

  @Post()
  async createOwnershipElement(@Body() IOwnership: IOwnership ) {
    console.log(IOwnership);
  }

}
