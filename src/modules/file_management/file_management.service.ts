import { Injectable, OnModuleInit } from '@nestjs/common';
import { SftpConnectionService } from '../sftp_connection/sftp_connection.service';

import * as SFTPClient from 'ssh2-sftp-client';
import { TransformData } from 'src/shared/utitls/transform_data.util';

@Injectable()
export class FileManagementService implements OnModuleInit {
  private client: SFTPClient;
  constructor(
    private readonly sftpConnectionService: SftpConnectionService
  ) { }

  onModuleInit() {
    this.client = this.sftpConnectionService.getClient();
  }

  async download(path: string, fileName: string, localFilePath?: string) {
    const remoteFilePath = [path, fileName].join('/');
    return this.client.get(remoteFilePath, localFilePath);
  }

  async upload(localFilePath: string | Buffer | NodeJS.ReadableStream, remoteFilePath: string) {
    await this.client.put(localFilePath, remoteFilePath);
    return this.client.stat(remoteFilePath).then(data=>{
      const fileInfo: SFTPClient.FileInfo = TransformData.fileStatsToFileInfo(remoteFilePath.split('/').pop(), data);
      return fileInfo;
    });
  }

  async rename(oldRemoteFilePath: string, newRemoteFilePath: string) {
    return this.client.rename(oldRemoteFilePath, newRemoteFilePath);
  }

  async delete(remoteFilePath: string) {
    return this.client.delete(remoteFilePath);
  }
}
