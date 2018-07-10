import { IsString, IsNotEmpty } from 'class-validator';

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
