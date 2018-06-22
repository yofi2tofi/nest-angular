import { Type } from 'class-transformer';
import { IsInt, Min, IsDate, IsNotEmpty, IsBoolean, ValidateNested } from 'class-validator';

class Withdraw {
  @IsBoolean()
  access: boolean;

  @IsNotEmpty()
  @IsInt()
  penalty: number;

  @IsNotEmpty()
  @IsInt()
  duration: number;
}

export class ContributionDto {
  @IsNotEmpty()
  @Min(1)
  @IsInt()
  min: number;

  @IsNotEmpty()
  @Min(1)
  @IsInt()
  max: number;

  @IsNotEmpty()
  @Min(1)
  @IsInt()
  bonus: number;

  @IsNotEmpty()
  @Min(1)
  @IsInt()
  accruals: number;

  @IsNotEmpty()
  @IsInt()
  duration: number;

  @IsNotEmpty()
  @Min(1)
  @IsInt()
  round: number;

  @IsNotEmpty()
  @Min(1)
  @IsInt()
  back: number;

  @ValidateNested()
  withdraw: Withdraw;
}
