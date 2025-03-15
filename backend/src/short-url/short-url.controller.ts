import { Request, Response } from 'express';

import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ClientIp } from './decorators/client-api.decorator';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { ShortUrl } from './short-url.model';
import { ShortUrlService } from './short-url.service';
import { IShortUrlInfo } from './types/short-url-info-response.interface';

@Controller()
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Get('all/:page')
  public async findAll(@Param('page') page: number): Promise<ShortUrl[]> {
    return await this.shortUrlService.findAll(page);
  }

  @Get(':path')
  public async redirect(
    @Param('path') path: string,
    @ClientIp() ipAddress: string,
    @Res() res: Response,
  ): Promise<void> {
    const url = await this.shortUrlService.redirect(path, ipAddress);
    res.redirect(url);
  }

  @Get('info/:path')
  public async getInfo(@Param('path') path: string): Promise<IShortUrlInfo> {
    const url = await this.shortUrlService.findOne(path);
    return this.shortUrlService.createUrlResponse(url);
  }

  @Post('shorten')
  public async createShortLink(
    @Body() createShortLinkDto: CreateShortLinkDto,
  ): Promise<string> {
    return await this.shortUrlService.createShortUrl(createShortLinkDto);
  }

  @Delete('delete/:path')
  public async deleteUrl(@Param('path') path: string): Promise<IShortUrlInfo> {
    const url = await this.shortUrlService.deleteOne(path);
    return this.shortUrlService.createUrlResponse(url);
  }
}
