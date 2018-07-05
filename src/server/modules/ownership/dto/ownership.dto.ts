import { Type } from 'class-transformer';
import { IsString, IsInt, Min, Equals, IsNotEmpty, IsArray, ArrayNotEmpty, ArrayContains, ValidateNested } from 'class-validator';

// class Grade {
//   @IsInt()
//   @Min(1)
//   @IsNotEmpty()
//   level: number;

//   @IsInt()
//   @IsNotEmpty()
//   point: number;

//   @IsInt()
//   @IsNotEmpty()
//   count: number;

//   @IsInt()
//   @IsNotEmpty()
//   price: number;

//   @IsInt()
//   @IsNotEmpty()
//   gainPerHour: number;
// }

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

  // @IsArray()
  // @ArrayNotEmpty()
  // @ValidateNested({ each: true})
  // @Type(type => Grade)
  // grade: Grade[];

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  level: number;

  @IsInt()
  @IsNotEmpty()
  point: number;

  @IsInt()
  @Equals(0)
  @IsNotEmpty()
  count: number;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsNotEmpty()
  gainPerHour: number;
}
