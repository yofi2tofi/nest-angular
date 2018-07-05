import { IsInt, Min, IsDate, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  owner: string;

  @IsNotEmpty()
  receiver: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
