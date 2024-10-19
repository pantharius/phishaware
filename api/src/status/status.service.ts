import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { StatusRepository } from 'src/status/status.repository';

@Injectable()
export class StatusService {
  private packageInfo: any;
  @Inject() repository: StatusRepository;

  constructor() {
    const packagePath = path.resolve(__dirname, '../../../package.json');
    this.packageInfo = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
  }

  async getStatus() {
    try {
      return {
        status: 'ok',
        database: (await this.repository.testDatabase())
          ? 'connected'
          : 'disconnected',
        uptime: `${Math.floor(process.uptime())} seconds`,
        version: this.packageInfo.version,
        name: this.packageInfo.name,
        timestamp: new Date(),
      };
    } catch (error: any) {
      return {
        status: 'error',
        database: 'disconnected',
        error: error.message,
        timestamp: new Date(),
      };
    }
  }
}
