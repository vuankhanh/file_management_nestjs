import { Module } from '@nestjs/common';
import { FileManagementService } from './file_management.service';
import { FileManagementController } from './file_management.controller';
import { SftpConnectionModule } from '../sftp_connection/sftp_connection.module';
import { DirectoryManagementModule } from '../directory_management/directory_management.module';

@Module({
  imports: [
    SftpConnectionModule,
    DirectoryManagementModule
  ],
  providers: [
    FileManagementService
  ],
  controllers: [FileManagementController]
})
export class FileManagementModule {}
