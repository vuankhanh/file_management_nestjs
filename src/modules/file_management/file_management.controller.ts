import { Controller, Delete, Get, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileManagementService } from './file_management.service';
import { FileDownloadDto } from './dto/download.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PathDto } from 'src/shared/dto/list.dto';
import { FilesProccedInterceptor } from 'src/shared/interceptors/files_procced.interceptor';
import { CheckExistPathGuard } from 'src/shared/guards/check_exist_path.guard';
import { FileInfo } from 'ssh2-sftp-client';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller('file')
@UseGuards(AuthGuard)
export class FileManagementController {
  constructor(
    private readonly fileManagementService: FileManagementService
  ) { }

  @Get()
  @UsePipes(ValidationPipe)
  async get(
    @Query() queryParams: FileDownloadDto
  ) {
    return this.fileManagementService.download(queryParams.path, queryParams.fileName, undefined);
  }

  @Post('/upload')
  @UseGuards(CheckExistPathGuard)
  @UseInterceptors(
    FilesInterceptor('file'),
    FilesProccedInterceptor
  )
  async upload(
    @Query() queryParams: PathDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    const uploadResults: Array<{ fileName: string, isSuccess: boolean }> = [];
    for (const file of files) {
      const result: { fileName: string, fileInfo?: FileInfo, isSuccess: boolean } = { fileName: file.originalname, isSuccess: true };
      try {
        const remoteFilePath = [queryParams.path, file.originalname].join('/');
        const fileInfo = await this.fileManagementService.upload(file.buffer, remoteFilePath);
        result.fileInfo = fileInfo;
      } catch (error) {
        result.isSuccess = false;
      }
      uploadResults.push(result);
    }
    return uploadResults;
  }

  @Patch('/rename')
  @UsePipes(ValidationPipe)
  async rename(
    @Query('path') path: string,
    @Query('oldName') oldName: string,
    @Query('newName') newName: string
  ) {
    const oldPath = [path, oldName].join('/');
    const newPath = [path, newName].join('/');
    return this.fileManagementService.rename(oldPath, newPath);
  }

  @Delete('/delete')
  @UsePipes(ValidationPipe)
  async delete(
    @Query('path') path: string
  ) {
    return this.fileManagementService.delete(path);
  }
}
