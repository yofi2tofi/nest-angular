import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Inject } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

import { OwnershipDto } from './dto/ownership.dto';
import { IOwnership } from './interfaces/ownership.interface';
import { OwnershipService } from './ownership.service';

import { AuthGuard } from '../../guards/auth.guard';

@Controller('api/ownership')
@UseGuards(new AuthGuard())
export class OwnershipController {

  constructor(
    private readonly ownershipService: OwnershipService
  ) {}

  @Get()
  async findAllOwnershipElements() {

  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createOwnershipElement(@Body() OwnershipDto: OwnershipDto ) {
    console.log(OwnershipDto);
  }

  @Put(':id')
  updateOwnershipElement() {

  }
}
