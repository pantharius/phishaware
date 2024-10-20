import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { StatusModule } from 'src/status/status.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [UsersModule, StatusModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
