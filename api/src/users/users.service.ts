import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  @Inject() usersRepository: UsersRepository; // Injection explicite
  @Inject() mailService: MailService;
  async registerUser(email: string) {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const newUser = this.usersRepository.createUser(email, verificationCode);
    await this.mailService.sendVerificationEmail(email, verificationCode);
    return newUser;
  }

  async confirmEmail(userId: number, code: string) {
    const user = await this.usersRepository.getUserById(userId);
    if (user?.email_code === code) {
      return this.usersRepository.updateUser(userId, {
        email_code: null,
        email_verified_at: new Date(),
      });
    }
    throw new Error('Invalid confirmation code');
  }

  async updateUserDetails(userId: number, details: Partial<any>) {
    try {
      return this.usersRepository.updateUser(userId, details);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async confirmPhone(userId: number, code: string) {
    const user = await this.usersRepository.getUserById(userId);
    if (user?.phone_code === code) {
      return this.usersRepository.updateUser(userId, { phone_code: null });
    }
    throw new Error('Invalid phone confirmation code');
  }
}
