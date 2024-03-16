import { Injectable, OnModuleInit } from '@nestjs/common';
import { SftpConnectionService } from '../sftp_connection/sftp_connection.service';

import * as SFTPClient from 'ssh2-sftp-client';
import { TransformData } from 'src/shared/utitls/transform_data.util';

@Injectable()
export class DirectoryManagementService implements OnModuleInit{
  private client: SFTPClient;
  constructor(
    private readonly sftpConnectionService: SftpConnectionService
  ) { }

  onModuleInit() {
    this.client = this.sftpConnectionService.getClient();
  }

  async list(remoteDir: string = '/'): Promise<SFTPClient.FileInfo[]> {
    return this.client.list(remoteDir);
  }

  async exists(remoteDir: string) {
    return this.client.exists(remoteDir);
  }

  async create(remoteDir: string) {
    await this.client.mkdir(remoteDir);
    return this.client.stat(remoteDir).then(data=>{
      const fileInfo: SFTPClient.FileInfo = TransformData.fileStatsToFileInfo(remoteDir.split('/').pop(), data);
      return fileInfo;
    });
  }

  async rename(oldRemoteDir: string, newRemoteDir: string) {
    return this.client.rename(oldRemoteDir, newRemoteDir);
  }

  async delete(remoteDir: string) {
    return this.client.rmdir(remoteDir);
  }
}
