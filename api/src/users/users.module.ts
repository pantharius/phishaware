import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [MailModule],
  controllers: [UsersController], // Déclare les controllers du module
  providers: [UsersService, UsersRepository], // Déclare les services et repositories
  exports: [UsersService], // Exporte le service si d'autres modules en ont besoin
})
export class UsersModule {}
