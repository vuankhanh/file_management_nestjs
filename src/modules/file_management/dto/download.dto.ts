import { IsNotEmpty, IsString } from "class-validator";

export class FileDownloadDto {
  @IsString({ message: 'Path must be a string' })
  @IsNotEmpty({ message: 'Path is required' })
  path: string;

  @IsString({ message: 'File name must be a string' })
  @IsNotEmpty({ message: 'File name is required' })
  fileName: string;
}