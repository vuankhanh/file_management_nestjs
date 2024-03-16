import { Controller, Delete, Get, HttpCode, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { DirectoryManagementService } from './directory_management.service';
import { RenameDto } from './dto/rename.dto';
import { PathDto } from 'src/shared/dto/list.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller('directory')
@UseGuards(AuthGuard)
export class DirectoryManagementController {
  constructor(
    private readonly directoryManagementService: DirectoryManagementService
  ) {}

  @Get()
  @UsePipes(ValidationPipe)
  async list(
    @Query() queryParams: PathDto
  ) {
    return this.directoryManagementService.list(queryParams.path);
  }

  @Get('exists')
  @UsePipes(ValidationPipe)
  async exists(
    @Query('path') path: string
  ) {
    return this.directoryManagementService.exists(path);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async create(
    @Query('path') path: string
  ) {
    return this.directoryManagementService.create(path);
  }

  @Patch('rename')
  @UsePipes(ValidationPipe)
  async rename(
    @Query() queryParams: RenameDto
  ) {
    return this.directoryManagementService.rename(queryParams.oldPath, queryParams.newPath);
  }

  @Delete('delete')
  @UsePipes(ValidationPipe)
  @HttpCode(204)
  async delete(
    @Query('path') path: string
  ) {
    return this.directoryManagementService.delete(path);
  }
}
