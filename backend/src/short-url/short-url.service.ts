import { randomBytes } from 'crypto';
import { Op } from 'sequelize';
import { AnalyticsService } from 'src/analytics/analytics.service';

import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { ShortUrl } from './short-url.model';
import { IShortUrlInfo } from './types/short-url-info-response.interface';

@Injectable()
export class ShortUrlService {
  private addres: string;
  private port: number;

  constructor(
    @InjectModel(ShortUrl) private readonly shortUrlModel: typeof ShortUrl,
    private readonly config: ConfigService,
    @Inject(forwardRef(() => AnalyticsService))
    private analyticsService: AnalyticsService,
  ) {
    this.addres = config.getOrThrow<string>('ADDRES');
    this.port = config.getOrThrow<number>('PORT');
  }

  private generateAlias(): string {
    return randomBytes(4).toString('hex');
  }

  private generateShorLink(path: string): string {
    return `${this.addres}:${this.port}/${path}`;
  }

  public async findAll(page: number): Promise<ShortUrl[]> {
    const offset = 10 * (page - 1);
    return await this.shortUrlModel.findAll({
      limit: 10,
      offset,
      order: [['createdAt', 'DESC']],
    });
  }

  public createUrlResponse(urlObject: ShortUrl): IShortUrlInfo {
    return {
      originalUrl: urlObject.dataValues.originalUrl,
      createdAt: urlObject.dataValues.createdAt,
      clickCount: urlObject.dataValues.clickCount,
    };
  }

  public async findOne(path: string): Promise<ShortUrl> {
    const urlObject = await this.shortUrlModel.findOne({
      where: {
        [Op.or]: [{ alias: path }, { shortUrl: path }],
      },
    });
    if (!urlObject)
      throw new HttpException('Такого url не существует', HttpStatus.NOT_FOUND);

    return urlObject;
  }

  public async redirect(path: string, ipAddress: string): Promise<string> {
    const url = await this.findOne(path);
    if (url.expiresAt && url.expiresAt < new Date()) {
      throw new HttpException('Срок действия ссылки истек', HttpStatus.GONE);
    }
    await this.shortUrlModel.update(
      { clickCount: url.dataValues.clickCount + 1 },
      { where: { id: url.dataValues.id } },
    );
    await this.analyticsService.createOne(url.dataValues.id, ipAddress);
    return url.dataValues.originalUrl;
  }

  public async deleteOne(path: string): Promise<ShortUrl> {
    const url = await this.findOne(path);
    await this.shortUrlModel.destroy({ where: { id: url.dataValues.id } });
    return url;
  }

  public async createShortUrl(
    createShortLinkDto: CreateShortLinkDto,
  ): Promise<string> {
    const { alias, originalUrl, expiresAt } = createShortLinkDto;
    if (alias) {
      const existingShortUrlWithAlias = await this.shortUrlModel.findOne({
        where: { alias },
      });

      if (existingShortUrlWithAlias)
        throw new HttpException(
          'Url с таким алиасом уже существует',
          HttpStatus.BAD_REQUEST,
        );
    }

    let shortUrl = this.generateAlias();
    let existingShortUrl = await this.shortUrlModel.findOne({
      where: { shortUrl },
    });
    while (existingShortUrl) {
      shortUrl = this.generateAlias();
      existingShortUrl = await ShortUrl.findOne({
        where: {
          [Op.or]: [{ shortUrl }, { alias }],
        },
      });
    }

    await this.shortUrlModel.create({
      originalUrl,
      shortUrl,
      alias,
      expiresAt,
      clickCount: 0,
    });

    return this.generateShorLink(alias || shortUrl);
  }
}
