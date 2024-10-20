import { IsEmail, IsString, MinLength } from 'class-validator';

export class ContactDTO {
  @IsEmail()
  from: string;
  @IsString()
  fromName: string;
  @IsString()
  @MinLength(20, { message: 'Votre message doit être plus long.' })
  message: string;
}
