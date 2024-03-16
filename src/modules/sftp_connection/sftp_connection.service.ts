import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import sftp, * as SFTPClient from 'ssh2-sftp-client';

@Injectable()
export class SftpConnectionService implements OnModuleInit, OnModuleDestroy {
  private client: sftp;

  async onModuleInit() {  
    this.client = new SFTPClient();
    const host = process.env.SFTP_HOST;
    const port = Number(process.env.SFTP_PORT);
    const username = process.env.SFTP_USERNAME;
    const password = process.env.SFTP_PASSWORD;

    await this.client.connect({
      host,
      port,
      username,
      password,
    });
  }

  getClient(): sftp {
    return this.client;
  }

  async onModuleDestroy() {
    await this.client.end();
  }
}
