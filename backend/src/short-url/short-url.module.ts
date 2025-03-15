import { AnalyticsModule } from 'src/analytics/analytics.module';

import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShortUrlController } from './short-url.controller';
import { ShortUrl } from './short-url.model';
import { ShortUrlService } from './short-url.service';
import { ClickAnalytics } from '../analytics/click-analytics.model';

@Module({
  imports: [
    SequelizeModule.forFeature([ShortUrl, ClickAnalytics]),
    ConfigModule,
    forwardRef(() => AnalyticsModule),
  ],
  controllers: [ShortUrlController],
  providers: [ShortUrlService],
  exports: [ShortUrlService],
})
export class ShortUrlModule {}