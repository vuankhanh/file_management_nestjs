import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { DirectoryManagementService } from 'src/modules/directory_management/directory_management.service';

@Injectable()
export class CheckExistPathGuard implements CanActivate {
  constructor(
    private readonly directoryService: DirectoryManagementService
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const path = request.query.path;
    if (!path) {
      return false;
    }

    const pathExist = await this.directoryService.exists(path);
    if (!pathExist) {
      throw new BadRequestException('Path not exist');
    }

    return true;
  }
}
