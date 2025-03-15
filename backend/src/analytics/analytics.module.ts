import { ShortUrlModule } from 'src/short-url/short-url.module';

import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { ClickAnalytics } from './click-analytics.model';

@Module({
  imports: [
    SequelizeModule.forFeature([ClickAnalytics]),
    forwardRef(() => ShortUrlModule),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}