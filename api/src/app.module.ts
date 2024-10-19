import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { StatusModule } from 'src/status/status.module';

@Module({
  imports: [UsersModule, StatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
