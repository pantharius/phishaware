import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { ContactDTO } from 'src/dtos/contact.dto';
import { StatusService } from 'src/status/status.service';

@Controller()
export class AppController {
  @Inject() statusService: StatusService;
  @Inject() service: AppService;

  @Get()
  async getStatus() {
    return await this.statusService.getStatus();
  }
  @Post('contact')
  async contact(@Body() contactdto: ContactDTO) {
    return await this.service.contact(contactdto);
  }
}
