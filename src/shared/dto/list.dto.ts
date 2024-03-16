import { IsNotEmpty, IsString } from "class-validator";

export class PathDto {
  @IsString({ message: 'Path must be a string' })
  @IsNotEmpty({ message: 'Path is required' })
  path: string;
}