import { Module } from '@nestjs/common';
import { SftpConnectionService } from './sftp_connection.service';

@Module({
  providers: [SftpConnectionService],
  exports: [SftpConnectionService],
})
export class SftpConnectionModule {}
