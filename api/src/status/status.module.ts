import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusRepository } from 'src/status/status.repository';

@Module({
  providers: [StatusService, StatusRepository],
  exports: [StatusService], // Export the service for use in other modules
})
export class StatusModule {}
