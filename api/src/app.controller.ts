import { Controller, Get } from '@nestjs/common';
import { StatusService } from 'src/status/status.service';

@Controller()
export class AppController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  async getStatus() {
    return await this.statusService.getStatus();
  }
}
