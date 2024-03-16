import * as SFTPClient from 'ssh2-sftp-client';

export class TransformData {
  static fileStatsToFileInfo(fileName: string, fileStats: SFTPClient.FileStats): SFTPClient.FileInfo {
    const rights = new ModeToRights(fileStats.mode);
    const fileInfo: SFTPClient.FileInfo = {
      name: fileName,
      type: fileStats.isDirectory ? 'd' : fileStats.isFile ? '-' : 'l',
      size: fileStats.size,
      modifyTime: fileStats.modifyTime,
      accessTime: fileStats.accessTime,
      rights: rights,
      owner: fileStats.uid,
      group: fileStats.gid,
    }

    return fileInfo;
  }
}

class ModeToRights {
  user: string;
  group: string;
  other: string;
  constructor(mode: number) {
    this.user = this.convert(mode & parseInt('700', 8));
    this.group = this.convert(mode & parseInt('070', 8));
    this.other = this.convert(mode & parseInt('007', 8));
  }

  private convert(val){
    let rights = '';
    rights += (val & parseInt('4', 8)) ? 'r' : '-';
    rights += (val & parseInt('2', 8)) ? 'w' : '-';
    rights += (val & parseInt('1', 8)) ? 'x' : '-';
    return rights;
  };
}