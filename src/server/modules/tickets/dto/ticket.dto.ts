import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';

import { MessageDto } from './message.ticket.dto';

export class TicketDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true})
  @Type(type => MessageDto)
  messages: MessageDto[];

  @IsString()
  @IsNotEmpty()
  status: string;
}
