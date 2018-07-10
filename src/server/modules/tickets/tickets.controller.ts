import { Controller, UseGuards, Req, Get, Post, Param, Body, UsePipes, ValidationPipe, ParseIntPipe, Inject } from '@nestjs/common';
import { Response, Request } from 'express';

import { TicketsService } from './tickets.service';
import { TicketDto } from './dto/ticket.dto';
import { MessageDto } from './dto/message.ticket.dto';
import { ITicket, IMessage } from './interfaces/ticket.interface';

import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';

@Controller('api/tickets')
@UseGuards(new AuthGuard())
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService
  ) {}

  @Get()
  @UseGuards(RolesGuard)
  async getAllTickets() {
    return await this.ticketsService.getAllTickets();
  }

  @Get()
  async getTickets(@Req() req: Request) {
    const { headers: { authorization }} = req;
    return await this.ticketsService.getTickets(authorization as string);
  }

  @Post('create')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createTicket(@Req() req: Request, @Body() TicketDto: TicketDto) {
    const { headers: { authorization }} = req;
    return await this.ticketsService.createTicket(authorization as string, TicketDto as ITicket);
  }

  @Post('update/:ticketId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateTicket(@Param('ticketId', new ParseIntPipe()) id: number, @Req() req: Request, @Body() MessageDto: MessageDto) {
    const { headers: { authorization }} = req;
    return await this.ticketsService.updateTicket(authorization as string, id, MessageDto as IMessage);
  }
}
