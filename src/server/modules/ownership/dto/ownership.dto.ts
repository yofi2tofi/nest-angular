import { IsString, IsInt, IsNotEmpty, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';

class Grage {
  @IsInt()
  @IsNotEmpty()
  level: number;

  @IsInt()
  @IsNotEmpty()
  point: number;

  @IsInt()
  @IsNotEmpty()
  count: number;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsNotEmpty()
  gainPerHour: number;
}

export class OwnershipDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  lastHarvest: number;

  @ValidateNested()
  @IsNotEmpty()
  system: any;

  @ValidateNested()
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  grade: Grage[];
}
