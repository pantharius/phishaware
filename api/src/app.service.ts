import { Inject, Injectable } from '@nestjs/common';
import { ContactDTO } from 'src/dtos/contact.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AppService {
  @Inject() mailService: MailService;
  async contact(contactDTO: ContactDTO) {
    try {
      await this.mailService.sendContactEmail(
        contactDTO.from,
        contactDTO.fromName,
        contactDTO.message,
      );
      return true;
    } catch (err) {
      return false;
    }
  }
}
