import { ShortUrlService } from 'src/short-url/short-url.service';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ClickAnalytics } from './click-analytics.model';
import { IAnalyticsResponse } from './types/analytics-response,interface';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(ClickAnalytics)
    private readonly clickAnalytics: typeof ClickAnalytics,
    private readonly shortUrlService: ShortUrlService,
  ) {}

  public async getOneAnalytics(path: string): Promise<IAnalyticsResponse> {
    const url = await this.shortUrlService.findOne(path);
    const urlAnalytics = await this.clickAnalytics.findAll({
      where: { shortUrlId: url.dataValues.id },
      order: [['createdAt', 'DESC']],
      limit: 5,
      attributes: ['ipAddress'],
      raw: true,
    });
    const ipList = urlAnalytics.map((record) => record.ipAddress);
    return { clickCount: url.dataValues.clickCount, ipAddresList: ipList };
  }

  public async createOne(id: number, ipAddress: string): Promise<void> {
    await this.clickAnalytics.create({ shortUrlId: id, ipAddress });
  }
}
