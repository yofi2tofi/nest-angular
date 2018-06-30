import { IsString, IsOptional } from 'class-validator';

export class SettingsDto {
  @IsString()
  @IsOptional()
  coinpayments: string;

  @IsString()
  @IsOptional()
  coinbasesmth: string;
}
