import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { IAnalyticsResponse } from './types/analytics-response,interface';

@Controller()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('analytics/:path')
  public async getOneAnalytics(
    @Param('path') path: string,
  ): Promise<IAnalyticsResponse> {
    return await this.analyticsService.getOneAnalytics(path);
  }
}
