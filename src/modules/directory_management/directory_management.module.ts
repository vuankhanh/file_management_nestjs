import { Module } from '@nestjs/common';
import { DirectoryManagementService } from './directory_management.service';
import { DirectoryManagementController } from './directory_management.controller';
import { SftpConnectionModule } from '../sftp_connection/sftp_connection.module';

@Module({
  imports: [
    SftpConnectionModule
  ],
  providers: [
    DirectoryManagementService
  ],
  controllers: [DirectoryManagementController],
  exports: [DirectoryManagementService]
})
export class DirectoryManagementModule {}
