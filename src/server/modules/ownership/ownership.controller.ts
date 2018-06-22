import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Inject } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

import { OwnershipDto } from './dto/ownership.dto';
import { IOwnership } from './interfaces/ownership.interface';
import { OwnershipService } from './ownership.service';

import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';

@Controller('api/ownership')
@UseGuards(new AuthGuard())
export class OwnershipController {

  constructor(
    private readonly ownershipService: OwnershipService
  ) {}

  @Get()
  async findAllOwnershipElements() {
    return await this.ownershipService.findAllOwnershipElement();
  }

  @Post()
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createOwnershipElement(@Body() OwnershipDto: OwnershipDto ) {
    return await this.ownershipService.createOwnershipElement(OwnershipDto as IOwnership);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateOwnershipElement(@Param('id', new ParseIntPipe()) id: number, @Body() OwnershipDto: OwnershipDto ) {
    return await this.ownershipService.updateOwnershipElement(id, OwnershipDto as IOwnership);
  }
}
