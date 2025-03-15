import {
  IsDate,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateShortLinkDto {
  @IsUrl()
  originalUrl: string;

  @IsDate()
  @IsOptional()
  expiresAt: Date;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  alias: string;
}
