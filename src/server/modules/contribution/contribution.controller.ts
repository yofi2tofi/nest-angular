import {
  Controller,
  Req,
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

import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';

import { ContributionDto } from './dto/contribution.dto';
import { IContribution } from './interfaces/contribution.interface';
import { ContributionService } from './contribution.service';

@Controller('api/contribution')
@UseGuards(new AuthGuard())
export class ContributionController {

  constructor(
    private readonly contributionService: ContributionService
  ) {}

  @Get()
  async findAllContributionPlan() {
    return await this.contributionService.findAllContributionPlan();
  }

  @Post()
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createContributionElement(@Body() ContributionDto: ContributionDto ) {
    return await this.contributionService.createContributionElement(ContributionDto as IContribution);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateContributionElement(@Param('id', new ParseIntPipe()) id: number, @Body() ContributionDto: ContributionDto ) {
    return await this.contributionService.updateContributionElement(id, ContributionDto as IContribution);
  }

  @Post(':value')
  async purchaiseContributionElement(@Param('value', new ParseIntPipe()) id: number, @Req() req: Request) {
    const { headers: { authorization }} = req;
    return await this.contributionService.purchaiseContributionElement(id, authorization as string);
  }
}
